---
title: Show Tooltip on Selected Item in ComboBox
description: An example on how to show Tooltip on selected Item in ComboBox
type: how-to
page_title: Show Tooltip on Selected Item in ComboBox | Kendo UI Tooltip 
slug: combobox-tooltip-selected-item
tags: combobox, tooltip, selected
ticketid: 1143333  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Tooltip</td>
  <td>Progress Kendo UI ComboBox</td>
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

How to show Tooltip on selected item in ComboBox?

## Solution

Subscribe to the select event of ComboBox. In the event handler check the text of the selected item. Destroy the previously created Tooltip. Create Tooltip with the text of the select item.

```html
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
