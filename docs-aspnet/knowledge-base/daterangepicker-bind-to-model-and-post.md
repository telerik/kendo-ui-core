---
title: Bind DateRangePicker to Model Value and POST to Controller
description: An example on how to bind a Telerik UI for ASP.NET Core DateRangePicker to model value and POST to controller.
type: how-to
page_title: Bind DateRangePicker to Model Value and POST to Controller
slug: daterangepicker-bind-to-model-and-post
tags: daterangepicker, model, value, post, controller
ticketid: 1418770
res_type: kb
---

## Environment

<table>
  <tr>
  	<td>Product</td>
  	<td>DateRangePicker for Progress® Telerik® UI for ASP.NET Core, DateRangePicker for Progress® Telerik® UI for ASP.NET MVC</td>
  </tr>
</table>


## Description

How can I show (bind) a model value in the DateRangePicker and submit it in a POST to a controller action?

## Solution

* To show the dates from the model in the DateRangePicker, configure the `.Range(r => r.Start().End())`.
* To submit the POST data, use the [`StartField`](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/configuration/startfield) and [`EndField`](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/configuration/endfield) settings of the DateRangePicker to set the names of the fields that are used in the query.

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
public IActionResult Index()
{
    MyViewModel mdl = new MyViewModel { TheStartTime = DateTime.Now.AddDays(-2), TheEndTime = DateTime.Now.AddDays(2) };
    return View(mdl);
}

[HttpPost]
public IActionResult Index(MyViewModel theUserInput)
{
    return View(theUserInput);//just return to the current view with the new data
}
```
