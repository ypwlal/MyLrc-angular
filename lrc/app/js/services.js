app.factory('authontication',
	['$http'/*, '$localStorage'*/, function($http/*, $localStorage*/){
		return  { 
					signin: function(data, success, error) {
		                $http.post('/api/login', data).success(success).error(error);
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
					getLrcById: function(){
						return $http.post('/api/getLrc').then(function(res){
							return res.data;
						})
					},
					getUsrInfo: function(){
						return $http.post('/api/getUsrInfo').then(function(res){
							return res.data;
						})
					}
				}
	}]
);
