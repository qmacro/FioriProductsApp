jQuery.sap.require("openui5.util.Controller");
jQuery.sap.require("openui5.util.formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

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
	},

	onDelete : function (evt) {
		var that = this,
			oView = this.getView();

		// show confirmation dialog
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
			bundle.getText("deleteDialogMsg"),
			function (oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					// notify user
					var successMsg = bundle.getText("deleteDialogSuccessMsg");
					oView.getModel().remove(oView.getBindingContext().getPath(), {
						success :function () {
							sap.m.MessageToast.show(successMsg);
							that.showFirstProduct();
						}
					});
				}
			},
			bundle.getText("deleteDialogTitle")
		);
	},

	showFirstProduct : function () {
		var oModel = this.getView().getModel();
		var oData = oModel.getData("/");
		for (var sProperty in oData) {
			var oEntry = oData[sProperty];
			if (oEntry && jQuery.sap.startsWith(sProperty, "Products")) {
				this.getView().bindElement("/" + sProperty);
				return;
			}
		}
	}

});
