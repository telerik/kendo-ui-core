---
title: Step
page_title: Configuration, methods and events of Kendo UI Wizard Step Instance object
res_type: api
---

# kendo.wizard.Step

Represents a step in the [Wizard](/api/javascript/ui/wizard) widget.

## Fields

## element `jQuery`

The jQuery element representing the step

## Methods

### buttons

Returns a collection of Buttons present in the **Step**.

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            {
                title: "First Step",
                content: "<h1>First Step Content</h1>",
                buttons: ["previous", "next"]
            },
            {
                title: "Second Step",
                content: "<h1>Second Step Content</h1>"
            }
        ]
    });
    
    var wizard = $("#wizard").data("kendoWizard");
    var firstStep = wizard.steps()[0];
    var stepButtons = firstStep.buttons();
    console.log("Step buttons:", stepButtons);
    </script>

#### Returns `Array`

`Array[Button]` The [Button](/api/javascript/ui/button) instances available in the current **Step**.

### load

If contentUrl is set for the step, loads the **Step** content from remote.

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            {
                title: "Dynamic Step",
                contentUrl: "/api/wizard/step-content"
            },
            {
                title: "Second Step",
                content: "<h1>Second Step Content</h1>"
            }
        ]
    });
    
    var wizard = $("#wizard").data("kendoWizard");
    var firstStep = wizard.steps()[0];
    
    // Manually trigger loading of remote content
    firstStep.load();
    console.log("Step content loaded from remote URL");
    </script>

### resetButtons

Regenerates the Buttons present in the **Step** instance.

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            {
                title: "First Step",
                content: "<h1>First Step Content</h1>",
                buttons: ["previous", "next"]
            },
            {
                title: "Second Step",
                content: "<h1>Second Step Content</h1>"
            }
        ]
    });
    
    var wizard = $("#wizard").data("kendoWizard");
    var firstStep = wizard.steps()[0];
    
    // Reset and regenerate the buttons for this step
    firstStep.resetButtons();
    console.log("Step buttons have been reset and regenerated");
    </script>
