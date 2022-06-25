import mongoose from 'mongoose';
const { Schema } = mongoose;

export const categorySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
});

const ArticleCategory = mongoose.model('ArticleCategory', categorySchema);
const CookingRecipeCategory = mongoose.model('CookingRecipeCategory', categorySchema);

export {ArticleCategory, CookingRecipeCategory};