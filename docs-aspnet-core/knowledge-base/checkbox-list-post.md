---
title: Get selected checkboxes on the server
description: How to get selected checkbox list items on the server
type: troubleshooting
page_title: Get checkbox list selection on the server
slug: checkbox-list-post
position: 
tags: 
ticketid: 1413275
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Checkbox for ASP.NET MVC, Checkbox for ASP.NET Core</td>
	    </tr>
    </tbody>
</table>


## Problem

I have a group of @Html.Kendo().CheckBox(). I need to get what checkboxes are checked in my action method. I cannot get the checked Kendo checkboxes.

## Description

In a common case for multiple items of the same collection, you could use the [value attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value) of the checkbox to carry its identifier to the server, assuming all checkboxes in the list have the same `name` attribute set.

In a Kendo CheckBox helper, you don't have control over the `value` attribute, however, because it is designed for using with a boolean field to show/edit a single value..

## Solution

There are several options for resolving multiple item selection:

**Option 1**: Use a Kendo MultiSelect widget as described in the following article: [https://docs.telerik.com/aspnet-core/knowledge-base/multiselect-post-data-values](https://docs.telerik.com/aspnet-core/knowledge-base/multiselect-post-data-values)

**Option 2**: Copy the markup and classes that are rendered by the Kendo CheckBox helper to get the styling, and use the `value` attribute of the `input`.

Example for ASP.NET MVC5 (one for ASP.NET Core is available after it, the only difference is the way to return HTML from the controller for the sake of the presentation):

```View
@{
	List<CheckboxListModel> items = new List<CheckboxListModel>()
{
		new CheckboxListModel { Id= "cb1", Name = "first", Description = "checkbox 1"  },
		new CheckboxListModel { Id= "cb2", Name = "second", Description = "checkbox 2"  },
		new CheckboxListModel { Id= "cb3", Name = "third", Description = "checkbox 3"  },
	};
	//In the common case, this comes from the controller rendering the view. It's here for brevity.
}

<form action="/PostCheckBoxList/GetSelectedCheckboxList" method="post">

	@foreach (var item in items)
	{
		<div>
			<input class="k-checkbox" name="TheModelFieldName" value="@item.Name" type="checkbox" id="@item.Id" />
			<label class="k-checkbox-label" for="@item.Id">@item.Description</label>
		</div>
	}

	<input type="submit" value="POST the selected items" />
</form>
```
```Controller
[HttpPost]
public ActionResult GetSelectedCheckboxList(List<string> TheModelFieldName)
//this can be bound to an actual model, depending on the <form> contents, here it's just a list of checkboxes
{
    string result = string.Empty;
    for (int i = 0; i < TheModelFieldName.Count; i++)
    {
        result += $"{TheModelFieldName[i]} is checked<br />";
    }

    return Content(result);
}
```
```Model
public class CheckboxListModel
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}
```

Example for ASP.NET Core

```View
@{
	List<CheckboxListModel> items = new List<CheckboxListModel>()
{
		new CheckboxListModel { Id= "cb1", Name = "first", Description = "checkbox 1"  },
		new CheckboxListModel { Id= "cb2", Name = "second", Description = "checkbox 2"  },
		new CheckboxListModel { Id= "cb3", Name = "third", Description = "checkbox 3"  },
	};
	//In the common case, this comes from the controller rendering the view. It's here for brevity.
}

<form action="/PostCheckBoxList/GetSelectedCheckboxList" method="post">

	@foreach (var item in items)
	{
		<div>
			<input class="k-checkbox" name="TheModelFieldName" value="@item.Name" type="checkbox" id="@item.Id" />
			<label class="k-checkbox-label" for="@item.Id">@item.Description</label>
		</div>
	}

	<input type="submit" value="POST the selected items" />
</form>
```
```Controller
[HttpPost]
public ActionResult GetSelectedCheckboxList(List<string> TheModelFieldName)
//this can be bound to an actual model, depending on the <form> contents, here it's just a list of checkboxes
{
    string result = string.Empty;
    for (int i = 0; i < TheModelFieldName.Count; i++)
    {
        result += $"{TheModelFieldName[i]} is checked<br />";
    }

    return Content(result, Microsoft.Net.Http.Headers.MediaTypeHeaderValue.Parse("text/html"));
}
```
```Model
public class CheckboxListModel
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}
```

