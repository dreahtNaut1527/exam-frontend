import classes from './Buttons.module.css'

const Buttons = ({ className, value, onClick }) => {
    return (
        <button className={ className === "equals" ? classes.equals : className } onClick={ onClick }>
            { value }
        </button>
    )
}

export default Buttons