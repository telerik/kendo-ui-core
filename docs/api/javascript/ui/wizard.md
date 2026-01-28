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


<div class="meta-api-description">
How to enable or disable navigation buttons in Kendo UI Wizard? Control the display and behavior of step navigation elements within a multi-step interface, enabling or disabling buttons like Next, Previous, Finish, and the progress pager to manage user flow through sequential steps, customize navigation controls visibility, toggle per-step action buttons, set wizard navigation elements on or off, configure whether step navigation controls are shown or hidden, and control the presentation of interactive buttons and progress indicators for step-based workflows.
</div>

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


<div class="meta-api-description">
How do I position step content in a Kendo UI wizard? Adjust or configure the layout and placement of step content in a multi-step wizard interface by positioning the navigation or stepper area relative to the content, choosing between horizontal alignment with the steps displayed above and content below, or vertical alignment with the steps oriented on the left or right side, effectively controlling whether the step indicators appear above the content area or beside it on either side, enabling flexible UI design for step-by-step progress flows based on user preferences or space constraints.
</div>

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


<div class="meta-api-description">
How to enable lazy loading in a Kendo UI Wizard? Control loading step content dynamically by enabling or disabling lazy loading for multi-step interfaces, so that step data or remote HTML is fetched only when a user navigates to a specific step, reducing initial load time and minimizing payload for wizard or multi-page forms, with configuration options to set on-demand content retrieval based on step URLs or deferred loading strategies during component setup.
</div>

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


<div class="meta-api-description">
How do I customize wizard messages in Kendo UI for jQuery? Customize and control the user interface text for step-by-step wizards by setting localized labels, button captions, error messages, prompts, and instructional text. Enable configuring language-specific UI strings, override default wizard messages, tailor button names, set custom alerts or notifications, and manage multilingual wizard content to enhance user experience across different locales. Adjust or translate all interactive text elements within the wizard interface, including navigation controls, status messages, and guidance hints for diverse user audiences.
</div>

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


<div class="meta-api-description">
How to customize the finish button label in Kendo UI Wizard? Customize, translate, or set the label text for the finish or completion button in a multi-step wizard interface, enabling localization and internationalization for the final step's confirmation or submit button by configuring the done, complete, or finish message text displayed to users in various languages or custom wording preferences.
</div>

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            { title: "Initial step" },
            { title: "Second step" },
            { title: "Final step" }
        ],
        messages: {
            done: "Complete"
        }
    });
    </script>

### messages.next `String` *(default: "Next")*

Specifies text to be rendered in the "Next" button on each step.


<div class="meta-api-description">
How do I change the "next" button text in a Kendo UI Wizard? Configure or customize the button text displayed for advancing to the next step in a step-by-step wizard interface, including setting localized labels, changing the "next" button wording, modifying progression prompts, defining multilingual navigation text, updating step transition messages, controlling the call-to-action wording on forward buttons, and tailoring the text that guides users through sequential form steps or processes.
</div>

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            { title: "Initial step" },
            { title: "Second step" },
            { title: "Final step" }
        ],
        messages: {
            next: "Continue"
        }
    });
    </script>

### messages.of `String` *(default: "of")*

Specifies text to be rendered in the Pager element.


<div class="meta-api-description">
How do I customize the "of" label in a Kendo UI Wizard pagination control? Configure and customize the text displayed in the wizard's pagination controls, specifically the label showing the current item number out of the total, enabling you to set, change, or translate the message indicating progress such as "Item X of Y" or page indicators in step-by-step interfaces and multi-step forms. Adjust the phrasing, wording, or format of the active step message in pagers or navigational UI elements to improve user guidance, localization, accessibility, or match design requirements in wizards, surveys, onboarding flows, or any sequential user interface component.
</div>

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            { title: "Initial step" },
            { title: "Second step" },
            { title: "Final step" }
        ],
        messages: {
            of: "out of"
        }
    });
    </script>

### messages.previous `String` *(default: "Previous")*

Specifies text to be rendered in the "Previous" button on each step.


<div class="meta-api-description">
How to customize "Previous" button text in Kendo UI Wizard? Configure the text label or caption for the navigation button that lets users go back to the prior step in a multi-step wizard or form interface, enabling translation, customization, or localization of the "Previous" button to support different languages, adapt UI wording, or change the button text for user flows requiring backward navigation, step reversal, or revisiting earlier stages in a guided process.
</div>

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            { title: "Initial step" },
            { title: "Second step" },
            { title: "Final step" }
        ],
        messages: {
            previous: "Back"
        }
    });
    </script>

### messages.reset `String` *(default: "Reset")*

Specifies text to be rendered in the "Reset" button on each step.


<div class="meta-api-description">
How do I change the reset button text in a Kendo UI Wizard? Customize or configure the text label shown on the reset or restart button within multi-step forms, wizards, or guided workflows, enabling setting, changing, or controlling the reset button caption or prompt that users see on each step, step-by-step process, or navigation stage, allowing adjustment of the reset action wording, button label, or interface text to match application terminology or user experience preferences.
</div>

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            { title: "Initial step" },
            { title: "Second step" },
            { title: "Final step" }
        ],
        messages: {
            reset: "Clear All"
        }
    });
    </script>

### messages.step `String` *(default: "Step")*

Specifies text to be rendered in the Pager element.


<div class="meta-api-description">
How to change the step indicator label in Kendo UI Wizard? Set or customize the label text displayed for each step indicator or progress marker in a multi-step interface or wizard flow, control the step names or captions shown in navigation elements, configure the text for step numbers or titles appearing in pagers or breadcrumbs, enable changing the wording or language of step labels within a guided process or setup component, and adjust how step information is presented to users during multi-part forms or workflows.
</div>

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            { title: "Initial step" },
            { title: "Second step" },
            { title: "Final step" }
        ],
        messages: {
            step: "Phase"
        }
    });
    </script>

### pager `Boolean` *(default: true)*

Indicates whether the Steps in the **Wizard** will render their Pager element.


<div class="meta-api-description">
How do I control the navigation pager in Kendo UI Wizard? Control the display and visibility of the navigation pager in multi-step wizard interfaces by enabling or disabling the pagination controls that allow users to move between steps, configure whether the step indicators or pager elements appear in the wizard flow, toggle the step navigation UI on or off, set pagination visibility for a guided step process, manage step-by-step navigation controls, adjust the presence of page buttons or pager components within a multi-step form or wizard, and customize the user interface to show or hide controls that facilitate progressing through sequential steps.
</div>

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


<div class="meta-api-description">
How to configure wizard component to reload step content on revisit? Control reloading or caching of dynamically loaded step content in a multi-step wizard interface, enabling or disabling fetching remote content via Ajax each time the user navigates back to a specific step, configuring whether the step content refreshes on revisit or is retained from the initial load to optimize performance, manage network requests, and customize step content update behavior during user navigation in a wizard component setup.
</div>

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


<div class="meta-api-description">
How to customize the step navigation in Kendo UI Wizard? Customize step navigation and appearance by configuring step labels, orientation, clickable steps, and visual behavior within multi-step interfaces, wizards, or guided flows. Control how steps are displayed, set interactive navigation between steps, enable or disable step clicking, adjust horizontal or vertical layouts, and tailor the progress indicator settings. Adapt and configure built-in stepper components or similar navigation elements to match user flow requirements, step ordering, and UI presentation in guided processes or multi-stage forms.
</div>

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            { title: "Initial step" },
            { title: "Second step" },
            { title: "Final step" }
        ],
        stepper: {
            indicator: false,
            linear: false
        }
    });
    </script>

### stepper.indicator `Boolean` *(default: true)*

Specifies whether the [Stepper](/api/javascript/ui/stepper) instance will display the indicators of its steps.


<div class="meta-api-description">
How to control step marker visibility in Kendo UI Wizard? Control the visibility and display of step markers or visual indicators in multi-step wizards or steppers, enabling you to show, hide, or toggle the progress markers that represent each step. Customize whether the stepper component presents graphical cues or dots for each step to guide users through sequential processes, configure the presence of progress indicators, enable or disable step markers for clearer or minimal UI, and adjust how the wizard visually communicates progression stages to users by showing or concealing the step indicators.
</div>

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


<div class="meta-api-description">
How to hide step titles in Kendo UI Wizard stepper? Toggle visibility of step titles or step labels in a multi-step wizard interface, enabling you to show or hide the textual labels or captions for each step within a stepper component; control whether the step indicators display descriptive names, step headings, or hide them entirely to create a minimal or detailed navigation experience in wizard-style forms, walkthroughs, or guided processes.
</div>

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


<div class="meta-api-description">
How do I configure Kendo UI Wizard to enforce sequential step navigation? Configure the navigation flow to enforce sequential, linear progression through steps or enable flexible, non-linear step selection allowing skipping or jumping between multiple steps in a multi-step process, controlled by toggling strict order enforcement versus free navigation, managing whether users can proceed only to adjacent steps or jump across distant steps, ideal for controlling step-by-step workflows, form wizards, or guided sequences where navigation order matters or is optional.
</div>

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


<div class="meta-api-description">
How do I enable automatic form validation in Kendo UI Wizard? Enable or configure automatic form validation during multi-step processes to ensure data correctness when moving between steps, including triggering validation checks on step transitions, enforcing input rules and constraints at each stage, managing form integrity within wizard-style interfaces, setting validation to run before advancing steps, controlling validation behavior during navigation, and ensuring forms within step-based workflows are checked for errors before proceeding.
</div>

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


<div class="meta-api-description">
How to enable form validation when navigating back in Kendo UI Wizard? Configure or enable client-side form validation when navigating backward in multi-step wizards or form flows, controlling whether moving to a prior step triggers validation checks on the current form content; set validation on previous steps to true or false to control automatic error checking during back navigation, ensuring data integrity or allowing user edits without immediate validation, useful for scenarios requiring validation on navigation between steps, bidirectional form validation control, enforcing or disabling validation when users go back to earlier steps, and managing form state consistency in wizard-style interfaces.
</div>

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


<div class="meta-api-description">
How do I configure the order of steps in a Kendo UI Wizard? Configure and control the ordered sequence of pages or screens presented in a multi-step process or form, enabling the customization of each step's content, labels, layout, and navigation flow. Manage the progression through a wizard-style interface by defining an array or list that sets the exact order, controls which components or information appear at each stage, and adjusts step behavior for complex workflows, user onboarding, or guided interactions. This setup supports setting up step sequences, customizing navigation paths, labeling steps clearly, and specifying what renders at every point in a step-by-step interface during initialization or dynamic updates.
</div>

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            {
                title: "Personal Information",
                content: "<div>Enter your personal details</div>",
                icon: "user"
            },
            {
                title: "Contact Information", 
                content: "<div>Enter your contact details</div>",
                icon: "email"
            },
            {
                title: "Review",
                content: "<div>Review your information</div>",
                icon: "check"
            }
        ]
    });
    </script>

### steps.buttons `Array`

Allows configuration of the buttons to be rendered on each step. If the array contains strings, those values will be taken as Buttons names. If the array contains objects, those will be used when initializing the actual Button instances on each step.


<div class="meta-api-description">
How do I customize the buttons in each step of a Kendo UI Wizard? Configure and customize navigation controls for each step in a multi-step wizard or form by specifying which buttons appear and how they behave, including setting button names, labels, actions, and initialization options individually per step; enable precise control over step-specific navigation elements such as Next, Back, Submit, Cancel, or custom buttons by providing arrays of strings for button identifiers or objects with detailed button settings, allowing developers to define button visibility, order, labels, event handlers, and state during the wizard’s lifecycle and step transitions.
</div>

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


<div class="meta-api-description">
How do I customize what happens when a user clicks on a step button in a Kendo UI Wizard? Configure or set custom click event handlers for wizard step buttons to run validation checks, control navigation flow, trigger asynchronous actions, or execute specific logic when users click the step button during multi-step processes. Enable handling of button clicks to control step transitions, perform data verification, run callbacks, or integrate custom workflows linked to wizard navigation and user interactions. This supports customizing button click behavior for step validation, conditional progress, event-driven operations, and step-specific click responses within wizard interfaces.
</div>

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


<div class="meta-api-description">
How do I disable a step button in a Kendo UI Wizard? Control the interactivity and user navigation flow by setting whether a step button in a multi-step wizard is active or inactive, allowing you to enable, disable, activate, or deactivate navigation buttons to manage user progress, prevent or allow clicks on specific steps, configure button availability during initialization, toggle step accessibility, and set navigation controls for wizard steps to guide or restrict user movement through the process.
</div>

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


<div class="meta-api-description">
How can I customize the button labels for specific steps in a Kendo UI Wizard? Configure and customize individual wizard step buttons by specifying their unique identifier or name to set custom labels, text, event handlers, or conditional behavior; control navigation buttons like previous, next, done, or reset by targeting these reserved button names to modify appearance, functionality, or trigger specific actions within multi-step interfaces, enabling developers to define and manage button-specific settings, events, or dynamic logic during the wizard setup process.
</div>

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


<div class="meta-api-description">
How do I make a button primary in a Kendo UI wizard? Toggle or set a button within a multi-step wizard interface as the main or emphasized action by enabling or disabling primary styling, applying a distinctive look that highlights the button’s importance for users navigating sequential steps; configure whether the button appears as the principal call-to-action using boolean flags to control visual emphasis, ensuring consistent primary button appearance and behavior across wizard steps and UI flows.
</div>

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


<div class="meta-api-description">
How do I customize the button text in Kendo UI Wizard? Set or customize the label, caption, or text displayed on navigation buttons within a multi-step wizard interface, including buttons like Next, Previous, Finish, or custom step control labels. Control and define the visible wording on step navigation buttons for user guidance, enabling clear step progression cues and personalized button names during multi-stage workflows, onboarding flows, or form navigation. Adjust the clickable button text that directs users through sequential steps, improving clarity and navigation experience in wizard-style interfaces.
</div>

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


<div class="meta-api-description">
How can I customize the content of each step in a Kendo UI Wizard? Configure or update step content with custom HTML strings to display rich markup such as images, links, forms, or dynamic inner content inside a multi-step Wizard interface, enabling control over the step’s displayed elements by injecting or modifying the HTML code programmatically or at initialization for flexible presentation and interactive content rendering within each step.
</div>

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


<div class="meta-api-description">
How do I dynamically link step content in a Kendo UI wizard by its ID? Configure or link existing DOM elements by id to serve as individual step content within multi-step wizard interfaces, enabling reuse of pre-rendered HTML markup for step panels, binding external or inline content by element identifier, integrating specific section content dynamically into each step, and controlling step display by referencing unique container IDs to efficiently manage wizard navigation flow and customize step presentation.
</div>

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


<div class="meta-api-description">
How to load wizard step content dynamically using Kendo UI for jQuery? Configure dynamic loading of step content by specifying a URL to fetch step data or markup from a remote server, enabling on-demand retrieval of wizard step information through AJAX or HTTP requests. This supports loading step content asynchronously from absolute or relative URLs, allowing server-driven or dynamic updates to wizard steps, remote content injection, and seamless integration of external HTML or JSON payloads for multi-step interfaces that require content to be pulled during runtime.
</div>

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


<div class="meta-api-description">
How to customize the styling of individual steps in Kendo UI Wizard? Customize or control the styling of individual step containers in a multi-step wizard interface by setting CSS class names, enabling targeted design, layout adjustments, or custom themes for each step block. Configure, assign, or override container classes to apply specific styles, selectors, or visual treatments to wizard steps, helping with responsive design, theming, or integration with CSS frameworks. Manage step container appearance through class name strings that affect rendering, styling hooks, or DOM manipulation for each stage or step in a sequential form or navigation flow.
</div>

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


<div class="meta-api-description">
How do I enable or disable individual steps in a Kendo UI wizard? Configure, toggle, or control the ability for users to access, navigate to, activate, or interact with individual steps or stages within a multi-step wizard, form, or process flow by enabling or disabling each step based on boolean conditions; manage step availability to restrict progression, allow skipping, or enforce sequential navigation by setting flags that determine whether a step is active, accessible, selectable, or locked during initialization or runtime within guided workflows, multi-page forms, onboarding sequences, or setup assistants.
</div>

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


<div class="meta-api-description">
How do I configure individual steps in a Kendo UI Wizard with custom forms? Configure individual steps within a multi-step wizard interface by embedding customizable forms that specify input fields, validation rules, layout structure, data binding, and template options to control the user interaction flow. Enable setting up step-specific form content, managing form behavior and appearance, defining required user inputs, handling form submission within wizard sequences, and customizing field arrangements dynamically during the wizard setup process. Adjust and control form integration into each wizard phase to guide users through complex input tasks with flexible configuration of form elements, validation criteria, data models, and display templates that streamline step-based data collection and user progression.
</div>

#### Example

    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            {
                title: "Personal Information",
                form: {
                    formData: {
                        firstName: "",
                        lastName: "",
                        email: ""
                    },
                    items: [
                        { field: "firstName", label: "First Name:", validation: { required: true } },
                        { field: "lastName", label: "Last Name:", validation: { required: true } },
                        { field: "email", label: "Email:", validation: { required: true, email: true } }
                    ]
                }
            },
            {
                title: "Contact Information",
                form: {
                    formData: {
                        phone: "",
                        address: ""
                    },
                    items: [
                        { field: "phone", label: "Phone:", validation: { required: true } },
                        { field: "address", label: "Address:", validation: { required: true } }
                    ]
                }
            }
        ]
    });
    </script>

### steps.icon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be displayed in the Stepper step element.
For a list of available icon names, please refer to the [Web Font Icons article](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).


<div class="meta-api-description">
How do I customize the icons for each step in a Kendo UI Wizard? Display or configure an icon for each step in a multi-step wizard or stepper interface by setting or enabling an icon graphic, symbol, or visual indicator linked to predefined icon libraries or theme sprite sets. Customize step visuals by specifying an icon name, symbol, glyph, or font-based image from a collection of web font icons or UI theme sprites to enhance user navigation cues, highlight progress, or visually represent step meaning in wizards, multi-step forms, or guided workflows. Control the appearance of step markers by assigning existing icons, selecting from available icon sets, or configuring graphical step indicators during setup or initialization of wizard components to improve UI clarity and user experience across step-based processes.
</div>

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


<div class="meta-api-description">
How to customize step icons in a Kendo UI Wizard? Configure and customize the rendering of step icons in a multi-step wizard or stepper interface by supplying custom templates that allow dynamic HTML output, step data binding, and full control over icon and indicator markup. Enable different visual states and behaviors based on whether a step is selected, enabled, previous, or identified by position such as first or last, while incorporating properties like step title, label, icon usage, visibility of indicators and labels, and step index to tailor step icon appearance and interaction. This customization supports developers seeking to adjust stepper visuals, control step icon display logic, respond to step progression status, and implement advanced UI adjustments for step navigation components in web applications.
</div>

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


<div class="meta-api-description">
How to control navigation buttons for individual steps in Kendo UI Wizard? Configure the visibility and activation of navigation controls or step indicators on individual steps within a multi-step process, enabling dynamic showing, hiding, or toggling of paging elements or progress markers for each stage of a wizard or form flow. This controls whether step-level pagination, navigation buttons, or progress indicators appear for a particular step, allowing tailored step navigation display, conditional paging enablement, and flexible control over user guidance elements throughout a sequence or wizard interface.
</div>

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


<div class="meta-api-description">
How to customize step titles in Kendo UI Wizard component? Set or customize the label, caption, or heading text displayed for each step in a multi-step wizard or form interface, controlling what users see in the step navigation, progress indicator, or header as they move through sequential stages. Configure, define, update, or manage the visible titles or names for individual steps, enabling clear identification, navigation, and user guidance through multi-part workflows, onboarding processes, forms, or setup assistants. Adjust the step's displayed text dynamically or statically for better user experience, progress tracking, and step differentiation in wizard components or multi-page progress bars.
</div>

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

Returns the currently active in the **Wizard** [`Step`](/api/javascript/wizard/step) instance.


<div class="meta-api-description">
How do I access the current step in a Kendo UI Wizard? Retrieve or access the current step instance in a multi-step wizard or form flow to inspect, read, or modify its state dynamically at runtime without changing the navigation or overall process flow. Fetch the active step object directly rather than an index, enabling detailed control, querying, or interaction with the current step’s properties, methods, or status in order to manage step transitions, validations, progress indicators, or conditional behaviors during wizard execution.
</div>

#### Returns `kendo.stepper.Step`

`Step` The currently active (selected) [`Step`](/api/javascript/wizard/step) instance.


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


<div class="meta-api-description">
How do I programmatically enable or disable individual steps in a Kendo UI Wizard? Control, toggle, or adjust the activation state of specific steps in a multi-step process or wizard interface by programmatically enabling or disabling individual steps based on their position or index, allowing dynamic management of user navigation flows, enforcing validation rules, restricting or granting access to certain stages, updating interactive elements, managing user permissions during runtime, and customizing step availability to guide or block users through sequential workflows or conditional progressions.
</div>

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


<div class="meta-api-description">
How do I insert a new step in a Kendo UI wizard at a specific position? Add, insert, or reorder steps within a multi-step flow by specifying the exact position to place a new step, enabling dynamic modification of the sequence and navigation order in a wizard or step-based interface. Configure step insertion at a particular index to control step progression, adjust flow order, update step collections programmatically, or modify the step sequence during runtime. Manage workflow steps by setting the position for new steps, enabling inserting at precise locations, reordering existing steps, and controlling the navigation order in guided user interfaces, onboarding wizards, or form sequences.
</div>

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


<div class="meta-api-description">
How do I programmatically navigate to the next enabled step in a Kendo UI Wizard? Control advancing the wizard interface forward by moving to the next active step in the sequence, enabling programmatic progression, navigation, or stepping through stages while ensuring skipped or disabled steps are not selected. Enable moving ahead, advancing, proceeding, or navigating to the subsequent enabled step without jumping over or selecting disabled steps, providing precise control over forward movement in multi-step workflows and ensuring the selection lands only on valid, enabled steps immediately following the current position.
</div>

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


<div class="meta-api-description">
How to navigate back to previous step in Kendo UI wizard with disabled states respected? Control or trigger navigation to the immediately preceding step in a multi-step process, enabling moving backward through a sequence or wizard interface while respecting disabled states so that navigation skips or prevents selection of steps marked inactive, facilitating typical use cases such as back buttons, undo step transitions, or reversing progress in form flows, stepper components, or multi-page guided interactions where returning to earlier steps is needed without bypassing disabled or locked steps.
</div>

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


<div class="meta-api-description">
How do I remove a step from a Kendo UI Wizard at a specific index? Delete or remove a step from a sequence or wizard flow by specifying its position or index, enabling dynamic adjustment or modification of the steps during runtime; control or update the step order by eliminating a step at a given index, allowing flexible editing, step removal by number, position-based step deletion, runtime step management, and navigation update after removing steps in a multi-step process or wizard interface.
</div>

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


<div class="meta-api-description">
How do I programmatically navigate to a specific step in a Kendo UI Wizard? Control or set the active step in a multi-step wizard interface by programmatically navigating to a specific step index, enabling direct step activation, switching, or jumping between steps by index number while respecting disabled or inactive steps that prevent selection, useful for customizing wizard flow, enforcing navigation rules, or implementing step-based progression logic in user interfaces.
</div>

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


<div class="meta-api-description">
How can I dynamically update the steps in a Kendo UI Wizard? Accessing and managing the sequence of steps in a multi-step process, retrieving the list or array of step objects to read or modify step titles, indices, order, metadata, or properties, iterating through step definitions to enable custom navigation, dynamically updating or configuring the workflow steps, controlling step progression programmatically, inspecting the configured steps after setup, handling step data for conditional logic or UI changes, and manipulating the ordered collection of steps in a wizard or guided interface for tailored user experiences.
</div>

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


<div class="meta-api-description">
How to capture user navigation events in Kendo UI Wizard? Trigger custom actions or run code right after a user moves to a different step or stage in a multi-step process or wizard interface, capturing user navigation events to update interfaces, validate input, load dynamic content specific to the new step, synchronize state changes, or implement conditional logic upon step changes. Detect when users switch steps, listen for step selection events, respond to navigation between stages, control step transitions, and execute functions triggered by step activation during guided workflows or setup sequences.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.step.options.title + " step activated.");
            }
        });
	</script>

### contentLoad

Triggered when content is fetched from an AJAX request and has been loaded.


<div class="meta-api-description">
How to handle content updates in Kendo UI Wizard after AJAX load? Detecting and handling asynchronous content loading in a step-by-step wizard interface, triggering actions when dynamic content is fetched and inserted via AJAX, responding to content update events, updating the user interface after data loads, initializing scripts or components within newly loaded sections, attaching event listeners or handlers after dynamic content injection, managing post-load interactions in multi-step workflows, controlling behavior after step content refreshes asynchronously, listening for content-ready signals in wizard navigation, and enabling reactive programming patterns triggered by AJAX content updates in step-based UI flows.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.step.options.title + " has been loaded.");
            }
        });
	</script>

### done

Triggered when the "Done" action Button has been clicked


<div class="meta-api-description">
What event is triggered when a user completes a step in a Kendo UI for jQuery wizard? Trigger actions when a user finishes or completes a step-by-step process by clicking a completion button, enabling execution of final validation, form submission, data saving, closing the interface, or navigating to another page; detect the event signaling the end of a guided flow, confirm that all required inputs are valid before proceeding, and perform cleanup or continuation tasks after the user signals they are done, responding to completion events in multi-step wizards, walkthroughs, or setup flows.
</div>

#### Event Data

##### e.sender `kendo.ui.Wizard`

The **Wizard** instance that triggered the event.

##### e.originalEvent `Object`

The original DOM event.

##### e.button `kendo.ui.Button`

The [Button](/api/javascript/ui/button) instance that has been clicked in order raise the event.

##### e.forms `Array`

An array of all Kendo UI [Form](/api/javascript/ui/form) widgets (if any) configured within the Wizard widget.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.button);
            }
        });
	</script>

### error

Triggered when an attempt to fetch step content with an AJAX request fails. The event will be fired only when the user clicks on the Previous or Next button, or navigates to another step using the Stepper. It will not be fired if the remote request is raised as a result of a `Step.load()` method call.


<div class="meta-api-description">
How do I handle errors when navigating between wizard steps using Kendo UI? Detect and manage failures in loading step content asynchronously during navigation between steps using next, previous, or stepper controls, handling AJAX errors from failed network requests when moving through wizard steps; useful for retrying step data fetches, displaying error messages or alerts, preventing or canceling step transitions due to load issues, and monitoring asynchronous navigation errors without involving programmatic remote loading methods.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.step.options.title + " failed.");
            }
        });
	</script>

### reset

Triggered when the "Reset" action Button has been clicked


<div class="meta-api-description">
How do I detect when a Kendo UI wizard is reset by the user? Detect when the user triggers a reset or restart action in a multi-step workflow, form wizard, or guided interface by capturing reset button clicks or reset events, enabling the execution of custom code, UI updates, state clearing, or logic handling when a wizard or step-by-step process is reset or cleared.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.button);
            }
        });
	</script>

### select

Fires when the user clicks on the Stepper or clicks on "Previous"/"Next" action Buttons to select another step.


<div class="meta-api-description">
How do I handle navigation between steps in a Kendo UI Wizard? Handle user interaction events when navigating between steps, capturing actions triggered by clicking navigation buttons or step indicators, enabling control over step transitions, validation processes, UI updates, and tracking or responding to changes in the current step selection within multi-step workflows or wizards.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.button);
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.stepper);
                e.preventDefault();
            }
        });
	</script>

### formValidateFailed

Fired when the **validateForms** configuration option is set to true (default), and the validation of the Kendo UI [Form](/api/javascript/ui/button) on the current **Wizard** step fails when the user tries to navigate to another step.


<div class="meta-api-description">
How to handle form validation errors in Kendo UI wizard? Capture and respond to form validation errors during multi-step navigation flow when built-in form checking is active, intercepting blocked step changes due to invalid inputs within wizard-like interfaces, allowing handling of validation failures by showing error messages, focusing invalid fields, logging issues, customizing user experience, managing conditional navigation, and controlling form validation state during step transitions when automatic form validation enforcement is enabled or disabled.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("Validation failed for step " + e.step.options.title);
            }
        });
	</script>
