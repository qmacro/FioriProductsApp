jQuery.sap.declare("openui5.Component");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

sap.ui.core.UIComponent.extend("openui5.Component", {
	metadata : {
		routing : {
			config : {
				viewType : "XML",
				viewPath : "openui5.view",
				clearTarget : false,
				targetAggregation : "pages",
				targetControl : "app"
				},
			routes : [
				{
					pattern : "",
					name : "master",
					view : "Master"
				},
				{
					pattern : "{productPath}",
					name : "detail",
					view : "Detail"
				}
			]
		}
	},

	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var sServiceUrl = "/Service/";

		this._startMockServer(sServiceUrl);

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
