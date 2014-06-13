// Rapid Prototype: Form Builder...
// Stores data to local storage (for now) 
// 

// A good overview of angular is here http://stephanebegaudeau.tumblr.com/post/48776908163/everything-you-need-to-understand-to-start-with
// also see http://onehungrymind.com/angularjs-dynamic-templates/
//
var FormangleApp;

//angular.module('LocalStorageModule').value('prefix', 'syllabi');
formangleApp = angular.module('formangleApp', ['ngSanitize'], function($routeProvider) {
    $routeProvider.
      when('/edit/:formId', {"controller": EditCtrl, "templateUrl":"edit.html"}).
      when('/restore',          {"controller": EditCtrl, "templateUrl":"edit.html"}).
      when('/blank',            {"controller": EditCtrl, "templateUrl":"edit.html"}).
      otherwise({redirectTo:'/restore'});
});

//formangleApp.directive("assignments", function () {
//	return {replace:true, templateUrl:'temp_assignments.html'};
//});

//syllabusApp.constant('MONGOLAB_CONFIG',{API_KEY:'50b52ec3e4b0e2ae617f3a82', DB_NAME:'syllabi'});
//syllabusApp.factory('Syllabi', function ($mongolabResourceHttp) {
//    return $mongolabResourceHttp('syllabi');
//});

function EditCtrl($scope, $timeout) {
	$scope.templates =
		[ { "name":"test1", "templateUrl":"edit.html"},
		  { "name":"test2", "templateUrl":"template2.html"} ];
	$scope.template = $scope.templates[1];
    $scope.current_template = "template2.html";
}
