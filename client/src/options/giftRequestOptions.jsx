import React from 'react'
import "../styles/tables.css"
import axios from 'axios';
import { faCircleCheck, faMapLocation, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {
    const api_url = process.env.REACT_APP_BACKEND_URL
    const completeRequest = async () => {
        try {
            await axios.put(
                `${api_url}/api/giftRequest/update/${id}`,
                { status: "complete" },
                {
                    "headers": {
                        'Content-Type': "application/json"
                    }
                }
            ).then((res)=>console.log(res))
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Link to={`/ViewGiftRequest/${id}`} >
                <span data-tooltip-id="view-gift-req-helper" data-tooltip-content="View Gift Request">
                    <FontAwesomeIcon className="tableOptions" icon={faEye} />
                </span>
                <Tooltip id="view-gift-req-helper"></Tooltip>
            </Link>

            <Link to={`/TrackGiftRequest/${id}`} >
                <span data-tooltip-id="edit-gift-req-helper" data-tooltip-content="Track Gift Request">
                    <FontAwesomeIcon className="tableOptions" icon={faMapLocation} />
                </span>
                <Tooltip id="edit-gift-req-helper"></Tooltip>
            </Link>

            <span data-tooltip-id="complete-gift-req-helper" data-tooltip-content="Complete Gift Request">
                <FontAwesomeIcon className="tableOptions" icon={faCircleCheck} onClick={completeRequest} />
            </span>
            <Tooltip id="complete-gift-req-helper"></Tooltip>
        </div>
    )
}

export default Options;