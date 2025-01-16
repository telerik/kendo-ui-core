---
title: Showing Character Count within an Input Field When Editing Grid Row
description: How to show the character count when editing a field in a row in the Grid for {{ site.framework }}? 
type: how-to
page_title: Show Characters Count When Editing a Field in a Row
slug: grid-on-edit-input-characters-count
tags: grid, editing, characters, count, show, edit, input
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® {{ site.product_short }} Grid</td>
		</tr>
	</tbody>
</table>

## Description

How to show the characters count when editing a field in a row in the Grid for {{ site.framework }}? 

## Solution

* Set a handler for the [`Edit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/edit) event.

    ```
     .Events(ev=>ev.Edit("onEdit"))
    ```

* Select the input fields, all of which are actual text boxes within the Grid.

* Add event listener for the [`Change`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) event.

* Get the count of the characters.

* Append a new element right after the input field.

    ```Index.cshtml
    @(Html.Kendo().Grid<CharacterCounter.Models.OrderViewModel>()
                .Name("grid")
                .Columns(columns =>
                {
                    columns.Bound(p => p.OrderID).Filterable(false);
                    columns.Bound(p => p.Freight);
                    columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
                    columns.Bound(p => p.ShipName);
                    columns.Bound(p => p.ShipCity);
                    columns.Command(cmd => cmd.Edit());
                })
                .Pageable()
                .Sortable()
                .Editable(e=>e.Mode(GridEditMode.InLine))
                .Scrollable()
                .Filterable()
                .Events(ev=>ev.Edit("onEdit"))
                .HtmlAttributes(new { style = "height:550px;" })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .PageSize(20)
                    .Model(s=>s.Id(c=>c.OrderID))
                    .Read(read => read.Action("Orders_Read", "Grid"))
                    .Update(u=>u.Action("Orders_Read", "Grid"))
                )
            )
    ```
    ```script.js
    function onEdit(e) {
            var inputFields = $('#grid .k-grid-content tbody .k-input[data-role="textbox"]')
            if (inputFields) {
                inputFields.on('change', function (e) {
                    var charactersCount = e.currentTarget.value.length // characters count
                    var cell = e.currentTarget.parentNode.parentNode; // parentElement to attach the new one
                    var spanEl = document.createElement('span') // new element
                    spanEl.textContent = `${charactersCount}/250`; // set its text
                    spanEl.style.color = 'red'; // add some styling
                    cell.appendChild(spanEl) //append the new element
                })
            }
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
