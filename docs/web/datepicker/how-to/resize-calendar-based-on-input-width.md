---
title: Resize calendar based on input width
page_title: Resize calendar based on input width
description: Resize calendar based on input width
---

# Resize calendar based on input width

The example below demonstrates how to resize the nested Kendo UI Calendar based on the width of the DatePicker input element.

#### Example:

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
