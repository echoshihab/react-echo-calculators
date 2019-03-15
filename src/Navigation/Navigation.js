import React from 'react';
import {Link} from 'react-router-dom'

const navigation = () => {
    return (

        <ul>
            <li>
                <Link to="/">HOME</Link>
            </li>
            <li>
                <Link to="/svco">SV & CO</Link>
            </li>
            <li>
                <Link to="/rvsp">RVSP</Link>
            </li>
            <li>
                <Link to="/qpqs">Qp/Qs</Link>
            </li>
            <li>
                <Link to="/pisamr">PISA(MR)</Link>
            </li>
            <li>
                <Link to="/lapmr">LAP(MR)</Link>
            </li>
            <li>
                <Link to="/avavti">AVA(VTI)</Link>
            </li>
            <li>
                <Link to="/lavolume">LA Vol</Link>
            </li>
              <li>
                <Link to="/Pisams">PISA(MS)</Link>
            </li>
        </ul>



        )
}

export default navigation;
