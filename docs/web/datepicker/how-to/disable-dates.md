---
title: Disable Dates
page_title: Disable Dates | Kendo UI DatePicker Widget
description: "Learn how to disable dates in the Kendo UI DatePicker widget."
slug: howto_disable_dates_datepicker
position: 2
---

# Disable Dates

The example below demonstrates how to disable dates in Kendo UI DatePicker via the built-in Kendo UI Calnedar. 

###### Example

```html
      <input id="datepicker" />
      <script id="monthTemplate" type="text/x-kendo-template">
        <span class="#= checkDates(data.date, data.dates) ? 'k-state-disabled' : '' #">
          #:value#
        </span>
      </script>
      <script>
        $(function() {
          var dates = [
            new Date(2014, 2, 10),
            new Date(2014, 2, 16),
            new Date(2014, 2, 20)
          ];
    
          var checkDates = function(value, list) {
            for (var idx = 0, length = list.length; idx < length; idx++) {
              if (value.getTime() === list[idx].getTime()) {
                 return true; 
              }
            }
            return false;
          };
          
          window.checkDates = checkDates;
          
          var old = null;
          $("#datepicker").kendoDatePicker({
            value: new Date(2014, 2, 11),
            dates: dates,
            month: {
              content: $("#monthTemplate").html()
            },
            change: function() {
              var value = this.value();
    
              if (checkDates(value, dates)) {
                 this.value(old); 
              } else {
                 old = new Date(value);
              }
            }
          });
        });
      </script>  
```

## See Also

Other Kendo UI DatePicker how-to examples:

* [Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [Select Ranges between DatePickers]({% slug howto_select_ranges_between_datepicker %})
* [Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [Use AngularJS Copy Functionality]({% slug howto_use_angularjs_copy_functionality_datepicker %})
* [Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [Restrict User Input to Min/Max Values]({% slug howto_restrict_user_input_minandmax_values_datepicker %})
* [Show Out-of-Range Dates as Disabled]({% slug howto_show_outofrange_dates_disabled_datepicker %})
* [Submit Forms on ENTER]({% slug howto_submmit_forms_onenter_datepicker %})