import mongoose from 'mongoose';
const { Schema } = mongoose;

const storageSchema = new Schema({
    type: Number,
    members: [String]
});

const Storage = mongoose.model('Storage', storageSchema);

export default Storage;