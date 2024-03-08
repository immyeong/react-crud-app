export default async function fetchEditData(title, price, id) {
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