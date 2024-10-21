---
title: Use MultiSelect as Filter in Grids
description: How can I use a {{ site.product }} MultiSelect as a filter in the {{ site.product }} Grid?
type: how-to
page_title: Use MultiSelect as Filter in Grids
slug: grid-multiselect-as-filter
tags: multiselect, grid, filter, items
res_type: kb
component: Grid, MultiSelect
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

How can I use a {{ site.product }} MultiSelect as a filter in the {{ site.product }} Grid?

## Solution

1. Configure the [`Grid Column Filterable UI API`](/api/kendo.mvc.ui.fluent/gridboundcolumnfilterablebuilder#uisystemstring) and pass the `multiselectFilter()` JavaScript function as a parameter.
1. Implement the JavaScript function to disable the built-in filtration, define the MultiSelect [`dataSource`](/api/kendo.mvc.ui.fluent/multiselectbuilder#datasourcesystemaction), and extend the Grid’s [`dataSource filter()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter#filter) method.
1. Define the `removeFiltersForField()` script to establish custom filtering logic.
1. n the Controller, implement the filtering logic with the `GetMultiSelectFilter()` method and update the `Read` Action to support the MultiSelect filtering.


```HtmlHelper
	@(Html.Kendo().Grid<ViewModel>()
		.Name("grid")
		.Columns(columns =>
		{
			columns.Bound(e => e.ID);
			columns.Bound(e => e.Tags).Filterable(filterable => filterable.Extra(false)
					.Messages(m=> m.Info("Show items with value that contains"))
					.UI("multiselectFilter")
				)
				.ClientTemplate("#:Tags.join(',')#");
		})
		.Filterable()
		.DataSource(dataSource => dataSource
			.Ajax()
			.Read(read => read.Action("Read", "Home"))
		 )
	)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

	<kendo-grid name="grid" >
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Read", "Home")" />
            </transport>
        </datasource>
        <columns>
            <column field="ID" title="Id" />
            <column field="Tags" title="Tags" template="#:Tags.join(',')#" >
                <filterable extra="false" filter-ui-handler="multiselectFilter">
                    <messages info="Show items with value that contains" />
                </filterable>
            </column>
        </columns>
        <filterable enabled="true" />
    </kendo-grid>
```
 {% endif %}
```Script.js
	<script>
		function multiselectFilter(element) {
			element.removeAttr("data-bind");
			var dataSource = $("#grid").data("kendoGrid").dataSource;
			var multiselect = element.kendoMultiSelect({
				dataSource: ["Tag1", "Tag2", "Tag3"]
			}).data("kendoMultiSelect");
			var form = element.closest("form");
			var popup = form.data("kendoPopup");
			form.find("[data-role=dropdownlist]").remove();

			form.find("[type='submit']").click(function (e) {
				e.preventDefault();
				e.stopPropagation();
				var filter = dataSource.filter() || { logic: "and", filters: [] };
				var tags = multiselect.value();
				removeFiltersForField(filter, "Tags");
				if (tags.length) {
					filter.filters = filter.filters.concat($.map(tags, function (value) {
						return {
							operator: "eq",
							value: value,
							field: "Tags"
						}
					}));
				}
				dataSource.filter(filter);
				popup.close();
			}).end()
				.find("[type='reset']").click(function () {
					multiselect.value([]);
				});
		}

		function removeFiltersForField(expression, field) {
			if (expression.filters) {
				expression.filters = $.grep(expression.filters, function (filter) {
					removeFiltersForField(filter, field);
					if (filter.filters) {
						return filter.filters.length;
					} else {
						return filter.field != field;
					}
				});
			}
		}
	</script>
```
```Controller
	static List<ViewModel> data;
	static HomeController()
	{
		data = new List<ViewModel>()
		{
			new ViewModel
			{
				ID = 1,
				Tags = new List<string>(){"Tag1", "Tag2"}
			},
			new ViewModel
			{
				ID = 2,
				Tags = new List<string>(){"Tag2", "Tag3"}
			},
			new ViewModel
			{
				ID = 3,
				Tags = new List<string>(){"Tag3"}
			}
		};
	}
	
	public ActionResult Index()
	{
		ViewBag.Message = "Welcome to ASP.NET MVC!";
	
		return View();
	}
	
	private void GetMultiSelectFilter(IList<IFilterDescriptor> filters, List<object> result, String member)
	{
		for (int i = filters.Count - 1; i >= 0; i--)
		{
			var filter = filters[i];
			if (filter is CompositeFilterDescriptor)
			{
				GetMultiSelectFilter(((CompositeFilterDescriptor)filter).FilterDescriptors, result, member);
			}
			else if (((Kendo.Mvc.FilterDescriptor)filter).Member == member)
			{
				filters.Remove(filter);
				result.Add(((Kendo.Mvc.FilterDescriptor)filter).Value);
			}
		}
	}
	
	public ActionResult Read([DataSourceRequest] DataSourceRequest request)
	{
		List<object> tagFilters = new List<object>();
		GetMultiSelectFilter(request.Filters, tagFilters, "Tags");
		IQueryable<ViewModel> result = data.AsQueryable();
		if (tagFilters.Any())
		{
			result = result.Where(d => d.Tags.Any(t => tagFilters.Contains(t)));
		}
	
		return Json(result.ToDataSourceResult(request));
	}
```
For the complete implementation on how to use a {{ site.product }} MultiSelect as a filter in the {{ site.product }} Grid, refer to [this GitHub project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridMultiSelectFilter).

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

## More {{ site.framework }} MultiSelect Resources

* [{{ site.framework }} MultiSelect Documentation]({%slug htmlhelpers_multiselect_aspnetcore%})

* [{{ site.framework }} MultiSelect Demos](https://demos.telerik.com/{{ site.platform }}/multiselect)

{% if site.core %}
* [{{ site.framework }} MultiSelect Product Page](https://www.telerik.com/aspnet-core-ui/multiselect)

{% else %}
* [{{ site.framework }} MultiSelect Product Page](https://www.telerik.com/aspnet-mvc/multiselect)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Client-Side API Reference of the MultiSelect for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [Server-Side API Reference of the MultiSelect for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/multiselect)
* [Telerik UI for {{ site.framework }} Breaking Changes](https://docs.telerik.com/{{ site.platform }}/backwards-compatibility/overview)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
