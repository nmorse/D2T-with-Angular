// Rapid Prototype: Syllabus Builder...
// Stores data to local storage (for now) 
// 

// A good overview of angular is here http://stephanebegaudeau.tumblr.com/post/48776908163/everything-you-need-to-understand-to-start-with
//
var syllabusApp;

angular.module('LocalStorageModule').value('prefix', 'syllabi');
syllabusApp = angular.module('syllabusApp', ['LocalStorageModule', 'ngSanitize'], function($routeProvider) {
    $routeProvider.
      when('/edit/:syllabusId', {"controller": EditCtrl,   "templateUrl": "edit.html"}).
      when('/restore',          {"controller": CreateCtrl, "templateUrl": "edit.html"}).
      when('/blank',            {"controller": BlankCtrl,  "templateUrl": "edit.html"}).
      otherwise({redirectTo:'/restore'});
})
.directive("refCourseSelector", function () {
	return {replace:true, templateUrl:'temp_ref_course_selector.html'};
})
.directive("requiredResources", function () {
	return {replace:true, templateUrl:'temp_required_resources.html'};
})
.directive("supplementalResources", function () {
	return {replace:true, templateUrl:'temp_supplemental_resources.html'};
})
.directive("courseLeaningOutcomes", function () {
	return {replace:true, templateUrl:'temp_course_leaning_outcomes.html'};
})
.directive("weeklyCourseSchedule", function () {
	return {replace:true, templateUrl:'temp_weekly_course_schedule.html'};
})
.directive("assignments", function () {
	return {replace:true, templateUrl:'temp_assignments.html'};
});

//syllabusApp.constant('MONGOLAB_CONFIG',{API_KEY:'50b52ec3e4b0e2ae617f3a82', DB_NAME:'syllabi'});
//syllabusApp.factory('Syllabi', function ($mongolabResourceHttp) {
//    return $mongolabResourceHttp('syllabi');
//});

function RefCourseSelectorCtrl($scope, $timeout) {
	$scope.templates =
		[ { name: 'temp_ref_course_selector.html', url: 'temp_ref_course_selector.html'},
		  { name: 'template2.html', url: 'template2.html'} ];
	$scope.template = $scope.templates[0];
	
