---
title: Global Events
page_title: Global Events | AngularJS Directives
description: "Learn more about the Kendo UI global events in AngularJS to take full advantage of AngularJS integration into Kendo UI controls."
previous_url: /AngularJS/global-events
slug: global_events_angularjs_directives
position: 3
---

# Global Events

> Starting with R2 2022, the Kendo UI team officially drops the support for AngularJS 1.x through Kendo UI for jQuery. The AngularJS related files and functionality are removed from the bundles and distribution in R3 SP1 2023. The last version that contains the files is R3 2023.
> This does not impact [Kendo UI for Angular (2+)](https://www.telerik.com/kendo-angular-ui) suite.
> If you still need to use AngularJS in your project, check [this article]({% slug angularjs_legacy_files_kendoui %}) that explains how to get the legacy files.
>For information regarding extended support for AngularJS, please visit [Extended Long Term Support]({% slug supportedversions_kendoui %}#extended-long-term-support)

Kendo UI for jQuery provides the `kendoWidgetCreated` and ``kendoRendered`` global events.

`kendoWidgetCreated` is emitted after a single widget is created while `kendoRendered` is emitted after all widgets that are defined on the page are created.

## Upon Widget Creation

For example, your project requires you to create a TreeView widget that automatically expands the checked items upon initialization. You need to use the `kendoWidgetCreated` event because the widget is not instantiated at the time your `controller` function runs but after it was finalized. The reason for this behavior is that the widget is built from data which is defined within the `controller`.

The following example demonstrates how to listen to the `kendoWidgetCreated` event.

```
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/7.0.1/default/default-ocean-blue.css">

<div ng-app="app" ng-controller="MyCtrl">
  <div kendo-tree-view="treeWidget" k-options="treeOptions"></div>
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
  $scope.treeOptions = {
        dataSource: makeData(),
        checkboxes: {
            template: "<input type='checkbox' ng-model='dataItem.checked' />"
        }
    };

    $scope.$on("kendoWidgetCreated", function(event, widget){
        // The event is emitted for every widget. If you have multiple
        // widgets in this controller, check that the event
        // is for the one you are interested in.
        if (widget === $scope.treeWidget) {
            widget.element.find(".k-checkbox input:checked").each(function(){
                widget.expand( $(this).parents(".k-item") );
            });
        }
    });

    function makeData() {
        return [
            { text: "Item 1", items: [
                { text: "SubItem 1.1", items: [
                    { text: "SubItem 1.1.1" },
                    { text: "SubItem 1.1.2" },
                    { text: "SubItem 1.1.3", checked: true }]},
                { text: "SubItem 1.2", items: [
                    { text: "SubItem 1.2.1" },
                    { text: "SubItem 1.2.2" },
                    { text: "SubItem 1.2.3" }]},
                { text: "SubItem 1.3", items: [
                    { text: "SubItem 1.3.1" },
                    { text: "SubItem 1.3.2" },
                    { text: "SubItem 1.3.3" }]}]},
            { text: "Item 2", checked: true, items: [
                { text: "SubItem 2.1", items: [
                    { text: "SubItem 2.1.1" },
                    { text: "SubItem 2.1.2" },
                    { text: "SubItem 2.1.3" }]},
                { text: "SubItem 2.2", items: [
                    { text: "SubItem 2.2.1" },
                    { text: "SubItem 2.2.2", checked: true },
                    { text: "SubItem 2.2.3" }]},
                { text: "SubItem 2.3", items: [
                    { text: "SubItem 2.3.1" },
                    { text: "SubItem 2.3.2" },
                    { text: "SubItem 2.3.3", checked: true }]}]},
            { text: "Item 3", items: [
                { text: "SubItem 3.1", items: [
                    { text: "SubItem 3.1.1" },
                    { text: "SubItem 3.1.2" },
                    { text: "SubItem 3.1.3" }]},
                { text: "SubItem 3.2", items: [
                    { text: "SubItem 3.2.1" },
                    { text: "SubItem 3.2.2" },
                    { text: "SubItem 3.2.3" }]},
                { text: "SubItem 3.3", items: [
                    { text: "SubItem 3.3.1" },
                    { text: "SubItem 3.3.2" },
                    { text: "SubItem 3.3.3" }]}]},
        ]
    }
});
</script>
```

## After Widget Creation

Browsers render data asynchronously and, therefore, the `kendoRendered` event is useful to manipulate the view of a page while the widgets that are defined on this page finish their rendering. For example, you can either use `kendoRendered` to initially hide the view and then display it when the widgets are already initialized or you can show a **Loading...** (or other suitable) overlay that fits your project.

The following example demonstrates how to listen to the `kendoRendered` event.

```
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/7.0.1/default/default-ocean-blue.css">

<div ng-app="app" ng-controller="MyCtrl">
  <input kendo-datepicker="datePicker">
</div>
<script>
angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
  $scope.$on("kendoRendered", function(e) {
    console.log("All Kendo UI Widgets are rendered.");
  });
});
</script>
```

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Grid Settings]({% slug grid_settings_angularjs_directives %})
* [Directives with DataSource]({% slug datasource_updates_angularjs_directives %})





* [Angular 2 Migration Guide](https://www.telerik.com/blogs/ngmigrate-helps-you-move-from-angularjs-1-to-angular-2)
