---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} FloatingToolBar component by following a complete step-by-step tutorial."
components: ["floatingtoolbar"]
slug: floatingtoolbar_getting_started
position: 1
---

# Getting Started with the FloatingToolBar

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} FloatingToolBar and highlights the major steps in the configuration of the component.

You will initialize a FloatingToolBar with text formatting tools inside a positioned container. Next, you will handle its events and reference the client-side instance of the component. {% if site.core %}Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the components.{% endif %}

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File

@[template](/_contentTemplates/core/getting-started-directives.md#gs-adding-directives)

Add a container that holds the content and the toolbar. The FloatingToolBar aligns itself to its closest positioned ancestor, so set the `position` CSS property of the container to `relative`.

```HtmlHelper
    @using Kendo.Mvc.UI

    <div id="document-editor" style="position: relative; height: 260px; padding: 16px; border: 1px solid #ccc;">
        <h4>Customs Declaration</h4>
        <p>Container MSKU 7720145 holds 18 pallets of medical supplies, temperature-controlled at 2-8&deg;C.</p>
    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <div id="document-editor" style="position: relative; height: 260px; padding: 16px; border: 1px solid #ccc;">
        <h4>Customs Declaration</h4>
        <p>Container MSKU 7720145 holds 18 pallets of medical supplies, temperature-controlled at 2-8&deg;C.</p>
    </div>
```
{% endif %}

## 2. Initialize the FloatingToolBar

Use the FloatingToolBar HtmlHelper {% if site.core %}or TagHelper{% endif %} to add the component inside the container:

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the FloatingToolBar element.
* The `Visible()` option shows the toolbar when the page loads. By default, the toolbar is hidden until you call its `show()` client-side method.
* The `ContainerAlign()` option places the toolbar at the bottom center of the container.
* The `Items()` option defines the commands. It accepts the same item configuration as the [ToolBar]({% slug toolbar_getting_started %}).

```HtmlHelper
    @using Kendo.Mvc.UI

    <div id="document-editor" style="position: relative; height: 260px; padding: 16px; border: 1px solid #ccc;">
        <h4>Customs Declaration</h4>
        <p>Container MSKU 7720145 holds 18 pallets of medical supplies, temperature-controlled at 2-8&deg;C.</p>

        @(Html.Kendo().FloatingToolBar()
            .Name("floatingtoolbar")
            .Visible(true)
            .ContainerAlign(align => align
                .Horizontal(FloatingToolBarHorizontalAlign.Center)
                .Vertical(FloatingToolBarVerticalAlign.Bottom))
            .Margin(margin => margin.Vertical(-16))
            .Items(items =>
            {
                items.Add().Type(CommandType.ButtonGroup).Buttons(buttons =>
                {
                    buttons.Add().Text("Bold").Icon("bold").Togglable(true).ShowText(ShowIn.Overflow);
                    buttons.Add().Text("Italic").Icon("italic").Togglable(true).ShowText(ShowIn.Overflow);
                    buttons.Add().Text("Underline").Icon("underline").Togglable(true).ShowText(ShowIn.Overflow);
                });
                items.Add().Type(CommandType.Separator);
                items.Add().Type(CommandType.Button).Text("Insert Link").Icon("link").ShowText(ShowIn.Overflow);
            })
        )
    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <div id="document-editor" style="position: relative; height: 260px; padding: 16px; border: 1px solid #ccc;">
        <h4>Customs Declaration</h4>
        <p>Container MSKU 7720145 holds 18 pallets of medical supplies, temperature-controlled at 2-8&deg;C.</p>

        <kendo-floatingtoolbar name="floatingtoolbar" visible="true">
            <container-align horizontal="FloatingToolBarHorizontalAlign.Center" vertical="FloatingToolBarVerticalAlign.Bottom" />
            <margin vertical="-16" />
            <floatingtoolbar-items>
                <item type="CommandType.ButtonGroup">
                    <buttons>
                        <toolbar-button text="Bold" icon="bold" togglable="true" show-text="ShowIn.Overflow" />
                        <toolbar-button text="Italic" icon="italic" togglable="true" show-text="ShowIn.Overflow" />
                        <toolbar-button text="Underline" icon="underline" togglable="true" show-text="ShowIn.Overflow" />
                    </buttons>
                </item>
                <item type="CommandType.Separator" />
                <item type="CommandType.Button" text="Insert Link" icon="link" show-text="ShowIn.Overflow" />
            </floatingtoolbar-items>
        </kendo-floatingtoolbar>
    </div>
```
{% endif %}

## 3. Handle the FloatingToolBar Events

The FloatingToolBar exposes events that you can handle to respond to user actions. In this tutorial, you will handle the `Show` and `Hide` events of the component.

```HtmlHelper
    @(Html.Kendo().FloatingToolBar()
        .Name("floatingtoolbar")
        .Visible(true)
        .Events(events => events
            .Show("onShow")
            .Hide("onHide"))
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Insert Link").Icon("link");
        })
    )

    <script>
        function onShow(e) {
            console.log("The FloatingToolBar is shown.");
        }

        function onHide(e) {
            console.log("The FloatingToolBar is hidden.");
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-floatingtoolbar name="floatingtoolbar" visible="true" on-show="onShow" on-hide="onHide">
        <floatingtoolbar-items>
            <item type="CommandType.Button" text="Insert Link" icon="link" />
        </floatingtoolbar-items>
    </kendo-floatingtoolbar>

    <script>
        function onShow(e) {
            console.log("The FloatingToolBar is shown.");
        }

        function onHide(e) {
            console.log("The FloatingToolBar is hidden.");
        }
    </script>
```
{% endif %}

## 4. (Optional) Reference Existing FloatingToolBar Instances

To use the client-side API of the FloatingToolBar, get a reference to the component instance by using its `Name()`. Then, call the [client-side methods](https://docs.telerik.com/kendo-ui/api/javascript/ui/floatingtoolbar#methods) to control the toolbar.

```HtmlHelper
    @(Html.Kendo().Button()
        .Name("showToolbar")
        .Content("Show Toolbar")
        .Events(events => events.Click("onShowClick"))
    )
    @(Html.Kendo().Button()
        .Name("hideToolbar")
        .Content("Hide Toolbar")
        .Events(events => events.Click("onHideClick"))
    )

    <script>
        function onShowClick() {
            $("#floatingtoolbar").data("kendoFloatingToolBar").show();
        }

        function onHideClick() {
            $("#floatingtoolbar").data("kendoFloatingToolBar").hide();
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-button name="showToolbar" on-click="onShowClick">Show Toolbar</kendo-button>
    <kendo-button name="hideToolbar" on-click="onHideClick">Hide Toolbar</kendo-button>

    <script>
        function onShowClick() {
            $("#floatingtoolbar").data("kendoFloatingToolBar").show();
        }

        function onHideClick() {
            $("#floatingtoolbar").data("kendoFloatingToolBar").hide();
        }
    </script>
```
{% endif %}

{% if site.core %}
## Explore this Tutorial in REPL

You can continue experimenting with the code sample in this tutorial by running it in the Telerik REPL server playground.
{% endif %}

## Next Steps

* [Configuring the Position of the FloatingToolBar]({% slug floatingtoolbar_positioning %})
* [Customizing the Appearance of the FloatingToolBar]({% slug floatingtoolbar_appearance %})
* [Configuring the Overflow of the FloatingToolBar]({% slug floatingtoolbar_overflow %})
* [Handling the FloatingToolBar Events]({% slug floatingtoolbar_events %})
* [Accessibility of the FloatingToolBar]({% slug htmlhelpers_floatingtoolbar_accessibility %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keynav_aspnetcore_floatingtoolbar %})

## See Also

* [FloatingToolBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/floatingtoolbar)
* [Knowledge Base Section](/knowledge-base)
