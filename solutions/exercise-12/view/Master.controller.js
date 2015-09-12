jQuery.sap.require("openui5.util.Controller");
jQuery.sap.require("openui5.util.formatter");
jQuery.sap.require("openui5.util.grouper");

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
	},

	onGroup : function (oEvent) {

		// compute sorters
		var aSorters = [];
		var oItem = oEvent.getParameter("selectedItem");
		var sKey = oItem ? oItem.getKey() : null;
		if ("Price" === sKey || "Rating" === sKey) {
			openui5.util.grouper.oBundle = this.getView().getModel("i18n").getResourceBundle();
			var fnGrouper = openui5.util.grouper[sKey];
			aSorters.push(new sap.ui.model.Sorter(sKey, true, fnGrouper));
		}

		// update binding
		var oList = this.getView().byId("list");
		var oBinding = oList.getBinding("items");
		oBinding.sort(aSorters);
	}

});
