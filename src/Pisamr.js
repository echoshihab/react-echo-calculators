import React, { Component } from 'react';
import './App.css';
import Input from './Input/Input';
import Result from './Result/Result';
import Calculate from './Calculate/Calculate';
import Navigation from './Navigation/Navigation'

//formulas specific to this component
const vfrFormula = <em>2 x &pi; x r<sup>2</sup> x V<sub>r</sub></em>;
const eroFormula = <em>VFR/V<sub>max</sub></em>;
const rvolFormula = <em> ERO x VTI </em>;
const unitERO = <span>mm<sup>2</sup></span>

//legends specific to this component
const rLegend = <em>Mitral Regurgitation Radius (r)</em>;
const vrLegend = <em>Aliasing Velocity at r (Vr)</em>;
const vmaxLegend = <em>Peak Mitral Regurgitation Velocity (Vmax)</em>;
const vtiLegend = <em>Mitral Regurgitation Velocity Time Integral (VTI)</em>;
const vfrLegend = <em>Volume Flow Rate (VFR)</em>;
const eroLegend = <em>Effective Regurgitant Orifice (ERO)</em>;
const rvolLegend = <em>Regurgitant Volume (RVOL)</em>;




class Pisamr extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
            { id: 1, unit: ' cm', error:'', errorStatus: true, value:'', legend: rLegend},
            { id: 2, unit: ' cm/s', error:'', errorStatus: true, value:'', legend: vrLegend},
            { id: 3, unit: ' cm/s', error:'', errorStatus: true, value: '', legend: vmaxLegend},
            { id: 4, unit: ' cm', error:'', errorStatus: true, value: '', legend: vtiLegend},
            ],
            results: [
            {id: 4, value:'', formula: vfrFormula, unit:'mL/s', legend: vfrLegend },
            {id: 5, value:'', formula: eroFormula, unit:unitERO, legend: eroLegend },
            {id: 6, value:'', formula: rvolFormula, unit:'mL/beat', legend: rvolLegend}
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
            const vti = parseFloat(newFields[3].value);

            const vfr = (2 * Math.PI * ((r)**2)* vr).toFixed(2);
            const ero = (vfr/vmax).toFixed(2);
            const rvol = (ero*vti).toFixed(2);

            newResults[0].value = vfr;
            newResults[1].value = ero;
            newResults[2].value = rvol;

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
         <b>Quantification of Mitral Regurgitation (MR) via Proximal Isovelicty Surface Area(PISA) </b>
         {inputfield}
         <Calculate click={this.handleOnClick}/>
         {calcResults}
      </div>
    );
  }
}


export default Pisamr;
