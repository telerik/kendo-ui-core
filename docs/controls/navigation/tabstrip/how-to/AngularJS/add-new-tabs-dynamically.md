---
title: Add New Tabs Dynamically
page_title: Add New Tabs Dynamically | Kendo UI TabStrip
description: "Learn how to add new tabs dynamically to the Kendo UI TabStrip widget in AngularJS applications."
slug: howto_addnewtabsdynamically_tabstrip
---

# Add New Tabs Dynamically

Out of the box, the Kendo UI TabStrip does not support the execution of dynamic Angular templates&mdash;directives and bindings. For more information on this issue, refer to [this forum thread](http://www.telerik.com/forums/use-angularjs-directive-in-tab-content).

However, it is possible to use a workaround and to compile the HTML content manually after adding a new tab by targeting the element that needs to be compiled through `$scope`.

The example below demonstrates how to initialize the Kendo UI TabStrip as `kendo-tabstrip = "ts"` and to target it when the compilation is executed.

###### Example

```html
    <div id="example" ng-app="mainApp">
          <div class="demo-section k-content">
            <div ng-controller="MyCtrl">
              <div kendo-tabstrip="ts" id="tabstrip">
                <ul>
                  <li class="k-state-active">First tab</li>
                </ul>
                <div style="padding: 1em">
                  This is the first tab
                  {{ hello }}
                </div>
              </div>
              <input type="button" value="add Tab" ng-click="openNextTab()" />
            </div>
          </div>
        </div>
        <script>

          var mainApp = angular.module("mainApp", ["kendo.directives"]);
          mainApp.service('TabService', function () {

            var currentTabNo = 1;

            this.addNewTab = function (b) {
              currentTabNo++;
              var tabStrip = $("#tabstrip").data("kendoTabStrip");
              tabStrip.append(
                [{
                  text: "<b>new tab"+currentTabNo+"</b>",
                  encoded: false,
                  content: "<span>{{ hello }}</span>"  
                }]
              );
            }
          });

          mainApp.controller('MyCtrl', function ($scope, TabService, $compile) {
            $scope.hello = 'hello from controller';

            $scope.openNextTab = function () {
              TabService.addNewTab();
              $compile($scope.ts.contentHolder(0))($scope)
            }
          });
        </script>
```

## See Also

Other articles on the Kendo UI TabStrip:

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Add Close Button to Tabs]({% slug howto_addclosebuttontotabs_tabstrip %})
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Save Content Scroll Position]({% slug howto_savecontentscrollposition_tabstrip %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})

For more runnable examples on the Kendo UI TabStrip widget, browse its [**How To** documentation folder]({% slug howto_disablecontentscrolling_tabstrip %}).
