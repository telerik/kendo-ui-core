---
title: Editing Grid with Cascading DropDownLists
description: "Learn how to implement { site.product }} cascading DropDownLists for editing records in Telerik UI for {{ site.framework }} Grid component."
type: how-to
page_title: Grid Editing with Cascading DropDownLists
previous_url: /helpers/data-management/grid/how-to/editing/grid-incell-editing-cascading-dropdownlist, /html-helpers/data-management/grid/how-to/editing/grid-incell-editing-cascading-dropdownlist, /helpers/data-management/grid/how-to/editing/grid-editing-cascading-dropdownlist, /html-helpers/data-management/grid/how-to/editing/grid-editing-cascading-dropdownlist
slug: grid-cascading-dropdownlists
tags: grid, core, mvc, cascading, dropdownlist, incell, inline, popup, editing, mode
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid, <br/>
    {{ site.product }} DropDownList
  </td>
 </tr>
</table>

## Description

How can I implement [cascading DropDownLists]({% slug htmlhelpers_dropdownlist_cascading_aspnetcore%}) for editing rows in Telerik UI for {{ site.framework }} Grid component? 

## Solution

The Grid supports three editing modes&mdash;[InCell]({% slug batchediting_grid_aspnetcore%}), [InLine]({% slug inlineediting_grid_aspnetcore%}), and [PopUp]({% slug popupediting_grid_aspnetcore%}). Typically, for cascading components to function correctly, all related components must be rendered simultaneously.

### InLine and PopUp Edit Mode

For InLine and PopUp editing modes, refer to the [Handle Cascading DropDownLists within the Grid]({% slug howto_handlecascadingddlsingrid_ddlaspnetmvc%}) article.

### InCell Edit Mode

When using InCell edit mode, a single cell can be edited at a time. For this reason, to use cascading DropDownLists as editors in the Grid, follow the next steps:

1. Define at least two `ForeignKey` columns:

    ```HtmlHelper
    @model ForeignKeyValues

    @(Html.Kendo().Grid<License>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.ForeignKey(p => p.CustomerId, Model.Customers, "CustomerId", "CustomerName").Width(300);
            columns.ForeignKey(p => p.VendorId, Model.Vendors, "VendorId", "VendorName").Width(300);
            columns.ForeignKey(p => p.ProductId, Model.Products, "ProductId", "ProductName").Width(300);
        })
        ... // Additional configuration.
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model ForeignKeyValues

    <kendo-grid name="Grid">
        <columns>
            <foreign-key-column field="CustomerId" width="300"
            values='Model.Customers' 
            value-field="CustomerId" 
            text-field="CustomerName">
            </foreign-key-column>
            <foreign-key-column field="VendorId" width="300"
            values='Model.Vendors' 
            value-field="VendorId" 
            text-field="VendorName">
            </foreign-key-column>
            <foreign-key-column field="ProductId" width="300"
            values='Model.Products' 
            value-field="ProductId" 
            text-field="ProductName">
            </foreign-key-column>
        </columns>
        <!-- Additional configuration. -->
    </kendo-grid>
    ```
    {% endif %}

1. Decorate each Model property with the `UIHint` Data Annotation attribute to speify the name of the view that contains the custom editor (for example, the DropDownList).

    ```C# Model
    public class License
    {
        [Required(ErrorMessage = "LicenseId is required")]
        public int LicenseId { get; set; }

        [UIHint("CustomerId")]
        [Required(ErrorMessage = "CustomerId is required")]
        public int CustomerId { get; set; }

        [UIHint("VendorId")]
        [Required(ErrorMessage = "VendorId is required")]
        public int VendorId { get; set; }

        [UIHint("ProductId")]
        [Required(ErrorMessage = "ProductId is required")]
        public int ProductId { get; set; }
    }
    ```

1. Add a view for each editor in the `Views/Shared/EditorTemplates` folder. Ensure that the names of the views match the specified names in the `UIHint` attributes.

    * `CustomerId` DropDownList:
    ```HtmlHelper
    @using Kendo.Mvc.UI
    @model int

    @(Html.Kendo().DropDownListFor(m => m)
        .ValuePrimitive(true)
        .OptionLabel("Select Customer...")
        .DataTextField("CustomerName")
        .DataValueField("CustomerId")
        .DataSource(dataSource =>
        {
            dataSource.Read(read => read.Action("GetCustomers", "Home"))
                    .ServerFiltering(true);
        })
    )
    @Html.ValidationMessageFor(m => m)
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model int

    <kendo-dropdownlist for="@Model" 
        value-primitive="true" 
        option-label="Select Customer..."
        datatextfield="CustomerName"
        datavaluefield="CustomerId">
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
            <transport>
                <read url="@Url.Action("GetCustomers", "Home")"/>
            </transport>
        </datasource>
    </kendo-dropdownlist>

    <span asp-validation-for="@Model" class="text-danger"></span>
    ```
    {% endif %}

    * `VendorId` DropDownList:
    ```HtmlHelper
    @using Kendo.Mvc.UI
    @model int

    @(Html.Kendo().DropDownListFor(m => m)
        .AutoBind(false)
        .ValuePrimitive(true)
        .OptionLabel("Select Vendor...")
        .DataTextField("VendorName")
        .DataValueField("VendorId")
        .DataSource(dataSource =>
        {
            dataSource.Read(read => read.Action("GetVendors", "Home").Data("filterVendors"))
                    .ServerFiltering(true);
        })
        .CascadeFrom("CustomerId")
    )

    @Html.ValidationMessageFor(m => m)
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model int

    <kendo-dropdownlist for="@Model" 
        auto-bind="false"
        cascade-from="CustomerId"
        value-primitive="true" 
        option-label="Select Vendor..."
        datatextfield="VendorName"
        datavaluefield="VendorId">
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
            <transport>
                <read url="@Url.Action("GetVendors", "Home")" data="filterVendors"/>
            </transport>
        </datasource>
    </kendo-dropdownlist>

    <span asp-validation-for="@Model" class="text-danger"></span>
    ```
    {% endif %}

    * `ProductId` DropDownList:
    ```HtmlHelper
    @using Kendo.Mvc.UI
    @model int

    @(Html.Kendo().DropDownListFor(m => m)
        .AutoBind(false)
        .ValuePrimitive(true)
        .OptionLabel("Select Product...")
        .DataTextField("ProductName")
        .DataValueField("ProductId")
        .DataSource(dataSource =>
        {
            dataSource.Read(read => read.Action("GetProducts", "Home").Data("filterProducts"))
                    .ServerFiltering(true);
        })
        .CascadeFrom("VendorId")
    )

    @Html.ValidationMessageFor(m => m)
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model int

    <kendo-dropdownlist for="@Model" 
        auto-bind="false"
        cascade-from="VendorId"
        value-primitive="true" 
        option-label="Select Product..."
        datatextfield="ProductName"
        datavaluefield="ProductId">
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" data="filterProducts"/>
            </transport>
        </datasource>
    </kendo-dropdownlist>

    <span asp-validation-for="@Model" class="text-danger"></span>
    ```
    {% endif %}

1. Include the `filterVendors()` and `filterProducts()` JavaScript functions that send the value of the parent DropDownList to the server in the main view, where the Grid is defined.

    ```JS
    <script>
        function getCurrentEditedModel() {
            var grid = $("#Grid").data("kendoGrid");
            var editRow = grid.tbody.find("tr:has(.k-edit-cell)");
            return grid.dataItem(editRow);
        }

        function filterVendors() {
            var model = getCurrentEditedModel();
            return {
                customerId: model.CustomerId
            };
        }

        function filterProducts() {
            var model = getCurrentEditedModel();
            return {
                vendorId: model.VendorId
            };
        }
    </script>
    ```

1. Handle the `Change` event of the DataSource and manually reset the value of the cascaded field when the parent field is updated:

    ```JS
    <script>
        function onChange(e) {
            if (e.action == "itemchange") {
                if (e.field == "CustomerId") {
                    var model = e.items[0];
                    model.set("VendorId", 0);
                }

                if (e.field == "VendorId") {
                    var model = e.items[0];
                    model.set("ProductId", 0);
                }
            }
        }
    </script>
    ```

To see the complete example, refer to the [ASP.NET MVC project on how to configure the InCell editable Grid to handle its cascading DropDownList editors](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingInCellCascadingDropDownLists/GridEditingInCellCascadingDropDownListsAreaRegistration.cs). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} Grid Resources

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
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

