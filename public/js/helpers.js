const helpers = {
    ifRecorded: function (status, options){
        if(status == "recorded"){
            return options.fn(this);
        }
        return options.inverse(this);
        
    },

    ifNotRecorded: function (status, options){
        if(status == "unrecorded"){
            return options.fn(this);
        }
        return options.inverse(this);
        
    },

    ifNotRequired: function (status, options){
        if(status == "Not required"){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    ifBelowRange: function (value,lowerRange, options){
        if(value < lowerRange){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },
    ifAboveRange: function (value,higherRange, options){
        if(value > higherRange ){
            return options.fn(this)
        }else{
            return options.inverse(this);
        }
    },
    ifEqual:function (value1,value2, options){
        if(value1 == value2){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    }
};

module.exports.helpers = helpers;