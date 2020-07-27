---
title: Overview
page_title: Columns Overview
description: "An overview the Telerik UI Grid HtmlHelper for {{ site.framework }} columns options."
slug: htmlhelper_gridcolumns
position: 1
---

# Bound Column Settings

A bound column is declared through the `Bound` method, which specifies a data field.

> The data field names must be valid JavaScript identifiers and contain neither spaces, nor special characters. The first character should be a letter.

Bound columns support many settings and amongst the most used are the following settings:

## For Appearance

* Encoded - configures the HTML encoding of the bound property value. By default, it is set to `true` which means that the column values are encoded.
* Format - specifies the format used when displaying the value of the bound property. By default, it is empty. For more information on the supported formats, refer to the [article about globalization](https://docs.telerik.com/kendo-ui/framework/globalization/overview).
* Title - sets the text displayed in the header of the column. By default, the property name is used. The `Title` must not include non-encoded HTML content. Use a `ClientHeaderTemplate` instead.
* Width - sets the width of the column in pixels or other units. By default, the width is not set and the column would try to accommodate its content.
* Hidden
* Media
* MinScreenWidth
* MinResizableWidth

## For Functionality

* Groupable - enables or disables the dragging of the column header to group by its bound property. By default, it is set to `true` which means that the bound Grid columns can be dragged for grouping.
* Sortable - enables or disables the sorting by that column.
* Template - sets the {% if site.mvc %}server{% endif %} template which is used when the bound field is displayed.
* EditorTemplateName
* Editable
* Sortable
* Filterable - enables or disables the filtering UI. By default, it is set to `true` which means that the bound Grid columns can be filtered using the filtering UI.
* Locked
* Lockable
* IncludeInMenu

### Custom Appearance 

* ClientTemplate {% if site.mvc %}- used when the Grid is configured for [Ajax binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %}).{% endif %}
* Template -  This is a column that is not bound to a specific field from the data, so it is not sortable, nor filterable. Nevertheless, template columns can still display data item values.
* ClientHeaderTemplate
* ClientFooterTemplate
* ClientGroupHeaderTemplate
* ClientGroupHeaderColumnTemplate
* HtmlAttributes
* HeaderHtmlAttributes
* FooterHtmlAttributes

            @( Html.Kendo().Grid<Product>()
                    .Name("grid")
                    .Columns(columns =>
                    {
                        // Define a column which will display the value of the ProductID property.
                        columns.Bound(product => product.ProductID);            

                        // Define the column title to be different than the field name.
                        columns.Bound(product => product.ProductName).Title("Product Name");            
                        // Define the column to use a standard date format
                        columns.Bound(product => product.OrderDate).Format("{0:d}"); 
                        {% if site.mvc %}
                        // Define a template column. It needs a templated razor delegate.
                        columns.Template(@<text>
                            @Html.ActionLink("Edit", "Home", new { id = item.ProductID })
                        </text>);{% else %} 
                        // Define a template only column to use a calculated field
                        columns.Template("#=calculateField(data)#");
                        {% endif %}           

                        // Define a command column with a "Destroy" button.
                        columns.Command(commands =>
                        {
                            commands.Destroy();
                        });
                    })
                )
                {% if site.core %}
                <script>
                    function calculateField(data) {
                        return data.UnitPrice * data.UnitsInStock;
                    }
                </script>
                {% endif %}

The [`Columns`](/api/Kendo.Mvc.UI.Fluent/GridBuilder#columnssystemactionkendomvcuifluentgridcolumnfactoryt) method configures the Grid columns. If not used, the Grid creates a column for every public property of the model.

* A [Kendo UI for jQuery template](https://docs.telerik.com/kendo-ui/framework/templates/overview) which specifies the way the column is displayed.

    > The `ClientTemplate` is used when the Grid is configured for [Ajax binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %}) {% if site.mvc %} or when [server binding]({% slug serverbinding_grid_aspnetmvc %}) is combined with client-side data operations^&mdash;when [`ServerOperation` is set to `false`]({% slug htmlhelpers_datasource_aspnetcore %}#enabling-client-data-processing){% endif %}.

    Client templates defined in server-side code are URL encoded before they are sent to the client. As a result, a `+` (plus) sign, which is used inside a binding expression, is lost&mdash;for example, `"#= 3 + 5 #"`.

    To work around this issue, use either f the following approaches:
    * Use an auxiliary JavaScript function in the global scope, which returns the desired value&mdash;for example, `"#= auxFunction(3, 5) #"`.
    * Encode the `+` (plus) sign&mdash;for example, `"#= 3 %2b 5 #"`.

            @(Html.Kendo().Grid<Product>()
                .Name("grid")
                .Columns(
                {
                    columns.Bound(product => product.ProductName).ClientTemplate("<strong>#:    ProductName #</strong>");
                })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .Read(read => read.Action("Products_Read", "Home"))
                )
            )


## Features

* [Widths]({% slug column_widths_grid_aspnetcore %})
* [Column Virtualization]({% slug columnvirtualization_aspnet_grid %})
* [Resizing]({% slug column_resizing_aspnetcore_grid %})
* [Reordering]({% slug reordercols_aspnetcore_grid %})
* [Multi-Column Headers]({% slug multicolumn_headers_aspnetcore_grid %})
* [ForeignKey Column]({% slug foreignkeycolumn_aspnetcore_grid %})
* [Custom Commands]({% slug customcommands_aspnetcore_grid %})
* [Locked Columns]({% slug locked_columns_aspnetcore_grid %})
