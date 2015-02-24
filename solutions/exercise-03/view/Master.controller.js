jQuery.sap.require("openui5.util.Controller");

openui5.util.Controller.extend("openui5.view.Master", {
	onPress : function(oEvent) {
		var sPath = oEvent.getSource().getBindingContext().getPath();
		this.navTo("detail", {
			productPath : sPath.substr(1)
		});
	}
});
