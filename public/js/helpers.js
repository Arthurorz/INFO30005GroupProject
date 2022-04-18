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
    }
}