import React from 'react';
import styles from "./Input.module.css";

const input = (props) => { return(<tr><td>{props.legend}</td><td> <small className={styles.align}> {props.error} </small><input className={styles.align} type='text' onChange={props.onChange} />
    <span className={styles.align}>{props.unit}</span>
    </td></tr>
    )  };

export default input;



