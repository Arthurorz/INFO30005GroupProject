const helpers = {
    // check if the current data's status is recorded
    ifRecorded: function (status, options) {
        if (status == "recorded") {
            return options.fn(this);
        }
        return options.inverse(this);

    },

    // check if the input data's status is unrecorded
    ifNotRecorded: function (status, options) {
        if (status == "unrecorded") {
            return options.fn(this);
        }
        return options.inverse(this);

    },
    // check if the input data's status is not required
    ifNotRequired: function (status, options) {
        if (status == "Not required") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },

    // check if the input data's value is below the threshold
    ifBelowRange: function (value, lowerRange, options) {
        if (value < lowerRange) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },

    // check if the input data's value is below the threshold
    ifAboveRange: function (value, higherRange, options) {
        if (value > higherRange) {
            return options.fn(this)
        } else {
            return options.inverse(this);
        }
    },

    // check if the two input values are equal
    ifEqual: function (value1, value2, options) {
        if (value1 == value2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    // check if the type of the input data is glucose
    ifglucose: function (value, options) {
        if (value == "glucose") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    // check if the type of the input data is weight
    ifinsulin: function (value, options) {
        if (value == "insulin") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    // check if the type of the input data is weight
    ifweight: function (value, options) {
        if (value == "weight") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    // check if the type of the input data is exercise
    ifexercise: function (value, options) {
        if (value == "exercise") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    // check if the record is null
    ifNull: function (value, options) {
        if (value == null) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    ifChecked: function (value, options) {
        if (value == true) {
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },
    ifMSG: function (value, options) {
        if (value != "") {
            return options.fn(this);
        }
        else {
            return options.inverse(this);
        }
    },
};

module.exports.helpers = helpers;