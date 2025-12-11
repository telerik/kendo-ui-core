---
title: Getting Started
page_title: jQuery ScrollView Documentation - Getting Started with the ScrollView
description: "Get started with the jQuery ScrollView by Kendo UI and learn how to create, initialize, and enable the component."
components: ["scrollview"]
slug: getting_started_kendoui_scrollview_widget
position: 2
---

# Getting Started with the ScrollView

This guide demonstrates how to get up and running with the Kendo UI for jQuery ScrollView.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
   <div style="width:900px;">
      <div id="scrollView" style="height:400px;">
        <div class="white" data-role="page">
          <h1>A White page</h1>
        </div>
        <div class="green" data-role="page">
          <h1>A Green page</h1>
        </div>
        <div class="red" data-role="page">
          <h1>A Red page</h1>
        </div>
      </div>
    </div>
    <script>
      $("#scrollView").kendoScrollView({
        contentHeight: "100%"
      });
    </script>
    <style>
      .green, .red, .white {
        text-align: center;
      }

      .green {
        background-color: forestgreen;
      }

      .red {
        background-color:crimson;
      }

      h1 {
        margin-top: 20%;
      }
    </style>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the ScrollView component.

```html
   <div id="scrollview"></div>
```

## 2. Initialize the ScrollView

In this step, you will initialize the ScrollView from the `<div>` element. All settings of the ScrollView will be provided in the script statement and you have to describe its configuration in JavaScript.

```html
   <div id="scrollview"></div>

   <script>
       $("#scrollview").kendoScrollView(); 
    </script>
```

## 3. Add ScrollView Pages

To add pages in the ScrollView, you need to nest a `<div data-role="page"></div>` for each page and place any template inside the `<div>`.

```html
   <div style="width:900px;">
      <div id="scrollView" style="height:400px;">
        <div class="white" data-role="page">
          <h1>A White page</h1>
        </div>
        <div class="green" data-role="page">
          <h1>A Green page</h1>
        </div>
        <div class="red" data-role="page">
          <h1>A Red page</h1>
        </div>
      </div>
   </div>
   <script>
      $("#scrollView").kendoScrollView({
        contentHeight: "100%"
      });
   </script>
```


## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the ScrollView](https://demos.telerik.com/kendo-ui/scrollview/index)

## See Also

* [JavaScript API Reference of the jQuery ScrollView](/api/javascript/ui/scrollview)
* [Knowledge Base Section](/knowledge-base)


