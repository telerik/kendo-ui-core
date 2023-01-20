---
title: Getting Started
page_title: jQuery Editor Documentation - Getting Started with the jQuery Editor
description: "Get started with the jQuery Editor by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_editor_widget
position: 2
---

# Getting Started with the Editor

This guide demonstrates how to get up and running with the Kendo UI for jQuery Editor. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
        <textarea id="editor" rows="10" cols="30" style="width:100%; height:450px" aria-label="editor">
            &lt;br /&gt;
            &lt;p style="text-align:center;"&gt;
                &lt;span style="font-family:Verdana, Geneva, sans-serif;font-size:large;"&gt;&lt;strong&gt;One of the Most Beautiful Islands on Earth - Tenerife&lt;/strong&gt;
                &lt;/span&gt;
            &lt;/p&gt;
            &lt;p&gt;
                &lt;span style="font-family:Verdana, Geneva, sans-serif;font-size:medium;"&gt;&lt;strong&gt;Overview&lt;/strong&gt;
                &lt;/span&gt;
            &lt;/p&gt;
            &lt;p style="font-size: small;"&gt;
                &lt;strong&gt;Tenerife &lt;/strong&gt;is the largest and most populated island of the eight &lt;a href="https://en.wikipedia.org/wiki/Canary_Islands" target="_blank"&gt;Canary Islands&lt;/a&gt;. It is also the most populated island of &lt;strong&gt;Spain&lt;/strong&gt;, with a land area of 2,034.38 square kilometers (785 sq mi) and 904,713 inhabitants, 43% of the total population of the &lt;strong&gt;Canary Islands&lt;/strong&gt;.&amp;nbsp;The archipelago's beaches, climate, and important natural attractions make it a major tourist destination with over 12 million visitors per year.
            &lt;/p&gt;
            &lt;br /&gt;
            &lt;p&gt;&lt;span style="font-family:Verdana, Geneva, sans-serif;font-size:medium;"&gt;
                &lt;strong&gt;Trip Highlights in Tenerife&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;&lt;span style="white-space:pre;"&gt;&lt;/span&gt;
                &lt;ul&gt;
                    &lt;li&gt;
                        &lt;strong style="color: rgb(0,80,5);"&gt;Trip to Loro Parque &lt;/strong&gt; &lt;br /&gt; Our top tip is to visit the famous &lt;em&gt;Loro Parque&lt;/em&gt; or 'Loro Park. It is a 13.5-hectare zoo on the outskirts of Puerto de la Cruz in Tenerife, Spain where it houses an extensive and diverse reserve of animal and plant species. 
                        &lt;br /&gt;
                        &lt;br /&gt;
                    &lt;/li&gt;
                    &lt;li&gt;
                        &lt;strong&gt;&lt;span style="color: rgb(46,125,50);"&gt;Whale and Dolphin Watching Tour&amp;nbsp;&lt;br /&gt;&lt;/span&gt;&lt;/strong&gt; Another great option is to take boat excursion with almost guaranteed sightings of whales and dolphins. This is a day-long trip that includes lunch, island visits, fishing, and amazing views of ocean sceneries.
                        &lt;br /&gt;
                        &lt;br /&gt;
                    &lt;/li&gt;
                    &lt;li&gt;
                        &lt;strong&gt;&lt;span style="color: rgb(96,173,94);"&gt;Teide National Park Stargazing&lt;/span&gt;&lt;/strong&gt;&lt;br /&gt;Last, but not least you can take a stargazing trip to Teide National Park, the 3rd best place in the world to view stars and described by NASA as a window to the universe.
                        &lt;br /&gt;
                    &lt;/li&gt;
                &lt;/ul&gt;
        </textarea>

    <script>
        $(document).ready(function () {
            // create Editor from textarea HTML element with default set of tools
            $("#editor").kendoEditor({
              tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "createLink",
                "unlink",
                "insertImage",
                "createTable",
                "addColumnLeft",
                "addColumnRight",
                "addRowAbove",
                "addRowBelow",
                "deleteRow",
                "deleteColumn",
                "foreColor",
                "backColor"
              ],
              resizable: {
                content: true,
                toolbar: true
              }
            });
        });
    </script>
```

## 1. Create a textarea Element

First, create a `<textarea>` or other `HTML` element that holds the text content you want the Editor to display. It will serve as the main container of the Editor component.

```html
<textarea id="editor" rows="10" cols="30" aria-label="editor">
  ...
</textarea>
```

## 2. Initialize the Editor 

In this step, you will initialize the Editor from the `<textarea>` element. 

```html
<textarea id="editor" rows="10" cols="30"></textarea>

<script>
    // Target the textarea element by using jQuery and then call the kendoEditor() method.
    $("#editor").kendoEditor();
</script>
```

## 3. Apply Basic Configurations

The Editor provides several options that enable you to modify its behavior. The following example demonstrates how to apply a handle to allow users to resize the Editor by using the [`resizable`](/api/javascript/ui/editor/configuration/resizable.toolbar) property and add a collection of [`tools`](/api/javascript/ui/editor/configuration/tools) that are used to interact with the Editor.

```html
<textarea id="editor" rows="10" cols="30"></textarea>

<script>
    // Target the textarea element by using jQuery and then call the kendoEditor() method.
    $("#editor").kendoEditor({
      // Add some basic configurations such as resizable and tools.
      resizable: {
        content: true,
        toolbar: true
      },
      tools: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
        "createLink",
        "unlink",
        "insertImage",
        "createTable",
        "addColumnLeft",
        "addColumnRight",
        "addRowAbove",
        "addRowBelow",
        "deleteRow",
        "deleteColumn",
        "foreColor",
        "backColor"
      ],
    });
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the jQuery Editor](https://demos.telerik.com/kendo-ui/editor/index)

## See Also 

* [JavaScript API Reference of the jQuery Editor](/api/javascript/ui/editor)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
