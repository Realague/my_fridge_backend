import {ObjectId} from "mongodb";
import mongoose from 'mongoose';
const { Schema } = mongoose;

const householdSchema = new Schema({
    name: String,
    members: [ObjectId]
});

const Household = mongoose.model('Household', householdSchema);

export default Household;