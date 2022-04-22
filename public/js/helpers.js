const helpers = {
    ifRecorded:function(status, options){
        if(status == "recorded"){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },
    ifNotRecorded:function(status, options){
        if(status == "unrecorded"){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },
    ifNotRequired:function(status, options){
        if(status == "Not required"){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },
    ifWeightOutOfRange:function(weight,lowerRange,higherRange, options){
        if(weight > higherRange || weight < lowerRange){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },
    ifGlucoseOutOfRange:function(glucose,lowerRange,higherRange, options){
        if(glucose > higherRange || glucose < lowerRange){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },
    ifInsulinOutOfRange:function(insulin,lowerRange,higherRange, options){
        if(insulin > higherRange || insulin < lowerRange){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },
    ifExerciseOutOfRange:function(exercise,lowerRange,higherRange, options){
        if(exercise > higherRange || exercise < lowerRange){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },
    
}