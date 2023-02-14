---
title: Getting Started
page_title: jQuery Upload Documentation - Getting Started with the Upload
description: "Get started with the jQuery Upload by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_upload_widget
position: 1
---

# Getting Started with the Upload

This guide demonstrates how to get up and running with the Kendo UI for jQuery Upload.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input name="files" id="files" type="file" />

    <script>
      $(document).ready(function() {
        $("#files").kendoUpload({
          async: {
            saveUrl: "save",
            removeUrl: "remove",
            autoUpload: true
          }
        });
      });
    </script>
```

## 1. Create an input Element

First, create an `<input>` element on the page that will be used to initialize the Upload widget. Set the `type` of the input to `"file"`.

```html
<input name="files" id="files" type="file" />
```

## 2. Initialize the Upload

In this step, you will initialize the Upload from the `input` element.

```html
    <script>
        $(document).ready(function() {
            $("#files").kendoUpload();
        });
    </script>
```

## 3. Configure the Upload Settings

Next, set the [`saveUrl`](/api/javascript/ui/upload/configuration/async.saveurl) and [`removeUrl`](/api/javascript/ui/upload/configuration/async.removeurl) configuration options. These configurations allow the end-user to upload a file to the server and remove it afterwards.

```html
    <script>
        $(document).ready(function() {
            $("#files").kendoUpload({
                async: {
                    saveUrl: "save",
                    removeUrl: "remove",
                    autoUpload: true
                }
            });
        });
    </script>
```

## 4. Create the Remote Endpoints

The server-side logic must be implemented by the developers themselves. You can find a sample server logic in the [Asynchronous Upload](https://demos.telerik.com/kendo-ui/upload/async) demo by clicking the **View Source** tab.

[Sample Service Source Code](asyncdemo-sample-service.png)

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Upload](https://demos.telerik.com/kendo-ui/upload/index)

## See Also 

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>