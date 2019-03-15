import React, { Component } from 'react';
import './App.css';
import Input from './Input/Input';
import Result from './Result/Result';
import Calculate from './Calculate/Calculate';
import Navigation from './Navigation/Navigation'


//html entities specific to this component
//const alphadegree = <span> &alpha; &#x2da; </span>
const degree = <span>  &#x2da; </span>
const cmunit = <span> cm<sup>2</sup></span>

//legends specific to this component
const rLegend = <em>PISA Radius (r)</em>;
const vrLegend = <em>Aliasing Velocity at r (Vr)</em>;
const vmaxLegend = <em>Peak Mitral Stenosis Velocity (Vmax)</em>;
const alphaLegend = <em>Angle between Mitral Valve Leaflets (&alpha;) </em>;
const mvaLegend = <em>Mitral Valve Area(MVA)</em>;


//formulas specific to this component
const mvaFormula = <em>2 x &pi; x r<sup>2</sup> x (V<sub>r</sub>/V<sub>max</sub>) x &alpha; &#x2da;/ 180 &#x2da;</em>;



class Pisams extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
            { id: 1, unit: ' cm', error:'', errorStatus: true, value:'', legend: rLegend},
            { id: 2, unit: ' cm/s', error:'', errorStatus: true, value:'', legend: vrLegend},
            { id: 3, unit: ' cm/s', error:'', errorStatus: true, value: '', legend: vmaxLegend},
            { id: 4, unit: degree, error:'', errorStatus: true, value: '', legend: alphaLegend},
            ],
            results: [
            {id: 5, value:'', formula: mvaFormula, unit: cmunit, legend: mvaLegend  },
            ],

            resultsFlag: false,
        };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    }

//handleOnChange displays validation message for all input fields
    handleOnChange = (event, id) => {
        let tester= /^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$/.test(event.target.value)

        const fieldIndex = this.state.fields.findIndex(f => {
            return f.id === id;
        });

        const newFields = this.state.fields.slice();
        const newField = {...this.state.fields[fieldIndex]};

        if (!tester) {
            newField.error = <span className='invalid'>Invalid Input</span>;
            newFields[fieldIndex] = newField;
            this.setState({fields: newFields});
        }
        else {
            newField.errorStatus = false;
            newField.error = <span className='valid'>Valid Input</span>;
            newField.value = event.target.value;
            newFields[fieldIndex] = newField;
            this.setState({fields: newFields});


        }

    };

    handleOnClick = () => {
        const newFields = this.state.fields.slice();
        const newResults = this.state.results.slice();
        const errorChecker = newFields.some((newField) => newField.errorStatus === true);
        if (errorChecker){
            return null;
        }
        else {

            const r = parseFloat(newFields[0].value);
            const vr = parseFloat(newFields[1].value);
            const vmax = parseFloat(newFields[2].value);
            const alpha = parseFloat(newFields[3].value);

            const mva = ((2 * Math.PI * (r**2))* (vr/vmax)*(alpha/180)).toFixed(2);


            newResults[0].value = mva;


            this.setState({fields: newFields, results:newResults, resultsFlag: true});



        }


    }

  render() {
    let calcResults = null;
    const {fields, resultsFlag, results} = this.state;  //destructuring
    if (resultsFlag) {
         calcResults = (
            <div>
            {results.map(result =>{
                return <Result
                        key = {result.id}
                        value = {result.value}
                        formula = {result.formula}
                        unit = {result.unit}
                        legend = {result.legend}
                        />

            })}


            </div>

            )
    }
    let inputfield = (

    <div className='calcResult'>
    <table>
        <tbody>
    {fields.map(field => {
        return (

                <Input
                unit={field.unit}
                onChange={(event)=>this.handleOnChange(event,field.id)}
                error = {field.error}
                key = {field.id}
                value = {field.value}
                legend = {field.legend}
                />

                )
    } )}
        </tbody>
    </table>
    </div>);

    return (
      <div className="stateComponent">
      <Navigation />
         <b>Quantification of Mitral Stenosis(MS) via Proximal Isovelicty Surface Area(PISA) </b>
         {inputfield}
         <Calculate click={this.handleOnClick}/>
         {calcResults}
      </div>
    );
  }
}


export default Pisams;
