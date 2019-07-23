---
title: Initializing with AngularJS
page_title: Initializing with AngularJS | Working with Widgets | Kendo UI for jQuery
previous_url: /data-attribute-initialization, /howto/declarative_initialization, /basics/markup, /intro/markup, /intro/installation/markup
description: "Get started with Kendo UI for jQuery and initialize and configure the widgets by using the AngularJS directives."
slug: initialize_widgets_using_markup_installation
position: 4
---

# Initializing with AngularJS

You can configure declaratively initialized widgets by using the AngularJS directives.

The following example refers to the AngularJS directive in the Kendo UI AutoComplete. For more information on the features of the Kendo UI AngularJS directives, refer to the [introductory article on AngularJS]({% slug angularjs_integration_directives %}).

```
    <div ng-app="myApp">
        <div ng-controller="MyController">
            <input kendo-autocomplete k-data-source="dataSource" />
        </div>
    </div>

    <script>
        var myApp = angular
  			            .module("myApp", [ "kendo.directives" ])
          			    .controller("MyController", function($scope) {
            			  $scope.dataSource = [
                 					 'foo', 'bar', 'baz'
             					      ]
          					});
    </script>

```

## See Also

* [Creating Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
