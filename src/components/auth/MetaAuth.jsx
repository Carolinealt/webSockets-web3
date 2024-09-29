import { ethers } from "ethers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updAddress, updBalance } from "../../redux/metaSlice/metaSlice";
import css from './MetaAuth.module.css'
const ethereumRequest = async (setter) => {
    try {
        const data = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setter(data[0]);

    } catch (error) {
        console.error(error);
    }
}

const getTokenBalance = async (address) => {
    if (window.ethereum) {
        const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [address, 'latest'],
        });

        try {
            const res = await ethers.formatEther(balance);
            return res;

        } catch (error) {
            console.log(error);

        }
    }
    else {
        console.log('no access');

    }
};

const MetaAuth = () => {
    const dispatch = useDispatch();
    const address = useSelector(state => state.metaMask.address)
    const balance = useSelector(state => state.metaMask.balance)

    const handleClick = async () => {
        if (window.ethereum) {
            await ethereumRequest(dispatch(updAddress));
            await getTokenBalance(address);
        }
        else {
            window.alert("Install meta mask extension")
        }
    }

    const checkWalletConnection = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length > 0) {
                dispatch(updAddress(accounts[0]))

            }
        }
    };

    // const handleAccountsChanged = (accounts) => {
    //     if (accounts.length > 0) {
    //         dispatch(updAddress(accounts[0]))
    //         const userBalance = getTokenBalance(accounts[0]);
    //         dispatch(updBalance(userBalance))
    //     } else {
    //         dispatch(updAddress(null))

    //     }
    // };


    useEffect(() => {
        if (address === '') {
            return
        }
        const getUserData = async () => {
            await checkWalletConnection();
            const eth = await getTokenBalance(address);
            dispatch(updBalance(eth))

        }

        try {
            getUserData()
        } catch (error) {
            console.log(error, 'Enter error block');

        }


        // return () => {
        //     window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        // };


    }, [address, dispatch]);



    return <div>
        <div className={css.container}>
            <h2>Connect to METAMASK?</h2>
            <button onClick={handleClick} className={css.btn}>Lets connect</button>
        </div>
        <div className={css.container}>
            {address && <p className={css.userData}>Address: {address}</p>}
            {balance && <p className={css.userData}>Balance: {balance} ETH</p>}
        </div>


    </div>

}

export default MetaAuth;