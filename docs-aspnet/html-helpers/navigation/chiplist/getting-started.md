---
title: Getting Started
page_title: Getting Started with the ChipList
description: "Get started with the Telerik UI for {{ site.framework }} and learn how to create, initialize, and enable the component by following the complete step-by-step tutorial."
slug: chiplist_aspnetcore_get_started
position: 2
---

# Getting Started with the ChipList

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} ChipList and highlights the major steps in the configuration of the component.

You will initialize a ChipList control, configure its icons, and handle its events. 
{% if site.core %}
Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the components.
{% endif %}

After the completion of this guide, you will be able to achieve the following end result:

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
        .Items(item=>{
            item.Add().Icon("plus").Label("Add");
            item.Add().Icon("pencil").Label("Edit");
            item.Add().Icon("trash").Label("Remove");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist">
        <items>
            <item icon="plus" label="Add"></item>
            <item icon="pencil" label="Edit"></item>
            <item icon="trash" label="Remove"></item>
        </items>
    </kendo-chiplist>
```
{% endif %}

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

## 2. Initialize the ChipList

Describe the configuration and event handlers of the ChipList component in C#. Once the basic initialization is completed, you can start adding additional configurations to the ChipList. 

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist">
    </kendo-chiplist>
```
{% endif %}


## 3. Add Items with Labels

You can add individual Chip items by passing objects to the [`Items`](/api/Kendo.Mvc.UI.Fluent/ChipListBuilder#itemssystemaction) array. For more information about the configurations of the different chips inside the ChipList, refer to the article on [customizing the ChipList]({% slug htmlhelpers_chiplist_aspnetcore_customization %}).

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
        .Items(item=>{
            item.Add().Label("Add");
            item.Add().Label("Edit");
            item.Add().Label("Remove");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist">
        <items>
            <item label="Add"></item>
            <item label="Edit"></item>
            <item label="Remove"></item>
        </items>
    </kendo-chiplist>
```
{% endif %}

## 4. Add Icons to the Chips inside the ChipList

Now you can use the `Items.Icon` option which allows you to display a label on the Chips inside the ChipList.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
        .Items(item=>{
            item.Add().Icon("plus").Label("Add");
            item.Add().Icon("pencil").Label("Edit");
            item.Add().Icon("trash").Label("Remove");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist">
        <items>
            <item icon="plus" label="Add"></item>
            <item icon="pencil" label="Edit"></item>
            <item icon="trash" label="Remove"></item>
        </items>
    </kendo-chiplist>
```
{% endif %}

## Next Steps 

* [Referencing Existing Component Instances](https://docs.telerik.com/kendo-ui/intro/widget-basics/events-and-methods#referencing-existing-component-instances) 
* [Demo Page for the ChipList](https://demos.telerik.com/{{ site.platform }}/chiplist/index)

## See Also 

* [JavaScript API Reference of the ChipList HtmlHelper for {{ site.framework }}](/api/javascript/ui/chiplist)
* [Server-Side API of the ChipList HtmlHelper for {{ site.framework }}](/api/chiplist)
* [Knowledge Base Section](/knowledge-base)

