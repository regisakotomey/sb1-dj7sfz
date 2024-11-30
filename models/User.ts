import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { 
    type: String,
    unique: true,
    sparse: true
  },
  phone: { 
    type: String,
    unique: true,
    sparse: true
  },
  password: { 
    type: String
  },
  firstName: String,
  lastName: String,
  country: {
    type: String,
    required: true
  },
  sector: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  verificationCode: String
}, {
  timestamps: true
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);