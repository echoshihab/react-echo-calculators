import React from 'react';


const result = (props) => {
    return(

        <div className='calcResult'>
        <table>
                <tbody>
                    <tr>
                            <td>  <b>{props.legend}: </b> </td>
                            <td> {props.formula} </td>
                            <td> Calculated Value: <b>{props.value}</b> {props.unit} </td>


                    </tr>
                </tbody>

            </table> </div>)

}


export default result;
