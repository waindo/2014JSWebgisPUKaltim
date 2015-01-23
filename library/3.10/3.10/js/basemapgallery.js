
    dojo.require("esri.map");
    dojo.require("dijit.form.Button");
    dojo.require("dijit.layout.BorderContainer");
    dojo.require("dijit.layout.ContentPane");
    dojo.require("esri.dijit.BasemapGallery");
    dojo.require("esri.arcgis.utils");

    

    function init() {
    
      createBasemapGallery();
    }

    function createBasemapGallery() {
      //manually create basemaps to add to basemap gallery
      var basemaps = [];
      var rbi = new esri.dijit.BasemapLayer({
        url:"http://geoservices.big.go.id/arcgis/rest/services/RBI/Rupabumi/MapServer"
      });
      var rbiBasemap = new esri.dijit.Basemap({
        layers      :[rbi],
        title       :"Peta RBI",
        thumbnailUrl:"images/thumbnail_RBI.png"
      });
      basemaps.push(rbiBasemap);

      /*var citra = new esri.dijit.BasemapLayer({
        url:"http://static.arcgis.com/attribution/World_Imagery"
      });
      var citraBasemap = new esri.dijit.Basemap({
        layers      :[citra],
        title       :"Citra Satelit",
        thumbnailUrl:"images/citra.png"
      });
      basemaps.push(citraBasemap);*/
      

      var basemapGallery = new esri.dijit.BasemapGallery({
        showArcGISBasemaps:false,
        basemaps          :basemaps,
        map               :map
      }, "basemapGallery");
      basemapGallery.startup();

      dojo.connect(basemapGallery, "onError", function (error) {
        console.log(error);
      });
    }

    dojo.ready(init);
