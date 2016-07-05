---
title: Select Ranges between DatePickers
page_title: Select Ranges between DatePickers | Kendo UI DatePicker
description: "Learn how to select ranges between two Kendo UI DatePickers in AngularJS environment."
slug: howto_select_ranges_between_datepicker
---

# Select Ranges between DatePickers

The example below demonstrates how to implement a range selection between two Kendo UI DatePicker in an AngularJS environment.

###### Example

```html
<div id="example" ng-app="KendoDemos">
  <div class="demo-section k-content"ng-controller="MyCtrl">
    <div class="box-col">
      <h4>From date:</h4>
      <input id="fromDatepicker" kendo-date-picker
             ng-model="fromDateString"
             k-ng-model="fromDateObject"
             k-max = "maxDate"
             k-rebind="maxDate"
             k-on-change="fromDateChanged()" />
      <span>{{fromDateString}}</span>
      <span>max date:{{toDateObject}}</span>
    </div>
    <div class="box-col">
      <h4>To date:</h4>
      <input id="toDatepicker" kendo-date-picker
             ng-model="toDateString"
             k-ng-model="toDateObject"
             k-min = "minDate"
             k-rebind = "minDate"
             k-on-change="toDateChanged()"/>
      <span>{{toDateString}}</span>
      <span>min date:{{fromDateObject}}</span>
    </div>
    <div>
      <button id="clear" ng-click="clear()">Clear</button>
    </div>
  </div>
</div>
<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
          .controller("MyCtrl", function($scope){
            $scope.fromDateString;
            $scope.fromDateObject = null;
            $scope.toDateString;
            $scope.toDateObject = null;
            $scope.maxDate = new Date();
            $scope.minDate = new Date(2000, 0, 1, 0, 0, 0);
            $scope.fromDateChanged = function(){
              $scope.minDate = new Date($scope.fromDateString);
              console.log("min changed " + $scope.fromDateString);
            };
            $scope.toDateChanged = function(){
              $scope.maxDate = new Date($scope.toDateString);
              console.log("min changed " + $scope.toDateString);
            };
            $scope.clear = function(){
              $scope.fromDateString = '';
              $scope.toDateString = '';
              $scope.fromDateObject = null;
              $scope.toDateObject = null;
              $scope.maxDate = new Date();
              $scope.minDate = new Date(2000, 0, 1, 0, 0, 0);
            }
          })
</script>
```

## See Also

Other articles on the Kendo UI DatePicker:

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})

For more runnable examples on the Kendo UI DatePicker, browse its [**How To** documentation folder]({% slug howto_localize_datepicker_using_angular_translate %}).
