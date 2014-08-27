// Rapid Prototype: Form Builder...
// based on http://onehungrymind.com/angularjs-dynamic-templates/
// also see (for a good overview of angular)  http://stephanebegaudeau.tumblr.com/post/48776908163/everything-you-need-to-understand-to-start-with
// look into loading templates via https://github.com/requirejs/text
// or https://npmjs.org/package/grunt-angular-templates per (simpulton September 7, 2013 at 12:52 pm)
//
// helpful in figuring out the coordination of model and view for sortable was http://jsfiddle.net/dj_straycat/Q5FWt/3/
//
// TBD: test inclusion of drag and drop into the mix with dynamic(you name it) templates
//      also ckangular inclusion just to make sure binding happens to the right data inside nested dynamic-templates
//

var app = angular.module('myApp', []);

app.directive('forMangle', function ($compile) {
    var radioSetTemplate = '<div class="mangle-radioset"><h4 ng-bind="content.title"></h4><span ng-repeat="item in content.data" content="item" > <input type="radio" name="{{content.title}}" value="{{item.name}}" /> {{item.name}}</span></div></div>';
    var textareaTemplate = '<div class="mangle-textarea">{{content.data}}</div>';
    var metaTemplate = '<ul><div  sortable >{{content.title}}<div for-mangle ng-repeat="item in content.data" content="item"></div></div></ul>';
    var tableTemplate = '<table><tbody  sortable ><tr ng-repeat="row in content.data" ><td ng-repeat="cell in row" >{{cell}}</td></tr></tbody></table>';
    var textTemplate = '<div class="mangle-text"><h2>{{content.title}}</h2>{{content.data}}</div>';

    var getTemplate = function(viewType) {
        var template = '';
        switch(viewType) {
            case 'radio set':
                template = radioSetTemplate;
                break;
            case 'textarea':
                template = textareaTemplate;
                break;
            case 'table':
                template = tableTemplate;
                break;
            case 'meta':
                template = metaTemplate;
                break;
            case 'text':
                template = textTemplate;
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
            content:'='
        }
    };
});

app.directive('sortable', function() {
    var dragStart = function(e, ui) {
        ui.item.data('start', ui.item.index());
    };
    var dragEnd = function(e, ui) {
        var start = ui.item.data('start'),
            end = ui.item.index();
        
        $scope.content.splice(end, 0, 
            $scope.content.splice(start, 1)[0]);
        
        $scope.$apply();
    };
    
    return {
        // A = attribute, E = Element, C = Class and M = HTML Comment
        restrict:'A',
        link: function(scope, element, attrs) {
            $(element).sortable({
                start: dragStart,
                update: dragEnd
            });
            $(element).disableSelection();
        }
    };
});


function ViewCtrl($scope, $http) {
    "use strict";
    $scope.content = [
        {"view_type": "radio set", "title": "Radio ABC"   , "data" : [{"name":"A"}, {"name":"B", "selected":true}, {"name":"C"}]},
        {"view_type": "textarea" , "title": "Big Text Area", "data" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh felis, condimentum sit amet laoreet luctus, posuere auctor lorem. Nullam malesuada."},
        {"view_type": "table" , "title": "table", "data" : [[1, 2, 3], [4, 5, 6], [7, 8, 9]
        ]},
        {"view_type": "meta" , "title": "Meta", "data" : [
            {"view_type": "radio set", "title": "Radio CDF"   , "data" : [{"name":"C"}, {"name":"D", "selected":true}, {"name":"F"}]}, 
            {"view_type": "text"     , "title": "Inner Notes 000"   , "data" : "dolor sit amet"},
            {"view_type": "text"     , "title": "Inner Notes 001"   , "data" : "dolor sit amet"},
            {"view_type": "text"     , "title": "Inner Notes 010"   , "data" : "dolor sit amet"}
        ]},
        {"view_type": "text"     , "title": "Notes in Plain text"   , "data" : "Lorem ipsum"},
    ];
    $scope.stringify_content = function () {
        return JSON.stringify($scope.content, null, ' ');
    };
    $scope.add_content = function () {
        $scope.content.unshift( {"view_type": "radio set", "title": "Radio XYZ"   , "data" : [{"name":"X"}, {"name":"Y"}, {"name":"Z"}]});
    };
}
