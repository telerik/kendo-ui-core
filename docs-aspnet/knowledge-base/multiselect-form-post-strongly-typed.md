---
title: Use Strongly Typed MultiSelect Posted through a Form
description: Learn how to integrate and use a strongly typed {{ site.product }} MultiSelect within a form.
type: how-to
page_title: Use Strongly Typed MultiSelect Posted through a Form
previous_url: /helpers/editors/multiselect/how-to/use-strongly-typed-posted-with-form, /html-helpers/editors/multiselect/how-to/use-strongly-typed-posted-with-form
slug: multiselect-form-post-strongly-typed
tags: multiselect, form, post, model, strongly-typed, strongly, typed, telerik, core, mvc
res_type: kb
components: ["general"]
component: multiselect
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>{{ site.product }} MultiSelect</td>
		</tr>
		<tr>
			<td>Product Version</td>
			<td>Created with version 2024.4.1112</td>
		</tr>
	</tbody>
</table>

## Description

How can I integrate and use a strongly typed MultiSelect editor in a form?

## Solution

Using a strongly typed variable means that the form is bound to a specific model rather than a loosely typed structure like `ViewBag`. This approach ensures better type safety, validation, and maintainability. Follow the next steps to implement it.

1. Create ViewModels to store both the available items and the selected values that will be submitted.
1. Configure and bind the MultiSelect component to the respective model property.
1. Process the form submission by accessing the selected values from the strongly typed model on the server.

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
```Model
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

For the complete implementation of how to integrate and use the MultiSelect in a form, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/MultiSelectFormPostStronglyTyped) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this application as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

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
{% if site.core %}
* [Server-Side TagHelper API Reference of the MultiSelect for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/multiselect)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes](https://docs.telerik.com/{{ site.platform }}/backwards-compatibility/overview)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
