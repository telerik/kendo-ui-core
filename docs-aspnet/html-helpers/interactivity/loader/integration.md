---
title: Integration
page_title: Integration
description: "Integrating The Telerik UI Loader HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_loader_aspnetcore_integration
position: 3
---

## Integration

The Loader component can be integrated in another component or it can be used as a building block of a bigger functionality.

## Loader in a Button

The following example demonstrates how the Loader can be integrated in a button.
```Razor
    @(Html.Kendo().Button()
        .Name("toggle")
        .Content(@<text>
                    @(Html.Kendo().Loader()
                           .Name("loader")
                           .Visible(false)
                    )
                    Show Loader
        </text>)
    )

    <script>
        var loader = $("#loader").data("kendoLoader");

        $("#toggle").click(function () {        
            loader.show();
            setTimeout(function () {
                loader.hide();
            }, 3000)
        })
    </script>

    <style>
        .k-button > .k-loader {
            margin-right: 8px;
        }
    </style>
```

## Loader in a Loading Panel

The following example demonstrates how the Loader can be used as a building block in a Loading Panel.

```dojo
    <button class='k-button'>Show Loading Panel</button>
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
    <div>
    <script>
    var loadingPanelVisible = false;
    
    $("button").click(function(){
        loadingPanelVisible = !loadingPanelVisible;
        var loader = $("#loader").data("kendoLoader");
        if (loadingPanelVisible) {
            $("button").text('Hide Loading Panel');
            loader.show();
        } else {
            $("button").text('Show Loading Panel');
            loader.hide();
        }
    })
    </script>
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

## See Also

* [API Reference of the Loader Component](/api/javascript/ui/loader)