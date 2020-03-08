---
title: Load Animation to the Spreadsheet
description: An example on how to open the Kendo UI Progress Indicator on pasting data in the Kendo UI Spreadsheet.
type: how-to
page_title: Open Progress Indicator on Pasting Data | Kendo UI Spreadsheet for jQuery
slug: spreadsheet-open-kendo-progress-on-paste
tags: kendo, kendoui, spreadsheet, paste, progress, loader, loading
ticketid: 1142807
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>

## Description

How can I add a loading animation to the Spreadsheet when I paste huge clipboard data in the it?

## Solution

Implement a jQuery `paste` event handler. To attach the event, use the `render` event of the Spreadsheet. Note that you will need to open the Kendo UI Progress Indicator on the `spreadsheet` element and not on the `paste` target.  

````dojo
<div id="spreadsheet"></div>

<script>
  $("#spreadsheet").kendoSpreadsheet({
    render: function(e) {
      var spreadsheetView = $('.k-spreadsheet-view');

      spreadsheetView.unbind('paste');

      spreadsheetView.on('paste', function (e) {
        var element = $('.k-spreadsheet');

        kendo.ui.progress(element, true);

        setTimeout(function () {
          kendo.ui.progress(element, false);
        }, 1000);
      });
    }
  });
</script>
````

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [API Reference of the Progress Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/ui/methods/progress)
