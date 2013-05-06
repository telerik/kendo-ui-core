function comparePatterns(pattern1, pattern2){
	if(pattern1.length != pattern2.length){
		return false;
	}
	for(var i = 0; i < pattern1.length; i++){
		if(pattern1[i].length != pattern2[i].length){
			return false;
		}
		for(var j = 0; j < pattern1[i].length; j++){
			if(pattern1[i][j] !== pattern2[i][j]){
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