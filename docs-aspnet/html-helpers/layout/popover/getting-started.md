---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} PopOver component by following a complete step-by-step tutorial."
components: ["popover"]
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
        <span id="buttonHover" class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md wider">Hover me!</span>
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

    <kendo-popover for="#buttonHover" position="bottom" show-on="mouseenter" body="Hello!" width="100">
    </kendo-popover>
```
{% endif %}

## 3. Handle the PopOver Events

The PopOver exposes [events]({% slug events_popover %}) that you can handle to customize the component's behavior. In this tutorial, you will:

* Use the `Show` event to log a new entry in the browser's console whenever the PopOver is shown.
* Subscribe to the `Hide` event to log a new entry in the browser's console whenever the PopOver is hidden.

```HtmlHelper
    <div class="demo-section">
        <span id="buttonHover" class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md wider">Hover me!</span>
    </div>

    @(Html.Kendo().Popover()
        .For("#buttonHover")
        .Position(PopoverPosition.Bottom)
        .ShowOn(PopoverShowOn.MouseEnter)
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

    <kendo-popover for="#buttonHover" position="bottom" show-on="mouseenter" body="Hello!" width="100" on-hide="onHide" on-show="onShow">
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

## 4. (Optional) Reference Existing PopOver Instances

You can reference the PopOver instances that you have created and build on top of their existing configuration:

1. Use the value of the `For()` option of the component to establish a reference.

    ```JS script
    <script>
        var popoverReference = $("#buttonHover").data("kendoPopOver"); // popoverReference is a reference to the existing PopOver instance of the helper.
    </script>
    ```

1. Use the [PopOver client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/popover#methods) to control the behavior of the component. In this example, you will use the `show()` method to show the PopOver dynamically (for example, when a button is clicked).

    ```HtmlHelper
        <span id="target">Popover target</span>

        @(Html.Kendo().Button()
            .Name("btn")
            .Content("Show PopOver")
            .Events(ev => ev.Click("onBtnClick"))
        )

        @(Html.Kendo().Popover()
            .For("#target")
            .Position(PopoverPosition.Bottom)
            .ShowOn(PopoverShowOn.Click)
            .Body("Content description")
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        
        <span id="target">Popover target</span>

        <kendo-button name="btn" on-click="onBtnClick">
            Show PopOver
        </kendo-button>

        <kendo-popover for="#target" position="bottom" show-on="click" body="Content description">
        </kendo-popover>
    ```
    {% endif %}
    ```JS scripts
        <script>
            function onBtnClick() {
                var popoverReference = $("#target").data("kendoPopOver");
                popoverReference.show(); // Show the PopOver.
            }
        </script>
    ```

For more information on referencing specific helper instances, see the [Methods and Events]({% slug methodevents_core %}) article.

{% if site.core %}
## Explore this Tutorial in REPL

You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:

* [Sample code with the PopOver HtmlHelper](https://netcorerepl.telerik.com/wSbFlDlq41W5HYZf18)
* [Sample code with the PopOver TagHelper](https://netcorerepl.telerik.com/GIPvbDvg42NBQNQF11)

{% endif %}

## Next Steps

* [Using the PopOver template options]({% slug htmlhelpers_templates_popover %})

## See Also

* [Using the API of the PopOver for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/api)
* [Client-Side API of the PopOver](https://docs.telerik.com/kendo-ui/api/javascript/ui/popover)
* [Server-Side API of the PopOver HtmlHelper](/api/popover)
{% if site.core %}
* [Server-Side API of the PopOver TagHelper](/api/taghelpers/popover)
{% endif %}
* [Knowledge Base Section](/knowledge-base)