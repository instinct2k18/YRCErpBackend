const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');

const academicYearRoutes = require('./routes/academic_year');
const financialYearRoutes = require('./routes/financial_year');
const districtRoutes = require('./routes/district');
const universityRoutes = require('./routes/university');
const collegeRoutes = require('./routes/college');
const incomeHeadRoutes = require('./routes/income_heads');
const voucherRoutes = require('./routes/voucher');
const receiptRoutes = require('./routes/receipt');
const reportRoutes = require('./routes/reports');
const collectionRoutes = require('./routes/collection');
const updateAffiliationRoutes = require('./routes/affiliation');

const app = express();

//db connection
mongoose.connect("mongodb://swarup:swarup@127.0.0.1:27017/yrcdb", { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//cors
//app.use(cors({origin: '*'}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        );
    next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/academic_year", academicYearRoutes);
app.use("/api/financial_year", financialYearRoutes);
app.use("/api/district", districtRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/college", collegeRoutes);
app.use("/api/income_heads", incomeHeadRoutes);
app.use("/api/voucher", voucherRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/update-affiliation", updateAffiliationRoutes);

module.exports = app;

