// JavaScript File

var app = angular.module('createEvent', ['ui.router', 'vsGoogleAutocomplete']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    
    .state('events', {
      url: '/events/{id}',
      templateUrl: '/events.html',
      controller: 'EventsCtrl'
    });

  $urlRouterProvider.otherwise('home');

}]);


app.factory('events', ['$http', function($http){
  var o = {
    events: []
  };
  
  o.getAll = function() {
    return $http.get('/events').success(function(data){
      angular.copy(data, o.events);
    });
  };
  
  o.create = function(event) {
  return $http.post('/events', event).success(function(data){
    o.events.push(data);
    });
  };
  
  o.get = function(id) {
    return $http.get('/events/' + id).then(function(res){
      return res.data;
    });
  };
  
  return o;
  
}]);


app.controller('MainCtrl', ['$scope', 'events', function($scope, events, uploader) {
	$scope.events = events.events;
	
	$scope.ename = '';
	
	$scope.addEvent = function() {
		
		if ($scope.ename === '') {
			return;
		}
		events.create({
			ename : $scope.ename,
			date : $scope.date,
			sTime: $scope.sTime,
			eTime: $scope.eTime,
			info: $scope.info,
			admis: $scope.admis,
			cost: $scope.cost,
			fee: $scope.fee,
			pic : $scope.pic,
			cat: $scope.cat,
			address : $scope.address,
			
    });
    
    $scope.ename = '';
    $scope.date = '';
    $scope.sTime = '';
    $scope.eTime = '';
    $scope.info = '';
    $scope.admis = '';
    $scope.cost = '';
    $scope.fee = '';
    $scope.pic = '';
    $scope.cat = '';
    $scope.address = {
        name: '',
        place: '',
        components: {
          placeId: '',
          streetNumber: '', 
          street: '',
          city: '',
          state: '',
          countryCode: '',
          country: '',
          postCode: '',
          district: '',
          location: {
            lat: '',
            long: ''
        }
      }
    };

  };
  
  $scope.upload = function(){
        uploader.pick(
            {
                mimetype: 'image/*',
                language: 'en',
                services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM'],
                openTo: 'IMAGE_SEARCH'
                
            },
            function(Blob){
                console.log(JSON.stringify(Blob));
                $scope.pic = Blob;
                $scope.$apply();
            }
            
        );
        
    };

}]);