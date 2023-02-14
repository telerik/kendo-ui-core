---
title: Dynamically Change the Color of the Stepper Steps
description: An example on how to change the color of the {{ site.product }} Stepper steps at runtime.
type: how-to
page_title: Dynamically Change the Color of the Stepper Steps
slug: stepper-change-color
tags: stepper, step, color, dynamic
ticketid: 1576676
res_type: kb
component: stepper
---

## Environment

<table>
 <tr>
  <td>Product Version</td>
  <td>2022.3.913</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Stepper</td>
 </tr>
</table>

## Description

How can I dynamically change the color of the Stepper steps?

## Solution

This example demonstrates how to validate or save each step and change its color dynamically based on the following requirements:

* If a specified step is validated successfully, its icon is colored in green.
* If the step validation fails, its icon is colored in red.
* If the step is saved, its icon is colored in blue.
* When selecting the next step, the previous step is colored in yellow if it has not been validated or saved.

The scenario relies on the following key steps:

1. Create a "Validate step" button and handle its `click` event. In the `click` event handler:
  * Get the currently active step by using the [`select()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/stepper/methods/select) method of the Stepper.
  * Validate the step's content and store the step-index in a global array `validatedSteps`.
  * If the validation succeeds, add class "correct" to the step HTML element. Otherwise, add class "errors-step".
1. Create a "Save step" button and handle its `click` event. In the `click` event handler:
  * Get the currently active step and store its index in a global array `savedSteps`.
  * Add class "save" to the step HTML element.
1. Create a Stepper and handle its [`Select`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/StepperEventBuilder#selectsystemstring) event. In the event handler:
  * Iterate through the `validatedSteps`/`savedSteps` arrays and persist the added class of each step.
  * Add class "pending" to the steps that are not validated or saved. 
1. Set the respective CSS attributes (`background-color` and `border-color`) to the classes "errors-step", "correct", "pending", and "save".

```HtmlHelper
    @(Html.Kendo().Button()
      .Name("validateStep")
      .Content("Validate step")
      .Events(ev => ev.Click("onValidateStep"))
    )

    @(Html.Kendo().Button()
      .Name("saveStep")
      .Content("Save step")
      .Events(ev => ev.Click("onSaveStep"))
    )

    @(Html.Kendo().Stepper()
      .Name("stepper")
      .Steps(s =>
      {
          s.Add().Label("First step");
          s.Add().Label("Second step");
          s.Add().Label("Third step");
          s.Add().Label("Last step");
      })
      .Events(events => events.Select("onSelect"))
    )
    <br /><br />
    //A Form, which groups are displayed per step
    @(Html.Kendo().Form<FormOrderViewModel>()
    .Name("exampleForm")
    .HtmlAttributes(new { action = "Groups", method = "POST" })
    .Items(items =>
    {
      items.AddGroup() //Visible on Step 1
      .Label("Personal Information")
      .Layout("grid")
      .Items(i =>
      {
          i.Add()
              .Field(f => f.FirstName)
              .Label(l => l.Text("First Name:"));
          i.Add()
              .Field(f => f.LastName)
              .Label(l => l.Text("Last Name:"));
      });
      items.AddGroup() //Visible on Step 2
      .Label("Shipping Country")
      .Layout("grid")
      .Items(i =>
      {
        i.Add()
            .Field(f => f.ShipCountry)
            .Label(l => l.Text("Country:"))
            .Editor(e =>
            {
                e.ComboBox()
                    .DataTextField("Text")
                    .DataValueField("Value")
                    .BindTo(new List<SelectListItem>() {
                        new SelectListItem() {
                            Text = "France", Value = "1"
                        },
                        new SelectListItem() {
                            Text = "Germany", Value = "2"
                        },
                        new SelectListItem() {
                            Text = "Italy", Value = "3"
                        },
                        new SelectListItem() {
                            Text = "Spain", Value = "4"
                        }
                    });
            });
        i.Add()
            .Field(f => f.City)
            .Label(l => l.Text("City:"));
      });
      items.AddGroup() //Visible on Step 3
      .Label("Shipping Address")
      .Layout("grid")
      .Items(i =>
      {
          i.Add()
              .Field(f => f.Address)
              .Label(l => l.Text("Address Line:"));
      });
    })
    )
    <div class="last-step-content">Successfully completed form!</div> //Visible on Step 4
```
```JavaScript
  <script>
      var validatedSteps = [];
      var savedSteps = [];

      $(document).ready(function () {
        $("#exampleForm .k-form-fieldset:nth-child(2)").hide();
        $("#exampleForm .k-form-fieldset:nth-child(3)").hide();
        $(".last-step-content").hide();
        $("#exampleForm .k-form-buttons .k-form-submit").hide();
      });

      function onSaveStep(e) { //"Button "Save step" click event handler
        var stepper = $("#stepper").getKendoStepper();
        var currentActiveStep = stepper.select(); //Get the currently active step
        saveStep(currentActiveStep.options.index, savedSteps, currentActiveStep.element, validatedSteps);
      }

      function saveStep(stepIndex, savedSteps, stepElement, validatedSteps) { //Save the step and apply the respective class
        $(stepElement).removeClass("pending").removeClass("errors-step").removeClass("correct");
        //Store the saved step
        var isAlreadySaved = $.grep(savedSteps, function (e) { return e.index == stepIndex; });
        if (isAlreadySaved.length == 0) {
          savedSteps.push({ index: stepIndex, saved: true });
        }
        //Remove the Saved step from the validated steps
        var isValidated = $.grep(validatedSteps, function (e) { return e.index == stepIndex; });
        if (isValidated.length > 0) {
          for (var i = 0; i < validatedSteps.length; i++) {
            if (validatedSteps[i].index == stepIndex) {
              validatedSteps.splice(i, 1);
              break;
            }
          }
        }
        $(stepElement).addClass("save"); //Add class "save" to apply the blue color
      }

      function onValidateStep() { //"Button "Validate step" click event handler
        var stepper = $("#stepper").getKendoStepper();
        var currentActiveStep = stepper.select(); //Get the currently active step

        if (currentActiveStep.options.index == 0) {
          //Validatiing Step 1
          checkStepValidation(currentActiveStep.options.index, validatedSteps, currentActiveStep.element, $("#FirstName").val() == "");
        } else if (currentActiveStep.options.index == 1) {
          //Validatiing Step 2
          checkStepValidation(currentActiveStep.options.index, validatedSteps, currentActiveStep.element, $("#City").val() == "");
        } else if (currentActiveStep.options.index == 2) {
          //Validatiing Step 3
          checkStepValidation(currentActiveStep.options.index, validatedSteps, currentActiveStep.element, $("#Address").val() == "");
        }    
      }

      function checkStepValidation(stepIndex, validatedSteps, validatedStepElement, validationCondition) { //Validate the step and apply the respective class
        $(validatedStepElement).removeClass("errors-step").removeClass("correct").removeClass("save"); //Reset the step classes
        var existingValidation = $.grep(validatedSteps, function (e) { return e.index == stepIndex; }); //Store the validated step
        if (existingValidation.length == 0) {
          validatedSteps.push({ index: stepIndex, errors: validationCondition });
        } else {
            for (var i in validatedSteps) {
              if (validatedSteps[i].index == stepIndex) {
                validatedSteps[i].errors = validationCondition;
                break;
              }
            }
        }
        if (validationCondition) { //if returns true (the validation is NOT successfull) Apply the respective class/color
          $(validatedStepElement).addClass("errors-step");
        } else $(validatedStepElement).addClass("correct");

        var isSaved = $.grep(savedSteps, function (e) { return e.index == stepIndex; }); //Check if the step has been saved before the validation and remove it fromthe saved steps
        if (isSaved.length > 0) {
          for (var i = 0; i < savedSteps.length; i++) {
            if (savedSteps[i].index == stepIndex) {
              savedSteps.splice(i, 1);
              break;
            }
          }
        }
      }

      function onSelect(e) { //Stepper "Select" event handler
          var steps = e.sender.steps();
          setTimeout(function () {

            //Persist Validated Steps
            if (validatedSteps.length > 0) {
                $.each(validatedSteps, function (i, stepData) {
                    $(steps[stepData.index].element).removeClass("pending");
                    if (stepData.errors) {
                        $(steps[stepData.index].element).addClass("errors-step");
                    } else {
                        $(steps[stepData.index].element).addClass("correct");
                    }
                });
            }

            //Persist Saved Steps
            if (savedSteps.length > 0) {
                $.each(savedSteps, function (i, stepData) {
                    $(steps[stepData.index].element).removeClass("pending");
                    $(steps[stepData.index].element).addClass("save");
                });
            }

            //Persist Moved Steps
            $.each(steps, function () {
                var element = $(this.element);
                if (!$(element).hasClass('correct') && !$(element).hasClass('errors-step') && !$(element).hasClass('save') && $(element).hasClass('k-step-done')) {
                    $(element).addClass("pending");
                }
            });

          }, 10);

          //Display the respective content when a step is selected
          if (e.step.options.label == "Second step") {
              $("#exampleForm .k-form-fieldset:first").hide();
              $("#exampleForm .k-form-fieldset:nth-child(2)").show();
              $("#exampleForm .k-form-fieldset:nth-child(3)").hide();
              $("#exampleForm .k-form-buttons .k-form-submit").hide();
              $("#exampleForm .k-form-buttons .k-form-clear").show();
              $(".last-step-content").hide();
              
          }  else if (e.step.options.label == "Third step") {
              $("#exampleForm .k-form-fieldset:first").hide();
              $("#exampleForm .k-form-fieldset:nth-child(2)").hide();
              $("#exampleForm .k-form-fieldset:nth-child(3)").show();
              $("#exampleForm .k-form-buttons .k-form-submit").show();
              $("#exampleForm .k-form-buttons .k-form-clear").show();
              $(".last-step-content").hide();

          } else if (e.step.options.label == "Last step") {
              $("#exampleForm .k-form-fieldset:first").hide();
              $("#exampleForm .k-form-fieldset:nth-child(2)").hide();
              $("#exampleForm .k-form-fieldset:nth-child(3)").hide();
              $("#exampleForm .k-form-buttons .k-form-submit").hide();
              $("#exampleForm .k-form-buttons .k-form-clear").hide();
              $(".last-step-content").show();

          } else {
              $("#exampleForm .k-form-fieldset:first").show();
              $("#exampleForm .k-form-fieldset:nth-child(2)").hide();
              $("#exampleForm .k-form-fieldset:nth-child(3)").hide();
              $("#exampleForm .k-form-buttons .k-form-submit").hide();
              $("#exampleForm .k-form-buttons .k-form-clear").show();
              $(".last-step-content").hide();
          }
      }
  </script>

```
```Styles
  <style>
    .k-stepper [class*="correct"] .k-step-indicator {
        background-color: green;
        border-color: green;
    }

    .k-stepper [class*="correct"] .k-step-indicator:hover {
        background-color: green;
        border-color: green;
    }

    .k-stepper [class*="correct"].k-step-hover .k-step-indicator, .k-stepper [class*="correct"]:hover .k-step-indicator {
        background-color: green;
        border-color: green;
    }

    .k-stepper [class*="errors-step"] .k-step-indicator {
        background-color: red;
        border-color: red;
    }

    .k-stepper [class*="errors-step"] .k-step-indicator:hover {
        background-color: red;
        border-color: red;
    }

    .k-stepper [class*="errors-step"].k-step-hover .k-step-indicator, .k-stepper [class*="errors-step"]:hover .k-step-indicator {
        background-color: red;
        border-color: red;
    }

    .k-stepper [class*="save"] .k-step-indicator {
        background-color: blue;
        border-color: blue;
    }

    .k-stepper [class*="save"] .k-step-indicator:hover {
        background-color: blue;
        border-color: blue;
    }

    .k-stepper [class*="save"].k-step-hover .k-step-indicator, .k-stepper [class*="save"]:hover .k-step-indicator {
        background-color: blue;
        border-color: blue;
    }

    .k-stepper [class*="pending"] .k-step-indicator {
        background-color: yellow;
        border-color: yellow;
    }

    .k-stepper [class*="pending"] .k-step-indicator:hover {
        background-color: yellow;
        border-color: yellow;
    }

    .k-stepper [class*="pending"].k-step-hover .k-step-indicator, .k-stepper [class*="pending"]:hover .k-step-indicator {
        background-color: yellow;
        border-color: yellow;
    }
  </style>

```
Refer to [this REPL](https://netcorerepl.telerik.com/QcaDcJYW13RlZJBb39) for a runnable example.

## See Also

* [Server-Side API](/api/stepper)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/stepper#methods)