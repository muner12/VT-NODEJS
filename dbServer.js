const express=require('express');
const dotenv=require('dotenv').config();
// const router=require('./routes/index');
const router=require('./routes/userRoute');
const dbConnection=require('./config/connection');
const errorHandler=require('./middleware/errorMiddlewar');
const axios = require('axios');
let app=express();

app.use(express.json());
app.use('/api',router);



async function getLatLng(cityName) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName+", Pakistan")}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.length > 0) {
            const location = data[0];
            return { 
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.lon)
            };
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

// Example usage
// getLatLng('Haripur').then(coordinates => {
//         if (coordinates) {
//             console.log('Latitude:', coordinates.latitude);
//             console.log('Longitude:', coordinates.longitude);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });



dbConnection();
app.use(errorHandler)
app.listen(process.env.PORT,()=>{
    console.log(`server is running on : http://localhost:${process.env.PORT}`);
})