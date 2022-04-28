const helpers = {
    ifRecorded: function (status, options) {
        if (status == "recorded") {
            return options.fn(this);
        }
        return options.inverse(this);

    },

    ifNotRecorded: function (status, options) {
        if (status == "unrecorded") {
            return options.fn(this);
        }
        return options.inverse(this);

    },

    ifNotRequired: function (status, options) {
        if (status == "Not required") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },

    ifBelowRange: function (value, lowerRange, options) {
        if (value < lowerRange) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    ifAboveRange: function (value, higherRange, options) {
        if (value > higherRange) {
            return options.fn(this)
        } else {
            return options.inverse(this);
        }
    },
    ifEqual: function (value1, value2, options) {
        if (value1 == value2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    ifglucose: function (value, options) {
        if (value == "glucose") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    ifinsulin: function (value, options) {
        if (value == "insulin") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    ifweight: function (value, options) {
        if (value == "weight") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    ifexercise: function (value, options) {
        if (value == "exercise") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    ifNull: function (value, options) {
        if (value == null) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
};

module.exports.helpers = helpers;