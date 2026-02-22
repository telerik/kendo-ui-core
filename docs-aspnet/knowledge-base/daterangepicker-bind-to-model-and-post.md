---
title: Binding DateRangePicker to Model Value and Submitting POST to Controller
description: An example on how to bind a Telerik UI for ASP.NET Core DateRangePicker to model value and POST to controller.
type: how-to
page_title: Bind DateRangePicker to Model Value and POST to Controller
slug: daterangepicker-bind-to-model-and-post
tags: daterangepicker, model, value, post, controller
ticketid: 1418770
res_type: kb
components: ["general"]
---

## Environment

<table>
  <tr>
  	<td>Product</td>
  	<td>DateRangePicker for Progress® Telerik® UI for ASP.NET Core, DateRangePicker for Progress® Telerik® UI for ASP.NET MVC</td>
  </tr>
</table>


## Description

How can I show (bind) a model value in the DateRangePicker and submit it in a `POST` request to a controller action?

## Solution

1. To show the dates from the model in the DateRangePicker, configure the `.Range(r => r.Start().End())`.
1. To submit the POST data, use the [`StartField`](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/configuration/startfield) and [`EndField`](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/configuration/endfield) settings of the DateRangePicker to set the names of the fields that are used in the query.

These two settings are needed because the DateRangePicker consists of two actual inputs.

```View
@model MyViewModel

<form method="post" action="/home/index">

	@(Html.Kendo().DateRangePicker()
					 .Name("myDateRangePicker")
					 //model fields for POST data
					 .StartField(nameof(Model.TheStartTime))
					 .EndField(nameof(Model.TheEndTime))
					 //current range values to be displayed
					 .Range(r => r.Start(Model.TheStartTime).End(Model.TheEndTime))
	)

	<input type="submit" value="make a change in the range and click me" />
</form>
```
```Model
public class MyViewModel
{
    public DateTime TheStartTime { get; set; }
    public DateTime TheEndTime { get; set; }
}
```
```Controller
public ActionResult Index()
{
    MyViewModel mdl = new MyViewModel { TheStartTime = DateTime.Now.AddDays(-2), TheEndTime = DateTime.Now.AddDays(2) };
    return View(mdl);
}

[HttpPost]
public ActionResult Index(MyViewModel theUserInput)
{
    return View(theUserInput);//just return to the current view with the new data
}
```

## More {{ site.framework }} DateRangePicker Resources

* [{{ site.framework }} DateRangePicker Documentation]({%slug htmlhelpers_daterangepicker_aspnetcore%})

* [{{ site.framework }} DateRangePicker Demos](https://demos.telerik.com/{{ site.platform }}/daterangepicker/index)

{% if site.core %}
* [{{ site.framework }} DateRangePicker Product Page](https://www.telerik.com/aspnet-core-ui/core-daterangepicker)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DateRangePicker Product Page](https://www.telerik.com/aspnet-mvc/mvc-daterangepicker)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the DateRangePicker for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker)
* [Server-Side API Reference of the DateRangePicker for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/daterangepicker)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
