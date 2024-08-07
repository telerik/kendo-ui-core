---
title: Keeping Step Numbers Visible in Completed Steps for Kendo UI Wizard
description: Learn how to maintain the visibility of step numbers on the Kendo UI Wizard component for completed steps, using custom logic.
type: how-to
page_title: How to Keep Step Numbers Visible on Completed Steps in Kendo UI Wizard
slug: keep-step-numbers-visible-kendo-ui-wizard
tags: kendo-ui, wizard, stepper, activate-event, custom-logic
res_type: kb
ticketid: 1647918
---

## Environment

| Product | Kendo UI for jQuery Wizard / 2024.1.130 | 
| --- | --- |

## Description

I want to keep the numbers on the Wizard Stepper visible for completed steps instead of changing them to check marks. 

This KB article also answers the following questions:
- How can I display step numbers for completed steps in the Kendo UI Wizard?
- Is it possible to prevent the Wizard Stepper from showing check marks for completed steps?
- What method can I use to show numerical indicators for finished steps in the Wizard component?

## Solution

To keep the step numbers visible for completed steps in the [Kendo UI Wizard](https://docs.telerik.com/kendo-ui/api/javascript/ui/wizard/events/activate), utilize custom logic inside the `activate` event handler. The following example demonstrates how to replace the check marks with the corresponding step numbers:

```javascript
activate: function(e) {
    $("span.k-svg-i-check").each(function(idx, el) {
        var step = idx + 1;
        $(el).replaceWith("<span class='k-step-indicator-text'>" + step + "</span>" );
    })
},
```

This solution iterates through each element marked with a checkmark and replaces it with a span element that displays the step number. 

```dojo
    <div id="wizard"></div>
    <script>
      $("#wizard").kendoWizard({
        steps: [
          {
            title: "Initial step"
          },{
            title: "Second step"
          },
          {
            title: "Third step"
          }
        ],
        activate: function(e) {
          $("span.k-svg-i-check").each(function(idx, el) {
            var step = idx+1;
            $(el).replaceWith("<span class='k-step-indicator-text'>"+ step + "</span>" );
          })
        }
      });
    </script>
```

## See Also

- [Wizard Activate Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/wizard/events/activate)
- [Wizard Overview (Demo)](https://demos.telerik.com/kendo-ui/wizard/index)

---
