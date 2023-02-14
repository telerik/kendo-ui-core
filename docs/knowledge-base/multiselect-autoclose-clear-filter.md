---
title: Clear Filter in the MultiSelect When AutoClose is False
page_title: How To Clear Filter in the MultiSelect When AutoClose is False 
description: "Learn how to clear filter in the MultiSelect when autoClose is false."
slug: multiselect-autoclose-clear-filter
tags: telerik, kendo, jquery, multiselect, filter, close, clear
component: multiselect
ticketid: 1558414
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr> 
</table>

## Description

I want to set [`autoClose`](/api/javascript/ui/multiselect/configuration/autoclose) option in MultiSelect to `false`. In this case when I filter the data in the popup and select an item, the filter value is not cleared. How can I manually clear the filter input in the MultiSelect?

## Solution

1. Handle the [`change`](/api/javascript/ui/multiselect/events/change) event of the MultiSelect widget. 
1. In the event handler you can clear the text value of the input and the filter value:


```dojo
    <h4>Products</h4>
    <select id="products"></select>
    <script>
        $(document).ready(function() {
          $("#products").kendoMultiSelect({
            placeholder: "Select products...",
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            autoClose: false,
            filter: "contains",
            change:function(e){
              e.sender.wrapper.find('input').val("");
              e.sender.dataSource.filter({});
            },
            dataSource: {
              type: "odata",                   
              transport: {
                read: {
                  url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
              }
            }
          });
        });
    </script>
```

## See Also

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
