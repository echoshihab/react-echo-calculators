import React, { Component } from 'react';
import './App.css';
import Input from './Input/Input';
import Result from './Result/Result';
import Calculate from './Calculate/Calculate';
import Navigation from './Navigation/Navigation';

//legend
const lvotLegend = <em> Left Ventricular Outflow Tract Diameter (LVOT) </em>
const lvotVtiLegend = <em> LVOT Velocity Time Integral (LVOT VTI) </em>
const rvotLegend = <em> Right Ventricular Outflow Tract Diameter (RVOT)</em>
const rvotVtiLegend =<em> RVOT Velocity Time Integral (RVOT VTI)</em>
const qpLegend =  <em> Pulmonary Flow (Qp)</em>
const qsLegend = <em> Systemic Flow (Qs)</em>
const qpqsRatioLegend = <em> Magnitude of cardiovascular shunt (Qp/Qs)</em>

//formulas
const qpFormula = <em> RVOT VTI x &pi; x (RVOT/2)<sup>2</sup></em>;
const qsFormula = <em> LVOT VTI x &pi; x (LVOT/2)<sup>2</sup></em>;
const qpqsFormula = <em> Qp/Qs </em>;


class Qpqs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
            { id: 1, unit: ' cm', error:'', errorStatus: true, value:'', legend: lvotLegend},
            { id: 2, unit: ' cm', error:'', errorStatus: true, value:'', legend: lvotVtiLegend},
            { id: 3, unit: ' cm', error:'', errorStatus: true, value:'', legend: rvotLegend},
            { id: 4, unit: ' cm', error:'', errorStatus: true, value: '', legend: rvotVtiLegend}
            ],
            results: [
            {id: 5, label: 'Qp', value:'', formula: qpFormula, unit:'' , legend: qpLegend},
            {id: 6, label: 'Qs', value:'', formula: qsFormula, unit:'' , legend: qsLegend},
            {id: 7, label: 'Qp/Qs Ratio', value:'', formula: qpqsFormula, unit:'', legend: qpqsRatioLegend },

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
            const rvot = parseFloat(newFields[2].value);
            const rvotVTI = parseFloat(newFields[3].value);

            const qp = (rvotVTI* Math.PI * ((rvot/2)**2)).toFixed(2);
            const qs = (lvotVTI* Math.PI * ((lvot/2)**2)).toFixed(2);
            const qpqs = (qp/qs).toFixed(2);
            newResults[0].value = qp;
            newResults[1].value = qs;
            newResults[2].value = qpqs
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
         <b>Shunt Ratio (Qp/Qs) </b>
         {inputfield}
         <Calculate click={this.handleOnClick}/>
         {calcResults}
      </div>
    );
  }
}


export default Qpqs;
