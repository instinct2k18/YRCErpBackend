const mongoose = require('mongoose');

const academicYearSchema = mongoose.Schema({
    year: { type: String, required: true }
});

module.exports = mongoose.model('AcademicYear', academicYearSchema);