angular.module("lrcApp")
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
		    		if(res.type != false){

		    			$localStorage.token = res.token;
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
	    	$scope.username = getUsrInfo.username;
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
);
