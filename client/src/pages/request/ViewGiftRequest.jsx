import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../../components/Navbar'
import VerticalTable from '../../components/ViewSingleObjectTable'
import "../../styles/tables.css"
import { useParams } from "react-router-dom";

const ViewGift = ({params}) => {

	const {id} = useParams();
	const attributes = ['giftee_name','gift_name','tracking_link','price','status','date_of_purchase','date_of_delivery','options'];
	const [responseRecieved, setResponseStatus] = useState(false);
	const [data, setData] = useState([]);
	const option_name = 'giftRequest';

	const api_url = process.env.REACT_APP_BACKEND_URL
	const redirect_url = process.env.REACT_APP_FRONTEND_URL

	useEffect(() => {
		const loadData = async () => {
			// Till the data is fetch using API
			// the Loading page will show.
			setResponseStatus(false);

			// Await make wait until that
			// promise settles and return its result
			axios.get(`${api_url}/api/giftRequest/get/${id}`).then((response) => {
					setData(response.data);
					setResponseStatus(true);
				}).catch((err) => {
					setResponseStatus(true);		//error state
				});
			console.log('Completed');
		};

		// Call the function
		loadData();
	}, []);

	return (
		<div className="table-container">
			<Navbar />
			<h1>View A Gift Request</h1>
			{	responseRecieved ? data.length>0 ? <VerticalTable attributes={attributes} data={data} option={option_name} /> : <h1 className="feedback-header">Cannot Find Item</h1> : <h1 className="feedback-header">Loading Table</h1> }
        </div>
    )
}

export default ViewGift
