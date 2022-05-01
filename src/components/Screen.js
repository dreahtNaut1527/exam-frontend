import { Textfit } from "react-textfit"
import classes from './Screen.module.css'

const Screen = ({ value }) => {
    return (
        <Textfit className={ classes.screen } mode="single" max={ 70 }>
            { value }
        </Textfit>
    )
}

export default Screen