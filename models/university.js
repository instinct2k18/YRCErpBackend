const mongoose = require('mongoose');

const universitySchema = mongoose.Schema({
    university: { type: String, required: true },
    address: { type: String, required: true },
    nodal_officer: { type: String, required: true},
    contact_no: { type: Number, required: true},
    email: { type: String, required: true}
});

module.exports = mongoose.model('University', universitySchema);