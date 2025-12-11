---
title: Getting Started
page_title: jQuery ProgressBar Documentation - Getting Started with the ProgressBar
description: "Get started with the jQuery ProgressBar by Kendo UI and learn how to create, initialize, and enable the component."
components: ["progressbar"]
slug: getting_started_kendoui_progressbar_widget
position: 1
---

# Getting Started with the ProgressBar

This guide demonstrates how to get up and running with the Kendo UI for jQuery ProgressBar.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
	<div id="progressbar"></div>

    <script>
      $("#progressbar").kendoProgressBar({
        min: 100,
        max: 500,
        value: 150,
        type: "percent",  
        change: onChange,
        complete: onComplete
      });
      
      function onChange(e) {
           console.log("Change event :: value is " + e.value);
      }

      function onComplete(e) {
           console.log("Complete event :: value is " + e.value);
      }
     
      function progress() {
            var pb = $("#progressbar").data("kendoProgressBar");
            pb.value(100);

            var interval = setInterval(function () {
                if (pb.value() < 500) {
                    pb.value(pb.value() + 50);
                } else {
                    clearInterval(interval);
                }
            }, 100);
      }

      setTimeout(function(){
        progress()
      },1000)

    </script>
```

## 1. Create a Div Element

First, create an empty `<div>` element on the page and use it as an initialization element for the ProgressBar.

```html
    <div id="progressbar"></div>
```

## 2. Initialize the ProgressBar

In this step, you will initialize the ProgressBar from the `<div>` element. When you initialize the component, all settings of the ProgressBar will be provided in the script statement. You have to describe its configuration and event handlers in JavaScript.

```html
    <div id="progressbar"></div>

    <script>
        // Target the div element by using jQuery and then call the kendoProgressBar() method.
        $("#progressbar").kendoProgressBar();
    </script>
```

## 3. Configure the Min and Max Values

After the initialization, you can configure additional options for the ProgressBar, such as the [`min`](/api/javascript/ui/progressbar/configuration/min) and the [`max`](/api/javascript/ui/progressbar/configuration/max) values.
 
```html
    <div id="progressbar"></div>

    <script> 
        $("#progressbar").kendoProgressBar({
            min: 100,
            max: 500
        });
    </script>
```

## 4. Set the ProgressBar Value

You can utilize the [`value`](/api/javascript/ui/progressbar/configuration/value) option if you wish to set the ProgressBar indicator to a given value.

```html
    <div id="progressbar"></div>

    <script> 
        $("#progressbar").kendoProgressBar({
            min: 100,
            max: 500,
            value: 150
        });
    </script>
```

## 5. Set the Type

You can specify different ProgressBar [`types`] which affect how the value is visualized.

```html
    <div id="progressbar"></div>

    <script>
      $("#progressbar").kendoProgressBar({
            min: 100,
            max: 500,
            value: 150,
            type: "percent",  
      });
    </script>
```

## 6. Bind to the ProgressBar Events

The ProgressBar supports the [`change`](/api/javascript/ui/progressbar/events/change) and [`complete`](/api/javascript/ui/progressbar/events/complete) events. The `change` event fires each time a new value is set. The `complete` fires when the progress of the task is completed, that is, each time the ProgressBar reaches its maximum value.
 
```html
    <div id="progressbar"></div>

    <script>
      $("#progressbar").kendoProgressBar({
        min: 100,
        max: 500,
        value: 150,
        type: "percent",  
        change: onChange,
        complete: onComplete
      });
      
      function onChange(e) {
           console.log("Change event :: value is " + e.value);
      }

      function onComplete(e) {
           console.log("Complete event :: value is " + e.value);
      }
     
      function progress() {
            var pb = $("#progressbar").data("kendoProgressBar");
            pb.value(100);

            var interval = setInterval(function () {
                if (pb.value() < 500) {
                    pb.value(pb.value() + 50);
                } else {
                    clearInterval(interval);
                }
            }, 100);
      }

      setTimeout(function(){
        progress()
      },1000)

    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Appearance of the ProgressBar]({% slug appearance_kendoui_progressbar %})

## See Also

* [Event Documentation of the ProgressBar](/api/javascript/ui/progressbar#events)
* [JavaScript API Reference of the ProgressBar](/api/javascript/ui/progressbar)
* [Knowledge Base Section](/knowledge-base)


