var app = angular.module('lrcApp', ['ui.router', 'myLrcControllers']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when("", "/home");

	$stateProvider
		.state("home", {
			url: '/home',
			templateUrl: 'pages/home.html'
		})
		.state("preasure", {
			abstract: true,
			url: '/preasure',
			templateUrl: 'pages/preasure.html'
		})
		.state("preasure.list", {
			url: '',
			views: {
				'list': {
					templateUrl: 'pages/list.html',
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
								}]
							}
						}
					},
					controller: 'listCtrl'
				},
				'lrc': {
					templateUrl: 'pages/panel.html',
					controller: function($scope){
						$scope.title = "Welcome";
						$scope.content = "Nice to meet u.";
					}
				}
			}
		})
		.state("preasure.list.detial", {
			url: '/Song/:SongId',
			views: {
				'lrc@preasure': {
					templateUrl: 'pages/panel.html',
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
		})
});