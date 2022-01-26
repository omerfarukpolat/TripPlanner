import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import GooglePexel from "./googlepexel";
function App() {

  const [form,setForm] = useState(0);
  const onChangeInput= (e) => {
      setForm(e.target.value);
  }
  return (
   <div>
     <h1>TRIP PLANNER</h1>
    <input name="name" value={form} onChange={onChangeInput}/>
   <GooglePexel></GooglePexel>
   </div>
  );
}

export default App;
