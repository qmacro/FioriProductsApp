jQuery.sap.declare("openui5.Component");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

sap.ui.core.UIComponent.extend("openui5.Component", {
	metadata : {
		routing : {
			config : {
				viewType : "XML",
				viewPath : "openui5.view",
				clearTarget : false
			},
			routes : [
				{
					name : "master",
					pattern : "",
					view : "Master",
					targetAggregation : "masterPages",
					targetControl : "app",
					subroutes : [
						{
							pattern : "{productPath}",
							name : "detail",
							view : "Detail",
							targetAggregation : "detailPages"
						}
					]
				}
			]
		}
	},

	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var sServiceUrl = "/northwind";

		//this._startMockServer(sServiceUrl);

		// Create and set domain model to the component
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		this.setModel(oModel);

		// set i18n model
		var oI18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		this.setModel(oI18nModel, "i18n");

		// set device model
		var bIsPhone = sap.ui.Device.system.phone;
		var oDeviceModel = new sap.ui.model.json.JSONModel({
			isPhone : bIsPhone,
			isNoPhone : !bIsPhone,
			listMode : bIsPhone ? "None" : "SingleSelectMaster",
			listItemType : bIsPhone ? "Active" : "Inactive"
		});
		oDeviceModel.setDefaultBindingMode("OneWay");
		this.setModel(oDeviceModel, "device");

		new sap.m.routing.RouteMatchedHandler(this.getRouter());
		this.getRouter().initialize();
	},

	createContent : function () {
		return sap.ui.view({
			viewName : "openui5.view.Main",
			type : "XML"
		});
	},

	_startMockServer : function (sServiceUrl) {
		jQuery.sap.require("openui5.util.MockServer");
		var oMockServer = new openui5.util.MockServer({
			rootUri: sServiceUrl
		});

		openui5.util.MockServer.config({
			autoRespondAfter : 1000
		});

		oMockServer.simulate("model/metadata.xml", "model/");
		oMockServer.start();
	}
});