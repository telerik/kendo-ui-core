---
title: Getting Started
page_title: Getting Started with the Chip
description: "Make your first steps with the Telerik UI for {{ site.framework }} Chip component by following the complete step-by-step tutorial."
slug: chip_getting_started
position: 1
---

# Getting Started with the Chip

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} Chip and highlights the major steps in the configuration of the component.

You will initialize a Chip control, configure its icons, and handle its events. 
{% if site.core %}
Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the components.
{% endif %}

![Sample Telerik UI for {{ site.framework }} Chip](./images/chip-basic.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File

The first step is to add the required directives at the top of the `.cshtml` document:

* To use the Telerik UI for {{ site.framework }} HtmlHelpers:
    ```
    @using Kendo.Mvc.UI
    ```
{% if site.core %}
* To use the Telerik UI for {{ site.framework }} TagHelpers:
    ```
    @addTagHelper *, Kendo.Mvc
    ```
{% endif %}

## 2. Initialize the Chip

Use the Chip HtmlHelper {% if site.core %}or TagHelper{% endif %} to add the component to a page. The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the Chip's Html element.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().Chip()
            .Name("chip")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chip name="chip"> 
    </kendo-chip>
```
{% endif %}

## 3. Add an Icon

You can display an icon in the Chip by configuring the [`Icon`](/api/Kendo.Mvc.UI.Fluent/ChipBuilder#iconsystemstring) option. For more information about the variety of the icons supported by the Chip, refer to the article on [customizing the Chip]({% slug htmlhelpers_chip_aspnetcore_customization %}).

```HtmlHelper
     @(Html.Kendo().Chip()
            .Name("iconSaveChip")
            .Icon("save")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chip name="iconSaveChip"
                icon="save">
    </kendo-chip>
```
{% endif %}

## 4. Add a Label  

To display a label on the Chip, use the [`Label`](/api/Kendo.Mvc.UI.Fluent/ChipBuilder#labelsystemstring) option.

```HtmlHelper
     @(Html.Kendo().Chip()
            .Name("iconSaveChip")
            .Icon("save")
            .Label("Save")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chip name="iconSaveChip"
                icon="save"
                label="Save">
    </kendo-chip>
```
{% endif %}

## Next Steps

* [Referencing Existing Component Instances](https://docs.telerik.com/kendo-ui/intro/widget-basics/events-and-methods#referencing-existing-component-instances)
* [Demo Page for the Chip](https://demos.telerik.com/{{ site.platform }}/chip)

## See Also

* [Using the API of the Chip for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chip/api)
* [Client-Side API of the Chip HtmlHelper for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chip)
* [Server-Side API of the Chip HtmlHelper for {{ site.framework }}](/api/chip)
* [Knowledge Base Section](/knowledge-base)
