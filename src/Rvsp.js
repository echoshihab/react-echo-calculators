import React, { Component } from 'react';
import './App.css';
import Input from './Input/Input'
import Result from './Result/Result'
import Calculate from './Calculate/Calculate';
import Navigation from './Navigation/Navigation'


//legend
const trvmaxLegend = <em> Tricupid Regurgitation Peak Velocity (TR Vmax) </em>
const ivclegend = <em> Inferior Vena Cava Diameter (IVCd) </em>
const sniffLegend = <em> % of collapsed IVC at sniff (IVC-sniff %) </em>
const rapressureLegend = <em> Right Atrial Pressure (RAP) </em>
const rvspLegend = <em> Right Ventricular Systolic Pressure (RVSP) </em>

//formulas specific to this component
const rvspFormula = <em> 4 x (TR V<sub>max</sub>)<sup>2</sup> + RA Pressure</em>;



const ChoiceField = (props) => {
    if (props.fieldLabel=== ivclegend) {
    return(<div>{props.fieldLabel} <select name={props.fieldLabel} onChange={props.onChange}>
                                                               <option value="-21">
                                                                   &#8804;{props.option}
                                                               </option>
                                                               <option value='+21'>
                                                                    &#8805;{props.option}
                                                               </option>
                                    </select>
</div> )}
    else {
        return( <div>{props.fieldLabel} <select name={props.fieldLabel} onChange={props.onChange}>
                                                               <option value="+50"> &gt;{props.option}</option>
                                                               <option value="-50"> &lt;{props.option}</option>
                                                               </select> </div>
            )

    }
      };

const ReadOnlyField = props => <div> {props.fieldLabel}: {props.value} {props.unit}</div>



class Rvsp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
            { id: 1, unit: ' m/s', error:'', errorStatus: true, value:'', legend:trvmaxLegend },
            ],
            choiceFields: [
            { id: 2, option: '21mm ', value:'-21', legend: ivclegend},
            { id: 3, option: '50%' , value:'+50', legend: sniffLegend}
            ],
            readonlyFields: [
            { id: 4, unit: 'mmhg', error:'', errorStatus:true,  value: 3 , legend: rapressureLegend }
            ],
            results: [
            {id: 5, value:'', formula: rvspFormula, unit: 'mmhg', legend: rvspLegend},
            ],
            resultsFlag: false,
        };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);

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

     handleOnSelect = (event, id) => {
        const newChoiceFields = this.state.choiceFields.slice();
        const newReadOnlyFields = this.state.readonlyFields.slice();
        if (id === 2) {
            newChoiceFields[0].value = event.target.value
        }
        else {
            newChoiceFields[1].value = event.target.value
        }
         this.setState({choiceFields:newChoiceFields});

        switch (true) {
            case (newChoiceFields[0].value === '-21' && newChoiceFields[1].value === '+50'):
                newReadOnlyFields[0].value = 3
                break;
            case (newChoiceFields[0].value === '-21' && newChoiceFields[1].value === '-50'):
                newReadOnlyFields[0].value = 8
                break;
            case (newChoiceFields[0].value === '+21' && newChoiceFields[1].value === '+50'):
                newReadOnlyFields[0].value = 8
                break;
            case (newChoiceFields[0].value === '+21' && newChoiceFields[1].value === '-50'):
                newReadOnlyFields[0].value = 15
                break;
            default:
                newReadOnlyFields[0].value = 3
        }
        this.setState({readonlyFields:newReadOnlyFields});

     };

    handleOnClick = () => {
        const newFields = this.state.fields.slice();
        const newReadOnlyFields = this.state.readonlyFields.slice();
        const newResults = this.state.results.slice();
        const errorChecker = newFields.some((newField) => newField.errorStatus === true);
        if (errorChecker){
            return null;
        }
        else {
            const TR = parseFloat(newFields[0].value);
            const RA = newReadOnlyFields[0].value;
            const RVSP = 4*(TR**2)+RA
            newResults[0].value = RVSP;
            this.setState({results:newResults, resultsFlag: true});



        }


    }

  render() {
    let calcResults = null;
    const {fields, resultsFlag, results, choiceFields, readonlyFields} = this.state;  //destructuring
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

        let choicefield = (
    <div className='calcResult'>
    {choiceFields.map(choiceField => {
        return (

                <ChoiceField
                fieldLabel={choiceField.legend}
                onChange = {(event)=>this.handleOnSelect(event,choiceField.id)}
                option={choiceField.option}
                error = {choiceField.error}
                key = {choiceField.id}
                value = {choiceField.value}
                />

                )
    } )}
    </div>);


    let readOnlyField = (
    <div className='calcResult'>
    {readonlyFields.map(readonlyField => {
        return (

                <ReadOnlyField
                fieldLabel={readonlyField.legend}
                key = {readonlyField.id}
                value = {readonlyField.value}
                unit = {readonlyField.unit}
                />

                )
    } )}
    </div>);


    return (
      <div className="stateComponent">
      <Navigation />
         <b> Right Ventricle Systolic Pressure (RVSP)  </b>
         {inputfield}
         {choicefield}
         {readOnlyField}
        <Calculate click={this.handleOnClick}/>
         {calcResults}
      </div>
    );
  }
}


export default Rvsp;
