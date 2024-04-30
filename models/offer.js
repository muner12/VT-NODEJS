const mongoose = require('mongoose');
const componentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    format: String,
    example: {
        header_handle: [String],
        body_text: [[String]],
        buttons: [{
            type: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            phone_number: String,
            url: String
        }]
    }
}, { _id: false }); // Exclude _id field from subdocuments

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['en_US'],
        required: true
    },
    category: {
        type: String,
        enum: ['MARKETING'],
        required: true
    },
    components: [componentSchema]
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
