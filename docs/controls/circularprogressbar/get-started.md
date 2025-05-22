---
title: Getting Started
page_title: jQuery CircularProgressBar Documentation - Getting Started with the CircularProgressBar
description: "Get started with the jQuery CircularProgressBar by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_circularprogressbar_widget
position: 2
---

# Getting Started with the CircularProgressBar

This guide demonstrates how to get up and running with the Kendo UI for jQuery CircularProgressBar.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
<div id="circularprogressbar"></div>

<script>
    $("#circularprogressbar").kendoCircularProgressBar({
    value: 10, // Change the value to see the difference between the colors.
    colors: [{
        to: 25,
        color: '#C0392B'
    }, {
        from: 25,
        to: 50,
        color: '#D35400'
    }, {
        from: 50,
        to: 75,
        color: '#D4AC0D'
    }, {
        from: 75,
        to: 99,
        color: '#58D68D'
    }, {
        from: 99,
        color: '#229954'
    }],
    centerTemplate: '<span style="color: #: color #;">#= value == 100 ? "<span class=\'k-icon k-i-check\'></span>" : value + "%" #</span>'
    });

    let interval = setInterval(function () {
    let pb = $("#circularprogressbar").data("kendoCircularProgressBar");
    let value = pb.value();
    if (value >= 100) {
        clearInterval(interval);
        return;
    }
    pb.value(value + 1);
    }, 50);
</script>
```

## 1. Create a Div Element

First, create an empty `<div>` element on the page and use it as an initialization element for the CircularProgressBar.

```html
    <div id="circularprogressbar"></div>
```

## 2. Initialize the CircularProgressBar

In this step, you will initialize the CircularProgressBar from the `<div>` element. When you initialize the component, all settings of the CircularProgressBar will be provided in the script statement. You have to describe its configuration and event handlers in JavaScript.

```html
    <div id="circularprogressbar"></div>

    <script>
        // Target the div element by using jQuery and then call the kendoCircularProgressBar() method.
        $("#circularprogressbar").kendoCircularProgressBar();
    </script>
```

## 3. Set the Value

After the initialization, you can set the value of the component by using the [`value`](/api/javascript/ui/circularprogressbar/configuration/value) option.
 
```html
    <div id="circularprogressbar"></div>

<script>
    $("#circularprogressbar").kendoCircularProgressBar({
        value: 10
    })
</script>
```

## 4. Set the Colors Option

Using the [`colors`](/api/javascript/ui/circularprogressbar/configuration/colors) option, you can change the color of the CircularProgressBar line based on the current value.

```html
    <div id="circularprogressbar"></div>

<script>
    $("#circularprogressbar").kendoCircularProgressBar({
        value: 10, // Change the value to see the difference between the colors.
        colors: [{
            to: 25,
            color: '#C0392B'
        }, {
            from: 25,
            to: 50,
            color: '#D35400'
        }, {
            from: 50,
            to: 75,
            color: '#D4AC0D'
        }, {
            from: 75,
            to: 99,
            color: '#58D68D'
        }, {
            from: 99,
            color: '#229954'
        }]
    });
</script>
```

## 5. Set a Center Template

You can specify how the center of the CircularProgressBar will appear using a template.

```html
<div id="circularprogressbar"></div>

<script>
    $("#circularprogressbar").kendoCircularProgressBar({
    value: 10, // Change the value to see the difference between the colors.
    colors: [{
        to: 25,
        color: '#C0392B'
    }, {
        from: 25,
        to: 50,
        color: '#D35400'
    }, {
        from: 50,
        to: 75,
        color: '#D4AC0D'
    }, {
        from: 75,
        to: 99,
        color: '#58D68D'
    }, {
        from: 99,
        color: '#229954'
    }],
    centerTemplate: '<span style="color: #: color #;">#= value == 100 ? "<span class=\'k-icon k-i-check\'></span>" : value + "%" #</span>'
    });

    let interval = setInterval(function () {
    let pb = $("#circularprogressbar").data("kendoCircularProgressBar");
    let value = pb.value();
    if (value >= 100) {
        clearInterval(interval);
        return;
    }
    pb.value(value + 1);
    }, 50);
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Colors of the CircularProgressBar]({% slug colors_kendoui_circularprogressbar_widget %})

## See Also
 
* [Indeterminate CircularProgressBar (Demo)](https://demos.telerik.com/kendo-ui/circularprogressbar/indeterminate)
* [JavaScript API Reference of the CircularProgressBar](/api/javascript/ui/circularprogressbar)
* [Knowledge Base Section](/knowledge-base)


