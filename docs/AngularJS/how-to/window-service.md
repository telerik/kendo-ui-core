---
title: Load View in Window
page_title: Load View in Window | AngularJS Directives
description: "Learn how to load partial views with their own controllers in a Kendo UI Window."
slug: window_service_angularjs_directives
---

# Load View in Window

This article is contributed by Kjartan Valur.

The `$kWindow` is a service which dynamically creates Kendo UI windows with a separate template and controller. The complete source code is available in the [kjartanvalur/angular-kendo-window](https://github.com/kjartanvalur/angular-kendo-window) GitHub repository.

The example below demonstrates how to open a modal Kendo UI Window.

###### Example

    <div ng-app="KendoDemos">
        <div ng-controller="MyCtrl">
            <button type="button" ng-click="openWindow()">Open Kendo UI Window</button>
        </div>
    </div>

    <script>
        var MyApp = angular.module('myapp', ['kendo.window', 'kendo.directives']);

        MyApp.controller("mycontroller", mycontroller);
        MyApp.controller("modalController", modalController);

        function mycontroller($scope, $kWindow) {
            $scope.title = "My modal title";
            $scope.content = "This is my message to the window!";
            $scope.result = "";

            $scope.openWindow = function(){
                var windowInstance = $kWindow.open({
                    options:{
                        modal: true,
                        title: $scope.title,
                        resizable: true,
                        height: 150,
                        width: 400,
                        visible: false
                    },
                        templateUrl: 'modal.html',
                        controller: 'modalController',
                        resolve: {
                            message: function () {
                                return $scope.content;
                            }
                        }
                 });


                windowInstance.result.then(function (result) {
                    if (result) {
                        $scope.result = 'confirmed!';
                    }
                    else{
                        $scope.result = 'canceled!';
                    }
                });
             };
        }

        function modalController($scope, $windowInstance, message) {
          $scope.message = message;

          $scope.confirm = function(){
            $windowInstance.close(true);
          };

          $scope.cancel = function(){
            $windowInstance.close(false);
          };
        }

        mycontroller.$inject = ['$scope', '$kWindow'];
    </script>

###### Example

    // modal.html
    <h3>{{message}}</h3>

    <button type="button" ng-click="confirm()">Confirm</button>
    <button type="button" ng-click="cancel()">Cancel</button>

## See Also

Other articles and how-to examples on AngularJS directives and Kendo UI:

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
* [Grid Settings]({% slug grid_settings_angularjs_directives %})
* [Directives with DataSource]({% slug datasource_updates_angularjs_directives %})
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})
* [How to Nest Widgets]({% slug nest_widgets_angularjs_directives %})
* [Troubleshooting: Common Issues]({% slug common_issues_support_angularjs %})
