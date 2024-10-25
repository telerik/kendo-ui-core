---
title: ComboBox Performs Repetitive Requests While Filtering in ASP.NET
page_title: ComboBox Performs Repetitive Requests While Filtering in ASP.NET
description: "Learn how to handle the Kendo UI for jQuery Scheduler if the component performs repetitive requests while filtering in ASP.NET."
slug: combobox_repetitive_requests_filtering_aspnet
tags: telerik, progress, kendoui, combobox, performs, repetitive, requests, while, filtering, aspnet
type: troubleshooting
res_type: kb
component: combobox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ComboBox for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description

Repetitive requests in the jQuery ComboBox are performed while filtering in ASP.NET.

## Cause

Repetitive requests that are performed by the Kendo UI ComboBox component are caused by the response from the ASP.NET Web API Order controller.

## Solution

The total configuration has to respond to the total number of records that are found after filtering, that is, dataResult.Count. Otherwise, the component continues to request the remainder of the total.

The following example demonstrates how to change the service accordingly.

```html
   public object Get(int? take = null, int? skip = null, string q = null)
    {
        List<OrderModel> dataResult = string.IsNullOrEmpty(q) ? Orders.Skip(skip ?? 0).Take(take ?? int.MaxValue).ToList() : Orders.Where(m => m.Name.Contains(q)).ToList();
        return new
        {
            total = dataResult.Count,
            data = dataResult
        };
    }
```

## See Also

* [Basic Usage of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/index)
* [Using the API of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/api)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
