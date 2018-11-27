"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const cors = require('cors')({
    origin: true
});
const ns = require('ns-api')({
    username: 'm.jasker@student.fontys.nl',
    password: 'ZdD9HSCsHi2Tm5S3o-SEX0ui0pOO2KcsOivhedBmNTxdLWINR8QbiQ'
});
exports.departureTimes = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        ns.vertrektijden(req.body.station, (err, data) => {
            if (data) {
                res.status(200).send(data);
                // console.log(data);
            }
            else {
                res.status(400).send(err);
                // console.log(err.api.message);
            }
        });
    });
});
//# sourceMappingURL=index.js.map