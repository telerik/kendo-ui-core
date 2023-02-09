---
title: Skip disabled Step in the Wizard 
description: Configure the click event of the 'Next Step' button to pass over the following Step of the Wizard that is disabled.  
type: how-to
page_title: Ignore disabled Step in the Wizard
slug: how-to-skip-disabled-steps-in-the-wizard
tags: skip, disabled, step, wizard, kendo, jquery
ticketid: 1479647
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Wizard for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2020.2.617</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description
In the Wizard I have attached a handler to the `select` event and it triggers just fine unless the next Step is disabled. The way I read the event description is that the `select` event should be triggered regardless, and that you can use the event to stop the select.

## Solution
The Wizard is designed to enable disabled steps on valid user input. Therefore its default behavior is the `select` event to be prevented when the following Step is disabled. To skip the disabled Step:

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


## See Also
* [JavaScript API Reference of the Wizard](/api/javascript/ui/wizard)
* [JavaScript API Reference of the Wizard's enableStep method](/api/javascript/ui/wizard/methods/enablestep)
* [JavaScript API Reference of the Wizard's activeStep method](/api/javascript/ui/wizard/methods/activestep)
* [JavaScript API Reference of the Wizard's select Method](/api/javascript/ui/wizard/methods/select)
