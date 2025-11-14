---
title: Stopping Event Propagation from Custom Buttons in PanelBar Header with contentUrl
description: Learn how to prevent event propagation from custom buttons in a PanelBar header when using contentUrl in Kendo UI for jQuery.
type: how-to
page_title: Prevent Navigation from Buttons in PanelBar Header with contentUrl
meta_title: Prevent Navigation from Buttons in PanelBar Header with contentUrl
slug: stop-event-propagation-buttons-panelbar-header-contenturl
tags: panelbar,kendo-ui-for-jquery,contenturl,event-propagation,custom-buttons
res_type: kb
ticketid: 1703405
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery PanelBar</td>
</tr>
<tr>
<td>Version</td>
<td>2025.4.1111</td>
</tr>
</tbody>
</table>

## Description

I need to prevent event propagation for custom `<button>` elements inside the header template of a [Kendo UI for jQuery PanelBar](https://docs.telerik.com/kendo-ui/controls/navigation/panelbar/overview) when using the `contentUrl` option. My current setup causes the parent `<a>` tag to trigger a navigation to the specified `contentUrl` whenever a user interacts with the buttons, either via a click or keyboard action such as pressing "Enter." This behavior disrupts the intended functionality of the buttons, which should execute custom JavaScript actions without triggering navigation.

This knowledge base article also answers the following questions:
- How can I prevent `<a>` tag navigation in PanelBar headers when using `contentUrl`?
- How do I stop button click events from propagating in Kendo PanelBar?
- What is the correct way to use interactive elements inside PanelBar headers with `contentUrl`?

## Solution

To achieve the desired behavior and ensure accessibility-friendly functionality, attach event handlers to the custom `<button>` elements. Use jQuery to handle both `click` and `keydown` events, and in each handler, call `event.stopPropagation()` and `event.preventDefault()` to block the navigation behavior of the parent `<a>` tag.

### Steps to Implement

1. Use event delegation to attach handlers after the content is loaded.
2. Handle `click` and `keydown` events for your custom buttons.
3. In each handler, call both `event.stopPropagation()` and `event.preventDefault()`.

### Example

```javascript
// Attach event handlers using jQuery
$(document).on('click', '.panelbar-custom-button', function(e) {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault(); // Prevent default navigation behavior
    // Your custom logic 
});

$(document).on('keydown', '.panelbar-custom-button', function(e) {
    if (e.key === "Enter" || e.key === " ") {
        e.stopPropagation(); // Prevent event bubbling
        e.preventDefault(); // Prevent default navigation behavior
        // Your custom logic 
    }
});
```

### Template Example

```html
<script type="text/x-kendo-template">
    <div>
        <button class="panelbar-custom-button">Custom Button</button>
        <button class="panelbar-custom-button">Remove</button>
    </div>
</script>
```

Below is a runnable example:

```dojo

    <div id="example">
      <div class="wrapper">
        <ul id="panelbar">
          <li>
            BODY
            <div></div>
          </li>
          <li>
            ENGINE
            <div></div>
          </li>
          <li>
            TRANSMISSION
            <div></div>
          </li>
          <li>
            PERFORMANCE
            <div></div>
          </li>
        </ul>
      </div>
    </div>

    <base href="https://demos.telerik.com/kendo-ui/panelbar/ajax" />
    <script>
      $(document).ready(function () {
        $("#panelbar").kendoPanelBar({
          dataSource: [
            {
              text: "Item 1",
              count: 5,
              contentUrl: "../content/web/panelbar/ajax/ajaxContent1.html",
            },
            {
              text: "Item 2",
              count: 3,
              contentUrl: "../content/web/panelbar/ajax/ajaxContent2.html",
            },
            {
              text: "Item 3",
              count: 8,
              contentUrl: "../content/web/panelbar/ajax/ajaxContent3.html",
            },
            {
              text: "Item 4",
              count: 2,
              contentUrl: "../content/web/panelbar/ajax/ajaxContent4.html",
            },
          ],
          template: (data) => `
        <div class="custom-header">
           <button class='panelbar-custom-button'>Custom Button</button><button class='panelbar-custom-button'>Remove</button>
        </div>
    `,
          loadOnDemand: true,
        });

        $(document).on("click", ".panelbar-custom-button", function (e) {
          e.stopPropagation();
          e.preventDefault();
          console.log("Button clicked");
        });

        $(document).on("keydown", ".panelbar-custom-button", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            e.preventDefault();
            console.log("Keydown");
          }
        });
      });
    </script>

    <style>
      .wrapper {
        height: auto;
        min-height: 400px;
        margin: 20px auto;
        padding: 20px 0 0;
        background: url("../content/web/panelbar/astonmartin.png") no-repeat
          center 50px transparent;
      }

      #panelbar {
        width: 250px;
        margin-left: auto;
        margin-right: 0;
      }

      #panelbar p {
        padding: 1em;
        margin-top: 0px;
        margin-bottom: 0px;
      }
    </style>
```

This implementation ensures that clicking or pressing "Enter" on the buttons only triggers the custom JavaScript logic and does not cause the parent `<a>` tag to navigate to the `contentUrl`.

## See Also

- [Kendo UI PanelBar Overview](https://docs.telerik.com/kendo-ui/controls/navigation/panelbar/overview)
- [Kendo UI PanelBar API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
