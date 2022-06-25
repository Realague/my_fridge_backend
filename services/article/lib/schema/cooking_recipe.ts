import mongoose from 'mongoose';
const { Schema } = mongoose;

const cookingRecipeSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    ingredients: [String],
    steps: String,
    category: String,
    creator: String,
    creationDate: Date,
});

const CookingRecipe = mongoose.model('CookingRecipe', cookingRecipeSchema);

export default CookingRecipe;