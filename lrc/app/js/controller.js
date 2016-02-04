angular.module("lrcApp")
.controller('coverCtrl',['$scope', function($scope){
	$scope.currentPage = 'cover';
}])

.controller('loginCtrl',
	['$rootScope', '$scope', '$location', '$localStorage', 'authontication',
		function($rootScope, $scope, $location, $localStorage, authontication){
		    $scope.loginUsr = "";
		    $scope.loginPwd = "";
		    $scope.login = function(){
		    	var data = {
		    		username: $scope.loginUsr,
		    		password: $scope.loginPwd
		    	}
		    	authontication.signin(data, function(res){
		    		console.log(res);
		    		if(res.type != false){
		    			$localStorage.token = res.data;
	                	$location.path('/main');//change path
		    		}else{
		    			alert("Incorrect name or password");
		    			console.log('login failed');
		    		}
		    	}, function(){
		    		$rootScope.error = 'Failed to signin';
		    	});

	    	};
		}
	]
)

.controller('signupCtrl', 
	['$rootScope', '$scope', '$location', '$localStorage', 'authontication',
		function($rootScope, $scope, $location, $localStorage, authontication){
		    $scope.signupUsr = "";
		    $scope.signupPwd = "";
		    $scope.reSignupPwd = "";
		    $scope.signupError = 0;
		    $scope.signup = function(){
		    	if( $scope.signupUsr == "" || $scope.signupPwd == "" || $scope.reSignupPwd != $scope.signupPwd ){
		    		$scope.signupError = 1;
		    		return
		    	}
		    	var data = {
		    		username: $scope.signupUsr,
		    		password: $scope.signupPwd
		    	}
		    	authontication.signup(data, function(res){
		    		console.log(res);
		    		if(res.type != false){
		    			alert("sign up success");
		    			$localStorage.token = res.data.token;
	                	$location.path('/main');//change path
		    		}else{
		    			alert(res.data);
		    			console.log('signup failed');
		    		}
		    	}, function(){
		    		$rootScope.error = 'Failed to signin';
		    	});

	    	};
		}
	]
)

.controller('listCtrl',
	['$scope','getSong', function($scope, getSong){

		$scope.getPagination = function(songlist, page){
			var songTeam = [];
			var length = 5;
			for( var i=0; i<length; i++){
				if( songlist[ (page-1)*length+i ] ){
					songTeam.push(songlist[ (page-1)*length+i ]);	
				}				
			}
			return songTeam;
		}
		$scope.clickPagination = function(page){
			$scope.songlistTeam =  $scope.getPagination($scope.songlist,page);
			$scope.currentPage = page;
		}
		$scope.getPageNum = function(interval){
			var num = Math.ceil( $scope.songlist.length / interval );
			var arr = [];
			for ( var i=1;i<=num;i++) {
				arr.push(i);
			}
			return arr;
		}
		$scope.selectSongById = function(id){
			$scope.selectedSong = id;
		}
		$scope.currentPage = 1;
		$scope.selectedSong = -1;
		$scope.songlist = getSong.songlist;	
		$scope.pagina_arr = $scope.getPageNum(5);
		$scope.songlistTeam = $scope.getPagination($scope.songlist,1);		 
	}]
)

.controller('navCtrl',
	['$scope', '$localStorage', '$location', 'getUsrInfo', 
		function($scope, $localStorage, $location, getUsrInfo){
			$scope.alertShow = false;
	    	$scope.username = getUsrInfo.data.username;
	    	$scope.list = getUsrInfo.data.list;
	    	console.log($scope.list.length);
	    	$scope.logout = function(){
	    		$scope.alertShow = true;
	    	}
	    	$scope.logoutSure = function(){
	    		delete $localStorage.token;
	    		$scope.alertShow = false;
	    		$location.path("/");
	    	}
	    	$scope.logoutClear = function(){
	    		$scope.alertShow = false;
	    	}	

	}]
)

.controller('homeCtrl', 
	['$scope','$window', '$state', 'getSong','apiTest', 
		function($scope, $window, $state, getSong, apiTest){
			$scope.songlist = getSong.songlist;
			$scope.deleteAlert = false;
			$scope.showAsThumbnail = true;
			$scope.deleteId = -1;
			$scope.deleteItem = function(id){
				console.log(id);
				$scope.deleteId = id;
				$scope.deleteAlert = true;
			};
			$scope.deleteSure = function(){

				apiTest.deleteSongById($scope.deleteId, function(res){
					$scope.deleteAlert = false;
					alert(res.data);
					//$location.path('/main');
					$window.location.assign('/main/home');
				}, function(){
					$scope.deleteAlert = false;
				});

			};
			$scope.deleteCancle = function(){
				$scope.deleteAlert = false;
			};
			$scope.addSong = function(){
				$state.go('main.home.add');
			}
		}
	]
)

.controller('addCtrl', 
	['$scope', '$state', '$window', 'apiTest', 
		function($scope, $state, $window, apiTest){
			$scope.close = function(){
				$state.go('main.home');
			};

			$scope.addSubmit = function(){
				var lrc = $scope.addLrc.replace(/\n/g,"<br />");  
				var descr = $scope.addDescr.replace(/\n/g,"<br />"); 
				var data = {
					name: $scope.addName,
					describe: descr,
					lrc: lrc
				}
				console.log()
				apiTest.addSong(data, function(res){
					if(res.type){
						alert("add success");
						$window.location.assign('/main/home');
					}else{
						alert("add false");
					}				
				}, function(){
					alert("add false!Please retry.");
				});
			};
		}
	]
);
