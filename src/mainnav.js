import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.css';



const svcoDesc = <em>Stroke Volume(SV) & Cardiac Output(CO)</em>;
const rvspDesc = <em>Right Ventricle Systolic Pressure (RVSP)</em>;
const qpqsDesc = <em>Shunt Ratio (Qp/Qs)</em>;
const pisamrDesc = <em>Quantification of Mitral Regurgitation (MR) via Proximal Isovelicty Surface Area(PISA)</em>;
const lapmrDesc = <em>Left Atrial Pressure(LAP) in presence of Mitral Regurgitation(MR)</em>;
const avavtiDesc = <em>Aortic Valve Area(AVA) using Velocity Time Integrals(VTI)</em>;
const lavolumeDesc = <em>Left Atrial (LA) Volume</em>;
const pisamsDesc = <em>Quantification of Mitral Stenosis(MS) via Proximal Isovelicty Surface Area(PISA)</em>;


//links for main home page
class mainNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [
            { id: 1, link: '/svco', title:'SV & CO', desc: svcoDesc},
            { id: 2, link: '/rvsp', title: 'RVSP', desc: rvspDesc },
            { id: 3, link: '/qpqs', title: 'Qp/Qs', desc:qpqsDesc},
            { id: 4, link: '/pisamr', title: 'PISA(MR)', desc: pisamrDesc },
            { id: 5, link: '/lapmr',   title: 'LAP(MR)', desc: lapmrDesc},
            { id: 6, link: '/avavti',  title: 'AVA(VTI)', desc:avavtiDesc},
            { id: 7, link: '/lavolume',title: 'LA Vol', desc:lavolumeDesc},
            { id: 8, link: '/pisams', title: 'PISA(MS)', desc:pisamsDesc}
            ],
            descFlag: false ,
            description : ''     
        };

        this.onHoverHandler = this.onHoverHandler.bind(this);
        this.onLeaveHandler = this.onLeaveHandler.bind(this);
    }

    onHoverHandler = (id) => {
        const linkIndex = this.state.links.findIndex(l => {
            return l.id === id;
        });
        const newLink = {...this.state.links[linkIndex]};
        this.setState({descFlag: true, description: newLink.desc});

    }

    onLeaveHandler = () => {
        this.setState({descFlag: false})

    }

    render(){
        let showDesc = null;
        const {links, descFlag, description} = this.state;  //destructuring

        if (descFlag) {
            showDesc = description; 
        }
        else {
            showDesc = '';
        }

        let linkFields = links.map(linkitem =>{
                    return <Link
                             to={linkitem.link}
                             onMouseOver={()=>this.onHoverHandler(linkitem.id)}
                             onMouseLeave= {this.onLeaveHandler}
                             key={linkitem.id}
                            >
                            {linkitem.title}
                            </Link>

                });



        return (
        <span>
        <h2>Cardiac Ultrasound/Echocardiography Calculators</h2>
      
        <table className="center">
            <tbody>
            <tr>
                <td> {linkFields[0]}</td>
                <td> {linkFields[1]} </td>
            </tr>
            <tr>
            <td>  {linkFields[2]} </td>
                <td> {linkFields[3]} </td>
            </tr>
            <tr>
                <td> {linkFields[4]}</td>
                <td> {linkFields[5]} </td>
            </tr>
            <tr>
                <td> {linkFields[6]} </td>
                <td> {linkFields[7]} </td>
            </tr>
            </tbody>
        </table>
        <h4> {showDesc} </h4>
        </span>

        );
    }
}


export default mainNav;
