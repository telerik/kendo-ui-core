---
title: Template Directives
page_title: Template Directives | AngularJS Directives
description: "Learn more about the AngularJS templates integration of Kendo UI controls and find out how to use the widgets in AngularJS applications."
previous_url: /framework/AngularJS/introduction#using-template-directives
slug: angularjs_integration_templates
position: 6
---

# Template Directives

You can specify the template options of data-bound container widgets as nested directives.

The following table provides information on the template directives that are supported by the Kendo UI widgets.

|WIDGET           |SUPPORTED TEMPLATE DIRECTIVES |
|:---             |:---                         |
|TreeMap          |`k-template`                 |
|MobileListView   |`k-header-template` and `k-template` |
|MobileScrollView |`k-empty-template` and `k-template`  |
|Grid             |`k-alt-row-template`, `k-detail-template`, and `k-row-template` |
|ListView         |`k-edit-template`, `k-template`, and `k-alt-template` |
|Pager            |`k-select-template` and `k-link-template` |
|PivotGrid        |`k-column-header-template`, `k-data-cell-template`, and `k-row-header-template` |
|Scheduler        |`k-all-day-event-template`, `k-date-header-template`, `k-event-template`, `k-major-time-header-template`, and `k-minor-time-header-template` |
|TreeView         |`k-template`                 |
|Validator        |`k-error-template`           |

``` html
    <div ng-app="app" ng-controller="MyCtrl">
      <div kendo-list-view k-data-source="source">
        <!-- the template (including the div tag itself) here will be assigned as a string to the `template` configuration option of the listview widget -->
        <div class="product" k-template>
            <img ng-src="https://demos.telerik.com/kendo-ui/content/web/foods/{% raw %}{{dataItem.ProductID}}{% endraw %}.jpg" alt="{% raw %}{{dataItem.ProductName}}{% endraw %} image" />
            <h3>{% raw %}{{ dataItem.ProductName }}{% endraw %}</h3>
            <p>{% raw %}{{ dataItem.UnitPrice | currency:"USD$":0 }}{% endraw %}</p>
        </div>
      </div>
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
       $scope.source = new kendo.data.DataSource({
         transport: {
           read: {
             url: "https://demos.telerik.com/kendo-ui/service/products",
             dataType: "jsonp"
           }
         },
         pageSize: 21
      });
    });
    </script>
```

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
