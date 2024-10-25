---
title: Show Tooltip on Selected Item in ComboBox
description: Learn how to show a Kendo UI Tooltip on a selected item in the Kendo UI ComboBox.
type: how-to
page_title: Display a Tooltip for the Selected Item - Kendo UI Tooltip for jQuery
slug: combobox-tooltip-selected-item
tags: combobox, tooltip, selected
ticketid: 1143333  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Tooltip for jQuery</td>
  <td>Progress® Kendo UI® ComboBox for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show a tooltip on a selected item in the ComboBox?

## Solution

1. Subscribe to the `select` event of ComboBox.
1. In the event handler, check the text of the selected item.
1. Destroy the Tooltip that was previously created.
1. Create a Tooltip with the text of the selected item.

```dojo
<input id="combobox" />
<script>      
    $("#combobox").kendoComboBox({
        placeholder: "Select product",
        dataTextField: "ProductName",
        dataValueField: "ProductID",   
      	 select: onSelect,
        dataSource: {
            type: "odata",
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
            }
        }
    });

    $('.k-widget.k-combobox').kendoTooltip({  
	   		content: "No value selected"
	  });

    function onSelect(e){
     	var text = e.item.text();
     	$(".k-widget.k-combobox").data("kendoTooltip").destroy();    
     	$('.k-widget.k-combobox').kendoTooltip({  
     	   content: text  				
     	});
    }    
</script>
```
