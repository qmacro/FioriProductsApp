jQuery.sap.require("openui5.util.Controller");
jQuery.sap.require("openui5.util.formatter");

openui5.util.Controller.extend("openui5.view.Detail", {

	onInit : function() {
		this.getRouter().attachRouteMatched(this.onRouteMatched, this);
	},

	onRouteMatched : function(oEvent) {
		var oParameters = oEvent.getParameters();
		if (oParameters.name !== "detail") {
			return;
		}

		// when detail navigation occurs, update the binding context
		this.getView().bindElement("/" + oParameters.arguments.productPath);
	},

	onBack : function() {
		this.navBack();
	}

});
