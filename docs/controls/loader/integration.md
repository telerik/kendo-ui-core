---
title: Integration
page_title: jQuery Loader Documentation - Integration
description: "Integrating the Kendo UI for jQuery Loader component."
slug: integration_kendoui_loader
position: 3
---

## Integration

The Loader component can be integrated in another component or it can be used as a building block of a bigger functionality.

## Loader in a Button

The following example demonstrates how the Loader can be integrated in a button.

```dojo
    <button id="toggle" class="k-button">
        <div id="loader"></div>
        Show Loader
    </button> 

    <script>
        var loader = $('#loader').kendoLoader({
            visible: false,
            size: "small"
        }).data('kendoLoader');

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
    <div class="loader">
        <div class="example-inner">
        <div class="k-loading-panel">
            <div class="k-loading-panel-mask"></div>
            <div class="k-loading-panel-wrapper">
                <span id="loader">
                </span>
                <div class="k-loading-panel-text">Loading...</div>
            </div>
        </div>
        <div class="example-text">Example Container</div>
        </div>
    </div>
    <script>
        var loadingPanelVisible = false;
        $("#loader").kendoLoader({
            visible:false
        });
      	$(".k-loading-panel").hide();
        $("button").click(function(){
          var loader = $("#loader").data("kendoLoader");
          loadingPanelVisible = !loadingPanelVisible;
          if (loadingPanelVisible) {
            $("button").text('Hide Loading Panel');
            loader.show();
            $(".k-loading-panel").show();
          } else {
            $("button").text('Show Loading Panel');
            loader.hide();
            $(".k-loading-panel").hide();
          }
        })
    </script>
    <style>
    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height:450px;
    }

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