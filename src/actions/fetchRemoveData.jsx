export default async function fetchRemoveData(id) {
    const res = await fetch(`http://localhost:3001/pays/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return res.data;
}