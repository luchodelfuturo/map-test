// pages/api/places.js

export default async function handler(req, res) {
    const { location, radius, type } = req.query;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=AIzaSyAEel2vfXfAf-Gk1YMKq19EOaLAOghoq4k`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data from Google Places API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Google Places API' });
    }
}
