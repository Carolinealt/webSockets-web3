import { useSelector } from "react-redux";
import css from './Statistics.module.css'
const Statistics = () => {
    const maxValue = useSelector(state => state.valuesHistory.maxValue)
    return <>
        <p className={css.stats}>{`Max value is ${maxValue}`}</p>
    </>
};

export default Statistics