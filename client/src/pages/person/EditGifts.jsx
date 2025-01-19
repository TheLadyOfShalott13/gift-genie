import React, {useContext, useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import { AuthContext } from '../../authContext'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Button, Table} from "react-bootstrap";
import axios from "axios";

const EditGifts = ({ type }) => {

    const { id} = useParams();
    const { user } = useContext(AuthContext);
    const [person, setPerson] = useState([]);
    const [interests, setInterests] = useState([]);
    const [gifts, setGifts] = useState({});
    let [giftList, setGiftList] = useState({});
    const [pageLoad, setPageLoad] = useState(0);
    const [giftRefresh, setgiftRefresh] = useState(false);
    const thead = ['checkbox','interest','name','website','threshold'];
    const LOVED = "LOVED",
        LIKED = "LIKED",
        NEUTRAL = "NEUTRAL",
        DISLIKED = "DISLIKED";
    let row=0,cell=0;

    const api_url = process.env.REACT_APP_BACKEND_URL
    const redirect_url = process.env.REACT_APP_FRONTEND_URL

    useEffect(()=> {
        async function getPerson(){
            axios.get(`${api_url}/api/person/get/${id}`).then((response) => {
                setPerson(response.data);
                if (response.data.length > 0) {
                    response.data.map( function(p) {
                        getInterests(p.interests);
                        setGiftList(JSON.parse(p.gifts));
                    });
                }
                //console.log('P: Display person:')
                //console.log(response.data);
                //getInterests();
            }).catch((err) => { //error state
                console.log("ERROR FROM PERSON GET API: ")
        	    console.log(err);
        	});
        }

        async function getInterests(ids){
            //console.log("I: DISPLAY IDS: ");   
            //console.log(ids);
            axios.post(`${api_url}/api/interest/getMultipleByIds`, {
                "ids": ids
            }, {
                "headers": {
                     'Content-Type': 'application/json'
                }
            }).then((response) => {
                /*console.log("I: DISPLAY INTEREST RESPONSE: ");
                console.log(response.data);*/
                setInterests(response.data);
                if (response.data.length > 0) {
                    response.data.map( (int,key)=> getGifts(int.gifts, int._id, key) );
                }
                //getGifts();
            }).catch((err) => { //error state
                console.log("ERROR FROM INTEREST LIST API: ")
                console.log(err);
            });
        }

        async function getGifts(giftIds,interestId, key){
            axios.post(`${api_url}/api/gift/getMultipleByIds`, {
                    "ids": giftIds
                }, {
                    "headers": {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    const temp = gifts;
                    temp[interestId] = response.data;
                    setGifts(temp);
                    setPageLoad(key+1);
            }).catch((err) => { //error state
                console.log("ERROR FROM GIFT LIST API: ")
        	    console.log(err);
        	});
        }

        if (person.length===0 && pageLoad===0 ) { //refreshed anew
            getPerson().then( () => console.log('DONE'));
        }

        if (giftRefresh) {
            const Fdata = new FormData();
            Fdata.append("gifts", JSON.stringify(giftList));
            fetch(`${api_url}/api/person/update/${id}`, {
                method: "PUT",
                body: Fdata,
            }).then(() => setgiftRefresh(false));
            //console.log("Synced with mongoDB")
        }
    },[id, interests, pageLoad, person, user, gifts, giftList, giftRefresh]);


    const selectGiftType = async (e) => {
        if (typeof giftList === "undefined") {
            giftList = {};
        }
        giftList[e.target.name] = e.target.value;
        setgiftRefresh(true);
        e.target.checked = true
    };

    const getRadioCheckStatus = function(objectId, type) {
        return (typeof giftList === "undefined")? false : (giftList.hasOwnProperty(objectId) && giftList[objectId]===type)
    }

    if (pageLoad === interests.length && interests.length > 0 && Object.keys(gifts).length === interests.length) {
        return (
            <div>
                <Navbar />
                <div className="table-container">
                    <div className="title- and-options">
                        <h1>Select 's Interests:</h1>
                        <Button className="add-new">
                            <Link to={`/ViewPerson/${id}`}>View Person</Link>
                        </Button>
                    </div>
                    <br></br>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {thead.map( function(ele, i) {
                                    return (<th key={i}>{ele}</th>)
                                } )}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                interests.map( function(ele) {
                                    const displayGifts = gifts[ele._id];
                                    return(
                                        displayGifts.map( function (obj) {
                                                return (<tr key={row++}>{
                                                    thead.map( function(index) {
                                                        if (index==='checkbox') {
                                                            obj[index] = <div>
                                                                            <input
                                                                                name={obj['_id']}
                                                                                type="radio"
                                                                                value={LOVED}
                                                                                checked={getRadioCheckStatus(obj['_id'],LOVED)}
                                                                                onChange={selectGiftType}
                                                                            />
                                                                            &nbsp;Loved&nbsp;&nbsp;&nbsp;&nbsp;
                                                                            <input
                                                                                name={obj['_id']}
                                                                                type="radio"
                                                                                value={LIKED}
                                                                                checked={getRadioCheckStatus(obj['_id'],LIKED)}
                                                                                onChange={selectGiftType}
                                                                            />
                                                                            &nbsp;Liked&nbsp;&nbsp;&nbsp;&nbsp;
                                                                            <input
                                                                                name={obj['_id']}
                                                                                type="radio"
                                                                                value={NEUTRAL}
                                                                                checked={getRadioCheckStatus(obj['_id'],NEUTRAL)}
                                                                                onChange={selectGiftType}
                                                                            />
                                                                            &nbsp;Neutral&nbsp;&nbsp;&nbsp;&nbsp;
                                                                            <input
                                                                                name={obj['_id']}
                                                                                type="radio"
                                                                                value={DISLIKED}
                                                                                checked={getRadioCheckStatus(obj['_id'],DISLIKED)}
                                                                                onChange={selectGiftType}
                                                                            />
                                                                            &nbsp;Disliked
                                                                         </div>
                                                        }
                                                        if (index==='interest') {
                                                            obj[index] = ele.name;
                                                        }
                                                        return(<td key={cell++}>{obj[index]}</td>)
                                                    })
                                                }</tr>);
                                            } )
                                    );
                                }
                             )}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <Navbar />
                <div className="table-container">
                    <div className="title- and-options">
                        <h1>Loading...</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditGifts
