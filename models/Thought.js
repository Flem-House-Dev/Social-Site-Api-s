const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema (
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
            get: function(createdAt) {
                return createdAt.toLocalString();
            }
        },
    },
    {
        toJSON: { getters: true },
        toObject: { getters: true }
    }
)