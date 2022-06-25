import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    admin: Boolean,
    nickname: {
        type: String,
        unique: true
    },
});

const User = mongoose.model('User', userSchema);

export default User;