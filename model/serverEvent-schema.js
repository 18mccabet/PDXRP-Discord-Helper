const mongoose = require('mongoose')

const GuildScheduledEvent = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    channelId: {
        type: String
    },
    creatorId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    scheduledStartTimestamp: {
        type: Number,
        required: true
    },
    scheduledEndTimestamp: {
        type: Number,
        required: true
    },
    privacyLevel: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    entityId: {
        type: String
    },
    userCount: {
        type: String
    },
    creator: {
        type: String
    },
    entityMetadata: {
        type: {location: String},
        required: true
    },
    image: {
        type: String
    },
})

module.exports = mongoose.model('GuildScheduledEvent', GuildScheduledEvent)