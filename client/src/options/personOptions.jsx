import React from 'react'
import "../styles/tables.css"
import axios from 'axios';
import {
    faTrash,
    faEdit,
    faEye,
    faHeart,
    faThumbsUp,
    faThumbsDown,
    faCircleCheck,
    faLightbulb,
    faGift
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {
    const api_url = process.env.REACT_APP_BACKEND_URL
    const trashClick = async () => {
        try {
            await axios.delete(
                `${api_url}/api/person/delete/${id}`,
                { withCredentials: false })
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>

            <Link to={`/ViewPerson/${id}`} >
                <span data-tooltip-id="view-person-helper" data-tooltip-content="View Person">
                    <FontAwesomeIcon className="tableOptions" icon={faEye} />
                </span>
                <Tooltip id="view-person-helper"></Tooltip>
            </Link>

            <Link to={`/EditPerson/${id}`} >
                <span data-tooltip-id="edit-person-helper" data-tooltip-content="Edit Person">
                    <FontAwesomeIcon className="tableOptions" icon={faEdit} />
                </span>
                <Tooltip id="edit-person-helper"></Tooltip>
            </Link>

            <Link to={`/EditPersonsInterests/${id}`} >
                <span data-tooltip-id="edit-interests-helper" data-tooltip-content="Edit Interests">
                    <FontAwesomeIcon className="tableOptions" icon={faLightbulb} />
                </span>
                <Tooltip id="edit-interests-helper"></Tooltip>
            </Link>

            <Link to={`/EditGifts/${id}`} >
                <span data-tooltip-id="select-gifts-helper" data-tooltip-content="Select Gifts">
                    <FontAwesomeIcon className="tableOptions" icon={faGift} />
                </span>
                <Tooltip id="select-gifts-helper"></Tooltip>
            </Link>

            <span data-tooltip-id="delete-person-helper" data-tooltip-content="Delete Person">
                <FontAwesomeIcon className="tableOptions" icon={faTrash} onClick={trashClick}/>
            </span>
            <Tooltip id="delete-person-helper"></Tooltip>
        </div>
    )
}

/*
<Link to={`/EditLovedGifts/${id}`} >
                <span data-tooltip-id="loved-gifts-helper" data-tooltip-content="Loved Gifts">
                    <FontAwesomeIcon className="tableOptions" icon={faHeart} />
                </span>
                <Tooltip id="loved-gifts-helper"></Tooltip>
            </Link>

            <Link to={`/EditLikedGifts/${id}`} >
                <span data-tooltip-id="liked-gifts-helper" data-tooltip-content="Liked Gifts">
                    <FontAwesomeIcon className="tableOptions" icon={faThumbsUp} />
                </span>
                <Tooltip id="liked-gifts-helper"></Tooltip>
            </Link>

            <Link to={`/EditNeutralGifts/${id}`} >
                <span data-tooltip-id="neutral-gifts-helper" data-tooltip-content="Neutral Gifts">
                    <FontAwesomeIcon className="tableOptions" icon={faCircleCheck} />
                </span>
                <Tooltip id="neutral-gifts-helper"></Tooltip>
            </Link>

            <Link to={`/EditHatedGifts/${id}`} >
                <span data-tooltip-id="hated-gifts-helper" data-tooltip-content="Hated Gifts">
                    <FontAwesomeIcon className="tableOptions" icon={faThumbsDown} />
                </span>
                <Tooltip id="hated-gifts-helper"></Tooltip>
            </Link>
 */

export default Options;