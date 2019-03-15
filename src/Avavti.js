import React, { Component } from 'react';
import './App.css';
import Input from './Input/Input';
import Result from './Result/Result';
import Calculate from './Calculate/Calculate';
import Navigation from './Navigation/Navigation'


//legends
const vti1Legend = <em> Velocity Time Integral - Subvalvular (VTI 1) </em>
const vti2Legend = <em> Velocity Time Integral - Across Valve (VTI 2) </em>
const lvotLegend = <em> Left Ventricular Outflow Tract Diameter (LVOT) </em>
const avaLegend = <em> Aortic Valve Area (AVA) </em>


//formulas
const avaFormula = <em> (&pi; x (LVOT/2)<sup>2</sup> x VTI<sub>1</sub>)/VTI<sub>2</sub></em>;

//misc html entities
//const vti1Misc = <span>VTI<sub>1</sub>(cm)</span>
//const vti2Misc = <span>VTI<sub>2</sub>(cm)</span>
const cm2Misc = <span>cm<sup>2</sup></span>




class Avavti extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
            { id: 1, unit: ' cm', error:'', errorStatus: true, value:'',  legend: vti1Legend },
            { id: 2, unit: ' cm', error:'', errorStatus: true, value:'', legend: vti2Legend },
            { id: 3, unit: ' cm', error:'', errorStatus: true, value: '', legend: lvotLegend}
            ],
            results: [
            {id: 4, value:'', formula: avaFormula, unit: cm2Misc, legend: avaLegend },
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
            const vti1 = parseFloat(newFields[0].value);
            const vti2 = parseFloat(newFields[1].value);
            const lvot = parseFloat(newFields[2].value);

            const ava = ((Math.PI * ((lvot/2)**2)* vti1)/vti2).toFixed(2);

            newResults[0].value = ava

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
         <b>Aortic Valve Area(AVA) using Velocity Time Integrals(VTI) </b>
         {inputfield}
         <Calculate click={this.handleOnClick}/>
         {calcResults}
      </div>
    );
  }
}


export default Avavti;
