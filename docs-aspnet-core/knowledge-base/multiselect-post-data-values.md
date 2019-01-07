---
title: Submit MultiSelect Data to Controller POST
description: How to use a MultiSelect widget in a POST query and read its data
type: how-to
page_title: Submit MultiSelect Data to Controller POST
slug: multiselect-post-data-values
position: 
tags: 
ticketid: 1381199, 1381623 
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product</td>
		<td>MultiSelect for ASP.NET Core, MultiSelect for ASP.NET MVC</td>
	</tr>
</table>


## Question
If I would like to submit selected data then how I can pass selected data to the controller action method? Essentially,  how to get the values in the multiselect on a submit postback to my controller.

## Description

The Kendo MultiSelect widget is a `<select multiple>` element in the DOM and so it will POST a list of fields with the values of the selected options. The controller must be prepared to take such input.

![POST data example](images/multiselect-POST-data.png)

## Solution

There are different ways to pass data to a controller in MVC and here are a few:

* Use a form and a submit button in it like you would with a simple `<select multiple>` element. This works best if the html helper you use is an editor for a model field (for example,, `MultiSelectFor(model => model.TheField)` which will let you use the MVC model binding to post the entire model from the form. Here are two samples:
    * [for ASP.NET Core](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/multiselect/get-post-data)
    * [for ASP.NET MVC5](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/multiselect/get-POST-data)
* Create your own request where you can read the value of the multiselect and pass it as a generic string (you can get it from its [value() method](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/methods/value)). An example of obtaining that is also available in the samples above.
* Use an AJAX form with some additional scripts which basically goes through the inputs on the page and serializes them: [https://www.c-sharpcorner.com/UploadFile/0c1bb2/ajax-beginform-in-Asp-Net-mvc-5/](https://www.c-sharpcorner.com/UploadFile/0c1bb2/ajax-beginform-in-Asp-Net-mvc-5/). This is quite similar to the idea above, although you may need to test how these scripts behave with a `<select multiple>` element).
