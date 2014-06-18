var app = angular.module('myApp', []);

app.directive('viewItem', function ($compile) {
    var radioSetTemplate = '<div class="entry-photo"><span>{{content.title}}"</span><div ng-repeat="item in content.data" content="item">{{item.name}}</div></div>';
    var textareaTemplate = '<div class="entry-video">{{content.data}}</div>';
    var textTemplate = '<div class="entry-note"><h2>{{content.title}}</h2>{{content.data}}</div>';

    var getTemplate = function(viewType) {
        var template = '';
        switch(viewType) {
            case 'radio set':
                template = radioSetTemplate;
                break;
            case 'textarea':
                template = textareaTemplate;
                break;
            case 'text':
                template = textTemplate;
                break;
        }
        return template;
    }

    var linker = function(scope, element, attrs) {
        scope.rootDirectory = 'images/';
        element.html(getTemplate(scope.content.view_type));
        $compile(element.contents())(scope);
    }

    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: {
            content:'='
        }
    };
});

function ViewCtrl($scope, $http) {
    "use strict";
    $scope.content = [
        {"view_type": "radio set", "title": "Radio ABC"   , "data" : [{"name":"A"}, {"name":"B", "selected":true}, {"name":"C"}]},
        {"view_type": "textarea" , "title": "Big Text 000", "data" : "http://player.vimeo.com/video/37176398"},
        {"view_type": "text"     , "title": "Notes 000"   , "data" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh felis, condimentum sit amet laoreet luctus, posuere auctor lorem. Nullam malesuada."},
    ];
}
