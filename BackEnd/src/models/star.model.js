import mongoose from 'mongoose';

const starSchema = new mongoose.Schema({
  name: { type: String, required: true },
  constellation: { type: String, required: true },
  rightAscension: { type: String, required: true },
  declination: { type: String, required: true },
  apparentMagnitude: { type: Number },
  absoluteMagnitude: { type: Number },
  distanceLightYears: { type: Number },
  spectralClass: { type: String },
  imageUrl: { type: String } // Para guardar la URL de la imagen subida
}, {
  timestamps: true
});

export default mongoose.model('Star', starSchema);
