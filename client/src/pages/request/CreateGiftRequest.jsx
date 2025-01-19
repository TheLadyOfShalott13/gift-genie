import React, {useContext, useEffect, useState} from "react";
import Navbar from '../../components/Navbar'
import Select from 'react-select'
import { AuthContext } from "../../authContext";
import "../../styles/forms.css"
import axios from "axios";

const CreateGift = () => {

    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const [giftOptions, setgiftOptions] = useState([]);
    const [giftOptionsLoaded, setgiftOptionsLoaded] = useState(false);
    const [gifteeOptions, setgifteeOptions] = useState([]);
    const [gifteeOptionsLoaded, setgifteeOptionsLoaded] = useState(false);
    const { user } = useContext(AuthContext);
    const statusOptions = [{ value: "purchased", label: "purchased"},{ value: "received", label: "received"},{ value: "completed", label: "complete"}];

    const api_url = process.env.REACT_APP_BACKEND_URL
    const redirect_url = process.env.REACT_APP_FRONTEND_URL

    useEffect(()=>{

        async function getGiftees(){
            axios.get(`${api_url}/api/person/list/${user._id}`).then((response) => {
                    if (response.data.length > 0) {
                        response.data.map( function(p,i) {
                            gifteeOptions[i] = { value: p._id, label: p.name}
                        });
                        setgifteeOptionsLoaded(true);
                    }
                    getGiftOptions();
                }).catch((err) => { //error state
                    console.log("ERROR FROM PERSON GET API: ")
            	    console.log(err);
            	});
        }

        async function getGiftOptions() {
            axios.get(`${api_url}/api/gift/list/${user._id}`).then((response) => {
                    if (response.data.length > 0) {
                        response.data.map( function(g,k) {
                            giftOptions[k] = { value: g._id, label: g.name}
                        });
                        setgiftOptionsLoaded(true);
                    }
                    //console.log('P: Display person:')
                    //console.log(response.data);
                    //getInterests();
                }).catch((err) => { //error state
                    console.log("ERROR FROM PERSON GET API: ")
            	    console.log(err);
            	});
        }

        getGiftees();
    },[giftOptions, gifteeOptions, user]);

    const handleChange = (e) => {
        setInfo(
            (prev) => ({
                ...prev, [e.target.id]: e.target.value
            }
            ));
        //console.log(data)
    };

    const handleClick = async(e) => {
        e.preventDefault();
        info['user']=user._id;
        try {
            await fetch(`${api_url}/api/giftRequest/create`, {
                method: "POST",
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            window.location.assign(`${redirect_url}/GiftRequests`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="newFormContainer">
            <Navbar />
            <div className="cpContainer">
                <div className="formContainer">
                    <h1>Add A Gift Request</h1>
                    <div className="inputContainer">

                        <div className="input">
                            <label htmlFor="website">Who are you buying a present for?</label>
                            <Select options={gifteeOptions} onChange={ (e)=> info["giftee"] = e.value } id="giftee"></Select>
                        </div>

                        <div className="input">
                            <label htmlFor="name">What are you getting them?</label>
                            <Select options={giftOptions} onChange={ (e)=> info["gift"] = e.value } id="gift"></Select>
                        </div>

                        <div className="input">
                            <label htmlFor="tracking_link">Tracking Link</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="tracking_link"
                                placeholder="Enter tracking link"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="price">Price</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                min="0"
                                step="0.01"
                                id="price"
                                placeholder="Enter price"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="status">Status</label>
                            <Select options={statusOptions} onChange={ (e)=> info["status"] = e.value } id="status"></Select>
                        </div>

                        <div className="input">
                            <label htmlFor="date_of_purchase">Date of Purchase</label>
                            <input
                                onChange={handleChange}
                                type="date"
                                id="date_of_purchase"
                                placeholder="Enter date of purchase"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="date_of_delivery">Date of Delivery</label>
                            <input
                                onChange={handleChange}
                                type="date"
                                id="date_of_delivery"
                                placeholder="Enter date of delivery"
                            />
                        </div>

                        <button className="button"
                            onClick={handleClick} type="submit">
                            Save New Entry
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateGift
