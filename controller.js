var myLrcControllers = angular.module('myLrcControllers',[]);

myLrcControllers.controller('listCtrl',
	['$scope','getSong', function($scope, getSong){

		$scope.getPagination = function(songlist, id){
			var songTeam = [];
			var length = 5;
			for( var i=0; i<length; i++){
				if( songlist[ (id-1)*length+i ] ){
					songTeam.push(songlist[ (id-1)*length+i ]);	
				}				
			}
			return songTeam;
		}
		$scope.clickPagination = function(id){
			$scope.songlistTeam =  $scope.getPagination($scope.songlist,id);
		}

		$scope.songlist = getSong.songlist;	
		$scope.pagina_num = Math.ceil( songlist.length / 5 );
		$scope.songlistTeam = $scope.getPagination($scope.songlist,1);

		 
	}]
);
