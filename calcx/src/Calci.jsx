// import { useState } from "react"

// export default function Calci(){

//     const[value, setValue]=useState("")
//     return (

//         <div>
//             <input type="text"  value={value}></input>
//         </div>
//     )
// }

import React, { useState } from 'react';
import styles from './Calci.module.css';
import { create, all } from 'mathjs';

const math = create(all);

const Calci = () => {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState('');
  
    const calculate = (value) => {
      if (value === '=') {
        if (!display) {
          setResult('Error');
          return;
        }
        try {
          const evaluatedResult = evaluateExpression(display);
          setResult(evaluatedResult);
        } catch {
          setResult('Error');
        }
      } else if (value === 'C') {
        setDisplay('');
        setResult('');
      } else {
        setDisplay(display + value);
      }
    };
  
    const evaluateExpression = (expression) => {
      try {
        // Use mathjs to safely evaluate the expression
        const result = math.evaluate(expression);
  
        // Handle specific cases for NaN and Infinity
        if (isNaN(result)) {
          return 'NaN';
        } else if (!isFinite(result)) {
          return 'Infinity';
        }
        return result.toString();
      } catch {
        throw Error('Error');
      }
    };
  

  return (
    <div className={styles.calculator}>
      
      <input type="text" value={display} />
      <div >{result}</div>
      <div className={styles.buttons}>
        {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', 'C', '0', '=', '/'].map((btn) => (
          <button key={btn} onClick={() => calculate(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calci;
