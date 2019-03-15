import React, { Component } from 'react';
import './App.css';
import Calculate from './Calculate/Calculate';
import Navigation from './Navigation/Navigation';
import Input from './Input/Input';
import Result from './Result/Result';


//legends
const lvotLegend = <em>Left Ventricular Outflow Tract Diameter (LVOT) </em>
const VTILegend =<em> Velocity Time Integral - Subvalvular (VTI) </em>
const hrLegend = <em> Heart Rate (HR) </em>
const svLegend = <em> Stroke Volume (SV)</em>
const coLegend = <em> Cardiac Output (CO) </em>


//formulas
const svFormula = <em> &pi; x (LVOT/2)<sup>2</sup> x LVOT VTI</em>;
const coFormula = <em>SV/HR</em>;



class Svco extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fields: [
            { id: 1, unit: ' cm', error:'', errorStatus: true, value:'', legend: lvotLegend },
            { id: 2, unit: ' cm', error:'', errorStatus: true, value:'', legend: VTILegend },
            { id: 3, unit: ' bpm', error:'', errorStatus: true, value: '', legend: hrLegend }
            ],
            results: [
            {id: 4, legend: svLegend , value:'', formula: svFormula, unit:'ml' },
            {id: 5, legend: coLegend , value:'', formula: coFormula, unit:'ml' }
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
            const lvot = parseFloat(newFields[0].value);
            const lvotVTI = parseFloat(newFields[1].value);
            const hr = parseFloat(newFields[2].value);

            const strokeVolume = (Math.PI * ((lvot/2)**2)* lvotVTI).toFixed(2);
            const cardiacOutput = ((strokeVolume * hr)).toFixed(2);
            newResults[0].value = strokeVolume
            newResults[1].value = cardiacOutput
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
         <b>Stroke Volume(SV) & Cardiac Output(CO) </b>
         {inputfield}
         <Calculate click={this.handleOnClick}/>
         {calcResults}
      </div>
    );
  }
}


export default Svco;
