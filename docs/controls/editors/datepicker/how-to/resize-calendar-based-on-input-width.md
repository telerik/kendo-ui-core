---
title: Resize Calendar Based on Input Width
page_title: Resize Calendar Based on Input Width | Kendo UI DatePicker
description: "Learn how to resize the nested calendar based on the widthe of the input element of the Kendo UI DatePicker widget."
slug: howto_use_resize_calendar_basedon_input_width_datepicker
---

# Resize Calendar Based on Input Width

The example below demonstrates how to resize the nested Kendo UI Calendar based on the width of the Kendo UI DatePicker input element.

###### Example

```html
      <div id="example">
            <div id="email-settings">
                <div style="margin-top: -6px; margin-left: 180px">
                    <input id="datepicker" value="10/10/2011" style="width:150px;" />
                </div>
                <div style="margin-top: 59px; margin-left: 180px">
                    <input id="monthpicker" value="November 2011" style="width:150px" />
                </div>
            </div>
        <script>
            $(document).ready(function() {
                // create DatePicker from input HTML element
                $("#datepicker").kendoDatePicker({
                  open: function() {
                    var calendar = this.dateView.calendar;

                    calendar.wrapper.width(this.wrapper.width() - 6);
                  }
                });

                $("#monthpicker").kendoDatePicker({
                    // defines the start view
                    start: "year",

                    // defines when the calendar should return date
                    depth: "year",

                    // display month and year in the input
                    format: "MMMM yyyy"
                });
            });
            </script>
            <style scoped>
                #example h2 {
                    font-weight: normal;
                }
                #email-settings {
                    height: 135px;
                    width: 395px;
                    margin: 30px auto;
                    padding: 110px 0 0 30px;
                    background: url('../content/web/datepicker/mailSettings.png') transparent no-repeat 0 0;
                }
            </style>
        </div>  
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

For more runnable examples on the Kendo UI DatePicker, browse its [**How To** documentation folder]({% slug howto_select_ranges_between_datepicker %}).
