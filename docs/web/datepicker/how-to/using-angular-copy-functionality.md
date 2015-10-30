---
title: Use AngularJS Copy Functionality
page_title: Use AngularJS Copy Functionality | Kendo UI DatePicker Widget
description: "Learn how to usе the AngularJS copy functionality in the Kendo UI DatePicker."
slug: howto_use_angularjs_copy_functionality_datepicker
position: 12
---

# Use AngularJS Copy Functionality

The example below demonstrates how to use the AngularJS copy functionality in a Kendo UI DatePicker.

###### Example

```html
    <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content"ng-controller="MyCtrl">
        <div class="box-col">
          <h4>Select date:</h4>
          <input kendo-date-picker
                 k-ng-model="info.dateObject" />

          <button ng-click="reset()">RESET</button>
          <button ng-click="update(info)">SAVE</button>

          <pre>
          dateObject: {{ info.dateObject | date:"EEEE, MMMM d, yyyy" }}
          typeof dateObject: {{ getType(info.dateObject) }}
          dateObject instanceof Date: {{ isDate(info.dateObject) }}
        </pre>

        </div>
      </div>
      <style scoped>
        .box-col {
          width: 400px;
        }
      </style>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ]);
      function MyCtrl($scope) {
        $scope.getType = function(x) {
          return typeof x;
        };
        $scope.isDate = function(x) {
          return x instanceof Date;
        };

        $scope.master= {};

        $scope.info= {
          dateObject: new Date(2014, 10, 10)
        };

        $scope.update = function(info) {
          // Example with 1 argument
          $scope.master= angular.copy(info);
        };

        $scope.reset = function() {
          // Example with 2 arguments
          $scope.info = {
            dateObject: null 
          };
        };
      }
    </script>
```

## See Also

Other Kendo UI DatePicker how-to examples:

* [Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [Select Ranges between DatePickers]({% slug howto_select_ranges_between_datepicker %})
* [Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [Disable Dates]({% slug howto_disable_dates_datepicker %})
* [Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [Restrict User Input to Min/Max Values]({% slug howto_restrict_user_input_minandmax_values_datepicker %})
* [Show Out-of-Range Dates as Disabled]({% slug howto_show_outofrange_dates_disabled_datepicker %})
* [Submit Forms on ENTER]({% slug howto_submmit_forms_onenter_datepicker %})