import React, { useEffect, useState } from "react";
import List from "../../components/List/List";
import challengeImg from "../../assets/challenge.png"
import {Link} from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/");
        // console.log(response.json())
        const jsonData = await response.json();

        setData(jsonData);
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="dashboard">
  
      
      {data.length > 0? (data?.map((item)=>{
        return(
          <div className="dashboard-item" key={item?._id}>
          <img src={challengeImg} className="dashboard-item-img"/>
          <p>{item.challengeName}</p>
          <Link to={`/${item?._id}`}>Open Challenge</Link>
          </div> 
        )

      })): "No Challenges Found"}
      
    </div>
  );
}
export default Dashboard;
