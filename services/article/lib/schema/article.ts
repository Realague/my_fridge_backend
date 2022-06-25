import mongoose from 'mongoose';
const { Schema } = mongoose;

const articleSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    perishable: Boolean,
    packingType: Number,
    category: mongoose.Types.ObjectId
});

const Article = mongoose.model('Article', articleSchema);

export default Article;