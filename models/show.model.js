import mongoose,{Schema} from "mongoose";

const showSchema = new Schema({
    theaterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true
    },
    movieId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    noOfSeats:{
        type: Number,
        required: true
    },
    format: {
        type: String
    }
},{timestamps: true})


const Show = mongoose.model('Show',showSchema)

export default Show;
