import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import WSConnection from "../../ws/websockets";
import { ChartToDisplay } from "./ChartToDisplay/ChartToDisplay";
const Hero = () => {
    const array = useSelector(state => state.valuesHistory.items)
    const dispatch = useDispatch()
    useEffect(() => {
        const cleanup = WSConnection(dispatch);
        return () => cleanup();
    }, [dispatch]);
    


    return <>
        <ChartToDisplay data={array} />
    </>
}

export default Hero