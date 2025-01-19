import React, {useContext, useEffect, useState} from 'react'
import { Table } from 'react-bootstrap';
import axios from "axios";
import {AuthContext} from "../authContext";
import '../styles/calendar.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGift} from "@fortawesome/free-solid-svg-icons";

const Calendar = ({ month, year }) => {
    let result = [];
    let temp = {};
    let lastDay = new Date(year, month, 0).getDate();
    let j=0,i=0;
    let weekday= ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
    for (let i=1; i<=lastDay; i++) {
        let w = weekday[(new Date(year, month-1, i).getDay())];
        temp[w] = (new Date(year, month-1, i)).toLocaleDateString("en-CA", {year:"numeric", month: "2-digit", day:"2-digit"});
        if (i===lastDay || w==="Sat") { //end of every week, assign the week to the result, and reset the week's variables
            result[j]=temp;
            temp = {};
            j++;
        }
    }

    const { user } = useContext(AuthContext);
    const [mm, setMonth] = useState(month);
    const [dataLoaded, setdataLoaded] = useState(false);
    const [birthdays, setBirthdays] = useState({});
    const api_url = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        axios.post(
                    `${api_url}/api/person/birthdays/${user._id}`,
                    { "month" : Number(month) },
                    {"headers": {
                        "Content-Type": "application/json"
                    }}
                ).then((response) => {
                    setBirthdays(response.data);
                    //console.log('+++++++++++++++++++++++++')
                    //console.log(response);
                }).catch((err) => { //error state
                    console.log("ERROR FROM PERSON GET API: ")
            	    console.log(err);
            	});
    } , [dataLoaded, mm, month, user]);

    const displayBirthdays = function ( week, day ) {
        if (week[day]) {
            const persons = birthdays[Number(week[day].split("-")[2])];
            return( persons ? persons.map((p)=>p.name) : [])
        }
        else {
            return []
        }
    }

    const displayCurrentDate = (week, day) => week[day] ? week[day] : "";

    return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        { weekday.map(function(ele){
                            return(<th key={ele}>{ele}</th>)
                        }) }
                    </tr>
                </thead>
                <tbody>
                    { result.map(function(week,w){
                        return (
                            <tr key={w}>
                                <td key={i++}>
                                    <span className="date">{ displayCurrentDate(week,"Sun") }</span>
                                    {displayBirthdays(week,"Sun").map((name)=>{ return(<span className="birthday"><FontAwesomeIcon icon={faGift} />&nbsp;{name}</span>) })}
                                </td>
                                <td key={i++}>
                                    <span className="date">{ displayCurrentDate(week,"Mon") }</span>
                                    {displayBirthdays(week,"Mon").map((name)=>{ return(<span className="birthday"><FontAwesomeIcon icon={faGift} />&nbsp;{name}</span>) })}
                                </td>
                                <td key={i++}>
                                    <span className="date">{ displayCurrentDate(week,"Tues") }</span>
                                    {displayBirthdays(week,"Tues").map((name)=>{ return(<span className="birthday"><FontAwesomeIcon icon={faGift} />&nbsp;{name}</span>) })}
                                </td>
                                <td key={i++}>
                                    <span className="date">{ displayCurrentDate(week,"Wed") }</span>
                                    {displayBirthdays(week,"Wed").map((name)=>{ return(<span className="birthday"><FontAwesomeIcon icon={faGift} />&nbsp;{name}</span>) })}
                                </td>
                                <td key={i++}>
                                    <span className="date">{ displayCurrentDate(week,"Thurs") }</span>
                                    {displayBirthdays(week,"Thurs").map((name)=>{ return(<span className="birthday"><FontAwesomeIcon icon={faGift} />&nbsp;{name}</span>) })}
                                </td>
                                <td key={i++}>
                                    <span className="date">{ displayCurrentDate(week,"Fri") }</span>
                                    {displayBirthdays(week,"Fri").map((name)=>{ return(<span className="birthday"><FontAwesomeIcon icon={faGift} />&nbsp;{name}</span>) })}
                                </td>
                                <td key={i++}>
                                    <span className="date">{ displayCurrentDate(week,"Sat") }</span>
                                    {displayBirthdays(week,"Sat").map((name)=>{ return(<span className="birthday"><FontAwesomeIcon icon={faGift} />&nbsp;{name}</span>) })}
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
          </Table>
        )
}

export default Calendar