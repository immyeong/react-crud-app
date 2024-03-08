import React, { useState, useRef, useEffect } from 'react';
import '../styles/form.css';
import axios from 'axios';
import List from './list';
import fetchAddData from '../actions/fetchAddData';
import fetchEditData from '../actions/fetchEditData';
import fetchPayData from '../actions/fetchPayData';
////////////////////////////////////////
const Form = ({ alertSuccess }) => {
    const [payList, setPayList] = useState('');
    const [payMoney, setPayMoney] = useState('');
    const inputPlRef = useRef(null);
    const inputPmRef = useRef(null);
    const [pays, setPays] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [getId, setGetId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPayData();
            setPays(data);
        };
        fetchData();
    }, []);

    const handleChangePay = (e) => {
        setPayList(e.target.value);
    };

    const handleChangeMoney = (e) => {
        setPayMoney(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetchAddData(payList, payMoney);
            setPayList('');
            setPayMoney('');
            const newData = await fetchPayData();
            setPays(newData);
            alertSuccess('아이템이 입력되었습니다.', 'alert alert-success');
            setTimeout(() => {
                alertSuccess(null, null);
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const deleteAllPayData = async () => {
        try {
            // Send a DELETE request to the server to delete all data
            await axios.get('http://localhost:3001/pays', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([])
            });

            // Update the state to reflect the deletion
            setPays([]);

            console.log('All data deleted successfully.');
        } catch (error) {
            console.error('Error deleting all data:', error);
        }
    };

    const getIdFromItem = (value) => {
        setGetId(value);
        console.log("실행되었습니다.");
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        // Assuming you have the id available for editing
        setIsClicked(false);
        try {
            await fetchEditData(payList, payMoney, getId);
            setPayList('');
            setPayMoney('');
            const newData = await fetchPayData();
            setPays(newData);
            alertSuccess('아이템이 수정되었습니다.', 'alert alert-success');
            setTimeout(() => {
                alertSuccess(null, null);
            }, 3000);
        } catch (error) {
            console.error('Error editing item:', error);
        }
    }

    return (
        <div className="contents">
            <div className='inputContainer'>
                <form>
                    <p>지출 내역</p>
                    <input
                        ref={inputPlRef}
                        className='inputBox payList'
                        type='text'
                        placeholder='예)밥먹기'
                        value={payList}
                        onChange={handleChangePay}
                    />
                </form>
                <form>
                    <p>비용</p>
                    <input
                        ref={inputPmRef}
                        className='inputBox payMoney'
                        type='text'
                        placeholder='0'
                        value={payMoney}
                        onChange={handleChangeMoney}
                    />
                </form>
            </div>
            <div className='form__button'>
                {(!isClicked) ? (
                    <form onSubmit={handleSubmit}>
                        <button className="submit__btn" type='submit'>제출
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                            </svg>
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleEdit}>
                        <button className="submit__btn" type='submit'>수정
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                            </svg>
                        </button>
                    </form>
                )}
            </div>
            <div>
                <List pays={pays} setPays={setPays} inputPlRef={inputPlRef} setIsClicked={setIsClicked} alertSuccess={alertSuccess} getIdFromItem={getIdFromItem} deleteAllPayData={deleteAllPayData} />
            </div>
        </div>
    );
};

export default Form;