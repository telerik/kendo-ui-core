---
title: Wizard
description: Configuration, methods and events of the Kendo UI Wizard
res_type: api
component: wizard
---

# kendo.ui.Wizard

Represents the Kendo UI Wizard widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### actionBar `Boolean` *(default: true)*

Indicates whether the Steps in the **Wizard** will render their Buttons and Pager element.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            actionBar: false,
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### contentPosition `String` *(default: "bottom")*

Indicates the position of the step content element according to the [Stepper](/api/javascript/ui/stepper). WIth the default configuration ("bottom"), the Stepper will be horizontal and wil be rendered above the content. With the "left" configuration, the Stepper will be vertical and the step content will be rendered to the left from it. With the "right" configuration, the Stepper will be vertical and the step content will be rendered to the right from it.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            contentPosition: "left",
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### loadOnDemand `Boolean` *(default: false)*

Indicates whether the step content will be loaded on demand when a given step is selected. Applicable when the step configuration has "contentUrl" set.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            loadOnDemand: true,
            steps: ["Initial step", {
                title: "Second step",
                contentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            }, "Third step"]
        });
	</script>

### messages `Object`

Provides configuration options for the messages present in the **Wizard** widget.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            messages: {
                done: "Custom done",
                next: "Custom next",
                of: "Custom of",
                previous: "Custom previous",
                reset: "Custom reset",
                step: "Custom step"
            },
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### messages.done `String` *(default: "Done")*

Specifies text to be rendered in the "Done" button on the final step.

### messages.next `String` *(default: "Next")*

Specifies text to be rendered in the "Next" button on each step.

### messages.of `String` *(default: "of")*

Specifies text to be rendered in the Pager element.

### messages.previous `String` *(default: "Previous")*

Specifies text to be rendered in the "Previous" button on each step.

### messages.reset `String` *(default: "Reset")*

Specifies text to be rendered in the "Reset" button on each step.

### messages.step `String` *(default: "Step")*

Specifies text to be rendered in the Pager element.

### pager `Boolean` *(default: true)*

Indicates whether the Steps in the **Wizard** will render their Pager element.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            pager: false,
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### reloadOnSelect `Boolean` *(default: "false")*

Indicates whether the step content will be reloaded on each navigation to given step. Applicable when the step configuration has "contentUrl" set.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            loadOnDemand: true,
            reloadOnSelect: true,
            steps: [{
                title: "Initial step",
                contentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            }, "Second step"]
        });
	</script>

### stepper `Object`

Provides configuration options for the [Stepper](/api/javascript/ui/stepper) instance of the **Wizard** widget.

### stepper.indicator `Boolean` *(default: true)*

Specifies whether the [Stepper](/api/javascript/ui/stepper) instance will display the indicators of its steps.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            stepper: {
                indicator: false
            },
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### stepper.label `Boolean` *(default: true)*

Specifies whether the [Stepper](/api/javascript/ui/stepper) instance will display the labels of its steps.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            stepper: {
                label: false
            },
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### stepper.linear `Boolean` *(default: true)*

Specifies whether the [Stepper](/api/javascript/ui/stepper) will allow non-linear navigation (selection of steps which are not immediately next to the current step).

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            stepper: {
                linear: false
            },
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### validateForms `Boolean | Object` *(default: true)*

Indicates whether the Wizard will automatically validate any Kendo [Form](/api/javascript/ui/form) configured for a Step. Validation will be executed upon Step navigation.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            validateForms: false,
            steps: [{
                title: "first",
                form: {
                    formData: {
                        name: null
                    },
                    items: [{
                        field: "name",
                        validation: {
                            required: true
                        }
                    }]
                }
            },{
                title: "second"
            }]
        });
	</script>


### validateForms.validateOnPrevious `Boolean`

Indicates whether navigation to previous Step will trigger current Step Form validation. By default, Form validation is enabled for any step navigation.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            validateForms: {
                validateOnPrevious: false
            },
            steps: [{
                title: "first",
                form: {
                    formData: {
                        name: null
                    },
                    items: [{
                        field: "name",
                        validation: {
                            required: true
                        }
                    }]
                }
            },{
                title: "second",
                form: {
                    formData: {
                        title: null
                    },
                    items: [{
                        field: "title",
                        validation: {
                            required: true
                        }
                    }]
                }
            }]
        });
	</script>

### steps `Array`

Array of steps to be rendered in the **Wizard**.

### steps.buttons `Array`

Allows configuration of the buttons to be rendered on each step. If the array contains strings, those values will be taken as Buttons names. If the array contains objects, those will be used when initializing the actual Button instances on each step.

#### Example - buttons array of strings

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                buttons: ["next", "custom"]
            },
            "Second step",
            "Third step"
            ]
        });
	</script>

#### Example - buttons array of objects

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                buttons: [{
                    name: "next"
                }, {
                    name: "custom",
                    click: function() {
                        alert("Custom clicked");
                    }
                }]
            },
            "Second step",
            "Third step"
            ]
        });
	</script>

### steps.buttons.click `Function`

A click handler that defines the logic to be executed upon button click.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                buttons: [{
                    name: "custom",
                    click: function() {
                        alert("Custom clicked");
                    }
                }]
            },
            "Second step",
            "Third step"
            ]
        });
	</script>

### steps.buttons.enabled `Boolean` *(default: true)*

Specifies whether the Button in question is enabled or not.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                buttons: [{
                    name: "custom",
                    enabled: false
                }]
            },
            "Second step",
            "Third step"
            ]
        });
	</script>

### steps.buttons.name `String`

Specifies the name of the Button. The default buttons have "reserved" names (those names are "previous", "next", "done", "reset"). That would allow additional customization of that Buttons' text and behavior.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                buttons: [{
                    name: "next",
                    text: "Custom next",
                    click: function() {
                        alert("Next clicked");
                    }
                }]
            },
            "Second step",
            "Third step"
            ]
        });
	</script>

### steps.buttons.primary `Boolean` *(default: false)*

Specifies whether the Button will have the `k-primary` class assigned or not.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                buttons: [{
                    name: "custom",
                    primary: true
                }]
            },
            "Second step",
            "Third step"
            ]
        });
	</script>


### steps.buttons.text `String`

Specifies the text to be displayed in the Button.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                buttons: [{
                    name: "custom",
                    text: "Custom button text"
                }]
            },
            "Second step",
            "Third step"
            ]
        });
	</script>

### steps.content `String`

Specifies the HTML string content to be rendered in the step.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                content: "<h3>HTML content</h3><p>This is a harcoded HTML content for this step.</p>"
            },
            "Second step",
            "Third step"
            ]
        });
	</script>

### steps.contentId `String`

Specifies the id of a DOM element, which content to be used as a content of the current step.

#### Example

	<div id="wizard"></div>

    <script id="step" type="text/kendo-template">
        <h3>HTML content</h3>
        <p>This is a harcoded HTML content for this step.</p>
    </script>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                contentId: "step"
            },
            "Second step",
            "Third step"
            ]
        });
	</script>

### steps.contentUrl `String`

Specifies an endpoint which the step content should be loaded from.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                contentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            },
            "Second step",
            "Third step"
            ]
        });
	</script>

### steps.className `String`

Specifies a custom class that will be set on the step container element.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                className: "custom"
            },
            "Second step",
            "Third step"
            ]
        });
	</script>

### steps.enabled `Boolean` *(default: true)*

Specifies whether the step is enabled or not.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            }, {
                title: "Second step",
                enabled: false
            }]
        });
	</script>

### steps.form `Object`

Defines the [Form](/api/javascript/ui/form) widget configuration, which will populate the **Wizard** step content.

### steps.icon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be displayed in the Stepper step element.
For a list of available icon names, please refer to the [Web Font Icons article](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                content: "Step 1 Content"
            }, {
                title: "Second step",
                content: "Step 2 Content",
                icon: "cancel"
            },{
                title: "Third step",
                content: "Step 3 Content"
            }]
        });
	</script>

### steps.iconTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the icon in the Stepper step.

The fields which can be used in the template are:

* title `String` - the title set on the step
* label `String` - same as `title` - the title set on the step
* icon `String` - the icon specified for this step (if any)
* enabled `Boolean` - indicates whether the step is enabled (true) or disabled (false)
* selected `Boolean` - indicates whether the step is selected
* previous `Boolean` - indicates whether the step is before the currently selected or not
* index `Number` - a zero-based index of the current step
* isFirstStep `Boolean` - indicates whether the step is the initial one in the Stepper
* isLastStep `Boolean` - indicates whether the step is the last one in the Stepper
* indicatorVisible `Boolean` - indicates whether the indicator, which holds the icon should be displayed or not
* labelVisible `Boolean` - indicates whether the label section of the step should be displayed or not

#### Example - Use a string template

    <div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "ONE",
                content: "Step 1 Content"
            }, {
                title: "TWO",
                content: "Step 2 Content",
                iconTemplate: "<strong>#:title#</strong>"
            },{
                title: "THREE",
                content: "Step 3 Content"
            }]
        });
	</script>

#### Example - Use a function

    <div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "ONE",
                content: "Step 1 Content"
            }, {
                title: "TWO",
                content: "Step 2 Content",
                iconTemplate: function(e) {
                    return '<strong>' + e.title + '</strong>';
                }
            },{
                title: "THREE",
                content: "Step 3 Content"
            }]
        });
	</script>

### steps.pager `Boolean` *(default: true)*

Specifies whether the pager will be rendered on the current step or not.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                pager: false
            }]
        });
	</script>

### steps.title `String`

Specifies a title of the current step.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            }]
        });
	</script>

## Methods

### activeStep

Returns the currently active in the **Wizard** `[Step](/api/javascript/wizard/step)` instance.

#### Returns `kendo.stepper.Step`

`Step` The currently active (selected) `[Step](/api/javascript/wizard/step)` instance.


#### Example

	<div id="wizard"></div>

	<script>
        var wizard = $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            }]
        }).data("kendoWizard");

        var currentStep = wizard.activeStep();
	</script>

### enableStep

Enables or disables the step at the specified index.

#### Parameters

##### index `Number`

Specifies the index of the step to be enabled/disabled.

##### enable `Boolean`

Specifies whether the step should be enabled (true) or disabled (false).

#### Example

	<div id="wizard"></div>

	<script>
        var wizard = $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }]
        }).data("kendoWizard");

        wizard.enableStep(1, false);
	</script>

### insertAt

Inserts a new step at a given index.

#### Parameters

##### index `Number`

The index at which the step should be inserted.

##### step `Object`

A step configuration object to be inserted at the specified index.

#### Example

	<div id="wizard"></div>

	<script>
        var wizard = $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }]
        }).data("kendoWizard");

		wizard.insertAt(1, {
            title: "Inserted"
        });
	</script>

### next

Selects the step which is immediately after the currently selected step. Does not select the next step, if it is disabled.

#### Example

	<div id="wizard"></div>

	<script>
        var wizard = $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }]
        }).data("kendoWizard");

		wizard.next();
	</script>

### previous

Selects the step which is immediately before the currently selected step. Does not select the previous step, if it is disabled.

#### Example

	<div id="wizard"></div>

	<script>
        var wizard = $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }]
        }).data("kendoWizard");

		wizard.select(1);
        wizard.previous();
	</script>

### removeAt

Removes a step that is present at a given index.

#### Parameters

##### index `Number`

The index of the step that should be removed.

#### Example

	<div id="wizard"></div>

	<script>
        var wizard = $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }]
        }).data("kendoWizard");

		wizard.removeAt(1);
	</script>

### select

Selects a step that is present at a given index. Does not select the step, if it is disabled.

#### Parameters

##### index `Number`

The index of the step which should be selected.

#### Example

	<div id="wizard"></div>

	<script>
        var wizard = $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }]
        }).data("kendoWizard");

		wizard.select(1);
	</script>

### steps

Returns the Step Array configured in the Wizard.

#### Returns `Array`

`Array[Step]` The [Step](/api/javascript/wizard/step) instances available in the **Wizard** widget.

#### Example

	<div id="wizard"></div>

	<script>
        var wizard = $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }]
        }).data("kendoWizard");

		var steps = wizard.steps();
	</script>

## Events

### activate

Fires when a new step has been selected upon user interaction.

#### Event Data

##### e.sender `kendo.ui.Wizard`

The **Wizard** instance that triggered the event.

##### e.step `kendo.wizard.Step`

The [Step](/api/javascript/wizard/step) instance that has been selected.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }],
            activate: function(e) {
                console.log(e.step.options.title + " step activated.");
            }
        });
	</script>

### contentLoad

Triggered when content is fetched from an AJAX request and has been loaded.

#### Event Data

##### e.sender `kendo.ui.Wizard`

The **Wizard** instance that triggered the event.

##### e.step `kendo.wizard.Step`

The [Step](/api/javascript/wizard/step) instance that has been populated from remote.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                contentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            },{
                title: "Second step"
            }],
            contentLoad: function(e) {
                console.log(e.step.options.title + " has been loaded.");
            }
        });
	</script>

### done

Triggered when the "Done" action Button has been clicked

#### Event Data

##### e.sender `kendo.ui.Wizard`

The **Wizard** instance that triggered the event.

##### e.originalEvent `Object`

The original DOM event.

##### e.button `kendo.ui.Button`

The [Button](/api/javascript/ui/button) instance that has been clicked in order raise the event.

##### e.forms `Array`

An array of all Kendo UI [Form](/api/javascript/ui/button) widgets (if any) configured within the Wizard widget.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }],
            done: function(e) {
                console.log(e.button);
            }
        });
	</script>

### error

Triggered when an attempt to fetch step content with an AJAX request fails. The event will be fired only when the user clicks on the Previous or Next button, or navigates to another step using the Stepper. It will not be fired if the remote request is raised as a result of a `Step.load()` method call.

#### Event Date

##### e.sender `kendo.ui.Wizard`

The **Wizard** instance that triggered the event.

##### e.xhr `jqXHR`

The jqXHR object used to load the content

##### e.status `String`

The returned status.

##### e.step `kendo.wizard.Step`

The [Step](/api/javascript/wizard/step) instance that is attempted to be populated from remote.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step",
                contentUrl: "foo"
            },{
                title: "Second step"
            }],
            error: function(e) {
                console.log(e.step.options.title + " failed.");
            }
        });
	</script>

### reset

Triggered when the "Reset" action Button has been clicked

#### Event Data

##### e.sender `kendo.ui.Wizard`

The **Wizard** instance that triggered the event.

##### e.originalEvent `Object`

The original DOM event.

##### e.button `kendo.ui.Button`

The [Button](/api/javascript/ui/button) instance that has been clicked in order raise the event.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }],
            reset: function(e) {
                console.log(e.button);
            }
        });
	</script>

### select

Fires when the user clicks on the Stepper or clicks on "Previous"/"Next" action Buttons to select another step.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.Wizard`

The **Wizard** instance that triggered the event.

##### e.step `kendo.wizard.Step`

The [Step](/api/javascript/wizard/step) instance that is about to be selected.

##### e.button `kendo.ui.Button`

The [Button](/api/javascript/ui/button) instance that has been clicked in order to navigate to a new step. Not present if the selection is made using the Stepper widget.

##### e.stepper `kendo.ui.Stepper`

The [Stepper](/api/javascript/ui/stepper) instance that has been clicked in order to navigate to a new step. Not present if the selection is made using one of the action Buttons.

##### e.preventDefault `Function`

If invoked prevents the selection.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            steps: [{
                title: "Initial step"
            },{
                title: "Second step"
            }],
            select: function(e) {
                console.log(e.button);
                console.log(e.stepper);
                e.preventDefault();
            }
        });
	</script>

### formValidateFailed

Fired when the **validateForms** configuration option is set to true (default), and the validation of the Kendo UI [Form](/api/javascript/ui/button) on the current **Wizard** step fails when the user tries to navigate to another step.

#### Event Data

##### e.sender `kendo.ui.Wizard`

The **Wizard** instance that triggered the event.

##### e.form `kendo.ui.Form`

The Kendo UI [Form](/api/javascript/ui/button) widgets which validation fails.

##### e.step `kendo.wizard.Step`

The [Step](/api/javascript/wizard/step) where is placed the Form with failed validation.

#### Example

	<div id="wizard"></div>

	<script>
        $("#wizard").kendoWizard({
            validateForms: true,
            steps: [{
                title: "first",
                form: {
                    formData: {
                        name: null
                    },
                    items: [{
                        field: "name",
                        validation: {
                            required: true
                        }
                    }]
                }
            },{
                title: "second"
            }],
            formValidateFailed: function(e) {
                console.log("Validation failed for step " + e.step.options.title);
            }
        });
	</script>
