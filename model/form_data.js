'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormDataSchema = new Schema({
 name: String,
 company: String,
 termsAccepted: Boolean
});

module.exports = mongoose.model('FormData', FormDataSchema);