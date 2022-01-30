import react from 'react';
import {Image} from "react-bootstrap";
import './App.css';

const City = ({title, img_url}) => (
    <div className="card city">
        <img src="https://static.semrush.com/blog/uploads/media/20/b9/20b9fc4db7fe16be59032ff15883e98d/google-advertising.svg" alt={title}/>
        <h3>{title}</h3>
    </div>
)

export default City;
