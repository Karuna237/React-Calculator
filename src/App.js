import React, { useState } from "react";

import Wrapper from "./compo/wrapper";
import Screen from "./compo/screen";
import ButtonBox from "./compo/buttonBox";
import Button from "./compo/button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    num1:0,
    res: 0,
   
  });

const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        num1: !calc.sign ? 0 : calc.num1,
        res:0
      });
    }
  };

const commaClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  setCalc({
    ...calc,
    num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

const signClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  setCalc({
    ...calc,
    sign: value,
    num1: !calc.num1 && calc.num ? calc.num : calc.num1,
    num: 0,
    res:0
    });
  };

const equalsClickHandler = () => {

  if (calc.sign && calc.num && calc.num1) {
    const math = (a, b, sign) =>
      sign === "+"
        ? a + b
         : sign === "-"
          ? a - b
           : sign === "X"
            ? a * b
             : a / b;

    setCalc({
      ...calc,
      res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
             : toLocaleString(
                math(
                  Number(removeSpaces(calc.num1)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
      sign: "",
      num: 0,
      num1:0
      });
    }
  };

const invertClickHandler = () => {
  setCalc({
    ...calc,
    num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
    
    });
  };

const percentClickHandler = () => {
  let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    
  setCalc({
    ...calc,
    num:(num /= Math.pow(100, 1)),
    });
  };

const resetClickHandler = () => {
  setCalc({
    ...calc,
    sign: "",
    num1:0,
    num: 0,
    res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={!calc.num && !calc.sign && !calc.num1?calc.num:!calc.num && calc.sign &&calc.num1?calc.num1+calc.sign:calc.num1&&calc.sign &&calc.num1?calc.num1+calc.sign+calc.num:calc.num} value1={calc.res}/>
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;