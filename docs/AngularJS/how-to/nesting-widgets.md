---
title: Nest Widgets
page_title: Nest Widgets | AngularJS Directives
description: "Learn about the nesting of Kendo UI widgets in AngularJS applications."
slug: nest_widgets_angularjs_directives
position: 7
---

# Nest Widgets

To nest Kendo UI widgets in AngularJS applications, make sure that the parent widget is initialized before you initialize the nested one.

In such cases the [`k-ng-delay`](http://docs.telerik.com/kendo-ui/AngularJS/introduction#delay-widget-initialization) directive can come in handy.

###### Example - nest Kendo UI Editor in a TabStrip component

    <div id="example" ng-app="KendoDemos">

      <div class="demo-section k-header">
        <div ng-controller="MyCtrl">
          <div kendo-tab-strip="tabstrip">
            <ul>
              <li class="k-state-active">First tab</li>
            </ul>
            <div>
              <textarea kendo-editor k-ng-delay="tabstrip"></textarea>
            </div>
          </div>
        </div>
      </div>

    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){
      })
    </script>
    
## See Also

Other articles on AngularJS directives and integration with Kendo UI:

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Global Events]({% slug global_events_angularjs_directives %})
* [Grid Settings]({% slug grid_settings_angularjs_directives %})
* [Directives with DataSource]({% slug datasource_updates_angularjs_directives %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})