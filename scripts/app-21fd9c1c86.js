!function(){"use strict";angular.module("gAnalytics",["gAnalytics.config","ngAnimate","ngCookies","ngSanitize","ngMessages","ui.router","ngMaterial","md.data.table"])}(),function(){"use strict";function e(e,t,a,n){var i=this;i.selectedProperty=e.selectedProperty,i.navbar={};var r=n.getConfig()||t;i.navbar.items=r.analyticsItems}e.$inject=["CONFIG","CONFIG_QUERIES","$http","configService"],angular.module("gAnalytics").controller("HomeController",e)}(),function(){"use strict";function e(e,t,a,n,i,r,o,s,l,d){function c(){v.startDate&&v.endDate?m():n.show(n.simple().textContent("Please choose valid Date").parent(angular.element("md-card-content")).position("top right").hideDelay(1e3))}function m(){v.disableRequest=!0;var a=o.getQuery();return v.startDate&&(a.dates["start-date"]=s(v.startDate).format("YYYY-MM-DD")),v.endDate&&(a.dates["end-date"]=s(v.endDate).format("YYYY-MM-DD")),a.queries.map(function(e){e=angular.extend(e,a.dates),e=angular.extend(e,{ids:r.getPropertyId().id})}),v.promise=e({url:i.serverUrl+"get-meterics-dimensions",method:"POST",headers:{"Content-Type":"application/json"},data:a.queries}).then(function(e){0==e.data.errorCode&&(v.loading=!1,v.progressFlag=!1,v.disableRequest=!1,v.analyticsData=[],_.each(e.data.data,function(e,t){if(0==e.errorCode){var n=_.find(a.queries,function(t){return t.request_id==e.data.request_id});e.data.rows=_.map(e.data.rows,function(e){return l.mapValueTypes(e,n.mapping)}),angular.extend(e.data,{queryItem:n}),v.analyticsData.push(e.data)}}),"Chart"==v.selectedView&&google.charts.setOnLoadCallback(u))},function(e){v.loading=!1,t.show(t.alert({title:"Warning",textContent:"Can't retrieve analytics data, please try again later",ok:"Close"}))}),v.promise}function u(){var e=(o.getQuery(),[]);_.each(v.analyticsData,function(t){var a=new google.visualization.DataTable;_.each(t.columnHeaders,function(e,n){a.addColumn(t.queryItem.mapping[n],e.name.split(":")[1].toUpperCase())}),a.addRows(t.rows),_.each(t.queryItem.chartTypes,function(n,i){var r=d.getChartType(n,angular.element(t.queryItem.chartContainers[i])[0]);e.push({chart:r,data:a,options:t.queryItem.chartOptions})})}),_.each(e,function(e){e.chart.draw(e.data,e.options)})}function g(e,t){angular.extend({},v.queryGrid,{page:e,limit:t})}function p(e,t){v.ordering.index=t,v.ordering.status="descending"==v.ordering.status?"ascending":"descending",_.each(v.analyticsData,function(e){e.rows=_.sortBy(e.rows,function(e){return e[t]}),"descending"==v.ordering.status&&(e.rows=e.rows.reverse())}),a.safeApply()}var v=this;v.disableRequest=!0,v.maxDate=new Date,v.minDate=new Date(2016,0,10),v.loading=!0,v.selectedRow=[],v.requestAnalytics=m,v.checkDateValidity=c,v.onPaginate=g,v.orderGrid=p,v.ordering={},v.ordering.index=0,v.ordering.status="ascending",v.queryGrid={order:"name",limit:5,page:1,options:[20,40,60,80,100]},a.$on("CHANGE_TAB_INDEX",function(t,a){v.selectedAnalyticsItem=r.getConfig().analyticsItems[a.selectedAnalyticItemIndex],v.views=r.getConfig().analyticsItems[a.selectedAnalyticItemIndex].views,v.selectedView=v.views[0],e.get(r.getConfig().analyticsItems[a.selectedAnalyticItemIndex].query_file).then(function(e){o.setQuery(e.data),m()})}),a.$on("propertyChanged",function(){m()})}e.$inject=["$http","$mdDialog","$rootScope","$mdToast","CONFIG","configService","analyticsQuery","moment","mapper","gCharts"],angular.module("gAnalytics").controller("AnalyticsController",e)}(),function(){"use strict";function e(){this.setQuery=function(e){this.queryConfig=e},this.getQuery=function(){return this.queryConfig}}angular.module("gAnalytics").service("analyticsQuery",e)}(),function(){"use strict";function e(e){function t(t,a){var n;switch(a){case"number":n=parseInt(t);break;case"string":n=t.toString();break;case"date":n=new Date(e(t,"YYYYMMDD"));break;default:n=t}return n}this.mapValueTypes=function(e,a){return _.map(e,function(e,n){return t(e,a[n])})}}e.$inject=["moment"],angular.module("gAnalytics").service("mapper",e)}(),function(){"use strict";function e(){google.charts.load("current",{packages:["line","bar","corechart"]}),this.getChartType=function(e,t){switch(e){case"google.charts.Line":return new google.charts.Line(t);case"google.charts.Bar":return new google.charts.Bar(t);case"google.visualization.PieChart":return new google.visualization.PieChart(t);case"google.visualization.GeoChart":return new google.visualization.GeoChart(t);case"google.visualization.LineChart":return new google.visualization.LineChart(t)}}}angular.module("gAnalytics").service("gCharts",e)}(),function(){"use strict";function e(){var e=null,t=null;this.setConfig=function(t){e=t},this.getConfig=function(){return e},this.setPropertyId=function(e){t=e},this.getPropertyId=function(){return t}}angular.module("gAnalytics").service("configService",e)}(),function(){"use strict";function e(){function e(e,t,a,n,i,r){function o(){r.setPropertyId(d.selectedProperty),e.$broadcast("propertyChanged",{property:d.selectedProperty})}function s(){n("left").toggle()}function l(e){var n=r.getConfig().analyticsItems[e];n.disabled?a.show(a.alert({title:"Warning",textContent:"This feature not activated now, please try again later",ok:"Close"})):t.go(n.state,{id:n.id})}var d=this;d.selectTab=l,d.toggleMenu=s,d.propertiesId=i.propertiesId,d.propertyChanged=o,e.$on("CHANGE_TAB_INDEX",function(e,t){d.selectedIndex=t.selectedAnalyticItemIndex})}e.$inject=["$rootScope","$state","$mdDialog","$mdSidenav","CONFIG","configService"];var t={restrict:"EA",templateUrl:"app/components/navbar/navbar.html",scope:{items:"="},controller:e,controllerAs:"vm",bindToController:{items:"="}};return t}angular.module("gAnalytics").directive("navBar",e)}(),function(){"use strict";function e(e){return function(t,a){return t?e(t).format(a):void 0}}e.$inject=["moment"],angular.module("gAnalytics").filter("dateFilter",e)}(),function(){"use strict";function e(e,t,a,n,i,r,o){e.debug("runBlock end"),t.safeApply=function(e){var t=this.$root.$$phase;"$apply"==t||"$digest"==t?e&&"function"==typeof e&&e():this.$apply(e)},t.$on("$stateChangeSuccess",function(e,n,s,l,d){var c=o.getConfig()||r;o.setConfig(c);var m=o.getPropertyId()||i.propertiesId[0].items[0];o.setPropertyId(m);var u=_.findIndex(c.analyticsItems,function(e){return s.id.indexOf(e.id)>-1});a(function(){t.$broadcast("CHANGE_TAB_INDEX",{selectedAnalyticItemIndex:u})},500)})}e.$inject=["$log","$rootScope","$timeout","$http","CONFIG","CONFIG_QUERIES","configService"],angular.module("gAnalytics").run(e)}(),function(){"use strict";function e(e,t){e.state("home",{templateUrl:"app/states/home/home.html",controller:"HomeController",controllerAs:"vm"}).state("home.dashboard",{url:"/dashboard",templateUrl:"app/states/dashboard/dashboard.html",controller:"DashboardController",controllerAs:"vm"}).state("home.dynamic-analytics",{url:"/analytics/:id",templateUrl:"app/states/analytics/analytics.html",controller:"AnalyticsController",controllerAs:"vm",params:{id:null}}),t.otherwise("/analytics/sessions-users")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("gAnalytics").config(e)}(),function(){"use strict";angular.module("gAnalytics").constant("moment",moment)}(),function(){"use strict";function e(e){e.debugEnabled(!0)}e.$inject=["$logProvider"],angular.module("gAnalytics").config(e)}(),function(){"use strict";function e(){return r.get("config/config.json").then(function(e){o=e.data,n.constant("CONFIG",e.data)})}function t(){return r.get("config/queries/"+o.selectedProperty+"/config.json").then(function(e){n.constant("CONFIG_QUERIES",e.data)})}function a(){angular.element(document).ready(function(){angular.bootstrap(document,["gAnalytics"])})}var n=angular.module("gAnalytics.config",[]),i=angular.injector(["ng"]),r=i.get("$http");e().then(t).then(a),n.value("ANALYTICS_QUERY","");var o=null}(),angular.module("gAnalytics").run(["$templateCache",function(e){e.put("app/components/navbar/navbar.html",'<div layout="row" layoutsm="column"><div flex="10" flex-sm="100"><md-button class="md-fab md-primary" ng-click="vm.toggleMenu()"><i class="material-icons menu-icon">menu</i></md-button><md-sidenav layout-align="center" md-component-id="left" class="md-sidenav-left"><md-toolbar class="md-theme-light"><h1 class="md-toolbar-tools">Settings</h1></md-toolbar><md-input-container><label>Project</label><md-select ng-model="vm.selectedProperty" ng-change="vm.propertyChanged()"><md-optgroup ng-repeat="group in vm.propertiesId" label="{{group.group}}"><md-option ng-value="item" ng-repeat="item in group.items">{{item.label}}</md-option></md-optgroup></md-select></md-input-container></md-sidenav></div><md-tabs flex="90" flex-sm="100" md-selected="vm.selectedIndex" md-border-bottom="" md-autoselect="" md-center-tabs=""><md-tab ng-repeat="item in ::vm.items" label="{{::item.label}}" ng-click="vm.selectTab($index)"></md-tab></md-tabs></div>'),e.put("app/states/analytics/analytics.html",'<md-content class="analytics-wrapper" layout-xs="column" layout="row" layout-margin="" layout-align="center center"><md-card><div layout="row"><div flex="50" hide-xs=""><md-card-header><md-card-avatar><md-icon md-font-library="material-icons" class="md-light md-48">trending_up</md-icon></md-card-avatar><md-card-header-text><span class="md-title">{{vm.label}}</span></md-card-header-text></md-card-header></div><div class="report-tools" flex="50" layout="row" layout-sm="column" layout-xs="column" layout-padding="" layout-wrap="" flex-xs="50" flex-offset-xs="20"><md-datepicker ng-model="vm.startDate" md-max-date="vm.maxDate" md-placeholder="Start Date"></md-datepicker><md-datepicker ng-model="vm.endDate" md-min-date="vm.startDate" md-max-date="vm.maxDate" md-placeholder="End Date"></md-datepicker><md-input-container class="md-block"><md-select ng-model="vm.selectedView" placeholder="View"><md-option ng-repeat="view in vm.views" ng-value="view">{{view}}</md-option></md-select></md-input-container><md-button class="md-raised md-primary" ng-disabled="vm.disableRequest" ng-click="vm.checkDateValidity()">Request</md-button></div></div><md-card-content flex-xs="50" flex-offset-xs="20"><div ng-if="vm.selectedView==\'Grid\'" ng-repeat="analyticsObj in vm.analyticsData"><div layout="row" class="totals-for-all-results" flex-offset="40" ng-repeat="(k,prop) in analyticsObj.totalsForAllResults"><div flex="30" class="key">{{(k.split(\':\')[1]).toUpperCase()}}:</div><div flex="30">{{prop}}</div></div><md-toolbar hide-xs="" class="md-table-toolbar md-default" ng-if="!vm.showFilter"><div class="md-toolbar-tools"><span>{{analyticsObj.queryItem.label}}</span><md-button hide-xs="" class="md-icon-button" ng-click="vm.showFilter=true"><md-icon class="material-icons">search</md-icon></md-button></div></md-toolbar><md-toolbar hide-xs="" class="md-table-toolbar md-default" ng-if="vm.showFilter" aria-hidden="true"><div class="md-toolbar-tools"><md-input-container md-no-float="" class="md-block filter-container"><md-icon class="material-icons">search</md-icon><input ng-model="vm.queryGrid.filter" type="text" placeholder="Search in all fields"></md-input-container><md-button class="md-icon-button" ng-click="vm.showFilter=false"><md-icon class="material-icons">close</md-icon></md-button></div></md-toolbar><md-table-container><table md-table="" ng-model="vm.selectedRow" md-progress="vm.promise"><thead md-head=""><tr md-row=""><th md-column="" md-order-by="" ng-repeat="columnHeader in analyticsObj.columnHeaders" ng-click="vm.orderGrid($parent.$index,$index)">{{(columnHeader.name.split(\':\')[1]).toUpperCase()}} <i class="material-icons" ng-if="$index==vm.ordering.index && vm.ordering.status==\'descending\'">arrow_drop_up</i> <i class="material-icons" ng-if="$index==vm.ordering.index && vm.ordering.status==\'ascending\'">arrow_drop_down</i></th></tr></thead><tbody md-body=""><tr md-row="" md-select="row" md-auto-select="" ng-repeat="row in analyticsObj.rows | filter: vm.queryGrid.filter | orderBy: vm.queryGrid.order | limitTo: vm.queryGrid.limit : (vm.queryGrid.page -1) * vm.queryGrid.limit"><td md-cell="" ng-repeat="rowItem in row track by $index"><div ng-if="analyticsObj.queryItem.mapping[$index]==\'date\'">{{rowItem | dateFilter:\'DD-MM-YYYY\'}}</div><div ng-if="analyticsObj.queryItem.mapping[$index]!=\'date\'">{{rowItem}}</div></td></tr></tbody></table></md-table-container><md-table-pagination md-limit="vm.queryGrid.limit" md-page="vm.queryGrid.page" md-options="vm.queryGrid.options" md-total="{{analyticsObj.rows.length}}" md-on-paginate="vm.onPaginate" md-page-select=""></md-table-pagination></div><div ng-if="vm.selectedView==\'Chart\'" class="analytics-charts" ng-repeat="analyticsObj in ::vm.analyticsData"><div ng-repeat="chart in ::analyticsObj.queryItem.chartContainers" class="{{::chart.replace(\'.\',\'\')}}"></div></div></md-card-content></md-card></md-content><md-progress-circular md-mode="indeterminate" md-diameter="100" class="progress-position" ng-if="vm.loading"></md-progress-circular>'),e.put("app/states/home/home.html",'<md-content flex="" class="main-content"><div ui-view="navbar"><nav-bar items="vm.navbar.items"></nav-bar></div><div ui-view=""></div></md-content>')}]);