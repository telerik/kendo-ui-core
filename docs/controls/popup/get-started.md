---
title: Getting Started
page_title: jQuery Popup Documentation - Getting Started with the Popup
description: "Get started with the jQuery Popup by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_popup_component
position: 1
---

# Getting Started with the Popup

This guide demonstrates how to get up and running with the Kendo UI for jQuery Popup.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="datepicker" data-role="datepicker" />

    <div id="popup" style="width: 100px; padding: 10px;">This is a Kendo Popup for your DatePicker</div>

    <script>
        $("#datepicker").kendoDatePicker();
        $("#popup").kendoPopup({
            anchor: $("#datepicker"),
        }).data("kendoPopup").open();
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element which will serve to initialize the Popup. The content of the `div` will also serve as content for the Popup.

```html
<div id="popup" style="width: 100px; padding: 10px;">This is a Kendo Popup for your DatePicker</div>
```

## 2. Add an Anchor Component

You will also need an element that will serve as an anchor for the Popup. For the purposes of this guide, you will define a Kendo DatePicker.

```html
<input id="datepicker" data-role="datepicker" />

<div id="popup" style="width: 100px; padding: 10px;">This is a Kendo Popup for your DatePicker</div>

<script>
    $("#datepicker").kendoDatePicker();
</script>
```

## 3. Initialize the Popup

In this step, you will initialize the Popup from the `<div>` element. All settings of the Popup will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript. You need to specify the [`anchor`](/api/javascript/ui/popup/configuration/anchor) option so that the Popup appears next to it.

```html
<input id="datepicker" data-role="datepicker" />

<div id="popup" style="width: 100px; padding: 10px;">This is a Kendo Popup for your DatePicker</div>

<script>
    $("#datepicker").kendoDatePicker();

    $("#popup").kendoPopup({
        anchor: $("#datepicker"),
    }).data("kendoPopup").open();
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})

## See Also

* [JavaScript API Reference of the jQuery Popup](/api/javascript/ui/popup)
* [Knowledge Base Section](/knowledge-base)


