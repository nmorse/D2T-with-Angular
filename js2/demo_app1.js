// Rapid Prototype: Proposal POC...
// based on http://onehungrymind.com/angularjs-dynamic-templates/
// also see (for a good overview of angular)  http://stephanebegaudeau.tumblr.com/post/48776908163/everything-you-need-to-understand-to-start-with
// look into loading templates via https://github.com/requirejs/text
// or https://npmjs.org/package/grunt-angular-templates per (simpulton September 7, 2013 at 12:52 pm)
//

var app = angular.module('myApp', []);


app.directive('drivenTemplate', function ($compile) {
    var sectionTemplate = ['edit_mode: <input type="checkbox" ng-model="content.edit_mode" /><div class="demo-section"><h2>{{content.title}}</h2><p>{{content.narrative}}</p></div>',
							'<div class="demo-section"><input ng-model="content.title"/><input ng-model="content.narrative"/></div>'];
    var tableTemplate = ['<table><tbody><tr ng-repeat="row in content.data" ><td ng-repeat="cell in row" >{{cell}}</td></tr></tbody></table>',''];
    var tableWithNarrativeTemplate = ['<div class="demo-section"><table><tbody><tr ng-repeat="row in content.data" ><td ng-repeat="cell in row" >{{cell}}</td></tr></tbody></table><p>{{content.narrative}}</p></div>',''];
    var footerTemplate = ['<div class="demo-footer"><p>{{content.narrative}}</p></div>',''];

    var getTemplate = function(viewType, edit_mode) {
        var template = '';
        var template_index = edit_mode? 1: 0;
        switch(viewType) {
            case 'section':
                template = sectionTemplate[template_index];
                break;
            case 'table':
                template = tableTemplate[template_index];
                break;
            case 'table with narrative':
                template = tableWithNarrativeTemplate[template_index];
                break;
            case 'footer':
                template = footerTemplate[template_index];
                break;
                
        }
        return template;
    };

    var linker = function(scope, element, attrs) {
        element.html(getTemplate(scope.content.view_template, scope.content.edit_mode));
        $compile(element.contents())(scope);
    };

    return {
        restrict: "A",
        replace: true,
        link: linker,
        scope: {
            content:'=content'
        }
    };
});


function ViewCtrl($scope, $http) {
    "use strict";
    
    $scope.content = {
		"data":[
        {"view_template": "section", "edit_mode": false, "title": "My First Section", "narrative": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh felis, condimentum sit amet laoreet luctus, posuere auctor lorem. Nullam malesuada."},
        {"view_template": "table", "edit_mode": false, "title": "A First Table", "data" : [["COS 171", "Makeit or Breakit Data Structures", 3], ["COS 222", "Really Boring Data Structures", 3], ["COS 234", "Sequence Recognition in Data", 5]
			]},
        {"view_template": "section", "edit_mode": false, "title": "Second Section", "narrative": "Lorem ipsum blah blah blah dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh felis, condimentum sit amet laoreet luctus, posuere auctor lorem. Nullam malesuada."},
        {"view_template": "table with narrative", "edit_mode": false, "title": "A First Table", "data" : [["MAT 123", "Four Topics in Math", 3], ["MAT 456", "More Topics in Math", 6], ["MAT 789", "Studies in Sequences", 9]
			], "narrative": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh"},
        {"view_template": "footer", "edit_mode": false, "narrative": "Lorem ipsum footer ipsum dolor sit footer amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh"}
    ]};
    $scope.stringify_content = function () {
        return JSON.stringify($scope.content, null, ' ');
    };
    $scope.add_content = function () {
        $scope.content.data.unshift( {"view_template": "section", "title": "A New First Section", "narrative": "Lorem ipsum nan nan-nan nan-nan nahh dolor sit amet, consectetur adipiscing elit."} );
    };
}
