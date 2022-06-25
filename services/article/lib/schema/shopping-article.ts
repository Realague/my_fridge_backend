import {ObjectId} from "mongodb";
import mongoose from 'mongoose';
const { Schema } = mongoose;

export const cookingRecipeSchema = new Schema({
    article: String,
    quantity: Number,
    houseHold: ObjectId,
    note: String,
    creator: String,
    expirationDate: Date
});

const CookingRecipe = mongoose.model('CookingRecipe', cookingRecipeSchema);

export default CookingRecipe;