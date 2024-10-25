---
title: Getting Started
page_title: jQuery MultiViewCalendar Documentation - Getting Started with the MultiViewCalendar
description: "Get started with the jQuery MultiViewCalendar by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_multiviewcalendar_component
position: 1
---

# Getting Started with the MultiViewCalendar

This guide demonstrates how to get up and running with the Kendo UI for jQuery MultiViewCalendar.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="multiviewcalendar"></div>
    <script id="footer-template" type="text/x-kendo-template">
        Today - #: kendo.toString(data, "d") #
    </script>
    <script>
      $("#multiviewcalendar").kendoMultiViewCalendar({
        format: "yyyy/MM/dd",
        value: new Date(2023, 09, 12),
        footer: kendo.template($("#footer-template").html())
      });
    </script>
```

## 1. Create an Empty Div Element

First, create an empty `div` element from which the MultiViewCalendar will be initialized. The element will also serve as a main container for the component.

```html
    <div id="multiviewcalendar"></div>
```

## 2. Initialize the MultiViewCalendar

In this step, you'll initialize the MultiViewCalendar component from the empty `<div>` element.

```html
  <div id="multiviewcalendar"></div>
  <script>
    $("#multiviewcalendar").kendoMultiViewCalendar();
  </script>
```

## 3. Set the Date Format

The [`format`](/api/javascript/ui/multiviewcalendar/configuration/format) option allows you to specify the format of the date when using the [`value`](/api/javascript/ui/multiviewcalendar/methods/value) method.

```html
  <div id="multiviewcalendar"></div>
  <script>
      $("#multiviewcalendar").kendoMultiViewCalendar({
        format: "yyyy/MM/dd"
      });
  </script>
```

## 4. Set the Selected Date

You can preselect a date by using the [`value`](/api/javascript/ui/multiviewcalendar/configuration/value) option.

```html
  <div id="multiviewcalendar"></div>
  <script>
      $("#multiviewcalendar").kendoMultiViewCalendar({
        format: "yyyy/MM/dd",
        value: new Date(2023, 09, 12)
      }); 
  </script>
```

## 5. Configure a Footer Template

You can set a footer for the MultiViewCalendar by using the [`footer`](/api/javascript/ui/multiviewcalendar/configuration/footer) option.

```html
    <div id="multiviewcalendar"></div>
    <script>
      $("#multiviewcalendar").kendoMultiViewCalendar({
        format: "yyyy/MM/dd",
        value: new Date(2023, 09, 12),
        footer: kendo.template($("#footer-template").html())
      });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery MultiViewCalendar](https://demos.telerik.com/kendo-ui/multiviewcalendar/index)

## See Also

* [JavaScript API Reference of the jQuery MultiViewCalendar](/api/javascript/ui/multiviewcalendar)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
