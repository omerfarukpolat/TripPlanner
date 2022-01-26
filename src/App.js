import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import 'react-bootstrap';
import './constant';
import cities from "./constant";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import {Card, Image} from "react-bootstrap";
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from "react-notifications";


function App() {

  const [budget,setBudget] = useState(0);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);

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
            setError(false);
            selected.map(cityName => {
                event.preventDefault();
                const url = "https://api.pexels.com/v1/search?query=" + cityName.label + "&per_page=" + 1;
                const access_token = '563492ad6f917000010000016243b7b390a84f58bd3d3155e2cd694a';
                axios.get(url, {
                    headers: {
                        'Authorization': `${access_token}`
                    }
                }).then(data => {
                    console.log(data);
                    setResult(data.data.photos);
                    console.log(result);
                });
            });
        }

        console.log(result);
    }

  return (
       <div>
         <h1>TRIP PLANNER</h1>
           <form>
               <label>
                   <input type="number" placeholder={"Please Enter Your Trip Budget ($)"} onChange={onChangeInput}  />
               </label>
           </form>
           <br/>
           <div className={"mselect"}>
           <MultiSelect
               options={cities}
               value={selected}
               onChange={setSelected}
               labelledBy="Select"
           />
               {
                   error ?
                   <div>
                       <h1>PLEASE SELECT MORE THAN 2 CITIES</h1>
                   </div> : ''
               }
           </div>
           <button onClick={handleSubmit}>Submit</button>
           <br/>
           <div className="container">
                   {result.map(search => (
                       <div className="row">
                           <div className="col-sm-4">
                               <div style={{'margin-top': '10px'}}>
                                   <Image variant="top" src={search.src.landscape} alt={search.photographer}/>
                                   <div>
                                       <h5 className="card-title">Card title</h5>
                                       <a className="btn btn-primary">Know more</a>
                                   </div>
                               </div>
                           </div>
                       </div>
                   ))}
           </div>
       </div>
  );
}

export default App;
