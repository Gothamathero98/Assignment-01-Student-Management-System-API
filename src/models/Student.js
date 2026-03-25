import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name:
    {type: String,
        required: true,
        trim: true
    },
    age:
    {
        type: Number,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone:
    {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address:
    {
        type: String,
        required: true,
        trim: true
    },
    gender:
    {
        type: String,
        required: true,
        trim: true
    },
    course:
    {
        type: String,
        required: true,
        trim: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    updatedAt:
    {
        type: Date,
        default: Date.now
    }

},
{
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Student', studentSchema);