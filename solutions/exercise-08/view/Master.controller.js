jQuery.sap.require("openui5.util.Controller");
jQuery.sap.require("openui5.util.formatter");

openui5.util.Controller.extend("openui5.view.Master", {
	onPress : function(oEvent) {
		var sPath = oEvent.getSource().getBindingContext().getPath();
		this.navTo("detail", {
			productPath : sPath.substr(1)
		});
	},

	onSelect : function(oEvent) {
		var sPath = oEvent.getParameter("listItem").getBindingContext().getPath();
		this.navTo("detail", {
			productPath : sPath.substr(1)
		});
	},

	onSearch : function (oEvent) {

		// create model filter
		var aFilters = [];
		var sQuery = oEvent.getParameter("query");
		if (sQuery && sQuery.length > 0) {
			var oFilter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(oFilter);
		}

		// update list binding
		var oList = this.getView().byId("list");
		var oBinding = oList.getBinding("items");
		oBinding.filter(aFilters);
	}

});
