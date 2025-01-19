import React, {Suspense, useContext} from 'react'
import useFetch from '../../useFetch'
import {Link, useParams} from "react-router-dom";
import { AuthContext } from '../../authContext'
import MainTable from '../../components/ListAllObjectsTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Button} from "react-bootstrap";

const EditInterestsGifts = ({ type }) => {

    const {id} = useParams();
    const { user } = useContext(AuthContext)
    const thead = ['checkbox','name','website','threshold'];
    const options_name = 'gift';
    const object  = useFetch(`/interest/get/${id}`)?.data[0] //current object info
    const tbody  = useFetch(`/gift/list/${user._id}`)?.data


    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title- and-options">
                    <h1>Edit Interest Related Gifts</h1>
                    <Button className="add-new">
                        <Link to={`/ViewInterest/${id}`}>View Interest Details</Link>
                    </Button>
                </div>
                <br></br>
                <h3><u>Gifts for {object?.name}:</u></h3>
                <Suspense fallback={<div>Loading...</div>}>
                    <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}} object="interest" attribute="gifts" />
                </Suspense>
            </div>
        </div>
    )
}

export default EditInterestsGifts
