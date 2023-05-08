---
title: Getting Started
page_title: jQuery PanelBar Documentation - Getting Started with the PanelBar
description: "Get started with the jQuery PanelBar by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_panelbar_component
position: 1
---

# Getting Started with the PanelBar

This guide demonstrates how to get up and running with the Kendo UI for jQuery PanelBar.

After the completion of this guide, you will achieve the following end result:

```dojo
    <ul id="panelbar">
      <li>Item 1
        <ul>
          <li>Sub Item 1</li>
          <li>Sub Item 2</li>
          <li>Sub Item 3</li>
        </ul>
      </li>
      <li>Item 2
        <ul>
          <li>Sub Item 1</li>
          <li>Sub Item 2</li>
          <li>Sub Item 3</li>
        </ul>
      </li>
    </ul>
    <script>
      $(() => {
        $("#panelbar").kendoPanelBar({
          expandMode: "single",
          animation: {
            // Fade-out closing items over 1000 milliseconds.
            collapse: {
              duration: 500,
              effects: "fadeOut"
            },
            // Fade-in and expand opening items over 500 milliseconds.
            expand: {
              duration: 500,
              effects: "expandVertical fadeIn"
            }
          }
        });
      });
    </script>
```

## 1. Create an HTML List

First, create a `<ul>` element and fill it with `li` children.

```html
    <ul id="panelbar">
      <li>Item 1
        <ul>
          <li>Sub Item 1</li>
          <li>Sub Item 2</li>
          <li>Sub Item 3</li>
        </ul>
      </li>
      <li>Item 2
        <ul>
          <li>Sub Item 1</li>
          <li>Sub Item 2</li>
          <li>Sub Item 3</li>
        </ul>
      </li>
    </ul>
```

## 2. Initialize the PanelBar

In this step, you'll initialize the PanelBar component from the `<ul>` element that you created earlier. Note that as the PanelBar has to be initialized after the DOM is loaded, you must create the component within a `$(document).ready()` statement.

```javascript
    $(() => {
        $("#panelbar").kendoPanelBar({
        });
    });
```

## 3. Set the Expand Mode

The [`expandMode`](/api/javascript/ui/panelbar/configuration/expandmode) configuration enables you to specify if the user can expand multiple items at once or not.

```javascript
      $("#panelbar").kendoPanelBar({
        expandMode: "single"
      });
```

## 4. Configure the Animations

You can now configure the expand and collapse [animations](/api/javascript/ui/panelbar/configuration/animation) of the PanelBar component.

```javascript
      $("#panelbar").kendoPanelBar({
        animation: {
          collapse: {
            duration: 500,
            effects: "fadeOut"
          },
          expand: {
            duration: 500,
            effects: "expandVertical fadeIn"
          }
        }
      });
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery PanelBar](https://demos.telerik.com/kendo-ui/panelbar/index)

## See Also

* [JavaScript API Reference of the jQuery PanelBar](/api/javascript/ui/panelbar)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
