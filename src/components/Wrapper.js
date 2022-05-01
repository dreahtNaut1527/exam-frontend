import classes from './Wrapper.module.css'

function Wrapper({ children }) {
    return <div className={ classes.wrapper }>{ children }</div>
}

export default Wrapper