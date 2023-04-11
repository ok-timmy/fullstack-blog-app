const mongoose = require("mongoose");
const { Schema } = mongoose;
// const User = require("./User")

const commentsSchema = new Schema({
  
    commenter: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }, 
    content: {
        type: String
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "BlogPost"
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model("Comments", commentsSchema);