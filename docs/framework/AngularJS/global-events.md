---
title: Global Events
page_title: Global Events | AngularJS Directives
description: "Learn more about the Kendo UI global events in AngularJS to take full advantage of AngularJS integration into Kendo UI controls."
previous_url: /AngularJS/global-events
slug: global_events_angularjs_directives
position: 2
---

# Global Events

Kendo UI for jQuery provides the `kendoWidgetCreated` and ``kendoRendered`` global events.

`kendoWidgetCreated` is emitted after a single widget is created while `kendoRendered` is emitted after all widgets that are defined on the page are created.

## Upon Widget Creation

For example, your project requires you to create a TreeView widget that automatically expands the checked items upon initialization. You need to use the `kendoWidgetCreated` event because the widget is not instantiated at the time your `controller` function runs but after it was finalized. The reason for this behavior is that the widget is built from data which is defined within the `controller`.

The following example demonstrates how to listen to the `kendoWidgetCreated` event.

```dojo
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

```dojo
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
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})
* [How to Load View in Window]({% slug window_service_angularjs_directives %})
* [How to Nest Widgets]({% slug nest_widgets_angularjs_directives %})
* [Troubleshooting: Common Issues]({% slug common_issues_support_angularjs %})
* [Angular 2 Migration Guide](http://ngmigrate.telerik.com/)
