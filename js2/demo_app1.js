// Rapid Prototype: Proposal POC...
// based on http://onehungrymind.com/angularjs-dynamic-templates/
// also see (for a good overview of angular)  http://stephanebegaudeau.tumblr.com/post/48776908163/everything-you-need-to-understand-to-start-with
// look into loading templates via https://github.com/requirejs/text
// or https://npmjs.org/package/grunt-angular-templates per (simpulton September 7, 2013 at 12:52 pm)
//

var app = angular.module('myApp', []);


app.directive('drivenTemplate', function ($compile) {
    var sectionTemplate = '<div class="demo-section"><h2>{{content.title}}</h2><p>{{content.narrative}}</p></div>';
    var tableTemplate = '<table><tbody><tr ng-repeat="row in content.data" ><td ng-repeat="cell in row" >{{cell}}</td></tr></tbody></table>';
    var tableWithNarrativeTemplate = '<div class="demo-section"><table><tbody><tr ng-repeat="row in content.data" ><td ng-repeat="cell in row" >{{cell}}</td></tr></tbody></table><p>{{content.narrative}}</p></div>';
    var footerTemplate = '<div class="demo-footer"><p>{{content.narrative}}</p></div>';

    var getTemplate = function(viewType) {
        var template = '';
        switch(viewType) {
            case 'section':
                template = sectionTemplate;
                break;
            case 'table':
                template = tableTemplate;
                break;
            case 'table with narrative':
                template = tableWithNarrativeTemplate;
                break;
            case 'footer':
                template = footerTemplate;
                break;
                
        }
        return template;
    };

    var linker = function(scope, element, attrs) {
        element.html(getTemplate(scope.content.view_type));
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
    $scope.content = {"data":[
        {"view_type": "section", "title": "My First Section", "narrative": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh felis, condimentum sit amet laoreet luctus, posuere auctor lorem. Nullam malesuada."},
        {"view_type": "table" , "title": "A First Table", "data" : [["COS 171", "Makeit or Breakit Data Structures", 3], ["COS 222", "Really Boring Data Structures", 3], ["COS 234", "Sequence Recognition in Data", 5]
			]},
        {"view_type": "section", "title": "Second Section", "narrative": "Lorem ipsum blah blah blah dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh felis, condimentum sit amet laoreet luctus, posuere auctor lorem. Nullam malesuada."},
        {"view_type": "table with narrative" , "title": "A First Table", "data" : [["MAT 123", "Four Topics in Math", 3], ["MAT 456", "More Topics in Math", 6], ["MAT 789", "Studies in Sequences", 9]
			], "narrative": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh"},
        {"view_type": "footer", "narrative": "Lorem ipsum footer ipsum dolor sit footer amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh"}
    ]};
    $scope.stringify_content = function () {
        return JSON.stringify($scope.content, null, ' ');
    };
    $scope.add_content = function () {
        $scope.content.data.unshift( {"view_type": "section", "title": "A New First Section", "narrative": "Lorem ipsum nan nan-nan nan-nan nahh dolor sit amet, consectetur adipiscing elit."} );
    };
}
