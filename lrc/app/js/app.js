var app = angular.module('lrcApp', ['ui.router', 'ngStorage', 'ngSanitize', 'ngAnimate']);

app.run(function($rootScope){ //listen stateChangeEvent, lazy loading
	$rootScope
        .$on('$stateChangeStart', 
            function(event, toState, toParams, fromState, fromParams){ 
                console.log('start');
        });

    $rootScope
        .$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){ 
                console.log('stop');
        });
})

app.config(
	[ '$stateProvider', '$urlRouterProvider', '$locationProvider','$httpProvider',
		function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,apiTest ) {
			$urlRouterProvider.when("/", "/cover/info");
			$urlRouterProvider.when("/main", "/main/home");
			$urlRouterProvider.when("/preasure", "/main/preasure");
			$urlRouterProvider.when("/", "/cover/info"); 

			$stateProvider
				.state("cover",{
					url: '/cover',
					abstract: true,
					templateUrl: '../pages/cover.html',
					controller: 'coverCtrl'
				})
				.state("cover.info", {
					url: '/info',
					views: {
						'cover': {
							templateUrl: '../pages/cover-info.html'
						}
					}
				})
				.state("cover.signIn", {
					url:'/signin',
					views: {
						'cover' : {
							templateUrl: '../pages/cover-login.html',
							controller: 'loginCtrl'
						}
					}
				})
				.state("cover.signUp", {
					url:'/signup',
					views: {
						'cover' : {
							templateUrl: '../pages/cover-signup.html',
							controller: 'signupCtrl'
						}
					}
				})
				.state("main", {
					url: '/main',
					abstract: true,
					templateUrl: '../pages/main.html',
					resolve: {
						getUsrInfo:function(apiTest){
							return apiTest.getUsrInfo();
						}
					},
					controller: 'navCtrl'	
				})
				.state("main.home", {
					url: '/home',
					views: {
						'main': {
							templateUrl: '../pages/home.html',
							resolve: {
								getSong:function(apiTest){ 
									return apiTest.getSongList(); //return data or promise function
								}
							},
							controller: 'homeCtrl'
						}
					}
				})
				.state("main.home.add", {
					url: '',
					views: {
						'overlay':{
							templateUrl: '../pages/addSong.html',
							controller: 'addCtrl'
						}
					}
				})
				.state("main.empty",{
					url: '/empty',
					views: {
						'main': {
							templateUrl: '../pages/empty-tips.html'
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
								getSong:function(apiTest){ 
									return apiTest.getSongList(); //return data or promise function
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
								getLrc: function(apiTest, $stateParams){
									return apiTest.getLrcById($stateParams.SongId);
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

			$httpProvider.interceptors.push(['$q', '$window', '$localStorage',
					function($q, $window, $localStorage){
						return {
			                'request': function (config) {
			                    config.headers = config.headers || {};
			                    if ($localStorage.token) {
			                        config.headers.Authorization = 'MJ ' + $localStorage.token;
			                    }
			                    return config;
			                },
			                'responseError': function(response) {
			                	console.log('res error:'+response.status);
			                    if(response.status === 401 || response.status === 403) {
			                        $window.location.assign('/');
			                        //$location.path('/'); angular didn't diguest
			                    }
			                    return $q.reject(response);
			                }
		           	 	};
					}
				]);
}]);

