import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(res=>res.json())
    .then(questionData => setQuestions(questionData))
  }, [])

  function handleAddQuestion(newQuestion){
    setQuestions([...questions, newQuestion])
  }

  function handleUpdate(fixedQuestion){
    const newQuestions = questions.map(question=>{
      if(question.id === fixedQuestion.id){
        return fixedQuestion
      }
      else{
        return question
      }
    })
    setQuestions(newQuestions)
  }

  function handleDelete(badQuestion){
    const newQuestions = (questions.filter(question=>question.id!==badQuestion.id))
    setQuestions(newQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : <QuestionList questions={questions} onDelete={handleDelete} onUpdate={handleUpdate}/>}
    </main>
  );
}

export default App;
