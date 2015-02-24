jQuery.sap.declare("openui5.util.formatter");

openui5.util.formatter =  {
	_ratingMap : {
		5 : "VeryGood",
		4 : "Good",
		3 : "Average",
		2 : "BelowAverage",
		1 : "Poor"
	},

	_ratingToStatusMap : {
		5 : "Success",
		4 : "Success",
		3 : "Warning",
		2 : "Warning",
		1 : "Error"
	},

	ratingText : function(iRating) {
		var oMap = openui5.util.formatter._ratingMap;
		var oBundle = this.getModel("i18n").getResourceBundle();
		return oBundle.getText("RatingText" + oMap[iRating]);
	},

	ratingTextLong : function() {
		var oBundle = this.getModel("i18n").getResourceBundle();
		return oBundle.getText("Rating", openui5.util.formatter.ratingText.apply(this, arguments));
	},

	ratingState : function(iRating) {
		var oMap = openui5.util.formatter._ratingToStatusMap;
		return oMap[iRating] ? oMap[iRating] : "None";
	},

	date : function(value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-dd"
			});
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	}
}
