import mongoose, {Schema} from "mongoose"

const pingSchema = new Schema({
    from: String,
    to: String,
    message: String,
    dtCreate: {type: Date, default: Date.now},
    dtUpdate: {type: Date, default: Date.now},
    bDeleted: {type: Boolean, default: false},
});

// Registering the model

var Ping = mongoose.model('Ping', pingSchema);


export default Ping;