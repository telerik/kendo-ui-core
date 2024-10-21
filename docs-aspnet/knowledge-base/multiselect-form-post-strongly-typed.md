---
title: Use Strongly-Typed MultiSelect Posted with Form
description: How to integrate and use a strongly-typed {{ site.product }} MultiSelect within an {{ site.product }} Form?
type: how-to
page_title: Use Strongly-Typed MultiSelect Posted with Form
slug: multiselect-form-post-strongly-typed
tags: multiselect, form, post, model, strongly-typed, strongly, typed 
res_type: kb
component: MultiSelect
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI MultiSelect for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How to integrate and use a strongly-typed {{ site.product }} MultiSelect within a {{ site.product }} Form?

## Solution

Using a strongly-typed variable means that the form is bound to a specific model. Rather than a loosely-typed structure like ViewBag. This approach ensures better type safety, validation, and maintainability. Here's how to implement it:

1. Create ViewModels to store both the available items and the selected values that will be submitted.
1. Configure and Bind the MultiSelect component to the model.
1. Implement the Controller Action to populate the model with a list of  items. Handle form submissions, binding the user's selections back to the model.
1. Process the Form Submission by accessing the selected values from the strongly-typed model in the controller.

{% if site.core %}
```HtmlHelper
	@model Telerik.Examples.Mvc.Areas.MultiSelectFormPostStronglyTyped.Models.CountryInfo

	@using (Html.BeginForm())
	{
		<p>Posted values: @(new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(ViewBag.PostedCities ?? new int[] {}))</p>
		@(Html.Kendo().MultiSelectFor(m => m.SelectedCities)
				.DataValueField("ID")
				.DataTextField("Name")
				.BindTo(Model.Cities))
		<br />
		<button>Post</button>
	}
```
```TagHelper
    @addTagHelper *, Kendo.Mvc
	@model Telerik.Examples.Mvc.Areas.MultiSelectFormPostStronglyTyped.Models.CountryInfo
	
	<p>Posted values: @(string.Join(",", ViewBag.PostedCities ?? new int[] { }))</p>

	<form action="/" method="post">
		<kendo-multiselect for="SelectedCities"
						   datatextfield="Name"
						   datavaluefield="ID"
						   bind-to="Model.Cities">
		</kendo-multiselect>
		<button>Post</button>
	</form>
```
{% else %}
```HtmlHelper
	@model Telerik.Examples.Mvc.Areas.MultiSelectFormPostStronglyTyped.Models.CountryInfo

	@using (Html.BeginForm())
	{
		<p>Posted values: @(new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(ViewBag.PostedCities ?? new int[] {}))</p>
		@(Html.Kendo().MultiSelectFor(m => m.SelectedCities)
				.DataValueField("ID")
				.DataTextField("Name")
				.BindTo(Model.Cities))
		<br />
		<button>Post</button>
	}
```
{% endif %}
```Models
	public class CountryInfo
 	{
    	public int[] SelectedCities { get; set; }
    	public List<City> Cities { get; set; }
 	}

 	public class City
 	{
    	public int ID { get; set; }
    	public string Name { get; set; }
 	}
```
```Controller
	public IActionResult Index()
 	{
    	return View(new CountryInfo
    	{
        	Cities = GetCities(),
        	SelectedCities = new int[] { 1, 3 }
     	});
 	}

 	[HttpPost]
 	public ActionResult Index(int[] SelectedCities)
 	{
    	ViewBag.PostedCities = SelectedCities;
    	return View(new CountryInfo
    	{
        	Cities = GetCities(),
        	SelectedCities = SelectedCities
     	});
 	}

	public List<City> GetCities()
 	{
    	return new List<City>()
    	{
        	new City() { ID = 1, Name= "Sao Paulo" },
        	new City() { ID = 2, Name= "Toronto" },
        	new City() { ID = 3, Name= "New York" },
        	new City() { ID = 4, Name= "Vancouver" }
     	};
 	}
```
For the complete implementation on how to integrate and use a strongly-typed {{ site.product }} MultiSelect within a {{ site.product }} Form, refer to [this GitHub project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/MultiSelectFormPostStronglyTyped).

## More {{ site.framework }} MultiSelect Resources

* [{{ site.framework }} MultiSelect Documentation]({%slug htmlhelpers_multiselect_aspnetcore%})

* [{{ site.framework }} MultiSelect Demos](https://demos.telerik.com/{{ site.platform }}/multiselect)

{% if site.core %}
* [{{ site.framework }} MultiSelect Product Page](https://www.telerik.com/aspnet-core-ui/multiselect)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} MultiSelect Product Page](https://www.telerik.com/aspnet-mvc/multiselect)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the MultiSelect for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [Server-Side API Reference of the MultiSelect for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/multiselect)
* [Telerik UI for {{ site.framework }} Breaking Changes](https://docs.telerik.com/{{ site.platform }}/backwards-compatibility/overview)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
