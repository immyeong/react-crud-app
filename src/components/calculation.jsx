import React, { useState, useEffect } from 'react';
import '../styles/calculation.css';
import fetchPayData from '../actions/fetchPayData';

const Calculation = () => {
    const [pays, setPays] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPayData();
            setPays(data);
        };
        fetchData();
    }, [pays]);

    // Calculate total price
    useEffect(() => {
        let sum = 0;
        pays.forEach((pay) => {
            sum += pay.price;
        });
        setTotalPrice(sum);
    }, [pays]);

    return (
        <div className="total">
            총지출 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
            </svg> : {totalPrice} 원
        </div>
    );
};

export default Calculation;