(this["webpackJsonpbulu-gold-standard"]=this["webpackJsonpbulu-gold-standard"]||[]).push([[17,35],{121:function(e,r,i){"use strict";var t=i(2),n=i.n(t),a=i(3),d=i(8),l=i(13),u=i(0),o=i(1),s=i(4),c={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"variants"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"prefix"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"variants"},arguments:[{kind:"Argument",name:{kind:"Name",value:"prefix"},value:{kind:"Variable",name:{kind:"Name",value:"prefix"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"productId"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"sku"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"image"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"variantTitle"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"productTitle"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"available"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:168,source:{body:"query variants($prefix: String!) {\n  variants(prefix: $prefix) {\n    id\n    productId\n    sku\n    image\n    variantTitle\n    productTitle\n    price\n    available\n  }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}}}},v=function(){function e(){var r=this;Object(d.a)(this,e),this.variants=Object(o.m)(new Map),this.variant=null,this.variantSelected=null,this.variantTitle=null,this.plan=null,this.size=null,this.month=null,this.set=function(e,i){r[e]=i},this.fetchVariants=Object(a.a)(n.a.mark((function e(){var i,t,a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=c,t={prefix:"00"},e.next=4,Object(s.b)(i.loc.source.body,t);case 4:return a=e.sent,e.next=7,a.data.variants.map((function(e){var i=e.sku;return r.variants.set(i,e)}));case 7:case"end":return e.stop()}}),e)})))}return Object(l.a)(e,[{key:"skuPlan",get:function(){switch(this.plan){case"Basic":return"SKU0000X";case"Deluxe":return"002X";default:return"SKU"}}},{key:"skuSize",get:function(){switch(this.size){case"S":return"1";case"M":return"2";case"L":return"3";default:return"1"}}},{key:"vairantID",get:function(){return this.variants.get(this.skuPlan+"_"+this.skuSize).id}}]),e}();Object(o.h)(v,{variants:o.m,variantSelected:o.m,variant:o.m,variantTitle:o.m,plan:o.m,month:o.m,size:o.m,set:o.d,fetchVariants:o.d}),r.a=Object(u.createContext)(new v)},123:function(e,r,i){e.exports={BorderGold:"Border_BorderGold__3q9qi",BorderActiveGold:"Border_BorderActiveGold__1-gp-",BorderBlue:"Border_BorderBlue__2i7ua",BorderActiveBlue:"Border_BorderActiveBlue__KFkuG",BorderPink:"Border_BorderPink__2ZSbr",BorderActivePink:"Border_BorderActivePink__2eYjn",BorderPrimary:"Border_BorderPrimary__i7a3J",BorderActivePrimary:"Border_BorderActivePrimary__4AkeE",BorderDisabled:"Border_BorderDisabled__1ldBd"}},37:function(e,r,i){"use strict";i.r(r),i.d(r,"Border",(function(){return d}));var t=i(0),n=i.n(t),a=i(123),d=function(e){var r={blue:a.BorderBlue,gold:a.BorderGold,pink:a.BorderPink}[e.color]||a.BorderBlue,i={blue:a.BorderActiveBlue,gold:a.BorderActiveGold,pink:a.BorderActivePink}[e.color]||a.BorderActiveBlue;return n.a.createElement("div",{className:[e.active?i:r,e.disableBorder?a.BorderDisabled:""].join(" ")},e.children)};r.default=d},59:function(e,r,i){"use strict";i.r(r),i.d(r,"DeluxeBox",(function(){return l}));var t=i(0),n=i.n(t),a=i(121),d=i(37),l=function(e){var r=Object(t.useContext)(a.a);return n.a.createElement("div",{className:"column"},n.a.createElement(d.Border,{color:e.color,active:r[e.data.key]===e.data.value},n.a.createElement("button",{className:"box",href:"#",onClick:function(i){i.preventDefault(),r.set(e.data.key,e.data.value)}},n.a.createElement("div",{style:{maxWidth:"300px",margin:"0 auto",textAlign:"center"}},n.a.createElement("img",{alt:"deluxe",style:{width:"300px"},src:e.data.image}),n.a.createElement("p",null,e.data.title)))))}}}]);
//# sourceMappingURL=17.d594b43e.chunk.js.map