---
title: AngularJS - Perform DropDownList Select Only if Confirmed
description: In AngularJS application, how to cancel or not the actual selection of an item in the DropDownList using Kendo Confirm Dialog
type: how-to
page_title: Cancel Selection if not Confirmed in AngularJS | Kendo UI DropDownList
slug: dropdownlist-cancel-select-if-not-confirmed
tags: kendoui, kendo, angular, angularjs, dropdownlist, dialog, cancel-select, cancel, confirm
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownList</td>
 </tr>
</table>

## Description

How to cancel or not the actual selection of an item in the Kendo DropDownList depending on a chosen option from a Kendo Confirm Dialog. How to implement the above in AngularJS app?

## Solution

To cancel the selection first save the old value and then revert back to it. Revert the value if the *Cancel* option has been chosen.

```html
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

* [JavaScript API Reference of the DropDownList](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [DropDownList AngularJS demo](http://demos.telerik.com/kendo-ui/dropdownlist/angular)
