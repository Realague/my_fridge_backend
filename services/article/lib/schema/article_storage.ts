import {ObjectId} from "mongodb";
import mongoose from 'mongoose';
const { Schema } = mongoose;

const articleStorageSchema = new Schema({
    article: ObjectId,
    quantity: Number,
    storage: ObjectId,
    note: String,
    boughtDate: Date,
    buyer: String,
    expirationDate: Date
});

const ArticleStorage = mongoose.model('ArticleStorage', articleStorageSchema);

export default ArticleStorage;