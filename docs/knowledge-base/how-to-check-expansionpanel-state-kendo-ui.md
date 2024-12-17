---
title: Checking If a Kendo UI ExpansionPanel Is Open
description: Learn how to determine the expanded state of a Kendo UI ExpansionPanel for jQuery.
type: how-to
page_title: How to Check the Expansion State of a Kendo UI ExpansionPanel
slug: how-to-check-expansionpanel-state-kendo-ui
tags: kendo-ui, expansionpanel, jquery, state, expanded, collapsed
res_type: kb
ticketid: 1671321
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI ExpansionPanel for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

I need to check if an ExpansionPanel is expanded or collapsed within my application. How can I achieve this?

This knowledge base article also answers the following questions:
- How to determine if a Kendo UI ExpansionPanel is open?
- How to programmatically check the state of a Kendo UI ExpansionPanel?

## Solution

To check the expanded or collapsed state of a Kendo UI ExpansionPanel, you can use custom logic. This approach involves checking for a specific class that indicates the panel's state. Although the Kendo UI ExpansionPanel does not provide a direct method to get its expanded state, the following steps allow you to determine it:

- Use jQuery to check if the panel has the class `.k-expanded`. This class is present when the panel is in its expanded state. 

Here is an example of how you can implement this logic:

```dojo
<button onclick="expandedState()">Get expanded state</button>
    </br>
    </br>  
    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </div>
    <script>
      $("#expansionPanel").kendoExpansionPanel({
        subTitle: "Lorem ipsum"
      });

      function expandedState() {
        let expanded;
        if ($(".k-expander").hasClass("k-expanded")) {
          expanded = true;
        } else expanded = false;
        console.log("Exanded:", expanded)
      }
    </script>
```

To programmatically toggle the state of the ExpansionPanel, use the `toggle()` method. For more information, refer to the [toggle() method documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/expansionpanel/methods/toggle).

## See Also

- [Kendo UI ExpansionPanel Toggle Method Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/expansionpanel/methods/toggle)
- [Kendo UI ExpansionPanel Overview](https://docs.telerik.com/kendo-ui/controls/navigation/expansionpanel/overview)
