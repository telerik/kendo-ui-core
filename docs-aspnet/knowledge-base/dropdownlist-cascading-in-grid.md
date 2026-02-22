---
title: Handle Cascading DropDownLists within the Grid
page_title: Handle Cascading DropDownLists within the Grid
description: "Configure the {{ site.product }} Grid to handle cascading {{ site.product }} DropDownLists when using the Popup or InLine editing modes."
type: how-to
previous_url: /helpers/editors/dropdownlist/how-to/cascading-in-grid, /html-helpers/editors/dropdownlist/how-to/cascading-in-grid
slug: howto_handlecascadingddlsingrid_ddlaspnetmvc
tags: dropdownlist, grid, cascading
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} DropDownList, <br/>
           {{ site.product }} Grid
  </td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I implement cascading {{ site.framework }} DropDownLists within a {{ site.framework }} Grid component?

## Solution

You can achieve this requirement using editor templates for the Grid columns by following the next steps:

1. Define the Grid and its columns:

```HtmlHelper
@(Html.Kendo().Grid<License>()
    .Name("inlineGrid")
    .Columns(columns =>
    {
        columns.Bound(p => p.LicenseId).Hidden();
        columns.Bound(p => p.CustomerId);
        columns.Bound(p => p.VendorId);
        columns.Bound(p => p.ProductId);
        columns.Command(p => p.Edit().Text("Edit")).Width(80);
    })
    .HtmlAttributes(new { style = "height: 430px;" })
    .ToolBar(toolbar => toolbar.Create())
    .Editable(editable => editable.Mode(GridEditMode.InLine))
    .Scrollable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .Model(model => model.Id(p => p.LicenseId))
        .Create(create => create.Action("Create", "Home"))
        .Read(read => read.Action("Read", "Home"))
        .Update(update => update.Action("Update", "Home"))
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-grid name="inlineGrid" height="430">
    <columns>
        <column field="LicenseId" hidden="true"></column>
        <column field="CustomerId"></column>
        <column field="VendorId"></column>
        <column field="ProductId"></column>
        <column width="80">
            <commands>
                <column-command text="Edit" name="edit"></column-command>
            </commands>
        </column>
    </columns>
    <toolbar>
        <toolbar-button name="create"></toolbar-button>
    </toolbar>
    <editable mode="inline"/>
    <scrollable enabled="true"/>
    <datasource type="DataSourceTagHelperType.Ajax">
        <schema>
            <model id="LicenseId"></model>
        </schema>
        <transport>
            <read url="@Url.Action("Read", "Home")" />
            <update url="@Url.Action("Update", "Home")" />
            <create url="@Url.Action("Create", "Home")" />
        </transport>
    </datasource>
</kendo-grid>
```
{% endif %}

2. Decorate each Model property with the `UIHint` Data Annotation attribute to speify the name of the view that contains the custom editor (for example, the DropDownList).

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

3. Add a view for each editor in the `Views/Shared/EditorTemplates` folder. Ensure that the names of the views match the specified names in the `UIHint` attributes.

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

To see the complete example, refer to the ASP.NET MVC project on how to [configure the Grid to handle its cascading DropDownList editors](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingWithCascadingDropDownLists) when the Grid is set up for Popup or InLine edit mode. {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} DropDownList Resources

* [{{ site.framework }} DropDownList Documentation]({%slug htmlhelpers_dropdownlist_aspnetcore%})

* [{{ site.framework }} DropDownList Demos](https://demos.telerik.com/{{ site.platform }}/dropdownlist)

{% if site.core %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-core-ui/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-mvc/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [Server-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/dropdownlist)
{% if site.core %}
* [Server-Side TagHelper API Reference of the DropDownList for {{ site.framework }}](/api/taghelpers/dropdownlist)
{% endif %}
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
