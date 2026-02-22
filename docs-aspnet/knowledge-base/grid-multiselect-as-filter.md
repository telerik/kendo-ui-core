---
title: Use MultiSelect as Filter in Grids
description: How can I use a {{ site.product }} MultiSelect as a filter in the {{ site.product }} Grid?
type: how-to
page_title: Use MultiSelect as Filter in Grids
previous_url: /helpers/editors/multiselect/how-to/use-multiselect-filter-in-grids, /html-helpers/editors/multiselect/how-to/use-multiselect-filter-in-grids, /helpers/data-management/grid/how-to/Filtering/use-multiselect-filter, /html-helpers/data-management/grid/how-to/Filtering/use-multiselect-filter
slug: grid-multiselect-as-filter
tags: multiselect, grid, filter, items, telerik, core, mvc
res_type: kb
components: ["general"]
component: grid, multiselect
---


## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>
				{{ site.product }} MultiSelect, <br />
				{{ site.product }} Grid
			</td>
		</tr>
		<tr>
			<td>Product Version</td>
			<td>Created with version 2024.4.1112</td>
		</tr>
	</tbody>
</table>

## Description

How can I use the [MultiSelect]({% slug htmlhelpers_multiselect_aspnetcore %}) as a filter in the default column filter menu of the [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %})?

## Solution

1. Remove the second filter input in the default column filter menu using the [`Extra(false)`](/api/kendo.mvc.ui.fluent/gridboundcolumnfilterablebuilder#extrasystemboolean) option of the `Filterable` configuration.
1. Use the [`UI`](/api/kendo.mvc.ui.fluent/gridboundcolumnfilterablebuilder#uisystemstring) option of the `Filterable` configuration and pass the name of the JavaScript function (`multiselectFilter`) that will create the MultiSelect.
1. Within the `multiselectFilter` function, initialize the MultiSelect editor and remove the default DropDownList editor with jQuery. Also, handle the `submit` event of the column filter menu, prevent its default action, and filter the Grid based on the selected options in the MultiSelect.
1. The Grid is configured for remote data binding, and all data operations are performed server-side. As a result, when you call the [`filter()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter) method of the DataSource, the filter expression will be sent to the server. Intercept the applied filters through the `request` object and filter the data as demonstrated in the `Read` action in the code snippet below.

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
```JS
	<script>
		function multiselectFilter(element) {
			element.removeAttr("data-bind");
			var dataSource = $("#grid").data("kendoGrid").dataSource; // Access the Grid's DataSource.
			var multiselect = element.kendoMultiSelect({ // Initialize the MultiSelect editor and specify its data.
				dataSource: ["Tag1", "Tag2", "Tag3"]
			}).data("kendoMultiSelect");

			var form = element.closest("form"); // Select the form of the filter menu.
			var popup = form.data("kendoPopup"); // Get a reference of the Popup component.
			form.find("[data-role=dropdownlist]").remove(); // Remove the default DropDownList editor.

			form.find("[type='submit']").click(function (e) { // Handle the "submit" event of the filter menu.
				e.preventDefault(); // Prevent its default action.
				e.stopPropagation();
				var filter = dataSource.filter() || { logic: "and", filters: [] }; // The current DataSource filters.
				var tags = multiselect.value(); // Get the selected MultiSelect options.
				removeFiltersForField(filter, "Tags"); // Remove duplicated filters, if any.
				if (tags.length) {
					filter.filters = filter.filters.concat($.map(tags, function (value) { // Update the existing filters with the selected MultiSelect options.
						return {
							operator: "eq",
							value: value,
							field: "Tags"
						}
					}));
				}
				dataSource.filter(filter); // Filter the Grid (the Read request will be triggered).
				popup.close(); // Close the column filter menu.
			}).end()
				.find("[type='reset']").click(function () {
					multiselect.value([]); // Reset the MultiSelect when the "Clear" button is clicked.
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
```

For the complete implementation of how to use the MultiSelect as a filter in a specified Grid column, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridMultiSelectFilter) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this application as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

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
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Client-Side API Reference of the MultiSelect for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [Server-Side API Reference of the MultiSelect for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/multiselect)
{% if site.core %}
* [Server-Side TagHelper API Reference of the MultiSelect for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/multiselect)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes](https://docs.telerik.com/{{ site.platform }}/backwards-compatibility/overview)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
