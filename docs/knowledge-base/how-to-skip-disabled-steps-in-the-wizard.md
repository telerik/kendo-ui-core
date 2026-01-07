---
title: Skip disabled Step in the Wizard 
description: Configure the click event of the 'Next Step' button to pass over the following Step of the Wizard that is disabled.  
type: how-to
page_title: Ignore disabled Step in the Wizard
slug: how-to-skip-disabled-steps-in-the-wizard
tags: skip, disabled, step, wizard, kendo, jquery
ticketid: 1479647
res_type: kb
components: ["wizard"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Wizard for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2025.4.1217</td>
 </tr>
</table>

## Description
In the Wizard I have attached a handler to the `select` event and it triggers just fine unless the next Step is disabled. The way I read the event description is that the `select` event should be triggered regardless, and that you can use the event to stop the select.

## Solution
The Wizard is designed to enable disabled steps on valid user input. Therefore its default behavior is the `select` event to be prevented when the following Step is disabled. 

### Approach 1: Handle the Next Button Click Event

To skip the disabled Step:

1. Handle the click event of the 'Next' button.
1. Get the current step with the `activeStep` method 
1. Check which is the next list item step that doesn't have the class "k-step-disabled" and get its index
1. Select the next enabled step by passing the index to the widget's `select` method

```dojo
    <div id="example">
      <div class="demo-section k-content wide" style="width:600px">
        <form id="wizard" style="width:550px; margin: 0 auto;" novalidate></form>
      </div>
    </div>
    <script>
      $('#wizard').kendoWizard({
        pager: true,
        steps: [
          {
            title: "Step 1",
            buttons: ["next"],
            form: {
              orientation: "vertical",
              formData: {
              },
              items: [
                {
                  field: 'Test',
                  label: 'Test:'
                }
              ]
            }
          },
          {
            title: "Step 2",
            buttons: ["next"],
            form: {
              orientation: "vertical",
              formData: {
              },
              items: [
                {
                  field: 'Test',
                  label: 'Test:'
                }
              ]
            }
          },
          {
            title: "Step 3 Disabled",
            enabled: false,
            buttons: ["next"],
            form: {
              orientation: "vertical",
              formData: {
              },
              items: [
                {
                  field: 'Test',
                  label: 'Test:'
                }
              ]
            }
          },
          {
            title: "Step 4",
            buttons: ["next"],
            form: {
              orientation: "vertical",
              formData: {
              },
              items: [
                {
                  field: 'Test',
                  label: 'Test:'
                }
              ]
            }
          }
        ],
        select: function(e) {console.log(e)}
      });

      $(".k-wizard-buttons-right .k-primary").click(function(e) {
        var wizard = $("#wizard").data("kendoWizard");
        var currStep = wizard.activeStep();
        var idx = currStep.options.index;
        var nextValidIdx = wizard.element.find("li:eq(" + idx + ")").nextAll(".k-step:not(.k-step-disabled)").index();
        wizard.select(nextValidIdx);
         });
    </script>
```

### Approach 2: Temporarily Enable Disabled Steps

This approach temporarily enables disabled steps to let the Wizard behave normally. It is more integrated with the Wizard API, easier to hook into Next/Previous events, and better suited for validation-driven flows:

1. Create a control class with static methods for handling Next and Previous navigation
1. In the `next` event handler, check if the next step is disabled
1. Temporarily enable the disabled step, navigate to it, then disable it again
1. Apply the same logic for the `previous` event

```dojo
 <div id="example">
  <div class="demo-section k-content" style="width:600px">
    <form id="wizard" style="width:550px; margin: 0 auto;" novalidate></form>
  </div>
</div>
<script>
  class KendoWizardControl {

    // Skip a single disabled step when clicking Next
    static NextSkipDisabled = (e) => {
      let wizard = e.sender;

      let currStep = wizard.activeStep();
      let idx = currStep.options.index;
      let nextIdx = idx + 1;

      // If next step exists and is disabled
      if (wizard.steps()[nextIdx] &&
          !wizard.steps()[nextIdx].options.enabled) {

        // Validate current step (same behavior as default Next)
        let validator =
          currStep.form?.validator ||
          currStep.element.find("form").data("kendoValidator");

        if (!validator || validator.validate()) {
          wizard.enableStep(nextIdx, true);
          wizard.next();
          wizard.enableStep(nextIdx, false);
        }

        // Stop default handling
        e.preventDefault();
      }
    };

    // Skip a single disabled step when clicking Previous
    static PrevSkipDisabled = (e) => {
      let wizard = e.sender;

      let currStep = wizard.activeStep();
      let idx = currStep.options.index;
      let prevIdx = idx - 1;

      if (wizard.steps()[prevIdx] &&
          !wizard.steps()[prevIdx].options.enabled) {

        wizard.enableStep(prevIdx, true);
        wizard.previous();
        wizard.enableStep(prevIdx, false);

        e.preventDefault();
      }
    };
  }

  $("#wizard").kendoWizard({
    pager: true,
    steps: [
      {
        title: "Step 1",
        buttons: ["next"],
        form: {
          items: [
            { field: "test1", label: "Test 1:" }
          ]
        }
      },
      {
        title: "Step 2",
        buttons: ["previous", "next"],
        form: {
          items: [
            { field: "test2", label: "Test 2:" }
          ]
        }
      },
      {
        title: "Step 3 (Disabled)",
        enabled: false,
        buttons: ["previous", "next"],
        form: {
          items: [
            { field: "test3", label: "Test 3:" }
          ]
        }
      },
      {
        title: "Step 4",
        enabled: false,
        buttons: ["previous", "next"],
        form: {
          items: [
            { field: "test4", label: "Test 4:" }
          ]
        }
      },
      {
        title: "Step 5",
        buttons: ["previous", "done"],
        form: {
          items: [
            { field: "test4", label: "Test 4:" }
          ]
        }
      }
    ],
    next: KendoWizardControl.NextSkipDisabled,
    previous: KendoWizardControl.PrevSkipDisabled
  });
</script>
```

## See Also
- [Kendo UI Wizard Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/wizard/overview)
* [JavaScript API Reference of the Wizard](/api/javascript/ui/wizard)
* [JavaScript API Reference of the Wizard's enableStep method](/api/javascript/ui/wizard/methods/enablestep)
* [JavaScript API Reference of the Wizard's activeStep method](/api/javascript/ui/wizard/methods/activestep)
* [JavaScript API Reference of the Wizard's select Method](/api/javascript/ui/wizard/methods/select)
