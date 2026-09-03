---
title: ResponsivePanel
page_title: Configuration, methods and events of Kendo UI ResponsivePanel
description: Configure the ResponsivePanel UI widget, use methods and explore the events which are triggered upon certain behaviors.
res_type: api
component: responsivepanel
---

# kendo.ui.ResponsivePanel

Represents the Kendo UI ResponsivePanel widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoClose `Boolean` *(default: true)*

If set to `false` the widget will not close when the page content is touched, after it was opened on a mobile device. You will need to call the [close method](/api/javascript/ui/responsivepanel/methods/close) when the panel needs to close.


<div class="meta-api-description">
How do I prevent Kendo UI ResponsivePanel from auto-closing on mobile devices? Control whether a slide-out or overlay panel on mobile devices automatically closes when tapping outside or interacting with the page content, allowing the panel to stay open until explicitly closed via code or user action, enabling configurations to disable automatic dismissal, keep menus or panels persistent on touch events, and manage responsive drawer behavior for enhanced mobile navigation experience.
</div>

#### Example

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>

        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel({
            autoClose: false
        });
    </script>

### breakpoint `Number` *(default: 640)*

Specifies the page width at which the widget will be hidden and its toggle button will become visible.


<div class="meta-api-description">
How do I set the screen width threshold for automatic panel collapse in Kendo UI's ResponsivePanel? Set or adjust the screen width threshold to define when a panel or sidebar automatically collapses into a toggle button for responsive layouts, enabling control over hiding or showing content based on viewport size, breakpoint configuration for adaptive design, dynamic toggle activation at specific device widths, customizing collapse points for mobile or desktop views, managing responsive visibility and panel behavior as window dimensions change, configuring the threshold for automatic menu or panel shrinkage, and tailoring the user interface to respond smoothly to different screen resolutions or device classes.
</div>

#### Example

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>

        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel({
            breakpoint: 1020
        });
    </script>

### nonce `String` *(default: "")*

Specifies the nonce attribute that will be set to the inline style injected in the `<head>` tag containing the dynamic media query styles.


<div class="meta-api-description">
How do I set the nonce value for inline style security in a Kendo UI ResponsivePanel to comply with Content Security Policy? Configure or set the nonce value for inline style security to ensure compatibility with Content Security Policy (CSP) by applying a unique token or nonce attribute to dynamically injected style elements, enabling secure loading of responsive media queries and controlling trusted inline CSS execution. This supports CSP compliance, allows linking server-generated nonce strings to inline styles, and helps developers manage style injection policies while preventing style blocking due to security restrictions or script/style origin verification. Use cases include integrating nonce-based CSP headers, enabling secure dynamic styling in responsive panels, and matching nonce attributes to server-side generated security tokens to prevent inline style blocking in modern browsers enforcing CSP rules.
</div>

#### Example

    <header>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>
        Logo
    </header>

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel({
            orientation: "top",
            nonce: "test1234"
        });
    </script>

### orientation `String` *(default: "left")*

Specifies the direction from which the hidden element will open up, once the toggle button has been activated. Valid values are "left", "right", and "top".


<div class="meta-api-description">
How do I configure the orientation of a hidden panel in Kendo UI's responsive layout? Set or configure the sliding direction from which a hidden panel, drawer, or sidebar emerges within a responsive layout, enabling control over whether the hidden content slides out from the left side, right side, or top edge of the screen when toggled or activated. Adjust the panel’s opening orientation to match user interface design needs, customize the reveal direction for sidebars or navigation drawers, and control how off-canvas or hidden menus animate or appear in responsive views by specifying left, right, or top slide-in behavior.
</div>

#### Example

    <header>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>
        Logo
    </header>

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel({
            orientation: "top"
        });
    </script>

### toggleButton `String` *(default: ".k-rpanel-toggle")*

Specifies the selector for the toggle button that will show and hide the responsive panel.


<div class="meta-api-description">
How do I configure a toggle button to show/hide a Kendo UI ResponsivePanel? Control or configure a toggle button or clickable element to show, hide, or switch the visibility of a collapsible panel or side menu by specifying a CSS selector, jQuery selector, or element identifier for connecting interactive toggle functionality; enable or set up an element that triggers opening and closing the responsive panel, sidebar, or drawer on user clicks, taps, or events at initialization for dynamic UI visibility management and responsive layout controls.
</div>

#### Example

    <header>
        <button class="toggle-button"><span class="k-icon k-i-menu"></span></button>
        Logo
    </header>

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel({
            orientation: "top",
            toggleButton: ".toggle-button"
        });
    </script>

## Methods

### close

Closes the responsive panel.


<div class="meta-api-description">
How do I programmatically close a Kendo UI responsive side panel using jQuery? Programmatically hide, collapse, or close a responsive side panel or navigation drawer by triggering a method that updates the panel’s visible or expanded state based on current responsive configurations, breakpoints, or user interactions; this control can be invoked in event handlers, UI actions, or responsive layout changes to dynamically toggle panel visibility, manage interface responsiveness, and adjust layout presentation without direct user input.
</div>

#### Example

    <header>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>
        Logo
    </header>

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel({
            orientation: "top"
        });

        $("#navigation a").click(function(e) {
            e.preventDefault();

            alert("navigating to " + $(e.currentTarget).text());

            var panel = $("#navigation").data("kendoResponsivePanel");
            panel.close();
        });
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo widgets.

> This method does not remove the widget element from DOM.


<div class="meta-api-description">
How to safely remove a Kendo UI ResponsivePanel while keeping its DOM element intact? Safely clean up and teardown a responsive panel or similar UI components by removing event listeners, clearing data attributes to avoid memory leaks, and triggering destroy or dispose methods on child or nested components for complete resource release without deleting the component’s DOM element. This method helps prevent lingering event handlers, manages component lifecycle disposal, and ensures proper cleanup before dynamically removing or replacing UI elements in web applications while maintaining the DOM structure intact. It is useful for controlled component removal, memory management, and event detachment in responsive or nested widget scenarios.
</div>

#### Example

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>

        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel();

        var panel = $("#navigation").data("kendoResponsivePanel");

        panel.destroy();
    </script>

### open

Opens the responsive panel.


<div class="meta-api-description">
How can I programmatically open a hidden Kendo UI panel in my responsive layout? Trigger, activate, or programmatically display a hidden or collapsible sidebar, drawer, or panel component to reveal its content dynamically within responsive layouts, enabling interactive visibility changes based on user events, navigation triggers, or viewport adjustments. This capability supports controlling the expansion or opening state of UI panels, responsive drawer menus, or side navigation elements, allowing developers to set, toggle, or enable the panel's open state via method calls, ensuring content accessibility and seamless interface transitions across different device sizes and interaction patterns.
</div>

#### Example

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button id="open-button"><span class="k-icon k-i-menu"></span></button>
        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel({
            orientation: "top"
        });

        $("#open-button").click(function(e) {
            e.stopPropagation();
            var panel = $("#navigation").data("kendoResponsivePanel");
            panel.open();
        });

        kendo.ui.icon($(".k-i-menu"), {icon: "menu"});
    </script>

## Events

### close

Triggered before the responsive panel is closed. Cancellable.


<div class="meta-api-description">
How can I prevent a Kendo UI Responsive Panel from closing when a user tries to dismiss it? Detect when a collapsible or sliding panel is about to close and provide control to intercept, cancel, or respond to the closing action by running validation checks, prompting users with confirmation dialogs, saving state, or preventing the panel from closing using event handlers that can call preventDefault to block closure, allowing developers to manage UI behavior before the panel hides, dismisses, or collapses in responsive layouts and interactive interfaces.
</div>

#### Example

#### Attach close event handler during initialization

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>

        Content
    </article>

    <script>
        // event handler for close event
        var onClose = function() {
            // the responsive panel is closing
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("closing");
        };

        // attach close event handler during initialization
        $("#navigation").kendoResponsivePanel({
            close: onClose
        });
    </script>

#### Attach close event handler via bind(); detach via unbind()

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>

        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel();

        // event handler for close event
        var onClose = function() {
            // the responsive panel is closing
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("closing");
        };

        // attach close event handler via bind()
        $("#navigation").data("kendoResponsivePanel").bind("close", onClose);
    </script>

### open

Triggered before the responsive panel is opened. Cancellable.


<div class="meta-api-description">
How can I prevent a Kendo UI Responsive Panel from opening automatically? Intercept and control the panel’s opening process by handling the event triggered just before it becomes visible, enabling you to cancel or prevent showing the panel through event cancellation techniques, implement conditional logic such as state checks, user prompts, pre-opening validations, or asynchronous operations to block or delay the panel’s display, configure event listeners to respond to attempts to open and programmatically stop or approve the panel from appearing, manage timing and flow of panel visibility by aborting or allowing its expansion based on dynamic criteria or user interactions.
</div>

#### Example

#### Attach open event handler during initialization

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>

        Content
    </article>

    <script>
        // event handler for open event
        var onOpen = function() {
            // the responsive panel is opening
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("opening");
        };

        // attach open event handler during initialization
        $("#navigation").kendoResponsivePanel({
            open: onOpen
        });
    </script>

#### Attach open event handler via bind(); detach via unbind()

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-menu"></span></button>

        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel();

        // event handler for open event
        var onOpen = function() {
            // the responsive panel is opening
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("opening");
        };

        // attach open event handler via bind()
        $("#navigation").data("kendoResponsivePanel").bind("open", onOpen);
    </script>
