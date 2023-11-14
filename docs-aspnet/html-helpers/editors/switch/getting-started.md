---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} Switch component by following a complete step-by-step tutorial."
slug: aspnetcore_switch_getting_started
position: 1
---

# Getting Started with the Switch

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} Switch and highlights the major steps in the configuration of the component.

You will initialize a Switch component with explicitly defined messages depending on its check state, and then change its appearance. Finally, you will learn how to handle the events of the Switch.

 ![Sample Telerik UI for {{ site.framework }} Switch](./images/switch-getting-started.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File

@[template](/_contentTemplates/core/getting-started-directives.md#gs-adding-directives)

Optionally, you can structure the document by adding the desired HTML elements like headings, divs, and paragraphs.

```HtmlHelper
    @using Kendo.Mvc.UI
    <h4>Switch with a placeholder</h4>
    <div>
    
    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <h4>Switch with a placeholder</h4>
    <div>
    
    </div>
```
{% endif %}

## 2. Initialize the Switch

Use the Switch HtmlHelper {% if site.core %}or TagHelper{% endif %} to add the component to a page:

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the  Switch element.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch")
    )
```
{% if site.core %}
```TagHelper
    <kendo-switch name="switch">
    </kendo-switch>
```
{% endif %}

## 3. Configure the Messages

The next step is to explicitly define the messages functionality for the Switch. The following example will configure the messages functionality based on the checked or unchecked state of the component.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch")
        .Messages(c => c.Checked("YES").Unchecked("NO"))
    )
```

{% if site.core %}
```TagHelper
    <kendo-switch name="switch">
        <messages checked="YES" unchecked="NO" />
    </kendo-switch>
```
{% endif %}

## 4. Customize the Appearance of Switch

To change the [appearance]({% slug switch_appearance %}) of the Switch, use any of its built-in styling options, for example, `Size()`, `TrackRounded()` and `ThumbRounded()`.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch")
        .Messages(c => c.Checked("YES").Unchecked("NO"))
        .Size(ComponentSize.Medium)
        .TrackRounded(Rounded.Full)
        .ThumbRounded(Rounded.Full)
    )
```
{% if site.core %}
```TagHelper
    <kendo-switch name="switch"
                  size="ComponentSize.Medium"
                  track-rounded="Rounded.Full"
                  thumb-rounded="Rounded.Full">
        <messages checked="YES" unchecked="NO" />
    </kendo-switch>
```
{% endif %}

## 5. Handle the Switch Events

The Switch component exposes various [events](api/kendo.mvc.ui.fluent/switcheventbuilder) that you can handle and further customize the functionality of the component. In this tutorial, you will use the `Change` event to display a popup message when the value of the Switch changes through user interaction.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch")
        .Messages(c => c.Checked("YES").Unchecked("NO"))
        .Events(events => events.Change("onChange"))
        .Size(ComponentSize.Medium)
        .TrackRounded(Rounded.Full)
        .ThumbRounded(Rounded.Full)
    )

    <script>
        function onChange(e){
            alert("Changed value: "+ e.sender.value());
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-switch name="switch"
                  on-change="onChange"
                  size="ComponentSize.Medium"
                  track-rounded="Rounded.Full"
                  thumb-rounded="Rounded.Full">
        <messages checked="YES" unchecked="NO" />
    </kendo-switch>

    <script>
        function onChange(e){
            alert("Changed value: "+ e.sender.value());
        }
    </script>
```
{% endif %}

## 6. (Optional) Reference Existing Switch Instances

You can reference the Switch instances that you have created and build on top of their existing configuration:

1. Use the `.Name()` (`id` attribute) of the component instance to get a reference.

    ```script
         <script>
             $(document).ready(function() {
                 var switchReference = $("#switch").data("kendoSwitch"); // switchReference is a reference to the existing Switch instance of the helper.
             })
         </script>
    ```
1. Set the check state of the component by using the [`check()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch/methods/check) client-side method.

    ```script
        <script>
            $(document).ready(function() {
               var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");// switchReference is a reference to the existing Switch instance of the helper.
               switchInstance.check(true); // Set the initial check state of the component.
            })
        </script>
    ```
{% if site.core %}

## Explore this Tutorial in REPL

You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:

* [Sample code with the Switch HtmlHelper](https://netcorerepl.telerik.com/GnOAvFFr0418nwKs40)
* [Sample code with the Switch TagHelper](https://netcorerepl.telerik.com/cnkUllPA29Luxur938)

{% endif %}

## Next Steps

{% if site.core %}
* [Configuring the Switch in Razor Pages]({% slug htmlhelpers_switch_aspnetcore_razor_page %})
{% endif %}
* [Customizing the Appearance of the Switch]({% slug switch_appearance %})

## See Also

* [Using the API of the Switch for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch/api)
* [Client-Side API of the Switch](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch)
* [Server-Side API of the Switch for {{ site.framework }}](/api/switch)
* [Knowledge Base Section](/knowledge-base)
