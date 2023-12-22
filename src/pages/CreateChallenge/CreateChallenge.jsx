import React, { useState, useEffect } from 'react';
import SelectTags from '../../components/SelcteTags/SelcteTags';
import TaskSelection from '../../components/TaskSelection/TaskSelection'
import { useTranslation } from 'react-i18next';
import './CreateChallenge.css';

function CreateChallenge() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // react i18 translation
  const { t, i18n } = useTranslation();   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
      // console.log(response.json())
        const jsonData = await response.json();

        setData(jsonData.data);
 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  // State to manage input values
  const [challengeData, setChallengeData] = useState({
    challengeName: '',
    startDate: '',
    startTime: '',
    tags: [],
    todos: [],
    faq: [],
    rules: [],
    description: '',
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChallengeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle the "Next" button click
  const handleNextClick = () => {
    // Save data to console
  
    handlePostRequest()

    // You can also send the data to a server or perform other actions here
  };

  const handlePostRequest = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(challengeData),
      });

      const jsonResponse = await response.json();

      // Assuming your backend responds with a message
      // setResponseMessage(jsonResponse.message);
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="create-challenge">
     <h2>{data}</h2>
      <label className="challenge-label">
        {t("challenge.name")} *
        <input
          type="text"
          id="cname"
          name="challengeName"
          value={challengeData.challengeName}
          onChange={handleInputChange}
        />
      </label>
      <div className="challenge-time-input">
        <label className="challenge-label">
          Starts Date *
          <input
            type="date"
            id="cdate"
            name="startDate"
            value={challengeData.startDate}
            onChange={handleInputChange}
          />
        </label>
        <label className="challenge-label">
          Time *
          <input
            type="time"
            id="ctime"
            name="startTime"
            value={challengeData.startTime}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <label className="challenge-label">
        Description *
        <textarea
          id="cdescription"
          name="description"
          rows="4"
          cols="50"
          value={challengeData.description}
          onChange={handleInputChange}
        ></textarea>
      </label>
      <label className="challenge-label">
     select-tags
     <SelectTags addTags={(newTags)=>{
      setChallengeData((prevData) => ({
        ...prevData,
        ["tags"]: newTags,
      }));
     }} />
     
    </label>
    <TaskSelection  addTasks={(newTasks)=>{
      setChallengeData((prevData) => ({
        ...prevData,
        ["todos"]: newTasks,
      }));
     }} />
      <button className="challenge-next-button" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
}

export default CreateChallenge;
