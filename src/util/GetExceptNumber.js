/**用户获取数组中的最大值或最小值*/
{{#class}}
  singleton: true,
  alternateClassName: 'GetExceptNumber',

  maxNum: function(temp) {
  	if(temp == null) {
  		return;
  	}
  	var num = temp.reduce(function(previousValue, currentValue) {
		    value = previousValue - currentValue;
		    if(value >= 0) {
		      return previousValue;
		    } else {
		      return currentValue;
		    }
	  	},
	  	Number.NEGATIVE_INFINITY //负无穷大
    );
    return num;
  },

  mixNum: function(temp) {
  	if(temp == null) {
  		return;
  	}
  	var num = temp.reduce(function(previousValue, currentValue) {
		    value = previousValue - currentValue;
		    if(value < 0) {
		      return previousValue;
		    } else {
		      return currentValue;
		    }
	  	},
	  	Number.POSITIVE_INFINITY //无穷大
    );
    return num;
  }
{{/class}}