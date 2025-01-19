import React, { useState, useEffect } from "react";
import Navbar from '../../components/Navbar'
import axios from "axios";
import "../../styles/forms.css"
import { useParams } from "react-router-dom";

const EditGift = ( {params} ) => {

    const {id} = useParams();
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const [responseRecieved, setResponseStatus] = useState(false);
	const [data, setData] = useState([]);

    const api_url = process.env.REACT_APP_BACKEND_URL
    const redirect_url = process.env.REACT_APP_FRONTEND_URL

    useEffect(() => {
		const loadData = async () => {
			// Till the data is fetch using API
			// the Loading page will show.
			setResponseStatus(false);

			// Await make wait until that
			// promise settles and return its result
			axios.get(`${redirect_url}/gift/get/${id}`).then((response) => {
		      	setData(response.data);
		    	setResponseStatus(true);
		    }).catch((err) => {
				setResponseStatus(true);		//error state
		 	});
			console.log('Completed');
		};

		// Call the function
		loadData();
	}, []);

    const handleChange = (e) => {
        setInfo(
            (prev) => ({
                ...prev, [e.target.id]: e.target.value
            }
            ));
    };

    const handleClick = async(e) => {
        e.preventDefault();
        const Fdata = new FormData();
        Object.keys(info).forEach((key)=> {
            Fdata.append(key,info[key]);
            //console.log('DATA VALUE OF '+ key + ': ' + data.get(key))
        });
        if (file){
            Fdata.append("img",file);
            Fdata.append("imgName",file.name);
        }
        try {
            await fetch(`${api_url}/api/gift/update/${id}`, {
                method: "PUT",
                body: Fdata,
            });
            window.location.assign(`${redirect_url}/gifts`);
        } catch (err) {
            console.log(err);
        }
    }


    if (responseRecieved) {
        if (data.length>0) {
            return (
                <div className="newFormContainer">
                    <Navbar />
                    <div className="cpContainer">
                        <div className="formContainer">
                            <h1>Edit A Gift: {data[0]._id}</h1>
                            <div className="inputContainer">
                                <div className="input">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        onChange={handleChange}
                                        value={info.name? info.name : data[0].name}
                                        type="text"
                                        id="name"
                                        placeholder="Enter Name"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="website">Website</label>
                                    <input
                                        onChange={handleChange}
                                        value={info.website? info.website : data[0].website}
                                        type="text"
                                        id="website"
                                        placeholder="Enter website"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="location">Threshold</label>
                                    <input
                                        onChange={handleChange}
                                        value={info.threshold? info.threshold : data[0].threshold}
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        id="threshold"
                                        placeholder="Enter threshold"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="img">Image</label>
                                    <input
                                        type="file"
                                        accept=".png,.jpeg,.jpg"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        id="img"
                                    />
                                    <span className="imageName"><b>Current File:</b> {(data[0].imgName)?data[0].imgName:"No file selected"}</span>
                                </div>

                                <button className="button"
                                    onClick={handleClick} type="submit">
                                    Save New Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (<div className="newFormContainer">
                    <Navbar />
                    <div className="cpContainer">
                        <div className="formContainer">
                            <h1>Edit A Gift</h1>
                            <h1 className="feedback-header">Cannot Find Item</h1>
                        </div>
                    </div>
            </div>)
        }
    }
    else {
        return (<div className="newFormContainer">
                    <Navbar />
                    <div className="cpContainer">
                        <div className="formContainer">
                            <h1>Edit A Gift</h1>
                            <h1 className="feedback-header">Loading Form</h1>
                        </div>
                    </div>
            </div>)
    }
}

export default EditGift
