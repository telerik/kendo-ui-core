---
title: Include Clear Button In DatePicker's Footer Template
description: Configure the Kendo UI DatePicker's footer template with a button to remove its value.
type: how-to
page_title: Add a Clear Button to Footer Template
slug: datepicker-include-clear-button-in-footer-template
position: 
tags: datepicker, clear, footer
ticketid: 1456583
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.1.219</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Date/Time Pickers for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I add a clear button to the footer of a Kendo UI DatePicker?

## Solution
The clear button can be appended to the [Kendo UI DatePicker's footer](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/configuration/footer) during the [Open event](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/events/open).  

```javascript
    function onOpen(e) {
        //Get the opened DatePicker's footer
        var footer = $(e.sender.dateView.popup)[0].element.find(".k-footer");

        //If the button doesn't exist, create it, and append it to the footer.
        if (footer.find(".k-button").length == 0) {
            var btn = $('<a/>');
            btn.addClass('k-button');
            btn.text('Clear');
            btn.on('click', function () {
                e.sender.value(null);
                e.sender.close();
            });

            footer.append(btn);
        }

    }
```

#### Example

```dojo
    <input id="datepicker" />
    <input id="datepicker2" />

    <script>
      $("#datepicker").kendoDatePicker({
        open: onOpen,
      });

      $("#datepicker2").kendoDatePicker({
        open: onOpen,
      });

      function onOpen(e) {
        //Get the opened DatePicker's footer
        var footer = $(e.sender.dateView.popup)[0].element.find(".k-footer");

        //If the button doesn't exist, create it, and append it to the footer.
        if (footer.find(".k-button").length == 0) {
          var btn = $('<a/>');
          btn.addClass('k-button');
          btn.text('Clear');
          btn.on('click', function () {
            e.sender.value(null);
            e.sender.close();
          });

          footer.append(btn);
        }

      }
    </script>
```

## See Also
* [footer Configuration - API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/configuration/footer)
* [open Event - API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/events/open)
