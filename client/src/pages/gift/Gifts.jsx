import React, {useContext} from 'react'
import useFetch from '../../useFetch'
import { Link } from "react-router-dom";
import { AuthContext } from '../../authContext'
import MainTable from '../../components/ListAllObjectsTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Button} from "react-bootstrap";

const DisplayAllGiftsTabular = ({ type }) => {

    const { user } = useContext(AuthContext)
    const thead = ['name','website','threshold','options'];
    const options_name = 'gift';
    const tbody  = useFetch(`gift/list/${user._id}`)?.data

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View All Gifts</h1>
                    <Button className="add-new">
                        <Link to="/CreateGift">Add New Gift</Link>
                    </Button>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default DisplayAllGiftsTabular
