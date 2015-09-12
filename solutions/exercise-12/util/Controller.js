jQuery.sap.declare("openui5.util.Controller");
jQuery.sap.require("sap.ui.core.routing.History")

sap.ui.core.mvc.Controller.extend("openui5.util.Controller", {
	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	navTo : function () {
		var oRouter = this.getRouter();
		return oRouter.navTo.apply(oRouter, arguments);
	},

	navBack : function () {
		var oHistory = sap.ui.core.routing.History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();

		//The history contains a previous entry
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			var bReplace = true; // otherwise we go backwards with a forward history
			this.navTo("");
		}
	}
});
