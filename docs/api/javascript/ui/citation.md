---
title: Citation
description: Configuration, methods and events of the Kendo UI Citation
res_type: api
component: Citation
---

# kendo.ui.Citation

Represents the Kendo UI Citation widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### sources `Array` *(default: [])*

An array of source objects displayed in the popover. Each source object can include `url`, `title`, and `description` properties.

<div class="meta-api-description">
Provide the list of referenced sources displayed in the citation popover, configure the collection of links, articles, or web pages associated with a citation chip, supply the array of source objects containing URLs, titles, and descriptions for the popover, set the data behind a citation component, or bind multiple references to the widget so users can navigate between them.
</div>

#### Example - set sources

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [
            {
                url: "https://docs.telerik.com",
                title: "Telerik Docs",
                description: "Official documentation."
            }
        ]
    });
    </script>

### sources.url `String`

The URL of the source. Rendered as a link in the popover.

<div class="meta-api-description">
Set the hyperlink or web address for an individual citation source, configure the URL displayed and linked in the popover, provide the href for a reference source shown when the citation chip is opened, or supply the web address used both for rendering the source link and for automatically deriving the chip label hostname.
</div>

#### Example - set source URLs

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [
            { url: "https://example.com", title: "Example" }
        ]
    });
    </script>

### sources.title `String`

The title of the source, displayed above the source link in the popover.

<div class="meta-api-description">
Set a title or heading for an individual citation source shown in the popover, configure the display name of a referenced article or page, provide the name label rendered above the URL link in the popover view, or supply a descriptive title for a citation reference entry.
</div>

#### Example - set source titles

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [
            { url: "https://example.com", title: "Example Site" }
        ]
    });
    </script>

### sources.description `String`

A short description of the source, displayed below the source link in the popover.

<div class="meta-api-description">
Add a brief description or excerpt for an individual citation source shown in the popover, configure the supporting text rendered below the source link, provide a summary or annotation for a reference entry, or supply descriptive text that gives context for a cited source in the popover body.
</div>

#### Example - set source descriptions

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [
            {
                url: "https://example.com",
                title: "Example",
                description: "A sample reference."
            }
        ]
    });
    </script>

### label `String` *(default: null)*

The text label displayed on the chip. When `null`, the hostname of the first source URL is used automatically.

<div class="meta-api-description">
Set a custom text label for the citation chip, override the automatically derived hostname label with a specific string, configure what text is displayed on the chip button, control the visible name on the citation chip regardless of source URLs, or provide a fixed label when automatic hostname derivation is not desired.
</div>

#### Example - set a custom label

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        label: "Source 1",
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    </script>

### svgIcon `String` *(default: "globe")*

The name of the SVG icon displayed on the chip.

<div class="meta-api-description">
Set or change the icon displayed on the citation chip button, configure the SVG icon name for the chip indicator, specify a Kendo UI icon to represent the citation type, customize the visual symbol on the chip, or adjust the graphic shown on the citation chip element.
</div>

#### Example - set the chip icon

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        svgIcon: "file-pdf",
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    </script>

### showAdditionalCount `Boolean` *(default: true)*

When `true` and more than one source is present, a `+N` count is appended to the chip label showing the number of additional sources.

<div class="meta-api-description">
Show or hide the additional sources count appended to the citation chip label, configure whether a "+N" indicator is displayed when multiple sources are present, control the display of the extra source count on the chip, enable or disable the badge showing how many more references are available, or toggle the supplementary count next to the chip label.
</div>

#### Example - hide the additional count

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        showAdditionalCount: false,
        sources: [
            { url: "https://example.com", title: "A" },
            { url: "https://example.org", title: "B" }
        ]
    });
    </script>

### showOn `String` *(default: "hover")*

Determines when the popover is shown. Valid values are `"hover"` and `"click"`.

<div class="meta-api-description">
Configure when the citation popover opens, set the trigger mode for the popover to hover or click, control whether hovering over the chip or clicking it shows the sources popover, choose between hover-triggered and click-triggered popover display, or specify the interaction that reveals the citation source details.
</div>

#### Example - show the popover on click

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        showOn: "click",
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    </script>

### sourceIcon `String` *(default: "globe")*

The name of the SVG icon used for source links inside the popover.

<div class="meta-api-description">
Set the icon displayed next to source URLs in the citation popover, configure the default icon for source link entries, specify a Kendo UI icon to represent each referenced source in the popover list, or customize the graphic shown beside each URL link in the popover body.
</div>

#### Example - set the source link icon

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sourceIcon: "link",
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    </script>

### sourceSVGIcon `String` *(default: null)*

Overrides `sourceIcon` with a specific SVG icon name for source links inside the popover.

<div class="meta-api-description">
Override the default source link icon with a specific named SVG icon in the citation popover, configure a custom SVG icon name for the source URL indicators, replace the sourceIcon with a more specific icon for source links in the popover, or set a named Kendo UI SVG icon to use for every source entry in the popover.
</div>

#### Example - set a custom source SVG icon

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sourceSVGIcon: "pdf",
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    </script>

### popoverWidth `Number` *(default: 318)*

The width of the sources popover in pixels.

<div class="meta-api-description">
Set the width of the citation sources popover, configure how wide the popup displaying the referenced sources is, control the pixel width of the popover panel that appears when the chip is hovered or clicked, resize the popover to fit more or less content, or specify the popover dimension in pixels.
</div>

#### Example - set the popover width

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        popoverWidth: 400,
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    </script>

### bodyTemplate `Function` *(default: null)*

A function used to render the entire popover body. Receives `{ sources: [] }` as the first argument and must return an HTML string. When set, the built-in navigation buttons and source layout are not rendered.

<div class="meta-api-description">
Provide a fully custom Kendo template for the citation popover body, replace the built-in source navigation and layout with custom HTML, configure a bespoke popover design showing citation references, use a function to control the complete structure of the sources popup, or supply custom markup that receives the sources array and renders it according to application requirements.
</div>

#### Example - use a custom body template

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        bodyTemplate: function(data) {
            return "<span>" + kendo.htmlEncode(data.sources[0].title) + "</span>";
        },
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    </script>

### messages `Object`

Contains the localizable text strings used by the widget.

<div class="meta-api-description">
Localize or customize the text labels used in the Citation widget, configure the accessible labels for the navigation buttons in the popover, set translated strings for the previous and next source actions, or override default English text for internationalization of the citation component.
</div>

#### Example - set messages

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [
            { url: "https://example.com", title: "A" },
            { url: "https://example.org", title: "B" }
        ],
        messages: {
            previousSourceAction: "Prev",
            nextSourceAction: "Next"
        }
    });
    </script>

### messages.previousSourceAction `String` *(default: "Previous source")*

The accessible label for the previous source navigation button in the popover.

<div class="meta-api-description">
Set the aria-label or accessible name for the previous source button in the citation popover, localize or customize the label for the back navigation control, configure the text that screen readers announce for the previous button, or override the default "Previous source" text with a translated value.
</div>

#### Example - set the previous button label

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [
            { url: "https://example.com", title: "A" },
            { url: "https://example.org", title: "B" }
        ],
        messages: {
            previousSourceAction: "Back"
        }
    });
    </script>

### messages.nextSourceAction `String` *(default: "Next source")*

The accessible label for the next source navigation button in the popover.

<div class="meta-api-description">
Set the aria-label or accessible name for the next source button in the citation popover, localize or customize the label for the forward navigation control, configure the text that screen readers announce for the next button, or override the default "Next source" text with a translated value.
</div>

#### Example - set the next button label

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [
            { url: "https://example.com", title: "A" },
            { url: "https://example.org", title: "B" }
        ],
        messages: {
            nextSourceAction: "Forward"
        }
    });
    </script>

## Methods

### open

Opens the sources popover. Fires the `open` event before opening; calling `e.preventDefault()` in the event handler prevents the popover from showing.

<div class="meta-api-description">
Programmatically open the citation popover to display the sources, show the references panel without user hover or click interaction, trigger the popover display from code, call open to reveal source details on demand, or open the citation popup as part of an automated workflow.
</div>

#### Example - open the popover

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    var citation = $("#citation").data("kendoCitation");
    citation.open();
    </script>

### close

Closes the sources popover.

<div class="meta-api-description">
Programmatically close the citation popover, hide the sources panel without user interaction, dismiss the references popup from code, call close to conceal source details on demand, or close the citation popup as part of an automated workflow or custom trigger.
</div>

#### Example - close the popover

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        showOn: "click",
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    var citation = $("#citation").data("kendoCitation");
    citation.open();
    citation.close();
    </script>

### setOptions

Reconfigures the widget with new options, re-rendering the chip and popover.

<div class="meta-api-description">
Dynamically change the configuration of a citation widget after initialization, update sources, labels, or other options at runtime, reconfigure the chip and popover with new settings without recreating the widget, replace citation data or appearance options after the component has been initialized, or apply new options that trigger a full re-render of the citation chip and popover.
</div>

#### Parameters

##### options `Object`

The new options to apply.

#### Example - update the sources

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [{ url: "https://example.com", title: "Old Source" }]
    });
    var citation = $("#citation").data("kendoCitation");
    citation.setOptions({
        sources: [{ url: "https://example.org", title: "New Source" }]
    });
    </script>

### destroy

Prepares the **Citation** for safe removal from DOM. Detaches all event handlers, destroys internal components, and removes jQuery.data attributes to avoid memory leaks.

> **Important:** This method does not remove the Citation element from DOM.

<div class="meta-api-description">
Clean up and safely remove a citation widget, detach all event listeners and internal handlers, destroy the internally created chip and popup components, prevent memory leaks when removing the citation from the page, or release all resources held by the citation component before DOM removal.
</div>

#### Example - destroy the widget

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    var citation = $("#citation").data("kendoCitation");
    citation.destroy();
    </script>

## Events

### open

Fired before the sources popover opens. Calling `e.preventDefault()` prevents the popover from being shown.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

<div class="meta-api-description">
React before the citation popover is displayed, intercept and cancel the opening of the sources panel by calling preventDefault, handle the show event of the citation popup, execute custom logic whenever the citation chip is activated and the popover is about to appear, or inspect the sources array before the references are shown to the user.
</div>

#### Event Data

##### e.sources `Array`

The current sources array configured on the widget.

##### e.preventDefault `Function`

If invoked, prevents the popover from opening.

##### e.sender `kendo.ui.Citation`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [{ url: "https://example.com", title: "Example" }],
        open: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.sources.length);
        }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <span id="citation"></span>
    <script>
    $("#citation").kendoCitation({
        sources: [{ url: "https://example.com", title: "Example" }]
    });
    var citation = $("#citation").data("kendoCitation");
    citation.bind("open", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.sources.length);
    });
    </script>
