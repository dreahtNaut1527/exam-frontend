import classes from "./ButtonBox.module.css"

const ButtonBox = ({ children }) => {
    return <div className={ classes.buttonBox }>{ children }</div>
}

export default ButtonBox