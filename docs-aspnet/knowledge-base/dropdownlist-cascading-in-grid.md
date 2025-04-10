---
title: Handle Cascading DropDownLists within the Grid
page_title: Handle Cascading DropDownLists within the Grid
description: "Configure the {{ site.product }} Grid to handle cascading {{ site.product }} DropDownLists when using the Popup or InLine editing modes."
type: how-to
previous_url: /helpers/editors/dropdownlist/how-to/cascading-in-grid, /html-helpers/editors/dropdownlist/how-to/cascading-in-grid
slug: howto_handlecascadingddlsingrid_ddlaspnetmvc
tags: dropdownlist, grid, cascading
res_type: kb
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

You can achieve this requirement using an Editor Templates provided by the Grid by following these steps:

1. Define the Grid and its columns:

```HtmlHelper
@(Html.Kendo().Grid<License>()
    .Name("popupGrid")
    .Columns(columns =>
    {
        columns.Bound(p => p.LicenseId).Width(20).Hidden().HeaderHtmlAttributes(new { @title = "License" });
        columns.Bound(p => p.CustomerId).Width(20).HeaderHtmlAttributes(new { @title = "Customer" });
        columns.Bound(p => p.VendorId).Width(20).HeaderHtmlAttributes(new { @title = "Vendor" });
        columns.Bound(p => p.ProductId).Width(20).HeaderHtmlAttributes(new { @title = "Product" });
        columns.Command(p => p.Edit().Text("Edit").HtmlAttributes(new { @title = "Edit" })).Width(80);
    })
    .ToolBar(toolbar => toolbar.Create().Text("Add").HtmlAttributes(new { @title = "Add" }))
    .Editable(editable => editable.Mode(GridEditMode.PopUp).TemplateName("PopupEditView"))
    .Events(e => e.Edit("onEdit"))
    .DataSource(dataSource => dataSource
        .Ajax()
        .Model(model => model.Id(p => p.LicenseId))
            .Create(create => create.Action("Create", "Home").Type(HttpVerbs.Post))
            .Read(read => read.Action("Read", "Home").Type(HttpVerbs.Post))
            .Update(update => update.Action("Update", "Home").Type(HttpVerbs.Post))
    )
)
```

2. Decorate the Model property with the `UIHint` data annotation attribute to speify the name of the view that contains the custom editor (for example, the DropDownList).

```C#
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
```Razor
﻿@using Kendo.Mvc.UI
    ﻿
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

* `VendorId` DropDownList:
```Razor
@using Kendo.Mvc.UI﻿

﻿@model int

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

* `ProductId` DropDownList:
```Razor
﻿@using Kendo.Mvc.UI
    ﻿
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
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
