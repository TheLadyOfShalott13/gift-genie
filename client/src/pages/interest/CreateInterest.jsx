import React, { useContext, useState } from "react";
import Navbar from '../../components/Navbar'
import { AuthContext } from "../../authContext";
import "../../styles/forms.css"

const CreateInterest = () => {

    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const { user } = useContext(AuthContext);

    const api_url = process.env.REACT_APP_BACKEND_URL
    const redirect_url = process.env.REACT_APP_FRONTEND_URL

    const handleChange = (e) => {
        setInfo(
            (prev) => ({
                ...prev, [e.target.id]: e.target.value
            }
            ));
    };

    const handleClick = async(e) => {
        e.preventDefault();
        if (file) {
            const data = new FormData();
            Object.keys(info).forEach((key)=> {
                data.append(key,info[key]);
                //console.log('DATA VALUE OF '+ key + ': ' + data.get(key))
            });
            data.append("img",file);
            data.append("imgName",file.name);
            data.append("user", user._id);
            try {
                await fetch(`${api_url}/api/interest/create`, {
                    method: "POST",
                    body: data,
                });
                window.location.assign(`${redirect_url}/interests`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="newFormContainer">
            <Navbar />
            <div className="cpContainer">
                <div className="formContainer">
                    <h1>Add A New Interest</h1>
                    <div className="inputContainer">
                        <div className="input">
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="name"
                                placeholder="Enter Name"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="category">Category</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="category"
                                placeholder="Enter category"
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

export default CreateInterest
