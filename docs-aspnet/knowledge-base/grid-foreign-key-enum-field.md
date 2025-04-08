---
title: Filtering and Editing a ForeignKey Column Bound to an Enum Field in Grid
description: Learn how to filter and edit a foreign key column that binds to an enumeration type in a {{ site.product }} Grid.
type: how-to
page_title:  Filtering and Editing a ForeignKey Column Bound to an Enum Field in Grid
slug: grid-foreign-key-enum-field
tags: grid, foreign, key, enum, field, filter, edit, dropdownlist, telerik, core, mvc
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2024.4.1112</td>
 </tr>
</table>

## Description

How can I bind a Grid to a ForeignKey column and ensure that the names of enum members are displayed in the column's filter menu? Also, how to use a DropDownList editor for the enum field when the Grid enters edit mode?

## Solution

When binding a ForeignKey column to an enum Model property, convert the enum members to a <a href="https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.rendering.selectlistitem?view=aspnetcore-9.0" target="_blank">`SelectListItem`</a> data collection.

* Binding the ForeignKey column to a local collection:

    ```HtmlHelper
        @(Html.Kendo().Grid<GridModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.ForeignKey(p => p.Status, (System.Collections.IEnumerable)ViewData["statuses"], "Value", "Text")
                .Filterable(x => x.Extra(false).Operators(operators => operators.ForEnums(str => str.Clear().IsEqualTo("Equals"))));
            })
            ...// Additional configuration.
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <columns>
                <foreign-key-column field="Status" values='(System.Collections.IEnumerable)ViewData["statuses"]' 
                    value-field="Value" 
                    text-field="Text">
                    <filterable enabled="true" extra="false">
                        <operators>
                            <enums eq="Equals"/>
                        </operators>
                    </filterable>
                </foreign-key-column>
            </columns>
            <!-- Additional configuration -->
        </kendo-grid>
    ```
    ```Controller
        public IActionResult GridPage() // The Action method that returns the View with the Grid.
        {
            var enumList = EnumToSelectList(typeof(ShipmentStatus)); // Parse the enum members to List<SelectListItem>.
            ViewData["statuses"] = enumList;
            return View();
        }

        public static List<SelectListItem> EnumToSelectList(Type enumType)
        {
            return Enum
              .GetValues(enumType)
              .Cast<int>()
              .Select(i => new SelectListItem
              {
                  Value = i.ToString(),
                  Text = Enum.GetName(enumType, i),
              }
              )
              .ToList();
        }
    ```
    {% else %}
    ```Controller
        public ActionResult GridPage() // The Action method that returns the View with the Grid.
        {
            var enumList = EnumToSelectList(typeof(ShipmentStatus)); // Parse the enum members to List<SelectListItem>.
            ViewData["statuses"] = enumList;
            return View();
        }

        public static List<SelectListItem> EnumToSelectList(Type enumType)
        {
            return Enum
              .GetValues(enumType)
              .Cast<int>()
              .Select(i => new SelectListItem
              {
                  Value = i.ToString(),
                  Text = Enum.GetName(enumType, i),
              }
              )
              .ToList();
        }
    ```
    {% endif %}
    ```Model
        public class GridModel
        {
            public ShipmentStatus Status { get; set; }
        }

        public enum  ShipmentStatus
        {
            [Display(Name = "In Process")]
            InProcess = 1,
            [Display(Name = "In Transit")]
            InTransit = 2,
            [Display(Name = "Received")]
            Received = 3,
            [Display(Name = "Lost In Shipment")]
            LostInShipment = 4
        }
    ```

* Binding the ForeignKey column to remote data:

    ```HtmlHelper
        @(Html.Kendo().Grid<GridModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.ForeignKey(p => p.Status, ds => ds.Read(r => r.Action("ReadStatuses", "Home")), "Value", "Text")
                .Filterable(x => x.Extra(false).Operators(operators => operators.ForEnums(str => str.Clear().IsEqualTo("Equals"))));
            })
            ...// Additional configuration.
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <columns>
                <foreign-key-column field="Status" 
                    value-field="Value" 
                    text-field="Text">
                    <datasource>
                        <transport>
                            <read url="@Url.Action("ReadStatuses", "Home")"/>
                        </transport>
                    </datasource>
                    <filterable enabled="true" extra="false">
                        <operators>
                            <enums eq="Equals"/>
                        </operators>
                    </filterable>
                </foreign-key-column>
            </columns>
            <!-- Additional configuration -->
        </kendo-grid>
    ```
    {% endif %}
    ```Controller
        public ActionResult ReadStatuses()
        {
            var enumList = EnumToSelectList(typeof(ShipmentStatus));
            return Json(enumList);
        }

        public static List<SelectListItem> EnumToSelectList(Type enumType)
        {
            return Enum
              .GetValues(enumType)
              .Cast<int>()
              .Select(i => new SelectListItem
              {
                  Value = i.ToString(),
                  Text = Enum.GetName(enumType, i),
              }
              )
              .ToList();
        }
    ```
    ```Model
        public class GridModel
        {
            public ShipmentStatus Status { get; set; }
        }

        public enum  ShipmentStatus
        {
            [Display(Name = "In Process")]
            InProcess = 1,
            [Display(Name = "In Transit")]
            InTransit = 2,
            [Display(Name = "Received")]
            Received = 3,
            [Display(Name = "Lost In Shipment")]
            LostInShipment = 4
        }
    ```

When the Grid is [InCell]({% slug batchediting_grid_aspnetcore %}) or [InLine]({% slug inlineediting_grid_aspnetcore %}) editable, the Grid will look for the default `GridForeignKey.cshtml` editor template in the **~Views\Shared\EditorTemplates** folder, and populate it with the passed data collection through the column declaration:

```C#
    @model object
    @(Html.Kendo().DropDownListFor(m => m)
    .BindTo((SelectList)ViewData[ViewData.TemplateInfo.GetFullHtmlFieldName("")+ "_Data"])
    )
```

When the Grid is configured for [Popup editng]({% slug popupediting_grid_aspnetcore %}), decorate the Model property with the [`UIHint` attribute](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.uihintattribute.uihint?view=net-9.0) and add a DropDownList editor to the **~Views\Shared\EditorTemplates** folder.

```Model
    using System.ComponentModel.DataAnnotations;

    public class GridModel
    {
        [UIHint("EnumEditor")]
        public ShipmentStatus Status { get; set; }
    }
```
```Razor EnumEditor.cshtml
    // ~Views\Shared\EditorTemplates\EnumEditor.cshtml

    @model ShipmentStatus

    @(Html.Kendo().DropDownListFor(m => m)
    .BindTo(EnumToSelectList(typeof(ShipmentStatus)))
    )
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
{% if site.core %}
* [TagHelper API Reference of the Grid for {{ site.framework}}](https://docs.telerik.com/aspnet-core/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
