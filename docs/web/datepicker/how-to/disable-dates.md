---
title: Disable dates
page_title: Disable dates
description: Disable dates
---

# Disable dates

The example below demonstrates how to disable dates in the built-in Kendo UI Calendar.

#### Example:

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
