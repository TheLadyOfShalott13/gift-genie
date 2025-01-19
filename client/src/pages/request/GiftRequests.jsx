import React, {useContext} from 'react'
import useFetch from '../../useFetch'
import { Link } from "react-router-dom";
import { AuthContext } from '../../authContext'
import MainTable from '../../components/ListAllObjectsTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Button} from "react-bootstrap";

const DisplayAllPersonsTabular = ({ type }) => {

    const { user } = useContext(AuthContext)
    const thead = ['giftee_name','gift_name','status','date_of_purchase','date_of_delivery','options'];
    const options_name = 'giftRequest';
    const tbody  = useFetch(`giftRequest/status/purchased`)?.data

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View All Active Gift Requests</h1>
                    <Button className="add-new">
                        <Link to="/CreateGiftRequest">Add New Gift Request</Link>
                    </Button>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default DisplayAllPersonsTabular
