(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-49f74c83"],{5660:function(e,t,n){"use strict";n("9cb6")},"9cb6":function(e,t,n){},b380:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"queryForm",attrs:{model:e.queryParams,inline:!0}},[n("el-form-item",{attrs:{label:"登录时间"}},[n("el-date-picker",{staticStyle:{width:"240px"},attrs:{size:"small","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.dateRange,callback:function(t){e.dateRange=t},expression:"dateRange"}})],1),e._v(" "),n("el-form-item",[n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["system:log:query"],expression:"['system:log:query']"}],attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.handleQuery}},[e._v("搜索")]),e._v(" "),n("el-button",{attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:e.resetQuery}},[e._v("重置")])],1)],1),e._v(" "),n("el-row",{staticClass:"mb8",attrs:{gutter:10}},[n("el-col",{attrs:{span:1.5}},[n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["system:log:del"],expression:"['system:log:del']"}],attrs:{type:"danger",icon:"el-icon-delete",size:"mini",disabled:e.multiple},on:{click:e.handleDelete}},[e._v("删除\n      ")])],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.logList},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"编号",prop:"user_log_id",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{label:"用户帐号",prop:"user.user_name",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{label:"IP",prop:"ip",width:"120"}}),e._v(" "),n("el-table-column",{attrs:{label:"UA",prop:"ua","show-overflow-tooltip":!0}}),e._v(" "),n("el-table-column",{attrs:{label:"登录时间",prop:"create_time",width:"150"}})],1),e._v(" "),n("pagination",{attrs:{total:e.total,page:e.queryParams.page,limit:e.queryParams.limit},on:{pagination:e.handlePageChange}})],1)},i=[],o=n("b775");function r(e){return Object(o["a"])({url:"/user-log/list",method:"get",params:e})}function l(e){return Object(o["a"])({url:"/user-log/del",method:"post",data:e})}var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},u=[];n("c5f6");Math.easeInOutQuad=function(e,t,n,a){return e/=a/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var c=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function d(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function p(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function g(e,t,n){var a=p(),i=e-a,o=20,r=0;t="undefined"===typeof t?500:t;var l=function e(){r+=o;var l=Math.easeInOutQuad(r,a,i,t);d(l),r<t?c(e):n&&"function"===typeof n&&n()};l()}var m={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&g(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&g(0,800)}}},h=m,f=(n("5660"),n("2877")),y=Object(f["a"])(h,s,u,!1,null,"6af373ef",null),b=y.exports,v={name:"Log",components:{Pagination:b},data:function(){return{loading:!0,ids:[],single:!0,multiple:!0,dateRange:[],queryParams:{page:1,limit:20,date:[]},total:0,logList:[]}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.queryParams.date=this.dateRange,r(this.queryParams).then((function(t){e.logList=t.data.logs,e.total=t.data.total,e.loading=!1}))},handleSelectionChange:function(e){this.ids=e.map((function(e){return e.user_log_id})),this.single=1!==e.length,this.multiple=!e.length},handleQuery:function(){this.getList()},resetQuery:function(){this.dateRange=[],this.resetForm("queryForm"),this.handleQuery()},handlePageChange:function(e){this.queryParams.page=e.page,this.queryParams.limit=e.limit,this.getList()},handleDelete:function(e){var t=this,n=e.user_log_id?[e.user_log_id]:this.ids;this.$confirm('是否确认删除日志编号为"'+n+'"的数据项?',"警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){return l(n)})).then((function(){t.getList(),t.msgSuccess("删除成功")})).catch((function(){}))}}},w=v,_=Object(f["a"])(w,a,i,!1,null,null,null);t["default"]=_.exports}}]);