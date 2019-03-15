import React, { Component } from 'react';
import './App.css';
import Input from './Input/Input';
import Result from './Result/Result';
import Calculate from './Calculate/Calculate';
import Navigation from './Navigation/Navigation';




//legends
const a1Legend = <em> LA area in A4C Planimetry (A<sub>1</sub>) </em>
const a2Legend = <em> LA area in A2C Planimetry (A<sub>2</sub>) </em>
const lengthLegend = <em> Length (L) </em>
const lavolumeLegend = <em> Left Atrial Volume (LA Vol) </em>


//formulas specific to this component
const lavolFormula = <em> .85 x (A<sub>1</sub>x A<sub>2</sub>)/Length</em>

//misc html entities
const a1Misc = <span> cm<sup>2</sup></span>
const a2Misc = <span> cm<sup>2</sup></span>


class Lavolume extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
            { id: 1, unit: a1Misc, error:'', errorStatus: true, value:'', legend: a1Legend},
            { id: 2, unit: a2Misc, error:'', errorStatus: true, value:'', legend: a2Legend},
            { id: 3, unit: ' cm', error:'', errorStatus: true, value: '', legend: lengthLegend}
            ],
            results: [
            {id: 4, legend: lavolumeLegend, value:'', formula: lavolFormula, unit:'mL' },
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
            const a1 = parseFloat(newFields[0].value);
            const a2 = parseFloat(newFields[1].value);
            const lalength = parseFloat(newFields[2].value);

            const lavol = (.85 * (a1 * a2)/lalength).toFixed(2);
            newResults[0].value = lavol
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
         <b>Left Atrial (LA) Volume </b>
         {inputfield}
         <Calculate click={this.handleOnClick}/>
         {calcResults}
      </div>
    );
  }
}


export default Lavolume;
