import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import 'react-bootstrap';
import './constant';
import cities from "./constant";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import {Card, Image, Row} from "react-bootstrap";
import 'react-notifications/lib/notifications.css';
import City from "./City";


function App() {

  const [budget,setBudget] = useState(0);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const results = [];

  const onChangeInput= (e) => {
      setBudget(e.target.value);
      console.log(budget);
  }

    const names = cities.map(x => x.name);

    function handleSubmit(event) {
        if(selected.length < 3) {
            alert('Please select three or more cities');
            setError(true);
        }
        else {
            setShowResult(true);
            setError(false);
            selected.map((city => {
                const url = "https://api.pexels.com/v1/search?query=" + city.label + "city" + "&per_page=" + 3;
                const access_token = '563492ad6f917000010000018f4ff1cec5904456af67900f4f9c6620';
                axios.get(url, {
                    headers: {
                        'Authorization': `${access_token}`
                    }
                }).then(data => {
                    setResult(data.data.photos);
                });
            }))
        }
    }


  return (
       <div>
           <div class="container col-6">
               <article>
                 <h1 className={"col-6"}>TRIP PLANNER</h1>
               </article>
                   <form className={"field col-6"}>
                       <label>
                           <input type="number" placeholder={"Please Enter Your Trip Budget ($)"} onChange={onChangeInput}  />
                       </label>
                   </form>
                   <br/>
               <div className="mselect">
                       <MultiSelect
                           options={cities}
                           value={selected}
                           onChange={setSelected}
                           labelledBy="Select"
                       />
               </div>
               <br/>
               <button className={"button-36"} onClick={handleSubmit}>Submit</button>
           </div>
           <br/>
           <div className="container">
               {showResult &&
                   <div className="city-list">
                       {results.map(photos => {
                           photos.map(photo => {
                               <City title={photo.alt} img_url={photo.url}></City>
                                })
                            })
                       }
                   </div>
               }
               <Row>
               {result.map((search,index) => (
                       <div className="row">
                           <div className="card col-sm-4" style={{'margin-top': '10px'}}>
                               <img src={search.src.medium} alt={search.photographer}/>
                               <div class={"container"}>
                                   <h5 className="card-title">{search.alt}</h5>
                                   <a className="btn btn-primary">{search.photographer}</a>
                               </div>
                           </div>
                       </div>
                   ))}
               </Row>

           </div>
       </div>
  );
}

export default App;
