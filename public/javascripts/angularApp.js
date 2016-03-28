// JavaScript File

var app = angular.module('createEvent', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url : '/home',
		templateUrl : '/home.html',
		controller : 'MainCtrl',
		resolve : {
			postPromise : ['events',
			function(events) {
				return events.getAll();
			}]

		}
		
	}).state('posts', {
		url : '/posts/:id',
		templateUrl : '/posts.html',
		controller : 'PostsCtrl',
		resolve : {
			post : ['$stateParams', 'posts',
			function($stateParams, posts) {
				return posts.get($stateParams.id);
			}]

		}
		
	}).state('events', {
		url : '/events/:id',
		templateUrl : '/events.html',
		controller : 'EventsCtrl',
		resolve : {
			post : ['$stateParams', 'events',
			function($stateParams, events) {
				return events.get($stateParams.id);
			}]

		}
		
	}).state('login', {
		url : '/login',
		templateUrl : '/login.html',
		controller : 'AuthCtrl',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
			}
		}]

	}).state('register', {
		url : '/register',
		templateUrl : '/register.html',
		controller : 'AuthCtrl',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
			}
		}]

	});

	$urlRouterProvider.otherwise('createEvent');
}]);

app.factory('auth', ['$http', '$window',
function($http, $window) {
	var auth = {};

	auth.saveToken = function(token) {
		$window.localStorage['createEvent-token'] = token;
	};

	auth.getToken = function() {
		return $window.localStorage['createEvent-token'];
	}

	auth.isLoggedIn = function() {
		var token = auth.getToken();

		if (token) {
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	auth.currentUser = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
		}
	};

	auth.register = function(user) {
		return $http.post('/register', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};
	
	auth.register = function(user) {
		return $http.event('/register', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(user) {
		return $http.post('/login', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};
	
	auth.logIn = function(user) {
		return $http.post('/login', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logOut = function() {
		$window.localStorage.removeItem('createEvent-token');
	};

	return auth;
}]);



app.factory('posts', ['$http', 'auth', function($http, auth){
  var o = {
    posts: []
  };
  
  o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };
  
  o.create = function(post) {
    return $http.post('/posts', post, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.posts.push(data);
    });
  };
  
  o.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      post.upvotes += 1;
    });
  };
  
  o.downvote = function(post) {
    return $http.put('/posts/' + post._id + '/downvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
        post.upvotes -= 1;
    });
  };
  
  o.get = function(id) {
    return $http.get('/posts/' + id).then(function(res){
      return res.data;
    });
  };
  
  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  
  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      comment.upvotes += 1;
    });
  };
  
  o.downvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/downvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      comment.upvotes -= 1;
    });
  };
  
  return o;
  
}]);

app.factory('events', ['$http', 'auth', function($http, auth){
  var o = {
    events: []
  };
  
  o.getAll = function() {
    return $http.get('/events').success(function(data){
      angular.copy(data, o.events);
    });
  };
  
  o.create = function(event) {
    return $http.event('/events', event, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.events.push(data);
    });
  };
  
  o.upvote = function(event) {
    return $http.put('/events/' + event._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      event.upvotes += 1;
    });
  };
  
  o.downvote = function(event) {
    return $http.put('/events/' + event._id + '/downvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
        event.upvotes -= 1;
    });
  };
  
  o.get = function(id) {
    return $http.get('/events/' + id).then(function(res){
      return res.data;
    });
  };
  
  o.addComment = function(id, comment) {
    return $http.post('/events/' + id + '/comments', comment, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  
  o.upvoteComment = function(event, comment) {
    return $http.put('/events/' + event._id + '/comments/'+ comment._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      comment.upvotes += 1;
    });
  };
  
  o.downvoteComment = function(event, comment) {
    return $http.put('/events/' + event._id + '/comments/'+ comment._id + '/downvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      comment.upvotes -= 1;
    });
  };
  
  return o;
  
}]);








app.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}])

app.controller('MainCtrl', ['$scope', 'events', 'auth',
function($scope, events, auth) {
	$scope.events = events.events;
	$scope.isLoggedIn = auth.isLoggedIn;
	
	$scope.event_T = '';

	$scope.addEvent = function() {
		if ($scope.event_T === '') {
			return;
		}
		events.create({
			event_T: $scope.event_T,
      event_S: $scope.event_S,
      date: $scope.date,
      start_T: $scope.start_T,
      end_T: $scope.end_T,
      regist: $scope.regist,
      addmis: $scope.addmis,
      event_I: $scope.event_I,
      event_Key: $scope.event_Key,
      street_Nu: $scope.street_Nu,
      street_Na: $scope.street_Na,
      city: $scope.city,
      prosta: $scope.prosta,
      postzip: $scope.postzip,
      web: $scope.web,
      faceb: $scope.faceb,
      insta: $scope.insta,
      tweet: $scope.tweet,
      google: $scope.google,
    });
    $scope.event_T = '';
    $scope.event_S = '';
    $scope.date = '';
    $scope.start_T = '';
    $scope.end_T = '';
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

	$scope.upvote = function(event) {
		
		console.log('Upvoting:' + event.event_T + "votes before:" + event.upvotes);
		events.upvote(event);
	};
	$scope.downvote = function(event) {
		events.downvote(event);
	};
}]);

app.controller('PostsCtrl', ['$scope', 'posts', 'post', 'auth',
function($scope, posts, post, auth){
    
    $scope.post = post;
    $scope.isLoggedIn = auth.isLoggedIn;

$scope.addComment = function(){
  if($scope.body === '') { return; }
  posts.addComment(post._id, {
    body: $scope.body,
    author: 'user',
  }).success(function(comment) {
    $scope.post.comments.push(comment);
  });
  $scope.body = '';
};

$scope.upvote= function(comment){
  posts.upvoteComment(post, comment);
};

$scope.downvote= function(comment){
  posts.downvoteComment(post, comment);
};

}]);


app.controller('EventsCtrl', ['$scope', 'events', 'event', 'auth',
function($scope, events, event, auth){
    
    $scope.event = event;
    $scope.isLoggedIn = auth.isLoggedIn;

$scope.addComment = function(){
  if($scope.body === '') { return; }
  events.addComment(event._id, {
    body: $scope.body,
    author: 'user',
  }).success(function(comment) {
    $scope.event.comments.push(comment);
  });
  $scope.body = '';
};

$scope.upvote= function(comment){
  events.upvoteComment(event, comment);
};

$scope.downvote= function(comment){
  events.downvoteComment(event, comment);
};

}]);



app.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
}]);
