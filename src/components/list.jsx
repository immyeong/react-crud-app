import React from 'react';
import Item from './items';
import '../styles/items.css';

const List = ({ pays, inputPlRef, setIsClicked, alertSuccess, getIdFromItem, deleteAllPayData }) => {

    const handleDelete = (e) => {
        e.preventDefault();

        deleteAllPayData();
    }

    return (
        <div className="list__container">
            {pays.length === 0 ? (
                <p>목록이 비어있습니다.</p>
            ) : (
                pays.reverse().map((pay) =>
                    <Item key={pay.id} {...pay} inputPlRef={inputPlRef} setIsClicked={setIsClicked} alertSuccess={alertSuccess} getIdFromItem={getIdFromItem} />)
            )}
            <form
                onSubmit={handleDelete}
                className='button__delete'>
                <button className='delete__btn'>목록지우기
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default List;