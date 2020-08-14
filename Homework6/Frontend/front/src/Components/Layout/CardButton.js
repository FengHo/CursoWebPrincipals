import React, {useState} from "react";
import {Card} from "react-bootstrap";
import "../Pages/Homepage.css";
import {Link} from 'react-router-dom';


export const CardButton = (props) => {
    const [over,setOver] = useState(false);

    const trueOver = () => {
        setOver(true);
    }

    const falseOver = () => {
        setOver(false);
    }

    return(
            <Link onMouseOver={trueOver} onMouseLeave={falseOver} to={'/' + props.link}
               style={{textDecoration: 'none'}}>
                    <Card border="success" bg={over ? "light":"success"} className="container-item">
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center', color: over ? "green":"white"}}>{props.text}</Card.Title>
                        </Card.Body>
                    </Card>
            </Link>
    );
}