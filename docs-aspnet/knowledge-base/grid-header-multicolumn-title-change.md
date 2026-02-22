---
title: Changing the Multi-Column Header Title
description: Learn how to replace the title of multi-column headers in a {{ site.product }} Grid.
type: how-to
page_title: Setting the Multi-Column Header Programmatically
slug: grid-header-multicolumn-title-change
position: 
tags: grid, header, multicolumn, title, change, column
ticketid: 1433557
res_type: kb
components: ["general"]
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.917</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for ASP.NET MVC and ASP.NET Core</td>
		</tr>
	</tbody>
</table>


## Description

How can I change the title of a multi-column header in the Data Grid programmatically when working with the {{ site.product }} components?

## Solution
First, add a new class to the `Columns.Group.HeaderHtmlAttributes` property to act as a selector.

```razor
   @(Html.Kendo().Grid<GridChangeMultiColHeader.Models.MyModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Group(a => a.Title("One").HeaderHtmlAttributes(new { @class = "multiColumnOne"})  //class added
            .Columns(multiColumnOne =>
            {
                multiColumnOne.Bound(p => p.ID);
                multiColumnOne.Bound(p => p.Name);
            })
        );
        columns.Group(a => a.Title("Two").HeaderHtmlAttributes(new { @class = "multiColumnTwo"})  //class added
            .Columns(multiColumnTwo =>
            {
                multiColumnTwo.Bound(p => p.MyDate).Format("{0:MM/dd/yyyy}");
                multiColumnTwo.Bound(p => p.Address);
            })
        );
        ...
    })
```

Then, set the title using the [jQuery html method](https://api.jquery.com/html/) at the appropriate time such as during a button click event.

```javascript
   function onClick(e) {
      $("#grid thead").find(".multiColumnOne").html("New One");
      $("#grid thead").find(".multiColumnTwo").html("New Two");
   }
```

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

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
