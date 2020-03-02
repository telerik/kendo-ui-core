---
title: Perform DropDownList Selection in AngularJS Only If Confirmed
description: An example on how to cancel or not the actual selection of an item in the DropDownList by using the Kendo UI confirmation Dialog in AngularJS applications.
type: how-to
page_title: Cancel Selection in AngularJS If Not Confirmed | Kendo UI DropDownList for jQuery
slug: dropdownlist-cancel-select-if-not-confirmed
tags: kendoui, kendo, angular, angularjs, dropdownlist, dialog, cancel-select, cancel, confirm
res_type: kb
component: dropdownlist
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownList</td>
 </tr>
</table>

## Description

How can I cancel (or not) the actual selection of an item in the Kendo UI DropDownList depending on a selected option from a Kendo UI confirmation Dialog and implement the approach in AngularJS applications?

## Solution

Save the old value and, then, revert back to it. Revert the value if the **Cancel** option was selected.

```dojo
<div id="example" ng-app="KendoDemos">
  <div class="demo-section k-content" ng-controller="MyCtrl">
    <h4>Static data</h4>
    <select kendo-drop-down-list="catDropdown" k-options="catDropdownOptions"></select>
    <div kendo-dialog="dialog"
         k-title="'Select option'"
         k-on-open="dialogVisible = true"
         k-on-close="dialogVisible = false"
         k-width="300"
         k-height="150"
         k-actions="dialogActions"
         k-modal="true"
         k-visible="false">
      <p>Do you want to switch to category <strong ng-bind="text"></strong>?<p>
    </div>
  </div>
</div>

<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope, $window){ 			
    function onCancel(e) {
      $scope.catDropdown.value($scope.oldValue);
    }
    $scope.dialogActions = [{
      text: 'Cancel',
      action: onCancel
    }, {
      text: 'OK',
      primary: true
    }];
    $scope.text = '';
    $scope.oldValue = '';
    $scope.catDropdownOptions = {
      dataTextField: 'desc',
      dataValueField: 'id',
      optionLabel: 'Select a Category',
      dataSource: [
        {id:1, desc:'A'},
        {id:2, desc:'B'},
        {id:3, desc:'C'},
        {id:4, desc:'D'}
      ],
      select: function (e) {
        $scope.oldValue = e.sender.value();
        if (e.sender.value() != e.dataItem.id) {
          $scope.text = e.dataItem.desc;
        }
        $scope.dialog.open();
      },
    };
  })
</script>
```

## See Also

* [API Reference of the DropDownList](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [AngularJS Demo of the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/angular)
