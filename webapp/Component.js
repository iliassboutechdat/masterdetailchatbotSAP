sap.ui.define([
	"sap/ui/core/UIComponent",
	"./model/LocalStorageModel",
	"./model/models",
	"sap/ui/Device"
], function(UIComponent, LocalStorageModel, models, Device) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.cart.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this function, the device models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function () {
			//create and set cart model
			var oCartModel = new LocalStorageModel("SHOPPING_CART", {
				cartEntries: {},
				savedForLaterEntries: {}
			});
            this.setModel(oCartModel, "cartProducts");
            
            this.renderRecastChatbot();
            

			//create and set comparison model
			var oComparisonModel = new LocalStorageModel("PRODUCT_COMPARISON", {
				category: "",
				item1: "",
				item2: ""
			});
			this.setModel(oComparisonModel, "comparison");

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// initialize the router
			this.getRouter().initialize();

			// update browser title
			this.getRouter().attachTitleChanged(function(oEvent) {
				var sTitle = oEvent.getParameter("title");
				document.addEventListener('DOMContentLoaded', function(){
					document.title = sTitle;
				});
            });
            
            
            
            
        },
        
        renderRecastChatbot: function() {
	    if (!document.getElementById("cai-webchat")) {
		var s = document.createElement("script");
	 	  s.setAttribute("id", "cai-webchat");
		  s.setAttribute("src", "https://cdn.cai.tools.sap/webchat/webchat.js");
			  document.body.appendChild(s);
		}
		s.setAttribute("channelId", "d6b7bc8c-d9d0-4414-ae1f-c5e077dbcd7b");
        s.setAttribute("token", "bc2e48059fbe05e0f30fa0af59b0ec4f");
    },

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass : function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				// eslint-disable-next-line sap-no-proprietary-browser-api
				if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
        }
        
        
    
    

	    });
});
