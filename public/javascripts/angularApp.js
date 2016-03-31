// JavaScript File

var app = angular.module('createEvent', ['ui.router']);

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


app.controller('MainCtrl', ['$scope', 'events', 
function($scope, events) {
	$scope.events = events.events;
	
	$scope.title = '';

	$scope.addEvent = function() {
		
		if ($scope.event_T === '') {
			return;
		}
		events.create({
			title : $scope.title,
      
    });
    $scope.title = '';
    
  };

}]);

/*app.controller('EventsCtrl', ['$scope', 'events', 'event',
function($scope, events, event){
    
    $scope.event = event;

}]);*/