---
title: Adding 'Select-All' Checkbox in Grid Footer
description: An example on how to add a 'Select-All' checkbox option in the Telerik UI for {{ site.framework }} Grid footer.
type: how-to
page_title: Adding 'Select-All' Checkbox in Grid Footer
slug: grid-select-all-in-footer
tags: grid, checkbox, select, footer, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.718 version</td>
 </tr>
</table>

## Description

How can I add a checkbox option in the Telerik UI for {{ site.framework }} Grid footer that allows the user to toggle the selection of all rows? This option is useful when the Grid contains many rows, and the user needs to select or unselect all rows when the Grid is scrolled to the bottom.

## Solution

1. Define a `Select` column in the Grid and add a `checkbox` element in the column's header and footer by using the [`ClientHeaderTemplate()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#clientheadertemplatesystemstring) / [`ClientFooterTemplate()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#clientfootertemplatesystemstring) options. Ensure that each input has a unique `id` attribute.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Select().Width(50)
                .ClientHeaderTemplate("<input tabindex='-1' id='header-check-all' class='k-select-checkbox k-checkbox k-checkbox-md k-rounded-md' data-role='checkbox' aria-label='Select all rows' type='checkbox'/>")
                .ClientFooterTemplate("<input tabindex='-1' id='footer-check-all' class='k-select-checkbox k-checkbox k-checkbox-md k-rounded-md' data-role='checkbox' aria-label='Select all rows' type='checkbox'/>");
                ...
            })
            .PersistSelection()
            ...
        )

    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid" persist-selection="true">
            <columns>
                <column selectable="true" width="50"
                    header-template="<input tabindex='-1' id='header-check-all' class='k-select-checkbox k-checkbox k-checkbox-md k-rounded-md' data-role='checkbox' aria-label='Select all rows' type='checkbox'/>"
                    footer-template="<input tabindex='-1' id='footer-check-all' class='k-select-checkbox k-checkbox k-checkbox-md k-rounded-md' data-role='checkbox' aria-label='Select all rows' type='checkbox'/>">
                </column>
                ...
            </columns>
            ...
        </kendo-grid>

    ```
    {% endif %}

1. Handle the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemstring) event of the Grid and subscribe to the `change` event of each checkbox input.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("grid")
            .Events(ev => ev.DataBound("onDataBound"))
            ...
        )

    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid" persist-selection="true" on-data-bound="onDataBound">
            ...
        </kendo-grid>

    ```
    {% endif %}
    ```Script
        function onDataBound(e) {
            let gridInstance = e.sender;
            $(gridInstance.element).find("input#footer-check-all").on("change", function (e) { // Footer checkbox "change" event handler.
                ...
            });

            $(gridInstance.element).find("input#header-check-all").on("change", function (e) { // Header checkbox "change" event handler.
                ...
            });
        }
    ```
1. In the `change` event handler of the footer checkbox, use the client-side [`select()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) and [`clearSelection()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/clearselection) methods to select and unselect the Grid rows.

    ```Script
        function onDataBound(e) {
            let gridInstance = e.sender;
            $(gridInstance.element).find("input#footer-check-all").on("change", function (e) {
                if($(this).is(':checked')) { // If the checkbox is checked
                    let masterRows = $("#grid .k-grid-table .k-master-row"); // Select all Grid rows.
                    gridInstance.select(masterRows);
                } else {
                    gridInstance.clearSelection(); // Clear the selected rows.
                }
            });

            $(gridInstance.element).find("input#header-check-all").on("change", function (e) {
                $(gridInstance.element).find("input#footer-check-all").prop('checked', $(this).is(':checked')); // Toggle the footer checkbox based on the header checkbox.
            });
        }
    ```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on adding 'Select-All' option in the Grid footer](https://netcorerepl.telerik.com/QHEVwpYA13deEpsX35).

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

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

