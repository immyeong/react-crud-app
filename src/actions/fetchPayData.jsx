import axios from "axios";

export default async function fetchPayData() {
    try {
        const res = await axios.get('http://localhost:3001/pays');
        return res.data;
    } catch (error) {
        console.error('Error fetching pay data:', error);
        throw error;
    }
}

export async function fetchAddData(title, price) {
    try {
        const res = await axios.post('http://localhost:3001/pays', {
            userId: 1,
            title,
            price: parseInt(price)
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching pay data:', error);
        throw error;
    }
}

export async function fetchEditData(title, price, id) {
    const res = await fetch(`http://localhost:3001/pays/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            price: parseInt(price)
        })
    });

    return res.data;
};

export async function fetchRemoveData(id) {
    const res = await fetch(`http://localhost:3001/pays/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return res.data;
}