import React, {useState} from "react";
import {Card} from "react-bootstrap";
import "./Homepage.css";


export const CardButton = (props) => {
    const [over,setOver] = useState(false);

    const trueOver = () => {
        setOver(true);
    }

    const falseOver = () => {
        setOver(false);
    }

    return(
            <a onMouseOver={trueOver} onMouseLeave={falseOver} href={'/' + props.link}
               style={{textDecoration: 'none'}}>
                    <Card border="success" bg={over ? "light":"success"} className="container-item">
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center', color: over ? "green":"white"}}>{props.text}</Card.Title>
                        </Card.Body>
                    </Card>
            </a>
    );
}