app.factory('authontication',
	['$http'/*, '$localStorage'*/, function($http/*, $localStorage*/){
		return  { 
					signin: function(data, success, error) {
		                $http.post('/api/login', data).success(success).error(error);
		            },
		            signup: function(data, success, error){
		            	$http.post('/api/signup', data).success(success).error(error);
		            },
		            logout: function(){
		            	$http.post('/api/logout', data).success(success).error(error);
		            }
		        }
	}]
)
.factory('apiTest', 
	['$http', function($http){
		return	{ 
					getSongList:function(){
						return $http.post('/api/getSongList').then(function(res){
							return res.data;
						});
					},
					getLrcById: function(id){
						var data = {
							id: id
						};
						return $http.post('/api/getLrc',data).then(function(res){
							return res.data;
						})
					},
					getUsrInfo: function(){
						return $http.post('/api/getUsrInfo').then(function(res){
							return res.data;
						})
					},
					deleteSongById: function(songid, success, error){
						$http.post('/api/deleteSongById', {id: songid}).success(success).error(error);
					},
					addSong: function(data, success, error){
						$http.post('/api/addSong', data).success(success).error(error);
					}
				}
	}]
);
