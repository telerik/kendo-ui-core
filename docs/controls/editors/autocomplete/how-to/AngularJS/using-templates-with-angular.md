---
title: Use Custom Templates
page_title: Use Custom Templates | Kendo UI AutoComplete 
description: "Learn how to use templates with AngularJS inside the Kendo UI templates of the AutoComplete widget."
slug: howto_use_custom_angularjs_templates_autocomplete
---

# Use Custom Templates

The example below demonstrates how to use AngularJS templates inside the Kendo UI templates of the AutoComplete widget.

###### Example

```html
    <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">
        <div class="box-col">
          <h4>Custom item template</h4>
          <input id="customers" kendo-auto-complete style="width:400px" k-options="customOptions"/>
        </div>

        <style>
          .dropdown-header {
            font-size: 1.2em;
          }

          .dropdown-header > span {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            text-align: left;
            display: inline-block;
            border-style: solid;
            border-width: 0 0 1px 1px;
            padding: .3em .6em;
            width: 79%;
          }

          .dropdown-header > span:first-child {
            width: 82px;
            border-left-width: 0;
          }

          .selected-value {
            float: left;
            width: 20px;
            margin: 0 4px;
          }

          #customers-list .k-item > span{
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            display: inline-block;
            border-style: solid;
            border-width: 0 0 1px 1px;
            vertical-align: top;
            min-height: 95px;
            width: 79%;
            padding: .6em 0 0 .6em;
          }

          #customers-list .k-item > span:first-child{
            width: 77px;
            border-left-width: 0;
            padding: .6em 0 0 0;
          }

          #customers-list img {
            -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
            -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
            box-shadow: 0 0 2px rgba(0,0,0,.4);
            width: 70px;
            height: 70px;
          }

          #customers-list h3 {
            font-size: 1.6em;
            margin: 0;
            padding: 0;
          }

          #customers-list p {
            margin: 0;
            padding: 0;
          }
        </style>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ]).controller('MyCtrl',
      function MyCtrl($scope) {
        $scope.customersDataSource = {
          transport: {
            read: {
              dataType: "jsonp",
              url: "http://demos.telerik.com/kendo-ui/service/Customers",
            }
          }
        };

        $scope.customOptions = {
          dataSource: $scope.customersDataSource,
          dataTextField: "ContactName",

          headerTemplate: '<div class="dropdown-header">' +
          '<span class="k-widget k-header">Photo</span>' +
          '<span class="k-widget k-header">Contact info</span>' +
          '</div>',

          // using {{angular}} templates:
          template: '<span class="k-state-default"><img src=\"http://demos.telerik.com/kendo-ui/content/web/Customers/{{dataItem.CustomerID}}.jpg\" alt=\"{{dataItem.CustomerID}}\" /></span>' +
          '<span class="k-state-default"><h3>{{dataItem.ContactName}}</h3><p>{{dataItem.CompanyName}}</p></span>',
        };
      });
    </script>

```

## See Also

Other articles on Kendo UI AutoComplete:

* [AutoComplete JavaScript API Reference](/api/javascript/ui/autocomplete)
* [How to Show a No results found Message]({% slug howto_add_customized_templates_autocomplete %})
* [How to Dynamically Change DataSource Based on User Selections]({% slug howto_change_datasource_dynamically_autocomplete %})
* [How to Highlight Matched Values]({% slug howto_highlight_matched_values_autocomplete %})
* [How to Restrict Other Users]({% slug howto_restrict_user_input_autocomplete %})
