import React, {Suspense, useContext, useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import { AuthContext } from '../../authContext'
import MainTable from '../../components/ListAllObjectsTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Button} from "react-bootstrap";
import axios from "axios";

const EditPersonsInterests = ({ type }) => {

    const { id} = useParams();
    const { user } = useContext(AuthContext);
    const [person, setPerson] = useState([]);
    const [interests, setInterests] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [pageLoad, setPageLoad] = useState(false);
    const thead = ['checkbox','name','category'];
    const options_name = 'interest';

    const api_url = process.env.REACT_APP_BACKEND_URL
    const redirect_url = process.env.REACT_APP_FRONTEND_URL

    useEffect(()=> {
        async function getPerson(){
            axios.get(`${api_url}/api/person/get/${id}`).then((response) => {
                setPerson(response.data);
                setRefresh(false);
            }).catch((err) => { //error state
                console.log("ERROR FROM PERSON GET API: ")
        	    console.log(err);
        	});
        }

        async function getInterests(){
            axios.get(`${api_url}/api/interest/list/${user._id}`).then((response) => {
                setInterests(response.data);
                setPageLoad(true);
            }).catch((err) => { //error state
                console.log("ERROR FROM INTEREST LIST API: ")
        	    console.log(err);
        	});
        }

        //console.log("+++++++++Interests: ");
        //console.log(selected);

        //console.log("Refresh: ");
        //console.log(refresh);

            if (person.length===0 && refresh ) { //refreshed anew
                getPerson().then(() => getInterests().then() );
            }
    },[id, person, refresh, user]);

    if (pageLoad) {
        const tbody = interests;
        return (
            <div>
                <Navbar />
                <div className="table-container">
                    <div className="title- and-options">
                        <h1>Select {person[0]['name']}'s Interests:</h1>
                        <Button className="add-new">
                            <Link to={`/ViewPerson/${id}`}>View Person</Link>
                        </Button>
                    </div>
                    <br></br>
                    <Suspense fallback={<div>Loading...</div>}>
                        <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}} object="person" attribute="interests" formjson={false} />
                    </Suspense>
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

export default EditPersonsInterests
