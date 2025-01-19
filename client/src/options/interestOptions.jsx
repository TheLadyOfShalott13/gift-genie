import React from 'react'
import "../styles/tables.css"
import axios from 'axios';
import { faTrash, faEdit, faEye, faGift } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {
    const api_url = process.env.REACT_APP_BACKEND_URL
    const trashClick = async () => {
        try {
            await axios.delete(
                `${api_url}/api/interest/delete/${id}`,
                { withCredentials: false })
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Link to={`/ViewInterest/${id}`} >
                <span data-tooltip-id="view-person-helper" data-tooltip-content="View Interest">
                    <FontAwesomeIcon className="tableOptions" icon={faEye} />
                </span>
                <Tooltip id="view-person-helper"></Tooltip>
            </Link>

            <Link to={`/EditInterest/${id}`} >
                <span data-tooltip-id="edit-person-helper" data-tooltip-content="Edit Interest">
                    <FontAwesomeIcon className="tableOptions" icon={faEdit} />
                </span>
                <Tooltip id="edit-person-helper"></Tooltip>
            </Link>

            <Link to={`/EditInterestsGifts/${id}`} >
                <span data-tooltip-id="select-gifts-helper" data-tooltip-content="Select Gifts">
                    <FontAwesomeIcon className="tableOptions" icon={faGift} />
                </span>
                <Tooltip id="select-gifts-helper"></Tooltip>
            </Link>
            
            <span data-tooltip-id="delete-interest-helper" data-tooltip-content="Delete Interest">
                <FontAwesomeIcon className="tableOptions" icon={faTrash} onClick={trashClick} />
            </span>
            <Tooltip id="delete-interest-helper"></Tooltip>
        </div>
    )
}

export default Options;