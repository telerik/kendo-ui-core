---
title: MultiSelect Performs Repetitive Requests while Filtering
page_title: MultiSelect Performs Repetitive Requests while Filtering
description: "Learn how to handle the Kendo UI for jQuery MultiSelect when it performs repetitive requests while filtering its data in ASP.NET."
slug: multiselect_repetitive_requests_filtering
tags: telerik, progress, kendoui, multiselect, performs, repetitive, requests, while, filtering, aspnet
type: troubleshooting
res_type: kb
component: multiselect
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

The MultiSelect performs repetitive requests while filtering in ASP.NET.

## Cause 

Repetitive requests that are performed by the Kendo UI MultiSelect component are caused by the response from the ASP.NET Web API Order controller.

## Solution 

The `total` configuration has to respond to the total number of records that are found after filtering, that is, `dataResult.Count`. Otherwise, the widget continues to request the remainder of the `total`.

The following example demonstrates how to change the service accordingly.

```
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

* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
