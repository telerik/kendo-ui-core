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


<div class="meta-api-description">
Access, retrieve, or manipulate the set of action buttons associated with a specific step in a multi-step wizard interface by obtaining the collection of button elements or instances linked to that step. This enables developers to iterate over, query, enable, disable, configure, or bind event listeners to individual buttons within a wizard step, facilitating dynamic control and customization of navigation or action controls. Whether you need to get all buttons, modify their states, respond to clicks, or customize which buttons appear at each phase, this collection provides array-like access to all button components tied to the current wizard step, supporting interactive and conditional user interface flows.
</div>

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


<div class="meta-api-description">
Refresh or fetch dynamic content for individual steps in a multi-step process by loading remote data or markup from a specified URL, enabling updates or initialization of step content on demand, reloading step details from external sources, triggering content retrieval based on configured endpoints, refreshing wizard page content dynamically, pulling in server-side or API-provided step information, syncing step views with updated remote resources, controlling when and how step content is retrieved remotely, and managing asynchronous loading of step elements during user navigation or programmatic interactions.
</div>

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            {
                title: "Dynamic Step",
                contentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent2.html"
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


<div class="meta-api-description">
Regenerate or refresh the action buttons within a wizard step to update their visibility, labels, enabled or disabled states, or event handlers after changing configuration or internal state without restarting the entire wizard; dynamically rebuild, reset, or reinitialize the step’s user controls, controls' DOM elements, or event bindings at runtime to reflect updated UI or logic instantly, enabling dynamic button updates, reconfiguration, or real-time control refresh within a step of a multi-step wizard interface.
</div>

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
