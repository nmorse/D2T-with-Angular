// Rapid Prototype: Proposal POC...
// based on http://onehungrymind.com/angularjs-dynamic-templates/
// also see (for a good overview of angular)  http://stephanebegaudeau.tumblr.com/post/48776908163/everything-you-need-to-understand-to-start-with
// look into loading templates via https://github.com/requirejs/text
// or https://npmjs.org/package/grunt-angular-templates per (simpulton September 7, 2013 at 12:52 pm)
//

// app is a place to collect directives, controlers, etc.
var app = angular.module('myApp', []);


// data-driven-template is a directive that dynamically links the local content (in the elements $scope) to a template.
// ToDo: load template dynamically as an ajax or socket or local-storage request.
// 
app.directive('drivenTemplate', function ($compile, $templateCache) {

    var getTemplate = function(viewType, edit_mode) {
        var template_suffix = edit_mode? "_edit": "_preview";
        var html = $templateCache.get(viewType + template_suffix + ".html");
        return html;
    };

    var linker = function(scope, element, attrs) {
        scope.$watch("content.edit_mode", function() {
          //this.templateUrl = '/section_preview.html';
          element.html(getTemplate(scope.content.view_template, scope.content.edit_mode));
          $compile(element.contents())(scope);
        });
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

// ViewCtrl injects $scope and $http and registers the content and view_mode state.
// ToDo: Setup a service to fetch contert from an API.
// ToDo: Fix change of edit mode (perhaps $watch?) so that it changes the template *_preview <-> *_edit <-> *_rearrange
function ViewCtrl($scope, $http) {
    "use strict";
    $scope.view_mode = "preview";
    $scope.content = {
		"data":[
    {
        "view_template": "section",
        "edit_mode": false,
        "title": "My First Section",
        "narrative": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh felis, condimentum sit amet laoreet luctus, posuere auctor lorem. Nullam malesuada."
    },
    {
        "view_template": "table",
        "edit_mode": false,
        "title": "A First Table",
        "table_data": {"rows":[
            {"cols":[
              {"name":"COS 171"},
              {"name":"Makeit or Breakit Data Structures"},
              {"name":3}
            ]},
            {"cols":[
              {"name":"COS 222"},
              {"name":"Really Boring Data Structures"},
              {"name":3}
            ]},
            {"cols":[
              {"name":"COS 234"},
              {"name":"Sequence Recognition in Data"},
              {"name":5}
            ]}
         ]}
    },
    {
        "view_template": "section",
        "edit_mode": false,
        "title": "Second Section",
        "narrative": "Lorem ipsum blah blah blah dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh felis, condimentum sit amet laoreet luctus, posuere auctor lorem. Nullam malesuada."
    },
    {
        "view_template": "table_with_narrative",
        "edit_mode": false,
        "title": "A First Table",
          "table_data": {"rows":[
            {"cols":[
              {"name":"COS 171"},
              {"name":"Makeit or Breakit Data Structures"},
              {"name":3}
            ]},
            {"cols":[
              {"name":"COS 222"},
              {"name":"Really Boring Data Structures"},
              {"name":3}
            ]},
            {"cols":[
              {"name":"COS 234"},
              {"name":"Sequence Recognition in Data"},
              {"name":5}
            ]}
         ]},
        "narrative": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh"
    },
    {
        "view_template": "footer",
        "edit_mode": false,
        "narrative": "Lorem ipsum footer ipsum dolor sit footer amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh"
    }
    ]};
    $scope.stringify_content = function () {
        return JSON.stringify($scope.content, null, ' ');
    };
    $scope.add_content = function () {
        $scope.content.data.unshift( {"view_template": "section", "title": "A New First Section", "narrative": "Lorem ipsum nan nan-nan nan-nan nahh dolor sit amet, consectetur adipiscing elit."} );
    };
}
