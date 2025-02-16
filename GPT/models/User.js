const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Email verification status
  verificationToken: String, // Token for email verification
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8); // Hash the password
    }
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Export the User model
module.exports = mongoose.model('User', userSchema);