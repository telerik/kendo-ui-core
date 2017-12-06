---
title: Loading Animation on Kendo Spreadsheet Control
description: An example on how to open the Kendo Progress indicator on pasting data in the Kendo Spreadsheet.
type: how-to
page_title: Open Kendo Progress on Pasting Data | Kendo UI Spreadsheet
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

I'm trying to get a loading animation on the Kendo Spreadsheet when I try to paste huge clipboard data in the Spreadsheet. How to achieve that?

## Solution

You could achieve the desired by implementing a jQuery `paste` event handler. To attach the event use the `render` event of the Spreadsheet. Keep in mind, that you will need to open the Kendo Progress on the Spreadsheet element and not on the paste target:  

````html
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

* [API Reference of the Spreadsheet](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [API Reference of the Progress Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/ui#methods-progress)
