import React from "react";
import "./display.css";

function Display(props) {
    return (
        <div className="display-container">
            <h1 className="clock">{props.count}</h1>
            <button onClick={props.increase}>Increase</button>
            <button onClick={props.start}>Start</button>
            <button onClick={props.stop}>Stop</button>
            <button onClick={props.showTime}>Show Time</button>
            <form>
                <label for='toggle-24'>24-hour Time: </label>
                <input type='checkbox' name='toggle-24' id='toggle-24' onClick={props.toggle24Hour}/>
            </form>
        </div>
        )
}

export default Display