const mongoose = require('mongoose');

const leadSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    service: String,
    budget: String,
    message: String,
    type: {
        type: String,
        enum: ['contact', 'roast', 'qualify'],
        required: true
    },
    details: {
        type: Object,
        default: {}
    },
    location: {
        lat: Number,
        lng: Number,
        accuracy: Number,
        city: String,
        country: String
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'closed'],
        default: 'new'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
