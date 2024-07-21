const { Schema, model, default: mongoose } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    userName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Date format will be updated at a later time
        get: function (createdAt) {
            return createdAt.toLocalString();
        }
    },
    },
    {
        toJSON: {
            getters: true
        },
        toObject: {
            getters: true
        },
        id: false

    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Date format will be updated at a later time
            get: function (createdAt) {
                return createdAt.toLocalString();
            }
        },
        userName: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: { getters: true },
        toObject: { getters: true }
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;