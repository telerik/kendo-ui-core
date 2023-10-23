---
title: Integration
page_title: Integration
description: "Integrating The Telerik UI Loader component for {{ site.framework }}."
slug: htmlhelpers_loader_aspnetcore_integration
position: 3
---

## Integration

The Loader component can be integrated in another component or it can be used as a building block of a bigger functionality.

## Loader in a Button

The following example demonstrates how the Loader can be integrated in a Button component.

```HtmlHelper
    @(Html.Kendo().Button()
        .Name("toggle")
        .Content(@<text>
            @(Html.Kendo().Loader()
                .Name("loader")
                .Visible(false)
            )
            Show Loader
        </text>)
        .Events(ev => ev.Click("onClick"))
    )

    <style>
        .k-button > .k-loader {
            margin-right: 8px;
        }
    </style>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-button name="toggle" on-click="onClick">
        <kendo-loader name="loader" visible="false">
        </kendo-loader>
        Show Loader
    </kendo-button>

    <style>
        .k-button > .k-loader {
            margin-right: 8px;
        }
    </style>
```
{% endif %}
```Script
    <script>
        function onClick() {
            var loader = $("#loader").data("kendoLoader");      
            loader.show();
            setTimeout(function() {
                loader.hide();
            }, 3000);
        }
    </script>
```

## Loader in a Loading Panel

The following example demonstrates how the Loader can be used as a building block in a Loading Panel.

```HtmlHelper
    @(Html.Kendo().Button()
        .Name("show-panel-btn")
        .Content("Show Loading Panel")
        .Events(ev => ev.Click("onClick"))
    )

    <div class="example-inner">
        <div class="k-loading-panel">
            <div class="k-loading-panel-mask"></div>
            <div class="k-loading-panel-wrapper">
                @(Html.Kendo().Loader()
                    .Name("loader")
                )
                <div class="k-loading-panel-text">Loading...</div>
            </div>
        </div>
        <div class="example-text">Example Container</div>
    </div>

    <style>
        .example-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 300px;
            height: 300px;
            border: 1px solid #000000;
        }
        .example-text {
            font-size: 1.5rem;
        }
        .k-button {
            margin-bottom: 20px;
        }
        /* Loader Panel Styles */
        .k-loading-panel {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
        }
        .k-loading-panel-mask {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #000000;
            opacity: 0.8;
        }
        .k-loading-panel-wrapper {
            position: relative;
            z-index: 2;
        }
        .k-loading-panel-text {
            margin-top: 20px;
            text-align: center;
            color: #ffffff;
        }
    </style>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-button name="show-panel-btn" on-click="onClick">
        Show Loading Panel
    </kendo-button>

    <div class="example-inner">
        <div class="k-loading-panel">
            <div class="k-loading-panel-mask"></div>
            <div class="k-loading-panel-wrapper">
                <kendo-loader name="loader">
                </kendo-loader>
                <div class="k-loading-panel-text">Loading...</div>
            </div>
        </div>
        <div class="example-text">Example Container</div>
    </div>

    <style>
        .example-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 300px;
            height: 300px;
            border: 1px solid #000000;
        }
        .example-text {
            font-size: 1.5rem;
        }
        .k-button {
            margin-bottom: 20px;
        }
        /* Loader Panel Styles */
        .k-loading-panel {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
        }
        .k-loading-panel-mask {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #000000;
            opacity: 0.8;
        }
        .k-loading-panel-wrapper {
            position: relative;
            z-index: 2;
        }
        .k-loading-panel-text {
            margin-top: 20px;
            text-align: center;
            color: #ffffff;
        }
    </style>
```
{% endif %}
```Script
    <script>
        var loadingPanelVisible = false;

        function onClick(){
            loadingPanelVisible = !loadingPanelVisible;
            var loader = $("#loader").data("kendoLoader");
            if (loadingPanelVisible) {
                $("#show-panel-btn").text('Hide Loading Panel');
                loader.show();
            } else {
                $("#show-panel-btn").text('Show Loading Panel');
                loader.hide();
            }
        }
    </script>
```

## See Also

* [Integration of the Loader HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/loader/integration)
* [Loader Server-Side API](/api/loader)
* [Loader Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/loader)