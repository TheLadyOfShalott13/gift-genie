import React from 'react'
import "../styles/tables.css"
import axios from 'axios';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {
    const api_url = process.env.REACT_APP_BACKEND_URL
    const trashClick = async () => {
        try {
            await axios.delete(
                `${api_url}/api/gift/delete/${id}`,
                { withCredentials: false })
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Link to={`/ViewGift/${id}`} >
                <span data-tooltip-id="view-gift-helper" data-tooltip-content="View Gift">
                    <FontAwesomeIcon className="tableOptions" icon={faEye} />
                </span>
                <Tooltip id="view-gift-helper"></Tooltip>
            </Link>

            <Link to={`/EditGift/${id}`} >
                <span data-tooltip-id="edit-gift-helper" data-tooltip-content="Edit Gift">
                    <FontAwesomeIcon className="tableOptions" icon={faEdit} />
                </span>
                <Tooltip id="edit-gift-helper"></Tooltip>
            </Link>

            <span data-tooltip-id="delete-gift-helper" data-tooltip-content="Delete Gift">
                <FontAwesomeIcon className="tableOptions" icon={faTrash} onClick={trashClick} />
            </span>
            <Tooltip id="delete-gift-helper"></Tooltip>
        </div>
    )
}

export default Options;