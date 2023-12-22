import React, { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import "./Polls.css";
import axios from "axios";

const Polls = () => {
  const [multipleChoiceVotes, setMultipleChoiceVotes] = useState([]);
  const [rankVotes, setRankVotes] = useState([]);
  const [polls, setPolls] = useState([]);
  const [answer, setanswer] = useState("");
  const handleMultipleChoiceChange = (option) => {
    const updatedVotes = [...multipleChoiceVotes];
    const index = updatedVotes.indexOf(option);
    console.log(option);
    if (index === -1) {
      updatedVotes.push(option);
    } else {
      updatedVotes.splice(index, 1);
    }

    setMultipleChoiceVotes(updatedVotes);
  };

  const handleRankChange = (option, rank) => {
    const updatedRanks = [...rankVotes];
    const existingIndex = updatedRanks.findIndex(
      (vote) => vote.option === option
    );

    if (existingIndex !== -1) {
      updatedRanks[existingIndex].rank = rank;
    } else {
      updatedRanks.push({ option, rank });
    }

    setRankVotes(updatedRanks);
  };

  // const submitPoll = ()=>{
  // useEffect(()=>{
  //   const { isLoading, serverError, apiData } = useFetch(
  //     "GET",
  //     "polls",
  //     {}
  //   );
  // }, [])

  // }\
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/polls");
        // console.log(response.json())
        const jsonData = await response.json();
          
        setPolls(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleSubmit = () => {
    console.log("Multiple Choice Votes:", multipleChoiceVotes);
    console.log("Rank Votes:", rankVotes);
  };
  const updatepoll = async (doc) => {
    let newDoc = doc
      console.log("READING DOC",doc, doc.answer)
    newDoc.answer.push(...newDoc?.answer,{answer:answer, email:localStorage.getItem("email")})
    console.log("UPDATED___",newDoc)
    const response = await axios.post("http://localhost:5000/polls/updatepoll", {
      newDoc
    });

    console.log("NEW DOC", newDoc);
    console.log(response)
  };
  return (
    <div className="poll-container">
      {polls?.map((poll) => {
        return (
          <div>
            <h1>{poll.topic}</h1>
            {poll?.choices.map((option) => (
              <div key={option} className="poll-quetions">
                <p
                  type="checkbox"
                  onClick={() => setanswer(option)}
                  checked={multipleChoiceVotes.includes(option)}
                >
                  {option}
                </p>
              </div>
            ))}
            <button onClick={() => updatepoll(poll)}> Submit </button>
          </div>
        );
      })}
    </div>
  );
};

export default Polls;
