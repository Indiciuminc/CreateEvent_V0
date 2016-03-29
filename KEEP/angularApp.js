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
      subtitle : $scope.subtitle,
      date : $scope.date,
      s_Time : $scope.s_Time,
      e_Time : $scope.e_Time,
      regist : $scope.regist,
      addmis : $scope.addmis,
      event_I : $scope.event_I,
      event_Key : $scope.event_Key,
      street_Nu : $scope.street_Nu,
      street_Na : $scope.street_Na,
      city : $scope.city,
      prosta : $scope.prosta,
      postzip : $scope.postzip,
      web : $scope.web,
      faceb : $scope.faceb,
      insta : $scope.insta,
      tweet : $scope.tweet,
      google : $scope.google,
    });
    $scope.title = '';
    $scope.subtitle = '';
    $scope.date = '';
    $scope.s_Time = '';
    $scope.e_Time = '';
    $scope.regist = '';
    $scope.addmis = '';
    $scope.event_I = '';
    $scope.event_Key = '';
    $scope.street_Nu = '';
    $scope.street_Na = '';
    $scope.city = '';
    $scope.prosta = '';
    $scope.postzip = '';
    $scope.web = '';
    $scope.faceb = '';
    $scope.insta = '';
    $scope.tweet = '';
    $scope.google = '';
  };

}]);

app.controller('EventsCtrl', ['$scope', 'events', 'event',
function($scope, events, event){
    
    $scope.event = event;

}]);