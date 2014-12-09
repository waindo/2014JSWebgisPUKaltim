
    var map;
    require([
			 "esri/config",
        "esri/map",
        "esri/SnappingManager",
        "esri/urlUtils",
        "esri/arcgis/utils",

        "esri/dijit/Measurement",
        "esri/dijit/Legend",
        "esri/dijit/Popup",
        "esri/dijit/PopupTemplate",
        "esri/dijit/Scalebar",
        "esri/dijit/BasemapGallery",

        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/layers/ImageParameters",

        "esri/renderers/SimpleRenderer",

        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",

        "esri/tasks/GeometryService",

        "esri/toolbars/navigation",

        "dojo/dom-construct",
        "dojo/on",
        "dojo/parser",
        "dojo/_base/array",
        
        "esri/Color",

        "dijit/registry",
        "dijit/Toolbar",
        "dijit/Tooltip",
        "dijit/form/Button",
        "dijit/form/CheckBox", 
        "dijit/TOC",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dijit/layout/AccordionContainer",
        "dijit/TitlePane",

        "dojo/dom",
        "dojo/keys",
        "dojo/domReady!"

			 ], function(esriConfig, Map,SnappingManager, urlUtils, utils,
        Measurement, Legend, Popup, PopupTemplate, Scalebar,BasemapGallery,
        ArcGISTiledMapServiceLayer, FeatureLayer,ImageParameters,
        SimpleRenderer, 
        SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol, 
        GeometryService,
        Navigation, 
        domConstruct,on,parser,arrayUtils,
        Color,
        registry,Toolbar,Tooltip, Button,CheckBox,TOC,
        dom,keys
        ) {
        parser.parse();

				  map = new Map("map", {
					center: [115, 0],
					zoom: 3,
          sliderPosition: "top-right",
          sliderStyle: "large"
				  });
          var customBasemap = new ArcGISTiledMapServiceLayer(
          "http://geoservices.big.go.id/arcgis/rest/services/RBI/Rupabumi/MapServer");
          map.addLayer(customBasemap);

          //measurement
          var sfs = new SimpleFillSymbol(
          "solid",
          new SimpleLineSymbol("solid", new Color([195, 176, 23]), 2), 
          null
           );
          

          //      zoom
        var navToolbar;

        navToolbar = new Navigation(map);
          on(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);

          registry.byId("zoomin").on("click", function () {
            navToolbar.activate(Navigation.ZOOM_IN);
          });

          registry.byId("zoomout").on("click", function () {
            navToolbar.activate(Navigation.ZOOM_OUT);
          });

          registry.byId("zoomfullext").on("click", function () {
            navToolbar.zoomToFullExtent();
          });

          registry.byId("zoomprev").on("click", function () {
            navToolbar.zoomToPrevExtent();
          });

          registry.byId("zoomnext").on("click", function () {
            navToolbar.zoomToNextExtent();
          });

          registry.byId("pan").on("click", function () {
            navToolbar.activate(Navigation.PAN);
          });

          registry.byId("deactivate").on("click", function () {
            navToolbar.deactivate();
          });
          registry.byId("identify").on("click", function () {
            navToolbar.deactivate();
          });

          function extentHistoryChangeHandler () {
            registry.byId("zoomprev").disabled = navToolbar.isFirstExtent();
            registry.byId("zoomnext").disabled = navToolbar.isLastExtent();
          }

          //POPUP
          /*var popupadmin = new PopupTemplate({
            title: "Provinsi Kalimantan Timur",
            fieldInfos: [
              {
                fieldName: "KAB_KOTA_1",
                visible: true,
                label: "Kabupaten :"
              },
            
              {
                fieldName: "Kecamatan",
                visible: true,
                label: "Kecamatan :"
              }]
            
          });*/
          var popupall = new PopupTemplate({
            title: "Provinsi Kalimantan Timur",
            description: "{*}"  
            
          });
          /*var popupws = new PopupTemplate({
            title: "Provinsi Kalimantan Timur",
            fieldInfos: [
              {
                fieldName: "NAMA",
                visible: true,
                label: "DAS :"
              },
            
              {
                fieldName: "WS",
                visible: true,
                label: "WS :"
              },
            
              {
                fieldName: "Luas",
                visible: true,
                label: "Luas :"
              }]
            
          });*/
          var scalebar = new Scalebar({
          map: map,
          scalebarUnit: "metric"
        });

          //Administrasi LAYER
				  var admin = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/Administrasi/MapServer/10",
          {
              mode: FeatureLayer.MODE_ONDEMAND
            });
          //layer tematik fisik
          var elevasi = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/Topografi/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false
            });
          var sawah = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/SawahEksisting/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false
            });
          var ttp = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/TutupanLahan/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false
            });
          var jt = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/JenisTanah/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false
            });
          var ws = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/WilayahSungai/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
          var cat = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/CekunganAirTanah/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false
            });
          var geo = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/Geologi/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false
            });

          //Citra
           /* var citra = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/CitraSamboja2012/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false
            });*/

          //Layer BHGK
          var bendungan = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/BHGK/MapServer/2",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
          var bendung = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/BHGK/MapServer/1",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
          var bendali = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/BHGK/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
         
          var pantai = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/BHGK/MapServer/5",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
          var irigasi = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/BHGK/MapServer/4",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
          var rawa = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/Rawa/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
          var danau = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/Danau/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });

          // Layer Data Hidrologi
           var posarr = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/posARR/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
           var poshidro = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/postelemetri/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });

           //Layer Neraca Air
           var debit = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/debitaliran/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
           var chdas = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/curahhujan/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });

           //Banjir
            var banjir = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/peringatanbanjir/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
             var genanganbpn = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/genangan/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
             var genanganbtg = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/genangan/MapServer/1",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
             var genangansmrd = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/genangan/MapServer/2",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
              var poibpn = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/POI/MapServer/0",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
              var poibtg = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/POI/MapServer/1",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
              var poismrd = new FeatureLayer("http://36.83.3.83:6080/arcgis/rest/services/view/POI/MapServer/2",
          {
              mode: FeatureLayer.MODE_ONDEMAND,
              visible : false,
              infoTemplate: popupall,
              outFields: ["*"]
            });
          map.addLayers([admin,
                         
                         elevasi,sawah,ttp,jt,ws,cat,geo,
                         bendungan, bendung, bendali, pantai, irigasi, rawa, danau,
                         posarr,poshidro,
                         debit,chdas,
                         banjir, genanganbpn, genanganbtg, genangansmrd, poibpn, poibtg, poismrd]);
           map.on("layers-add-result", function (evt) {
            var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
              return {layer:layer.layer, title:layer.layer.name};
            });
            if (layerInfo.length > 0) {
              var legendDijit = new Legend({
                map: map,
                layerInfos: layerInfo
              }, "legendDiv");
              legendDijit.startup();
            }
           
          }); 

          //TOC
          map.on("layers-add-result", function (evt) {
          //TOC Administrasi
           var toc = new TOC({
                    map: map,
                    layerInfos: [{
                      layer: admin,
                      title: "Administrasi",
                      collapsed: true
                    }]
                  }, 'tocDiv');
                  toc.startup();
                     
                  //2014-04-04: added event
                  toc.on('toc-node-checked', function(evt){
                    if (console) {
                    console.log("TOCNodeChecked, rootLayer:"
                    +(evt.rootLayer?evt.rootLayer.id:'NULL')
                    +", serviceLayer:"+(evt.serviceLayer?evt.serviceLayer.id:'NULL')
                    + " Checked:"+evt.checked);
                    if (evt.checked && evt.rootLayer && evt.serviceLayer){
                      // evt.rootLayer.setVisibleLayers([evt.serviceLayer.id])
                    }
                  }
                  });
            //TOC tematik fisik
            var toc2 = new TOC({
              map: map,
              layerInfos: [{
                layer: elevasi,
                title: "Elevasi",
                collapsed: true
              },{
                layer: sawah,
                title: "Sawah",
                collapsed: true
              },{
                layer: ttp,
                title: "Tutupan Lahan",
                collapsed: true
              },{
                layer: jt,
                title: "Jenis Tanah",
                collapsed: true
              },{
                layer: ws,
                title: "Wilayah Sungai",
                collapsed: true
              },{
                layer: cat,
                title: "Cekungan Air Tanah",
                collapsed: true
              },{
                layer: geo,
                title: "Geologi",
                collapsed: true
              }]
            }, 'tocDiv2');
            toc2.startup();
               
            //2014-04-04: added event
            toc2.on('toc-node-checked', function(evt){
              if (console) {
              console.log("TOCNodeChecked, rootLayer:"
              +(evt.rootLayer?evt.rootLayer.id:'NULL')
              +", serviceLayer:"+(evt.serviceLayer?evt.serviceLayer.id:'NULL')
              + " Checked:"+evt.checked);
              if (evt.checked && evt.rootLayer && evt.serviceLayer){
                // evt.rootLayer.setVisibleLayers([evt.serviceLayer.id])
              }
            }
            });

           var toc3 = new TOC({
                    map: map,
                    layerInfos: [{
                      layer: bendungan,
                      title: "Bendungan",
                      collapsed: true
                    },{
                      layer: bendung,
                      title: "Bendung",
                      collapsed: true
                    },{
                      layer: bendali,
                      title: "Bendali",
                      collapsed: true
                    },{
                      layer: pantai,
                      title: "Pengaman Pantai",
                      collapsed: true
                    },{
                      layer: irigasi,
                      title: "Irigasi",
                      collapsed: true
                    },{
                      layer: rawa,
                      title: "Daerah Rawa",
                      collapsed: true
                    },{
                      layer: danau,
                      title: "Danau",
                      collapsed: true
                    }]
                  }, 'tocDiv3');
                  toc.startup();
                     
                  //2014-04-04: added event
                  toc.on('toc-node-checked', function(evt){
                    if (console) {
                    console.log("TOCNodeChecked, rootLayer:"
                    +(evt.rootLayer?evt.rootLayer.id:'NULL')
                    +", serviceLayer:"+(evt.serviceLayer?evt.serviceLayer.id:'NULL')
                    + " Checked:"+evt.checked);
                    if (evt.checked && evt.rootLayer && evt.serviceLayer){
                      // evt.rootLayer.setVisibleLayers([evt.serviceLayer.id])
                    }
                  }
                  });   
          
                  //TOC Data Hidrologi
           var toc4 = new TOC({
                    map: map,
                    layerInfos: [{
                      layer: posarr,
                      title: "Pos Curah Hujan"
                    },{
                      layer: poshidro,
                      title: "Pos Hidrologi"
                    }]
                  }, 'tocDiv4');
                  toc.startup();
                     
                  //2014-04-04: added event
                  toc.on('toc-node-checked', function(evt){
                    if (console) {
                    console.log("TOCNodeChecked, rootLayer:"
                    +(evt.rootLayer?evt.rootLayer.id:'NULL')
                    +", serviceLayer:"+(evt.serviceLayer?evt.serviceLayer.id:'NULL')
                    + " Checked:"+evt.checked);
                    if (evt.checked && evt.rootLayer && evt.serviceLayer){
                      // evt.rootLayer.setVisibleLayers([evt.serviceLayer.id])
                    }
                  }
                  });
                /* //TOC CItra
           var toc4 = new TOC({
                    map: map,
                    layerInfos: [{
                      layer: citra,
                      title: "Citra Samboja 2012"
                    }]
                  }, 'tocDiv6');
                  toc.startup();
                     
                  //2014-04-04: added event
                  toc.on('toc-node-checked', function(evt){
                    if (console) {
                    console.log("TOCNodeChecked, rootLayer:"
                    +(evt.rootLayer?evt.rootLayer.id:'NULL')
                    +", serviceLayer:"+(evt.serviceLayer?evt.serviceLayer.id:'NULL')
                    + " Checked:"+evt.checked);
                    if (evt.checked && evt.rootLayer && evt.serviceLayer){
                      // evt.rootLayer.setVisibleLayers([evt.serviceLayer.id])
                    }
                  }
                  });*/
                   //TOC Banjir
           var toc4 = new TOC({
                    map: map,
                    layerInfos: [{
                      layer: banjir,
                      title: "Peringatan Dini Banjir"
                    },{
                      layer: genanganbpn,
                      title: "Genangan Banjir Balikpapan"
                    },{
                      layer: genanganbtg,
                      title: "Genangan Banjir Bontang"
                    },{
                      layer: genangansmrd,
                      title: "Genangan Banjir Samarinda"
                    },{
                      layer: poibpn,
                      title: "Sarana Mitigasi Bencana Balikpapan"
                    },{
                      layer: poibtg,
                      title: "Sarana Mitigasi Bencana Bontang"
                    },{
                      layer: poismrd,
                      title: "Sarana Mitigasi Bencana Samarinda"
                    }]
                  }, 'tocDiv7');
                  toc.startup();
                     
                  //2014-04-04: added event
                  toc.on('toc-node-checked', function(evt){
                    if (console) {
                    console.log("TOCNodeChecked, rootLayer:"
                    +(evt.rootLayer?evt.rootLayer.id:'NULL')
                    +", serviceLayer:"+(evt.serviceLayer?evt.serviceLayer.id:'NULL')
                    + " Checked:"+evt.checked);
                    if (evt.checked && evt.rootLayer && evt.serviceLayer){
                      // evt.rootLayer.setVisibleLayers([evt.serviceLayer.id])
                    }
                  }
                  });
                  //TOC Neraca Air
           var toc5 = new TOC({
                    map: map,
                    layerInfos: [{
                      layer: chdas,
                      title: "Curah Hujan",
                      collapsed : true
                    },{
                      layer: debit,
                      title: "Debit Aliran",
                      collapsed : true
                    }]
                  }, 'tocDiv5');
                  toc.startup();
                     
                  //2014-04-04: added event
                  toc.on('toc-node-checked', function(evt){
                    if (console) {
                    console.log("TOCNodeChecked, rootLayer:"
                    +(evt.rootLayer?evt.rootLayer.id:'NULL')
                    +", serviceLayer:"+(evt.serviceLayer?evt.serviceLayer.id:'NULL')
                    + " Checked:"+evt.checked);
                    if (evt.checked && evt.rootLayer && evt.serviceLayer){
                      // evt.rootLayer.setVisibleLayers([evt.serviceLayer.id])
                    }
                  }
                  });
                });

          var snapManager = map.enableSnapping({
          snapKey: keys.CTRL
            });
  

            var measurement = new Measurement({
              map: map
            }, "measurementDiv");
            measurement.startup();
          });
         


          //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
          /*var basemapGallery = new BasemapGallery({
            showArcGISBasemaps: true,
            map: map
          }, "basemapGallery");
          basemapGallery.startup();
          
          basemapGallery.on("error", function(msg) {
            console.log("basemap gallery error:  ", msg);
          });*/
		

