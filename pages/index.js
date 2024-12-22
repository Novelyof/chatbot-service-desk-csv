import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [issues, setIssues] = useState([]);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    fetch('/api/issues')
      .then(res => res.json())
      .then(data => {
        const sortedIssues = data.sort((a, b) => b.frequency - a.frequency).slice(0, 5);
        setIssues(sortedIssues);
      })
      .catch(error => console.error('Error fetching top issues:', error));

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      })
      .catch(error => {
        setCategories([]);
      });
  }, []);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchSubcategories = async (category) => {
    try {
      const res = await fetch(`/api/subcategories?category=${encodeURIComponent(category)}`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory) {
      alert('Please select a category and subcategory');
      return;
    }

    try {
      const res = await fetch(`/api/search?category=${encodeURIComponent(selectedCategory)}&subcategory=${encodeURIComponent(selectedSubCategory)}&query=${encodeURIComponent(query)}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const data = await res.json();

      if (data.error) {
        setResponse(data.error);
      } else if (data.matchedIssue) {
        const { matchedIssue } = data;
        const steps = Object.keys(matchedIssue)
          .filter(key => key.startsWith('step') && matchedIssue[key])
          .map(key => matchedIssue[key]);

        setResponse(
          <div className={styles.searchResult}>
            <p>Here are the steps that can be taken to solve the problem being experienced:</p>
            {steps.map((step, index) => (
              <div key={index} className={styles.step}>
                <h4>Step {index + 1}</h4>
                <p>{step}</p>
              </div>
            ))}<div className={styles.callHelpdesk}> 
              <p>If the solution not working, please call our helpdesk team for further assistance.</p>
              <button className={styles.button} onClick={() => alert('Calling helpdesk...')}>
                Call Helpdesk
              </button>
            </div>
          </div>
        );
      } else if (data.openAIResponse) {
        setResponse(
          <div className={styles.searchResult}>
            <p>OpenAI suggests the following solution:</p>
            <div className={styles.step}>
              <p>{data.openAIResponse}</p>
            </div>
            <div className={styles.callHelpdesk}>
              <p>If the solution not working, please call our helpdesk team for further assistance.</p>
              <button className={styles.button} onClick={() => alert('Calling helpdesk...')}>
                Call Helpdesk
              </button>
            </div>
          </div>
        );
      } else {
        setResponse(
          <div className={styles.noResult}>
            <p>No matching issues found.</p>
            <p>If the solution not working, please call our helpdesk team for further assistance.</p>
            <button className={styles.button} onClick={() => alert('Calling helpdesk...')}>
              Call Helpdesk
            </button>
          </div>
        );
      }
    } catch (error) {
      setResponse('An error occurred while fetching data. Please try again later.');
    }
  };

  const openPopup = (issue) => {
    setSelectedIssue(issue);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedIssue(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Chatbot Service Desk</h1>
      </div>
      <div className={styles.chatWindow}>
        <h2 className={styles.topIssuesHeader}>Top Issues</h2>
        {issues.map((issue, index) => (
          <div key={index} className={styles.topIssue}>
            <h3>{issue.issue_detail}</h3>
            <p>Frequency: {issue.frequency}</p>
            <button className={styles.button} onClick={() => openPopup(issue)}>
              View Solution
            </button>
          </div>
        ))}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.chatBubbleUser}>
            <p>Welcome to Chatbot Helpdesk. How can we assist you today?</p>
          </div>
          <div className={styles.chatBubbleUser}>
            <select
              id="category"
              value={selectedCategory}
              onChange={async (e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubCategory('');
                const fetchedSubcategories = await fetchSubcategories(e.target.value);
                setSubcategories(fetchedSubcategories);
              }}
              className={styles.select}
            >
              <option value="">Select Category</option>
              {categories.length > 0 ? categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )) : <option disabled>Loading categories...</option>}
            </select>
          </div>
          {selectedCategory && (
            <div className={styles.chatBubbleUser}>
              <select
                id="subCategory"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className={styles.select}
              >
                <option value="">Select Subcategory</option>
                {subcategories.length > 0 ? subcategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                )) : <option disabled>Loading subcategories...</option>}
              </select>
            </div>
          )}
          <div className={styles.chatBubbleUser}>
            <textarea
              value={query}
              onChange={handleQueryChange}
              placeholder="Enter your issue description"
              className={styles.textarea}
            />
          </div>
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
        {response && <div className={styles.response}>{response}</div>}
      </div>
      {isPopupOpen && selectedIssue && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closePopup}>
              &times;
            </button>
            <h2>{selectedIssue.issue_detail}</h2>
            <p>Here are the steps to solve this issue:</p>
            {Object.keys(selectedIssue)
              .filter(key => key.startsWith('step') && selectedIssue[key])
              .map((key, index) => (
                <div key={index} className={styles.step}>
                  <h4>Step {index + 1}</h4>
                  <p>{selectedIssue[key]}</p>
                </div>
              ))}
            <div className={styles.callHelpdesk}>
              <p>If the solution not working, please call our helpdesk team for further assistance.</p>
              <button className={styles.button} onClick={() => alert('Calling helpdesk...')}>
                Call Helpdesk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
