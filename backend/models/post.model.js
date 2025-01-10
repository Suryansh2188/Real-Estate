import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property_type: {
      type: String,
      enum: ['house', 'apartment', 'condo', 'land', 'penthouse'],
      required: true,
    },
    type: {
      type: String,
      enum: ['sale', 'rent'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    features: {
      bedrooms: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
      square_feet: { type: Number },
      year_built: { type: Number },
      parking_spaces: { type: Number },
      has_garage: { type: Boolean, default: false },
      has_pool: { type: Boolean, default: false },
    },
    photos: {
      type: [String], // Array of photo URLs
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'A listing must have at least one photo.',
      },
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'rented'],
      default: 'available',
    },
    listed_date: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });

export default mongoose.model('Post', postSchema);
