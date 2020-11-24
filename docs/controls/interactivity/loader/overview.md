---
title: Overview
page_title: jQuery Loader Documentation | Loader Overview
description: "Get started with the jQuery Loader by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_loader_widget
position: 1
---

# Loader Overview

The Loader component is a visual indicator that expresses an indeterminate wait time. It informs users about the status of ongoing processes, such as loading an application, submitting a form, saving updates or fetching data.

## Initializing the Loader

To initialize the Loader, you can use virtually any `span` element. The following example demonstrates how to initialize the Loader.

```dojo
    <div class="loader">
      <span id="loader"></span>
    </div>
    <script>
      $(document).ready(function(){
        $("#loader").kendoLoader();
      });
    </script>
    <style>
      .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height:450px;
      }
    </style>
```

## Basic Configuration

The following example demonstrates the Loader in action.

```dojo
    <div class="loader">
      <span id="loader"></span>
    </div>
    <script>
        $(document).ready(function(){
            $("#loader").kendoLoader({
                themeColor: "secondary",
                type:'pulsing',
                size:'medium'
            });
        });
    </script>
    <style>
      .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height:450px;
      }
    </style>
```

## Functionality and Features

* [Appearance]({% slug appearance_kendoui_loader %})
* [Integration]({% slug integration_kendoui_loader %})

## See Also

* [Overview of the Loader (Demo)](https://demos.telerik.com/kendo-ui/loader/index)
* [JavaScript API Reference of the Loader](/api/javascript/ui/loader)
