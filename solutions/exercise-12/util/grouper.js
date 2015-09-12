jQuery.sap.declare("openui5.util.grouper");

openui5.util.grouper =  {
	oBundle : null, // somebody has to set this

	Price : function (oContext) {
		var iPrice = +oContext.getProperty("Price");
		var sKey = null,
			sText = null,
			oBundle = openui5.util.grouper.oBundle;

		if (iPrice <= 10) {
			sKey = "Cheap";
			sText = oBundle.getText("cheapPrice");
		} else if (iPrice > 10 && iPrice <= 100) {
			sKey = "Reasonable";
			sText = oBundle.getText("reasonablePrice");
		} else if (iPrice > 100) {
			sKey = "Expensive";
			sText = oBundle.getText("expensivePrice");
		}
		return {
			key: sKey,
			text: sText
		};
	},

	Rating : function (oContext) {
		var iRating = oContext.getProperty("Rating");
		var sKey = null,
			sText = null,
			oBundle = openui5.util.grouper.oBundle;

		if (iRating === 1) {
			sKey = "Poor";
			sText = oBundle.getText("RatingTextPoor");
		} else if (iRating > 1 && iRating <= 3) {
			sKey = "Average";
			sText = oBundle.getText("RatingTextAverage");
		} else if (iRating > 3) {
			sKey = "Good";
			sText = oBundle.getText("RatingTextGood");
		}
		return {
			key: sKey,
			text: sText
		};
	}
}
