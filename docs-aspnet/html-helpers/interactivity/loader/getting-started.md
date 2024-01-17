---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} Loader component by following a complete step-by-step tutorial."
slug: aspnetcore_loader_getting_started
position: 1
---

# Getting Started with the Loader

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} Loader and highlights the major steps in the configuration of the component.

You will initialize a Loader component with a predefined type, size, and theme color. Next, you will learn how to get a reference to the Loader's client-side instance and control its behavior. {% if site.core %}Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the components.{% endif %}

 ![Sample Telerik UI for {{ site.framework }} Loader](./images/loader-getting-started.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File

@[template](/_contentTemplates/core/getting-started-directives.md#gs-adding-directives)

Optionally, you can structure the document by adding the desired HTML elements like headings, divs, and paragraphs.

```HtmlHelper
    @using Kendo.Mvc.UI
    <h4>Loader</h4>
    <div>
    
    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <h4>Loader</h4>
    <div>
    
    </div>
```
{% endif %}


## 2. Initialize the Loader

Use the Loader HtmlHelper {% if site.core %}or TagHelper{% endif %} to add the component to a page.

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the Loader element.

* The `Type()` option allows you to set the animation type of the component.

* You can use the `Size()` method to select a predefined size for the Loader.

* The `ThemeColor()` option specifies the component color based on the used Kendo UI theme.

```HtmlHelper
    @(Html.Kendo().Loader()
        .Name("loader")
        .Type(LoaderType.InfiniteSpinner)
        .Size(LoaderSize.Large)
        .ThemeColor(LoaderThemeColor.Primary)
    )
```
{% if site.core %}
```TagHelper
    <kendo-loader name="loader"
        type="LoaderType.InfiniteSpinner" 
        size="LoaderSize.Large" 
        themeColor="LoaderThemeColor.Primary">
    </kendo-loader>
```
{% endif %}

## 3. (Optional) Reference Existing Loader Instances

You can reference the Loader instances that you have created and build on top of their existing configuration:

1. Use the `.Name()` (`id` attribute) of the component instance to get a reference.

    ```script
         <script>
             $(document).ready(function() {
                 var loaderReference = $("#loader").data("kendoLoader"); // loaderReference is a reference to the existing Loader instance of the helper.
             })
         </script>
    ```
1. Use the [Loader client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/loader#methods) to control the behavior of the Loader. In this example, you will hide the Loader by using the [`hide()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/loader/methods/hide) client-side method.

    ```HtmlHelper
        @(Html.Kendo().Button()
            .Name("btn")
            .Content("Hide the Loader")
            .Events(ev => ev.Click("onBtnClick")))

        <script>
            function onBtnClick() {
                var loaderReference = $("#loader").data("kendoLoader"); // loaderReference is a reference to the existing Loader instance of the helper.
                loaderReference.hide(); // Hide the Loader.
            }
        </script>
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-button name="btn" on-click="onBtnClick">
            Hide the Loader
        </kendo-button>

        <script>
            function onBtnClick() {
                var loaderReference = $("#loader").data("kendoLoader"); // loaderReference is a reference to the existing Loader instance of the helper.
                loaderReference.hide(); // Hide the Loader.
            }
        </script>
    ```
    {% endif %}

For more information on referencing specific helper instances, see the [Methods and Events]({% slug methodevents_core %}) article.

{% if site.core %}

## Explore this Tutorial in REPL

You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:

* [Sample code with the Loader HtmlHelper](https://netcorerepl.telerik.com/cRlcFmPA50wk0xm027)
* [Sample code with the Loader TagHelper](https://netcorerepl.telerik.com/QdPcPGvA42STBcGz38)

{% endif %}

## Next Steps

* [Customizing the Appearance of the Loader]({% slug htmlhelpers_loader_aspnetcore_appearance %})
* [Integration with other components]({% slug htmlhelpers_loader_aspnetcore_integration %})

## See Also

* [Loader Color Variations {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/loader/color-variations)
* [Client-Side API of the Loader](https://docs.telerik.com/kendo-ui/api/javascript/ui/loader)
* [Server-Side API of the Loader](/api/loader)
{% if site.core %}
* [Server-Side TagHelper API of the Loader](/api/taghelpers/loader)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
