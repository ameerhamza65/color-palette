import React from 'react';
import './palette.css';
function Footer(props){
    return(
        <footer className="palette-footer">
        {props.paletteName}
        <span className="palette-emoji">{props.emoji}</span>
       </footer>
    )
}
export default Footer;