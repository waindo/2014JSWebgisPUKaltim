// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.10/js/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/_Wizard","../../declare dojo/_base/lang dojo/on dijit/_WidgetBase dojo/dom-construct dijit/layout/ContentPane ./AnimationHelper".split(" "),function(h,k,l,m,g,n,p){return h("esri.dijit.geoenrichment._Wizard",[m],{_currentPage:null,_anim:null,pages:null,stacking:"stretch",constructor:function(){this.pages={};this._anim=new p},buildRendering:function(){this.domNode=g.create("div",{"class":"_Wizard_Root"})},loadPage:function(a){a=this.pages[a];var c=this._currentPage;
a!==c&&(this._anim.finish(),c&&this._animPage("Anim_FadeOut").then(k.hitch(this.domNode,"removeChild",c.domNode)),this._currentPage=a,this.domNode.appendChild(this._currentPage.domNode),c&&this._animPage("Anim_FadeIn"),a._started?a.resize():(a.set("stacking",this.stacking),a.startup()))},_animPage:function(a){return this._anim.start([{node:this._currentPage.domNode,classes:[a,"Wizard_FadeAnim"]}])},resize:function(){this._currentPage&&this._currentPage.resize()},addButtons:function(a,c){var f=this.pages[a];
if(!f.buttonsNode){for(var d,e=f.layoutGrid.getChildren(),b=0;b<e.length;b++)2==e[b].row&&(d=e[b]);d||(d=new n({row:2,"class":"Wizard_BottomPane"}),f.layoutGrid.addChild(d));f.buttonsNode=g.create("div",{"class":"Wizard_Buttons"},d.domNode)}d={};for(b=0;b<c.length;b++)e=g.create("button",{"class":"Wizard_Button",innerHTML:c[b].label},f.buttonsNode),c[b].id&&(d[c[b].id]=e),l(e,"click",c[b].onClick);return d},destroy:function(){for(var a in this.pages)this.pages[a].destroyRecursive();this.pages={};
this.inherited(arguments)}})});