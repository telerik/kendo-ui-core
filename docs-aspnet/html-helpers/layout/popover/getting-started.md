---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} PopOver component by following a complete step-by-step tutorial."
slug: getting_started_popover
position: 1
---

# Getting Started with the PopOver

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} PopOver and highlights the key steps in the configuration of the component.

You will initialize a PopOver, add action buttons, and configure the handling of the PopOver's events. {% if site.core %}Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the components.{% endif %}

 ![Sample Telerik UI for {{ site.framework }} PopOver](./images/popover-getting-started.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File

@[template](/_contentTemplates/core/getting-started-directives.md#gs-adding-directives)

Optionally, you can structure the document by adding the desired HTML elements like headings, divs, paragraphs, and others.

## 2. Initialize the PopOver

Use the PopOver HtmlHelper {% if site.core %}or TagHelper{% endif %} to add the component to a page:

* The `For()` configuration method sets the target element.
* The `Position()` configuration specifies the overall position of the PopOver.
* The `ShowOn()` configuration specifies on which action it will be shown.
* The `Body()` configuration specifies the textual content that is rendered within the PopOver.

```HtmlHelper
<div class="demo-section">
    <span id="buttonHover" class="k-button wider">Hover me!</span>
</div>

@(Html.Kendo().Popover()
    .For("#buttonHover")
    .Position(PopoverPosition.Bottom)
    .ShowOn(PopoverShowOn.MouseEnter)
    .Body("Hello!")
    .Width(100)
)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

<div class="demo-section">
    <span id="buttonHover" class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md wider">Hover me!</span>
</div>

<kendo-popover body="Hello!" toggle-on-click="true" width="100" position="bottom" for="#buttonHover">
	<animation enabled="true">
	 	<open duration="400"/>
	 	<close duration="400"/>
	</animation>
</kendo-popover>
```
{% endif %}

## 3. Handle PopOver Events

The PopOver exposes [events]({% slug events_popover %}) that you can handle to customize the component's functions. In this tutorial, you will:

* Use the `Show()` event to log a new entry in the browser's console whenever the PopOver is shown.
* Attach the `Hide()` event handler to log a new entry in the browser's console whenever the PopOver is hidden.

```HtmlHelper
<div class="demo-section">
    <span id="buttonHover" class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md wider">Hover me!</span>
</div>

@(Html.Kendo().Popover()
    .For("#buttonHover")
    .Position(PopoverPosition.Bottom)
    //.ShowOn(PopoverShowOn.MouseEnter)
    .ToggleOnClick(true)
    .Body("Hello!")
    .Width(100)
    .Events(events => events.Hide("onHide").Show("onShow"))
)

<script type="text/javascript">
        function onShow(e) {
            console.log("event :: show");
        }

        function onHide(e) {
            console.log("event :: hide");
        }
</script>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<div class="demo-section">
    <span id="buttonHover" class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md wider">Hover me!</span>
</div>

<kendo-popover body="Hello!" toggle-on-click="true" width="100" position="bottom" for="#buttonHover" on-hide="onHide" on-show="onShow">
	<animation enabled="true">
	 	<open duration="400"/>
	 	<close duration="400"/>
	</animation>
</kendo-popover>

<script type="text/javascript">
        function onShow(e) {
            console.log("event :: show");
        }

        function onHide(e) {
            console.log("event :: hide");
        }
</script>
```
{% endif %}

## 6. (Optional) Reference Existing PopOver Instances

You can reference the PopOver instances that you have created and build on top of their existing configuration:

1. Use the `id` attribute of the component instance to establish a reference.

    ```script
    <script>
        var popoverReference = $("#popover").data("kendoPopOver"); // popoverReference is a reference to the existing popover instance of the helper.
    </script>
    ```

1. Use the [PopOver client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/popover#methods) to control the behavior of the widget. In this example, you will use the `show` method to display the PopOver.

    ```script
    <script>
        var popoverReference = $("#popover").data("kendoPopOver"); // popoverReference is a reference to the existing popover instance of the helper.
        popover.show(); // Displays the PopOver.
    </script>
    ```

{% if site.core %}
## Explore this Tutorial in REPL

You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:

* [Sample code with the PopOver HtmlHelper](https://netcorerepl.telerik.com/QnPcwzbp27FcouOZ43)
* [Sample code with the PopOver TagHelper](https://netcorerepl.telerik.com/mRPwmTPz28m9yQEA21)

{% endif %}

## Next Steps

* [Configure the templates in the PopOver]({% slug htmlhelpers_templates_popover %})

## See Also

* [Using the API of the PopOver for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/api)
* [PopOver Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/popover)
* [Server-Side API of the PopOver](/api/popover)
* [Knowledge Base Section](/knowledge-base)
