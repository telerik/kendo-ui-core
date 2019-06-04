---
title: Filter Menu Items in AngularJS
description: An example on how to filter the items of the Kendo UI Menu widget.
type: how-to
page_title: Filter Menu Items in AngularJS | Kendo UI Menu for jQuery
slug: menu-angularjs-filter-items
tags: menu, angularjs, filter, items
res_type: kb
component: menu
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI Menu</td>
 </tr>
 <tr>
  <td>Kendo UI version</td>
  <td>Created with the 2019.1.220 version</td>
 </tr>
</table>

## Description

How can I have an Angular filter function for the Menu items?

## Solution

In the `dataSource`, use the `text` property of the Menu item.

```
    <div class="demo-section k-content" ng-controller="MyCtrl">
      <h4 style="padding-top: 2em;">Preview</h4>
      <ul kendo-menu
        k-orientation="menu.menuOptions.menuOrientation"
        k-rebind="menu.menuOptions"
        k-options="menu.menuOptions">
      </ul>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope){
        $scope.menu = { menuOptions: {
          menuOrientation: "horizontal",
          scrollable: true,
          openOnClick: { openOnClick: true },
          showOn: "click",
          filter: true,
          dataSource: [
            {
              text: "2nd Item",
              cssClass: "myClass",
              items: [
                {text: "<input type='text' class='form-control' ng-click='$event.stopPropagation()' placeholder='Search by Typing Item Name' ng-model='search2'>", encoded: false},
                {text: "<div ng-repeat=\"i in menuItemList2 | filter: search2\">{{i.text}}</div>", encoded: false}
              ]
            },
            {
              text: "First Item",
              cssClass: "myClass",
              items: [
                { text: "<input type='text' class='form-control' ng-click='$event.stopPropagation()' placeholder='Search by Typing Item Name' ng-model='search1'>", encoded: false },
                {text: "<div ng-repeat=\"i in menuItemList1 | filter: search1\">{{i.text}}</div>", encoded: false}
              ]
            }
          ]
        },
        listItems:[
          {menuItems:[
            {items:[
              {text: "Item 1"},
              {text: "Item 2"}]
            },
            {items:[
              {text: "Item 12"},
              {text: "Item 22"}]
            }
          ]}
        ]};

        $scope.menuItemList1 = $scope.menu.listItems[0].menuItems[0].items;
        $scope.menuItemList2 = $scope.menu.listItems[0].menuItems[1].items
      })
    </script>
```
