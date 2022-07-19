
import { Textfit } from "./react-textfit";
import "./Screen.css";

const Screen = ({ value,value1 }) => {
  return (
    <>
    <Textfit className="screen" mode="single" max={70}>
      <span >{value}</span>
    </Textfit>
    <Textfit className="screen1" mode="single" max={70}>
    
    <span>{value1}</span>
  </Textfit>
  </>
  );
};

export default Screen;