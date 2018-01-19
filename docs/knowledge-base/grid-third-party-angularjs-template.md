---
title: Use a Third Party Angular Editor Template in the Kendo UI Grid for AngularJS
description: How To Use Third Party AngularJS editors in the Kendo UI Grid
type: how-to
page_title: How To Bind the Kendo Grid dataItems in Third Party AngularJS templates | Kendo UI Grid
slug: grid-third-party-angularjs-template
position: 
tags: grid, angularjs, column template, third party, editor, compile
ticketid: 1086179
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2016.2 504</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

I am trying to bind `ng-model` in a nz-toggle - Double and Triple-State Toggle for Angular directive for booleans in the Kendo UI Grid but it is not working. The value is not bound in the editor.
  


## Solution

You can use the ng-model `dataItem.field` to bind the third party angular editor in the grid. You will also need an event that the third-party library offers so you can mark the dataItem as dirty.

All items which are marked as dirty, will be updated at the next data source sync.

```
// grid columns configuration
columns: [
 { field: "Discontinued", width: "130px", template: "<span class='k-dirty' ng-show={% raw %}{{dataItem.dirty}}{% endraw %}></span>{% raw %}{{dataItem.Discontinued}}{% endraw %}", editor: $scope.discontinuedEditor },
],

// editor declaration - use the on-toggle event handle to mark the dataItem as dirty so you can show the dirty flag in the template above
 $scope.discontinuedEditor = function(container, options) {
   var editor = $("<nz-toggle ng-model='dataItem.Discontinued' on-toggle='dataItem.dirty=true'></nz-toggle>")
   .appendTo(container);
 };

```

###### Example:

```html
<link rel="stylesheet" href="https://rawgit.com/tannerlinsley/nz-toggle/master/dist/nz-toggle.min.css"/>
    <script src="https://rawgit.com/tannerlinsley/nz-toggle/master/dist/nz-toggle.min.js">   </script>
    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <h3>
          This example features: 
        </h3>
        <ul>
          <li>
            A Kendo UI DropDownList editor bound with MVVM <code>data-bind</code> attribute</p>
        </li>

      <li>
        A third-party AngularJS editor bound with <code>ng-model</code>
      </li>
      </ul>
    <div kendo-grid="grid" options="mainGridOptions"></div>
    </div>
  </div>

<script>
  angular.module("KendoDemos", [ "kendo.directives", "nzToggle" ])
    .controller("MyCtrl", function($scope, $compile){
    var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";
    $scope.dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
          url: crudServiceBaseUrl + "/Products",
          dataType: "jsonp"
        },
        update: {
          url: crudServiceBaseUrl + "/Products/Update",
          dataType: "jsonp"
        },
        destroy: {
          url: crudServiceBaseUrl + "/Products/Destroy",
          dataType: "jsonp"
        },
        create: {
          url: crudServiceBaseUrl + "/Products/Create",
          dataType: "jsonp"
        },
        parameterMap: function(options, operation) {
          if (operation !== "read" && options.models) {
            return {models: kendo.stringify(options.models)};
          }
        }
      },
      batch: true,
      pageSize: 20,
      schema: {
        model: {
          id: "ProductID",
          fields: {
            ProductID: { editable: false, nullable: true },
            ProductName: { validation: { required: true } },
            UnitPrice: { type: "number", validation: { required: true, min: 1} },
            Discontinued: { type: "boolean" },
            UnitsInStock: { type: "number", validation: { min: 0, required: true } }
          }
        }
      }
    });

    $scope.ddlDataSource = new kendo.data.DataSource({
      transport: {
        read: {
          dataType: "jsonp",
          url: "https://demos.telerik.com/kendo-ui/service/Products",
        }
      }
    });

    $scope.productsDropDownEditor = function(container, options) {
        var editor = $('<input k-auto-bind=false kendo-drop-down-list required k-data-text-field="\'ProductName\'" k-data-value-field="\'ProductName\'" k-data-source="ddlDataSource" data-bind="value:ProductName"/>')
        .appendTo(container);
    };

    $scope.discontinuedEditor = function(container, options) {
        var editor = $("<nz-toggle ng-model='dataItem.Discontinued' on-toggle='dataItem.dirty=true'></nz-toggle>")
        .appendTo(container);
      };

    $scope.mainGridOptions = {
      dataSource: $scope.dataSource,
      pageable: true,
      height: 550,
      toolbar: ["create", "save"],
      columns: [
        { field:"ProductName",title:"Product Name",editor: $scope.productsDropDownEditor },
        { field: "Discontinued", width: "130px", template: "<span class='k-dirty' ng-show={% raw %}{{dataItem.dirty}}{% endraw %}></span>{% raw %}{{dataItem.Discontinued}}{% endraw %}", editor: $scope.discontinuedEditor },
        { command: "destroy", title: " ", width: "150px" }],
      editable: true
    };
  })
</script>
<p><small><p>This example is using nz-toggle under the following license: The MIT License (MIT)</p>

  <p>Copyright (c) 2014 Tanner Linsley</p>

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</small></p>
```
