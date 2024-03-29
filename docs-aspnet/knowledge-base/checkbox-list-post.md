---
title: Getting the Selected CheckBoxes on the Server
description: An example on how to get selected CheckBox list items on the server in Telerik UI for ASP.NET Core.
type: troubleshooting
page_title: Getting the Selected CheckBoxes on the Server
slug: checkbox-list-post
tags: get, selected, checkboxes, server
ticketid: 1413275
res_type: kb
---

## Environment

<table>
  <tr>
  	<td>Product</td>
  	<td>Checkbox for Progress® Telerik® UI for ASP.NET Core</td>
  </tr>
</table>


## Problem

I have a group of ASP.NET Core `@Html.Kendo().CheckBox()` components. How can I get in my action method which Kendo UI checkboxes are checked?

## Description

In a common case for multiple items of the same collection, you can use the [`value` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value) of the CheckBox to carry its identifier to the server, assuming that all CheckBoxes in the list have the same `name` attribute set. However, in a Telerik UI CheckBox helper, you do not have control over the `value` attribute because it is designed for being used with a Boolean field to show or edit a single value.

## Solution

To resolve the multiple item selection, use any of the following approaches: here are several options for resolving :

* Use a Kendo MultiSelect widget as described in the following article: [https://docs.telerik.com/aspnet-core/knowledge-base/multiselect-post-data-values](https://docs.telerik.com/aspnet-core/knowledge-base/multiselect-post-data-values)
* Copy the markup and classes that are rendered by the Kendo CheckBox helper to get the styling, and use the `value` attribute of the `input`.

The following example demonstrates how to implement the suggested approach in ASP.NET MVC5. For later ASP.NET Core versions, the only difference is the way to return HTML from the controller for the sake of the presentation.

```View
@{
	List<CheckboxListModel> items = new List<CheckboxListModel>()
{
		new CheckboxListModel { Id= "cb1", Name = "first", Description = "checkbox 1"  },
		new CheckboxListModel { Id= "cb2", Name = "second", Description = "checkbox 2"  },
		new CheckboxListModel { Id= "cb3", Name = "third", Description = "checkbox 3"  },
	};
	// In the common case, this comes from the controller rendering the view. Used here for brevity.
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
// This can be bound to an actual model depending on the <form> contents. Used here as a list of checkboxes.
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
	// In the common case, this comes from the controller rendering the view. Used here for brevity.
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
// This can be bound to an actual model depending on the <form> contents. Used as a list of checkboxes.
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

## More {{ site.framework }} CheckBox Resources

* [{{ site.framework }} CheckBox Documentation]({%slug htmlhelpers_checkbox_aspnetcore_overview%})

* [{{ site.framework }} CheckBox Demos](https://demos.telerik.com/{{ site.platform }}/checkbox/index)

* [{{ site.framework }} CheckBoxGroup Product Page](https://www.telerik.com/aspnet-core-ui/checkboxgroup)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

## See Also

* [Client-Side API Reference of the CheckBox for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/checkbox)
* [Server-Side API Reference of the CheckBox for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/checkbox)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
