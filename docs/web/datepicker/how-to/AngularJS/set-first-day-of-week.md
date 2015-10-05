---
title: Set the first day of the week on DatePicker width using AngularJS
page_title: Set the first day of the week on DatePicker width using AngularJS
description: Set the first day of the week on DatePicker width using AngularJS
---

# Set the first day of the week on DatePicker width using AngularJS

The example below demonstrates how to set the first day of the week on a Kendo UI DatePicker width using AngularJS.

#### Example:

```html
	<div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <div>
          <h4>Select date:</h4>
          <input kendo-date-picker
                 k-ng-model="dateObject"/>
        </div>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){
       
      })
      .run(function() {
      	kendo.culture().calendar.firstDay= 3
      })
    </script>
```
