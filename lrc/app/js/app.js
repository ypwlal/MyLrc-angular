var app = angular.module('lrcApp', ['ui.router', 'myLrcControllers']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.when("/", "/login");
	$urlRouterProvider.when("/main", "/main/home");
	$urlRouterProvider.when("/preasure", "/main/preasure");
	$urlRouterProvider.otherwise("/");  

	$stateProvider
		.state("login",{
			url: '/login',
			templateUrl: '../pages/login.html',
			controller: 'loginCtrl'
		})
		.state("main", {
			url: '/main',
			abstract: true,
			templateUrl: '../pages/main.html'	
		})
		.state("main.home", {
			url: '/home',
			views: {
				'main': {
					templateUrl: '../pages/home.html'
				}
			}
		})
		.state("main.preasure", {
			url: '/preasure',
			abstract: true,
			views: {
				'main': {
					templateUrl: '../pages/preasure.html'
				}
			}
		})
		.state("main.preasure.list", {
			url: '',
			views: {
				'list@main.preasure': {
					templateUrl: '../pages/list.html',
					resolve: {
						getSong: function(){
							return {
								'songlist':[{
									'id':1,
									'name':"Cras justo odio"
								},{
									'id':2,
									'name':"Cras justo odio"
								},{
									'id':3,
									'name':"Cras justo odio"
								},{
									'id':4,
									'name':"Cras justo odio"
								},{
									'id':5,
									'name':"Cras justo odio"
								},{
									'id':6,
									'name':"Cras justo odio"
								},{
									'id':7,
									'name':"Cras justo odio"
								},{
									'id':8,
									'name':"Cras justo odio"
								}]
							}
						}
					},
					controller: 'listCtrl'
				},
				'lrc@main.preasure': {
					templateUrl: '../pages/panel.html',
					controller: function($scope){
						$scope.title = "Welcome";
						$scope.content = "Nice to meet u.";
					}
				}
			}
		})
		.state("main.preasure.list.detial", {
			url: '/Song/:SongId',
			views: {
				'lrc@main.preasure': {
					templateUrl: '../pages/panel.html',
					resolve: {
						getLrc: function(){
							return {
								'lrc': 'asdasdasda'
							}
						}
					},
					controller: function($scope, $stateParams, getLrc){
						$scope.title = "ID:"+$stateParams.SongId;
						$scope.content = getLrc.lrc;
					}
				}
			}
		});
		$locationProvider.html5Mode(true);
		/*$locationProvider.html5Mode({ enabled: true, requireBase: false });*/
});
