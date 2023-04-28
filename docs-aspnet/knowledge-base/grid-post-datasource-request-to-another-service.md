---
title: Serialize DataSource Request of Grid and Post It to Another Backend Service
description: An example on how to post the DataSourceRequest to another remote service on the server when working with the {{ site.product }} Grid. 
type: how-to
page_title: Post DataSourceReuqest to Another Data Layer
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
  <td>{{ site.product }} Grid</td>
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

I've started using SpreadStreamProcessing and I'm now trying to get it to work with my existing code. I would like to pass the `DataSourceRequest` to another method and use it to generate an excel file. How can I post the existing request?

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

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
