---
title: Global events in Angular-Kendo
---

{% raw %}

# Global events in Angular-Kendo

Angular-Kendo emits a `"kendoWidgetCreated"` event for each widget which is created, and a `"kendoRendered"` event after all widgets defined in the page were created.

## `kendoWidgetCreated`

For example, suppose we want to create a TreeView widget that automatically expands the checked items upon initialization. We can't easily do without "kendoWidgetCreated" because the widget is not instantiated at the time our controller function runs, but only after (that should be obvious, since the widget is built from data defined by the controller). Here is how we can do it with this event:

#### Listen to the kendoWidgetCreated event

```html
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
        // the event is emitted for every widget; if we have multiple
        // widgets in this controller, we need to check that the event
        // is for the one we're interested in.
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

## `kendoRendered`

This event might be useful to know when all widgets defined in page have been rendered, since everything happens asynchronously. Using it you can for instance hide the view initially and display it when widgets have been initialized; or you can show a “loading” overlay, etc.

#### Listen to the kendoRendered event

```html
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

{% endraw %}
