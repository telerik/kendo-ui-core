---
title: 2025 Releases
page_title: 2025 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2025."
slug: breakingchanges_2025
position: 1
---

# 2025 Releases

This article lists the breaking or important changes in the 2025 releases of {{ site.product }}.

## {{ site.product }} Q2 2025

### Unified Distribution for Trial and Commercial Packages

With the goal of streamlining user experience, the trial and commercial packages have been consolidated into a single unified distribution for {{ site.product }}. Access is now managed through a license key file, eliminating the need for separate trial download. For more information, please refer to [Setting Up Your License Key]({% slug installation_license_key_aspnetcore %}).

{% if site.core %}

### Target Framework

With the Q2 2025 release, {{ site.product }} support for .NET 6 has been dropped as .NET 6 has reached the end of its lifecycle on November 12, 2024. You can update to a supported [LTS and STS versions of .NET Core](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core#lifecycle).

### PopOver

The [`IconClass()`](/api/kendo.mvc.ui.fluent/popoveractionbuilder#iconclasssystemstring) option of the PopOver HtmlHelper and the [`icon-class`](/api/kendo.mvc.taghelpers/popoveractiontaghelper#attributes) attribute of the PopOver TagHelper now expect a `string` instead of a JavaScript handler or a template delegate (`System.Func<Object,Object>`).

```HtmlHelper
    <span id="target">Hover</span>

    @(Html.Kendo().Popover()
        .For("#target")
        .Body("Content description")
        .Actions(a =>
        {
            // "IconClass" adds a CSS class to the icon element inside the action button.
            a.Add().Text("refresh").Icon("arrow-rotate-cw").IconClass("refresh-icon");
        })
    )
```
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <span id="target">Hover</span>

    <kendo-popover for="#target" body="Content description">
        <actions>
            <!-- "icon-class" adds a CSS class to the icon element inside the action button.-->
            <action text="refresh" icon="arrow-rotate-cw" icon-class="refresh-icon"></action>
        </actions>
    </kendo-popover>
```

### Pager Position in Grid

#### HtmlHelper Grid

| Old                            | New                              |
| -----------                    | -----------                      |
| `Position(GridPagerPosition.Top)`     | `Position(PagerPosition.Top)`|
 
#### TagHelper Grid
 
| Old                            | New                              |
| -----------                    | -----------                      |
| `position="GridPagerPosition.Top"`     | `position="PagerPosition.Top"`|

{% else %}

### Kendo.Mvc.Export

As of the Q2 2025 release, the `Telerik.Core.Export` package targets .NET Framework 4.6.2 in addition to .NET. You can the `Telerik.Core.Export` package in ASP.NET MVC5 applications, as well as in .NET applications. The old `Kendo.Mvc.Export` assembly will no longer be distributed. 

{% endif %}

### ToolBar Buttons in Grid

The Grid component now provides a new property to disable or hide the inactive tools when editing. Its ToolBar buttons like `Save Changes` and `Cancel` will be hidden by default. When the `ToolBar.ShowInactiveTools` option is enabled the inactive tools will be displayed as disabled.

More details you can find in the dedicated [Grid ToolBar article]({% slug htmlhelpers_grid_aspnetcore_toolbar%}).

### Telerik.Zip

As of the Q2 2025 release, the following NuGet packages and assemblies no longer have a dependency to the `Telerik.Zip` library:

{% if site.core %}
* Telerik.Core.Export
{% else %}
* Telerik.Mvc.Export
{% endif %}
* Telerik.Web.Pdf
* Telerik.Web.Spreadsheet

The `Telerik.Zip` library will continue to be shipped as a standalone library.

### Pager

The [responsive behavior]({% slug responsive_pager_aspnet%}) of the Pager has been enhanced, which introduces the following changes:

* The Pager's sizing is no longer based on breakpoints. Instead, the optimized responsive behavior renders as many elements as possible within the available space.
* `Input` Type&mdash;When the [`Input()`](/api/kendo.mvc.ui.fluent/pagerbuilder#inputsystemboolean) option of the Pager is enabled, the TextBox next to the navigation arrows is replaced with a NumericTextBox, and the numeric page number buttons are no longer rendered.
* Page Selection&mdash;The page selection drop-down has been replaced with a NumericTextBox for improved user interaction.
* `NumbersSelectLabel()` Property&mdash;The [`NumbersSelectLabel()`](/api/kendo.mvc.ui.fluent/pagermessagessettingsbuilder#numbersselectlabelsystemstring) option in the `Messages()` configuration has been removed as it is no longer needed with the replacement of the page selection drop-down.

> These changes to the Pager affect all components that use a built-in pager, including the Grid, PDFViewer, and other data management components.

### Rendering Changes

The {{ site.product }} 2025 Q2 release introduces changes in the rendering of the following components:

**AIPrompt**

* The `k-white-space-pre-line` class has been removed from the `k-card-body` element where the output from the prompt is rendered.

**DockManager**

* The `k-header` class has been removed from the TabStrip element. 

**ExpansionPanel**

* The `k-d-none` class on the `k-expander-content-wrapper` element has been replaced with the `k-hidden` class.

**Gantt**

* The `k-alt` class has been removed from the rows in the TreeList and the timeline in the Gantt.

**Grid**

* The `k-alt` class has been removed from the `tr.k-table-alt-row` elements.
* The `k-grid-draggable-header` class and the `draggable=true` attribute have been added to the `k-grid-header` element when grouping or column reodering is enabled.
* The `k-touch-action-none` class has been removed from the draggable cell elements due to the addition of the `k-grid-draggable-header`.
* The `k-drag-cell` class (when row-reordering is enabled) has been removed from the `k-table-th` element.

**Menu**

* The `k-menu-separator` class has been replaced with the `k-separator-horizontal` class.

**Spreadsheet**

* The `k-tabstrip-item` class has been added to the `k-item` elements in the sheet bar.

**TreeList**

* The `k-treelist-group` class has been removed from the parent nodes. 
* The `k-drag-cell` class (in row-reordering scenario) has been removed. 

## {{ site.product }} Q1 2025

### License Activation

Starting with 2025 Q1, all users of {{ site.product }} will need to apply a valid license key file to both new and existing projects. For details, see our [Licensing Documentation]({% slug installation_license_key_aspnetcore %}).
