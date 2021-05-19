---
title: Serialize DataSource Request of Grid and post it to another backend service
description: An example on how to post the DataSourceRequest to another remote service on the server.
type: how-to
page_title: Post DataSourceReuqest to another data layer
slug: grid-post-datasource-request-to-another-service
tags: grid, post, DataSourceRequest, HttpClient
ticketid: 1442001
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2019.3.917</td>
 </tr>
 <tr>
  <td>ASP.NET Core Version</td>
  <td>3.0</td>
 </tr>
</table>

## Description

I've started using SpreadStreamProcessing and am now trying to get it to work with my existing code. I would like to pass the DataSourceRequest to another method and use it to generate an excel file. How can I post the existing Request

## Solution

1. For get requests, you can use an approach similar to the one demonstrated in [this forum post](https://www.telerik.com/forums/connecting-asp-net-mvc-application-to-asp-net-webapi#f_CGsEPUa0KwgTJ8SEXPIg).
1. For the standard POST request, you need to serialize the Form request in the same way as the grid request does it. 

```
    public IActionResult ReadOrders([DataSourceRequest]DataSourceRequest request)
    {
        var req = JsonConvert.SerializeObject(HttpContext.Request.Form);
        
        ProcessRequest(req);
        
        return Json(orders.ToDataSourceResult(request));
    }

	private async void ProcessRequest(string request)
    {
        HttpClient httpClient = new HttpClient();
        var formItems  = new List<KeyValuePair<string,string>>();
        httpClient.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");
        var values = JsonConvert.DeserializeObject<List<KeyValuePair<string,List<string>>>>(request);
        foreach (var keyValuePair in values)
        {
            formItems.Add(new KeyValuePair<string,string>(keyValuePair.Key), keyValuePair.Value[0]));
        }
        var form = new FormUrlEncodedContent(formItems);
        var response = httpClient.PostAsync("https://SomeOtherDomain.com/SomeController/ReadOrders", form).Result;
        string resWithFilter = await response.Content.ReadAsStringAsync();
        List<OrderViewModel> savedResult = JsonConvert.DeserializeObject<ResultData>(resWithFilter).Data;
    }

```
