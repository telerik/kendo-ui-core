---
title: Initialize TabStrip Properly upon Reload
page_title: Initialize TabStrip Properly upon Reload | Kendo UI TabStrip
description: "Learn how to load the styles of a Kendo UI TabStrip widget and persist them in AngularJS applications."
slug: howto_initializeproperlyuponreload_tabstrip
---

# Initialize TabStrip Properly upon Reload

Sometimes the styles of a Kendo UI TabStrip do not persist when it is reloaded. This behavior might be caused by a timing issue because of applying `k-ng-delay` and the inability of the widget to initialize accordingly.

To ensure that the Kendo UI TabStrip is properly initialized, choose one of the following solutions:
* Use the `select` method of the TabStrip to have the widget pre-selected. For more information on how to do it, refer to the article on [`select`](api/javascript/ui/tabstrip#methods-select) and the [introductory article on the TabStrip]({% slug overview_kendoui_tabstrip_widget %}#configuration-Select).
* Load your styles correctly with `k-ng-delay` by using the `$timeout` service. For more information on how to do this, refer to the example below.
* Configure the TabStrip to [recreate itself automatically]({% slug angularjs_integration_directives %}#widget-update-upon-option-changes) when part of the settings are changed.

> **Important**
>
> It is not recommended to create Kendo UI widgets by using `ng-repeat`. Use the Kendo UI DataSource instead. For more information, refer to the article on [troubleshooting]({% slug ngrepeat_ngif_ngbind_support_angularjs %}) as well as on the [DataSource abstraction]({% slug datasource_updates_angularjs_directives %}) in AngularJS.

###### Example

```html
    <div ng-app="foo">

       <div ng-controller="mine">
         <div kendo-tab-strip k-ng-delay="tabs">
           <ul>
             <li ng-repeat="tab in tabs" class="{{tab.headerClass}}">{% raw %} {{tab.title}} {% endraw %}</li>
           </ul>
           <div ng-repeat="tab in tabs">{% raw %} {{tab.content}} {% endraw %}</div>
         </div>
         <div kendo-tab-strip k-ng-delay="tabs2">
           <ul>
             <li ng-repeat="tab in tabs2" class="{{tab.headerClass}}">{% raw %} {{tab.title}} {% endraw %}</li>
           </ul>
           <div ng-repeat="tab in tabs2">{% raw %} {{tab.content}} {% endraw %}</div>
         </div>
       </div>
     </div>
     <script>
       angular.module("foo", ['kendo.directives' ])
         .controller("mine", function($timeout, $scope) {
         $scope.tabs2 = [
           { title: "tabs2tab1", content: "tabs2tab1" },
           { title: "tabs2tab1", content: "tabs2tab1" },
         ];

         $timeout(function() {
           $scope.tabs = [
             { title: "tab1", content: "tab1" },
             { title: "tab2", content: "tab2" },
           ]
         }, 68);
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
