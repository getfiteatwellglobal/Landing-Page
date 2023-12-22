// TodoList.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const TodoList = ({ todos, toggleTodo }) => {
  const {challengeId} = useParams()
    const [checkTodo, setCheckedTodo] = useState(false)
    const [todoArray, setTodoArray] = useState(todos)
    const [checkBox, setCheckBox] = ([])
    const updateTodos = (e)=>{
      console.log("__TODO__",e)
      let newArr = todoArray.filter((item)=> item.task == e.task)
      let restOfArr = todoArray.filter((item)=> item.task !== e.task)
      console.log(newArr)
            newArr[0].checkedBy([...newArr[0]?.checkedBy, {email:localStorage.getItem("email")}]);
      setTodoArray([...restOfArr, ...newArr])

    }
    const submitChallenge= async()=>{
      //Here passing checked todo list to AI and then through backend will subimt this to the DB 
      const response = axios.post("http://localhost:5000/challenge/update", {challengeId, todoArray, email: localStorage.getItem("email")})
    }
    useEffect(() => {
      console.log(challengeId,"___CHALLENGE_ID___")
      console.log(todoArray)
    }, [todoArray])
    
  return (
    <div>
      {todoArray.map((todo) => (
        <div  onClick={()=> updateTodos(todo)}>
          
          <span style={{ textDecoration: todo?.checkedBy?.include(localStorage.getItem("email")) ? "line-through" : "none" }}>{todo.task} </span>
          <span>| {todo.points}</span>
        </div>
      ))}
      <button onClick={()=> submitChallenge()} style={{backgroundColor:"green", color:"white", height:"15px", width:"30px"}}>Submit</button>
    </div>
  );
};

export default TodoList;
