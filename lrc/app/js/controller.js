var myLrcControllers = angular.module('myLrcControllers',[]);

myLrcControllers.controller('listCtrl',
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
);

myLrcControllers.controller('loginCtrl',function($scope){
    $scope.loginUsr = "";
    $scope.loginPwd = "";
});
