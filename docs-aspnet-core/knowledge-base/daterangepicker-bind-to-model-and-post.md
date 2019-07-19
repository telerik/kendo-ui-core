---
title: Bind DateRangePicker to model value and POST to controller
description: How to bind Kendo DateRangePicker to model value and POST to controller
type: how-to
page_title: Bind DateRangePicker to model value and POST to controller
slug: daterangepicker-bind-to-model-and-post
position: 
tags: 
ticketid: 1418770
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>DateRangePicker for ASP.NET Core and ASP.NET MVC</td>
	    </tr>
    </tbody>
</table>


## Description

How to show (bind) a model value in a Kendo DateRangePicker and also submit it in a POST to a controller action.

## Solution

There are two things you need to do:

* for showing the dates from the model in the range picker, configure the `.Range(r => r.Start().End())`

* for the POST data, use the [StartField](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/configuration/startfield) and [EndField](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/configuration/endfield) settings of the widget to set the names of the fields used in the query.


The two separate settings are needed because the widget consists of to actual inputs.

Here is a basic example:

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

