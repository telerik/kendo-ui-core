function comparePatterns(pattern1, pattern2){
    if(pattern1.length != pattern2.length){
        return false;
    }
    for(var i = 0; i < pattern1.length; i++){
        if(pattern1[i] != pattern2[i]){
            if($.isPlainObject(pattern1[i])){
                for(var field in pattern1[i]){
                    if(pattern1[i][field] != pattern2[i][field]){
                        return false;
                    }
                }
            }
            else{
                return false;
            }            
        }
    }
    return true;
}

Array.prototype.pushArray = function(arr){
    this.push.apply(this, arr);
}

function fixed(value, length){
    return parseFloat(value.toFixed(length));
}
