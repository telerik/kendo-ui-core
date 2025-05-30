---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI for {{ site.framework }} PropertyGrid component and how to initialize it."
slug: htmlhelpers_overview_propertygrid
position: 0
---

# {{ site.framework }} PropertyGrid Overview

{% if site.core %}
The Telerik UI PropertyGrid TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI PropertyGrid widget.
{% else %}
The Telerik UI PropertyGrid HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PropertyGrid widget.
{% endif %}

The PropertyGrid allows you to display and edit properties and attributes of objects. You can bind the component to a Model, edit its nested properties, specify the desired editor and customized template, group, sort, search, or navigate through the data or export it in Excel and PDF.

* [Demo page for the PropertyGrid HtmlHelper](https://demos.telerik.com/{{ site.platform }}/propertygrid)
{% if site.core %}
* [Demo page for the PropertyGrid TagHelper](https://demos.telerik.com/aspnet-core/propertygrid)
{% endif %}

## Initializing the PropertyGrid

The following example demonstrates how to define the PropertyGrid.

```HtmlHelper
    @model PropertyViewModel

    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Model(Model)
        .Columns(columns => 
        {
            columns.FieldColumn(fieldCol => fieldCol.Width(200));
            columns.ValueColumn(valueCol => valueCol.Width(250));
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model PropertyViewModel

    <kendo-propertygrid name="propertyGrid" model="@Model">
        <columns>
            <field-column width="200" />
            <value-column width="250" />
        </columns>
    </kendo-propertygrid>
```
{% endif %}
```Model
    using System.ComponentModel.DataAnnotations;

    public class PropertyViewModel
    {
        [Display(GroupName = "Size", Description = "Control the width of the element.")]
        public int Width { get; set; }

        [Display(GroupName = "Size", Description = "Control the height of the element.")]
        public int Height { get; set; }

        [Display(GroupName = "Alignment", Description = "Add space around the element.")]
        public int Margin { get; set; }

        [Display(GroupName = "Alignment", Description = "Add space around the content of the element.")]
        public int Padding { get; set; }
    }
```
```Controller
    public ActionResult Index()
    {
        return View(new PropertyViewModel()
        {
            Width = 500,
            Height = 300,
            Margin = 20,
            Padding = 50
        });
    }
```

## Basic Configuration

The PropertyGrid provides a variety of options for the items configuration, toolbar, context menu, and appearance options like width, height, resizability, and more. The following example demonstrates the basic configuration of the PropertyGrid.

```HtmlHelper
    @model PropertyViewModel

    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Model(Model)
        .EditMode(true)
        .ContextMenu(true)
        .Columns(columns => 
        {
            columns.FieldColumn(fieldCol => fieldCol.Width(200));
            columns.ValueColumn(valueCol => valueCol.Width(250));
        })
        .Items(items =>
        {
             
            items.Add().Field(f => f.Width)
                .Editor(editor => editor.NumericTextBox().Step(1).Min(1).Max(1000));
            items.Add().Field(f => f.Height)
                .Editor(editor => editor.NumericTextBox().Step(1).Min(1).Max(1000));
            items.Add().Field(f => f.Icon)
                .Editor(editor => editor
                    .DropDownList()
                    .DataTextField("Text")
                    .DataValueField("Value")
                    .BindTo(new List<SelectListItem>() {
                        new SelectListItem() {
                            Text = "search", Value = "search"
                        },
                        new SelectListItem() {
                            Text = "user", Value = "user"
                        },
                        new SelectListItem() {
                            Text = "folder", Value = "folder"
                        }
                    }));
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model PropertyViewModel

    @{
        var icons = new List<SelectListItem>() {
            new SelectListItem() {
                Text = "search", Value = "search"
            },
            new SelectListItem() {
                Text = "user", Value = "user"
            },
            new SelectListItem() {
                Text = "folder", Value = "folder"
            }
        };
    }

    <kendo-propertygrid name="propertyGrid" model="@Model" edit-mode="true">
        <context-menu enabled="true"></context-menu>
        <columns>
            <field-column width="200" />
            <value-column width="250" />
        </columns>
        <property-grid-items>
            <property-grid-item field="Width">
                <numerictextbox-editor min="1" max="1000" step="1"></numerictextbox-editor>
            </property-grid-item>
            <property-grid-item field="Height">
                <numerictextbox-editor min="1" max="1000" step="1"></numerictextbox-editor>
            </property-grid-item>
            <property-grid-item field="Icon">
                <dropdownlist-editor datatextfield="Text" datavaluefield="Value" bind-to="icons"></dropdownlist-editor>
            </property-grid-item>
        </property-grid-items>
    </kendo-propertygrid>
```
{% endif %}
```Model
    using System.ComponentModel.DataAnnotations;

    public class PropertyViewModel
    {
        [Display(GroupName = "Size", Description = "Control the width of the element.")]
        public int Width { get; set; }

        [Display(GroupName = "Size", Description = "Control the height of the element.")]
        public int Height { get; set; }

        [Display(GroupName = "UI", Description = "Defines a name of an icon.")]
        public string Icon { get; set; }
    }
```
```Controller
    public ActionResult Index()
    {
        return View(new PropertyViewModel()
        {
            Width = 500,
            Height = 300,
            icon = "search"
        });
    }
```

## Toolbar

The [`Toolbar()`](/api/kendo.mvc.ui.fluent/propertygridtoolbarfactory) configuration option of the PropertyGrid allows you to add command buttons and allow the user to invoke built-in PropertyGrid functionalities. You can also define custom commands or use templates to customize the Toolbar of the {{ site.product }} PropertyGrid.

### Built-In Commands

You can configure the Toolbar and include any of the built-in commands:

```HtmlHelper
    .Toolbar(t => 
    {
        t.Group();
        t.Separator();
        t.Details();
        t.Search();
        t.Spacer();
        t.Sort();
    })
```
{% if site.core %}
```TagHelper
        <toolbar>
            <property-grid-toolbar-button name="group"></property-grid-toolbar-button>
            <property-grid-toolbar-button name="details"></property-grid-toolbar-button>
            <property-grid-toolbar-button name="search"></property-grid-toolbar-button>
            <property-grid-toolbar-button name="sort"></property-grid-toolbar-button>
            <property-grid-toolbar-button name="seperator"  type="separator"></property-grid-toolbar-button>
            <property-grid-toolbar-button name="spacer" type="spacer"></property-grid-toolbar-button>
        </toolbar>
```
{% endif %} 

Starting with version 2025 Q2, an alternative way to configure the tools of the PropertyGrid{% if site.core %} HtmlHelper{% endif %} is to use the `Items()` configuration of the Toolbar:

```HtmlHelper
    .Toolbar(toolbar =>toolbar
        .Items(item=>{
            item.Group();
            item.Separator();
            item.Details();
            item.Search();
            item.Spacer();
            item.Sort();
        })
        .Overflow(overflow => overflow
            .Mode(ToolBarOverflowMode.Scroll)
            .ScrollButtons(ScrollButtonsType.Visible)
            .ScrollButtonsPosition(ScrollButtonsPositionType.Split)
        )
    )
```

| Command | Description |
|---|---|
| Group | Adds a toggle button to show the items in Groups or a List.|
| Details | Adds an info button for additional details.|
| Sort | Adds a DropDownList to control the order of the items.|
| Search | Adds a built-in Search input for the PropertyGrid.|
| Spacer | Moves the tools that are declared after it to the right side of the Toolbar.| 
| Separator | Acts as a delimiter between the Toolbar commands.|

#### Overview 

The built-in Toolbar provides properties for customizing its overflow behavior and appearance.

The following example demonstrates how to modify the default overflow settings of the Toolbar through the `Oveflow()` configuration.

```Razor
    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Toolbar(t => t.Items(item =>
        {
            item.Spacer();
            item.Search();
        })
        .Overflow(o => o
            .Mode(ToolBarOverflowMode.Scroll)
            .ScrollButtons(ScrollButtonsType.Auto)
            .ScrollButtonsPosition(ScrollButtonsPositionType.Start)
            .ScrollDistance(50))
        )
            ... // Additional configuration.
         )
```
{% if site.core %}
```TagHelper
    <kendo-propertygrid name="propertyGrid">
        <toolbar>
            <property-grid-toolbar-button name="spacer" type="spacer"></property-grid-toolbar-button>
            <property-grid-toolbar-button name="search"></property-grid-toolbar-button>
            <overflow mode="ToolBarOverflowMode.Scroll" scroll-buttons="ScrollButtonsType.Auto" scroll-buttons-position="ScrollButtonsPositionType.Start" scroll-distance="50" />
        </toolbar>
    <!-- Additional configuration. -->
</kendo-propertygrid>
```
{% endif %} 

For more information on the available overflow options, refer to the [Appearance documentation of the ToolBar component]({% slug toolbar_appearance %}).

## Functionality and Features

* [Columns]({% slug htmlhelpers_columns_propertygrid %})&mdash;The PropertyGrid displays fields and values in columns.
* [Items]({% slug htmlhelpers_items_propertygrid %})&mdash;The configuration of the PropertyGrid items allows you to customize their appearance and behavior.
* [Templates]({% slug htmlhelpers_templates_propertygrid %})&mdash;The available templates allow you to control the rendering of the items and toolbar.
* [Events]({% slug htmlhelpers_events_propertygrid %})&mdash;The component emits a variety of events that allow you to implement custom functionality.
* [Accessibility]({% slug htmlhelpers_propertygrid_accessibility %})&mdash;The PropertyGrid is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_propertygrid %}) for faster navigation.

## Next Steps

* [Getting Started with the PropertyGrid]({% slug propertygrid_getting_started %})
* [Basic Usage of the PropertyGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/propertygrid)
{% if site.core %}
* [Basic Usage of the PropertyGrid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/propertygrid)
{% endif %}

## See Also

* [Using the API of the PropertyGrid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/propertygrid/api)
* [Server-Side API of the PropertyGrid HtmlHelper](/api/propertygrid)
{% if site.core %}
* [Server-Side API of the PropertyGrid TagHelper](/api/taghelpers/propertygrid)
{% endif %}
* [Client-Side API of the PropertyGrid](https://docs.telerik.com/kendo-ui/api/javascript/ui/propertygrid)
