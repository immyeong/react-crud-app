import axios from "axios";

export default async function fetchAddData(title, price) {
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