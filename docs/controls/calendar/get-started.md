---
title: Getting Started
page_title: jQuery Calendar Documentation - Getting Started with the Calendar
description: "Get started with the jQuery Calendar by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_calendar_component
position: 1
---

# Getting Started with the Calendar

This guide demonstrates how to get up and running with the Kendo UI for jQuery Calendar.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="calendar"></div>

    <script>
      $("#calendar").kendoCalendar({
        selectable: true,
        weekNumber: true,
        month: {
          content: ({ value }) => {
            if(value > 20) {
              return `<div class='k-bg-primary k-rounded-md k-text-white'>${value}</div>`;
            }
            return value;
          }
        }
      });
    </script>
```

## 1. Create an Empty Div Element

First, create an empty `div` element from which the component will be initialized.

```html
    <div id="calendar"></div>
```

## 2. Initialize the Calendar

In this step, you'll initialize the Calendar component from the empty `<div>` element.

```html
    <div id="calendar"></div>
    <script>
      $("#calendar").kendoCalendar();
    </script>
```

## 3. Enable Selection

You can enable the selection functionality by setting the [`selectable`](/api/javascript/ui/calendar/configuration/selectable) property of the Calendar to `true`.

```html
    <div id="calendar"></div>
    <script>
      $("#calendar").kendoCalendar({
        selectable: true
      });
    </script>
```

## 4. Enable Week Numbers

You can enable the week column by setting the [`weekNumber`](/api/javascript/ui/calendar/configuration/weeknumber) property of the Calendar to `true`.

```html
    <div id="calendar"></div>
    <script>
      $("#calendar").kendoCalendar({
        selectable: true,
        weekNumber: true
      });
    </script>
```

## 5. Configure the Month Template

You can change the appearance of the dates by using the [`month`](/api/javascript/ui/calendar/configuration/month) configuration.

```html
    <div id="calendar"></div>
    <script>
      $("#calendar").kendoCalendar({
        selectable: true,
        weekNumber: true,
        month: {
          content: ({ value }) => {
            if(value > 20) {
              return `<div class='k-bg-primary k-rounded-md k-text-white'>${value}</div>`;
            }
            return value;
          }
        }
      });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Calendar](https://demos.telerik.com/kendo-ui/calendar/index)

## See Also

* [JavaScript API Reference of the jQuery Calendar](/api/javascript/ui/calendar)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
