---
title: Load a View in a Window
page_title: Load a View in a Window
description: "Learn how to load partial views with their own controllers in a Window"
slug: window_service_angularjs_directives
position: 7
---

# Load a View in a Window

Contributed by Kjartan Valur

$kWindow is a service to dynamically create Kendo UI windows with a separate template and controller.

The complete source code is available in the
[kjartanvalur/angular-kendo-window](https://github.com/kjartanvalur/angular-kendo-window)
GitHub repository.

###### Example - Open a Modal Kendo UI Window

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

###### modal.html

    <h3>{{message}}</h3>


    <button type="button" ng-click="confirm()">Confirm</button>
    <button type="button" ng-click="cancel()">Cancel</button>

## See Also

Other articles on AngularJS directives and integration with Kendo UI:

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
