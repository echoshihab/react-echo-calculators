import React, { Component } from 'react';
import './App.css';
import Input from './Input/Input';
import Result from './Result/Result';
import Calculate from './Calculate/Calculate';
import Navigation from './Navigation/Navigation'


//legends
const mrvmaxLegend = <em> Mitral Regurgitation Peak Velocity (MR Vmax) </em>
const sbpLegend = <em> Systolic Blood Pressure (SBP) </em>
const lapLegend = <em> Left Atrial Pressure (LAP) </em>


//formula
const lapFormula = <em> SBP - 4(MRV<sub>Max</sub>)<sup>2</sup></em>;




class Lapmr extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
            { id: 1, unit: ' m/s' , error:'', errorStatus: true, value:'', legend: mrvmaxLegend},
            { id: 2, unit: ' mmHG', error:'', errorStatus: true, value:'', legend: sbpLegend},
            ],
            results: [
            {id: 3, value:'', formula: lapFormula, unit:'mmHG', legend: lapLegend },
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
            const mrVmax = parseFloat(newFields[0].value);
            const sbp = parseFloat(newFields[1].value);

            const lap = sbp - 4*(mrVmax)**2
            newResults[0].value = lap;

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
         <b>Left Atrial Pressure(LAP) in presence of Mitral Regurgitation(MR) </b>
         {inputfield}
         <Calculate click={this.handleOnClick}/>
         {calcResults}
      </div>
    );
  }
}



export default Lapmr;
