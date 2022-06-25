import {ObjectId} from "mongodb";
import mongoose from 'mongoose';
const { Schema } = mongoose;

const mealScheduleDaySchema = new Schema({
    day: Number,
    lunch: ObjectId,
    dinner: ObjectId,
    household: ObjectId,
    creator: String,
    creationDate: Date
});

const MealScheduleDay = mongoose.model('MealScheduleDay', mealScheduleDaySchema);

export default MealScheduleDay;