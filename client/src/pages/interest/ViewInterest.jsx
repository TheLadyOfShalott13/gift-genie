import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../../components/Navbar'
import VerticalTable from '../../components/ViewSingleObjectTable'
import "../../styles/tables.css"
import { useParams } from "react-router-dom";

const ViewInterest = ({params}) => {

    const {id} = useParams();
    const attributes = ['_id','name','category'];
	const [responseRecieved, setResponseStatus] = useState(false);
	const [data, setData] = useState([]);
	const option_name = 'interest';

	const api_url = process.env.REACT_APP_BACKEND_URL
	const redirect_url = process.env.REACT_APP_FRONTEND_URL

	useEffect(() => {
		const loadData = async () => {
			// Till the data is fetch using API
			// the Loading page will show.
			setResponseStatus(false);

			// Await make wait until that
			// promise settles and return its result
			axios.get(`${redirect_url}/interest/get/${id}`).then((response) => {
		      	setData(response.data);
		    	setResponseStatus(true);
		    }).catch((err) => {
				setResponseStatus(true);		//error state
		 	});
		};

		// Call the function
		loadData().then();
	}, [id]);

    return (
        <div className="table-container">
            <Navbar />
			<h1>View An Interest</h1>
			{	responseRecieved ? data.length>0 ? <img className="viewImage" src={`${api_url}/uploads/${data[0].imgName}`} alt={data[0].imgName} ></img> : <h1 className="feedback-header">Cannot Find Image</h1> : <h1 className="feedback-header">Loading Image</h1> }
			{	responseRecieved ? data.length>0 ? <VerticalTable attributes={attributes} data={data} option={option_name} /> : <h1 className="feedback-header">Cannot Find Item</h1> : <h1 className="feedback-header">Loading Table</h1> }
        </div>
    )
}

export default ViewInterest
