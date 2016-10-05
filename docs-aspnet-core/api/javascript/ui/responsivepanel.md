---
title: ResponsivePanel
page_title: Configuration, methods and events of Kendo UI ResponsivePanel
description: Configure the ResponsivePanel UI widget, use methods and explore the events which are triggered upon certain behaviors.
---

# kendo.ui.ResponsivePanel

Represents the Kendo UI ResponsivePanel widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoClose `Boolean` *(default: true)*

If set to `false` the widget will not close when the page content is touched, after it was opened on a mobile device. You will need to call the [close method](#methods-close) when the panel needs to close.

#### Example

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>

        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel({
            autoClose: false
        });
    </script>

### breakpoint `Number` *(default: 640)*

Specifies the page width at which the widget will be hidden and its toggle button will become visible.

#### Example

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>

        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel({
            breakpoint: 1020
        });
    </script>

### orientation `String` *(default: "left")*

Specifies the direction from which the hidden element will open up, once the toggle button has been activated. Valid values are "left", "right", and "top".

#### Example

    <header>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>
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

#### Example

    <header>
        <button class="toggle-button"><span class="k-icon k-i-hbars"></span></button>
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

#### Example

    <header>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>
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

#### Example

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>

        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel();

        var panel = $("#navigation").data("kendoResponsivePanel");

        panel.destroy();
    </script>

### open

Opens the responsive panel.

#### Example

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button id="open-button"><span class="k-icon k-i-hbars"></span></button>
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
    </script>

## Events

### close

Triggered before the responsive panel is closed. Cancellable.

#### Attach close event handler during initialization

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>

        Content
    </article>

    <script>
        // event handler for close event
        var onClose = function() {
            // the responsive panel is closing
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
        <button class="k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>

        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel();

        // event handler for close event
        var onClose = function() {
            // the responsive panel is closing
            console.log("closing");
        };

        // attach close event handler via bind()
        $("#navigation").data("kendoResponsivePanel").bind("close", onClose);
    </script>

### open

Triggered before the responsive panel is opened. Cancellable.

#### Attach open event handler during initialization

    <nav id="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
    </nav>

    <article>
        <button class="k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>

        Content
    </article>

    <script>
        // event handler for open event
        var onOpen = function() {
            // the responsive panel is opening
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
        <button class="k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>

        Content
    </article>

    <script>
        $("#navigation").kendoResponsivePanel();

        // event handler for open event
        var onOpen = function() {
            // the responsive panel is opening
            console.log("opening");
        };

        // attach open event handler via bind()
        $("#navigation").data("kendoResponsivePanel").bind("open", onOpen);
    </script>
