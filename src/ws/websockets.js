import { updVal } from "../redux/historySlice/historySlice";

const WSConnection = (dispatch) => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const price = data.p;
        const date = new Date().toLocaleString();
        dispatch(updVal({ price, date }));

    };

    return () => {
        ws.close();
    };
}

export default WSConnection;