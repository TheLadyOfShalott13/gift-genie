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
    const thead = ['name','email','phone','birthday','address','options'];
    const options_name = 'person';
    const tbody  = useFetch(`person/list/${user._id}`)?.data

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View All Persons</h1>
                    <Button className="add-new">
                        <Link to="/CreatePerson">Add New Person</Link>
                    </Button>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default DisplayAllPersonsTabular
