const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        firstName: {type: String, required: true, max:100},
        familyName: {type: String, required: true, max: 100},
        username: {type: String, required: true, max: 25},
        password: {type: String, required: true, max: 100},
        createdAt: {type: Date, default: Date.now}
    }
);

UserSchema.virtual('name').get(function() {
    if (this.firstName && this.familyName) {
        return this.firstName.concat(', ', this.familyName);
    }
    if (!this.firstName || !this.familyName) {
        return '';
    }
});

module.exports = mongoose.model('Users', UserSchema);