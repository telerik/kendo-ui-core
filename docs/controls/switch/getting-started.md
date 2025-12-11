---
title: Getting Started
page_title: jQuery Switch Documentation - Getting Started with the Switch
description: "Get started with the jQuery Switch by Kendo UI and learn how to create, initialize, and enable the component."
components: ["switch"]
slug: getting_started_kendoui_switch_widget
position: 2
---

# Getting Started with the Switch

This guide demonstrates how to get up and running with the Kendo UI for jQuery Switch.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="switch" />

    <script>

      // Target the input element by using jQuery and then call the kendoSwitch() method.
      $("#switch").kendoSwitch({ 
        messages: {
            checked: "YES",
            unchecked: "NO"
        },
        size:"large",
        thumbRounded:"large",
        trackRounded:"large"
      });
    </script>
```

## 1. Create an Empty input Element

First, create an `<input/>` element on the page that will serve as the initialization element of the Switch component.

```html
<input id='switch'/>
```

## 2. Initialize the Switch

In this step, you will initialize the Switch from the `<input>` element. All settings of the Switch will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<input id="switch"/>

<script>
    // Target the input element by using jQuery and then call the kendoSwitch() method.
    $("#switch").kendoSwitch();
</script>
```

## 3. Define the Switch Appearance

Once the basic initialization is completed, you can start adding additional configurations to the Switch. The component allows you to specify various styling options.

```html
<input id="switch"/>

<script>

  // Target the input element by using jQuery and then call the kendoSwitch() method.
  $("#switch").kendoSwitch({
        size:"large",
        thumbRounded:"large",
        trackRounded:"large"
  });
</script>
```

## 4. Configure the Switch Labels 

The Switch allows you to configure the text of the checked/unchecked states through its [messages option](/api/javascript/ui/switch/configuration/messages).

```html
<input id="switch"/>

<script>

  // Target the input element by using jQuery and then call the kendoSwitch() method.
  $("#switch").kendoSwitch({
        messages:{
            checked: "YES",
            unchecked: "NO"
        },
        size:"large",
        thumbRounded:"large",
        trackRounded:"large"
  });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Switch](https://demos.telerik.com/kendo-ui/switch/index)

## See Also

* [JavaScript API Reference of the Switch](/api/javascript/ui/switch)
* [Knowledge Base Section](/knowledge-base)


