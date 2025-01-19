import React, {Suspense} from 'react'
import { Table } from 'react-bootstrap';

const VerticalTable = ({ attributes, data, option }) => {

    const OptComponent = React.lazy(() => import('../options/'+option+'Options.jsx'));
    const obj = data[0]
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {attributes.map( function(ele,i) {
                    return (<tr key={i}>
                                <td>{ele}</td>
                                <td>{ele==='options'? <Suspense fallback={<div>Loading...</div>}><OptComponent id={obj._id} /></Suspense> : obj[ele]}</td>
                            </tr>)
                } )}
            </tbody>
      </Table>
    )
}

export default VerticalTable