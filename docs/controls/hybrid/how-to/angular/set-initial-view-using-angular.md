---
title: Set Initial View Prior to Initialization
page_title: Set Initial View Prior to Initialization | Kendo UI Hybrid Components
description: "Learn how to set initial view prior to initialization when working with the Hybrid UI components of Kendo UI."
previous_url: /controls/hybrid/how-to/set-initial-view-using-angular
slug: howto_setinitiaviewpriortoinitialization_angular_hybridui
---

# Set Initial View Prior to Initialization

The example below demonstrates how to set the initial view at runtime prior to the initialization of the application in AngularJS when working with the Hybrid UI components of Kendo UI.

###### Example

```html
     <style>
      html, body {
        height: 100%;
      }
    </style>
     <body kendo-mobile-application id="kma" ng-app="kendoDemo" ng-controller="appController" k-initial="initialView">
      <kendo-mobile-view id="view1" ng-controller="main1">
        view1
      </kendo-mobile-view>
      <kendo-mobile-view id="view2" ng-controller="main2">
        view2
      </kendo-mobile-view>
    <script>
      angular.module("kendoDemo", [ "kendo.directives" ])
      .run(["$rootScope", function($rootScope) {
      	$rootScope.initialView = "view2"
      }])
      .controller("appController", function($scope) {

      })
      .controller("main1", function($scope) {

      })
      .controller("main2", function($scope) {

      });
    </script>
  </body>
```

## See Also

Articles and other how-to examples on the Kendo UI hybrid components:

* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})

For more runnable examples on the Kendo UI hybrid controls, browse the [**How To** documentation folder]({% slug include_esri_map_mobile_application %}).
