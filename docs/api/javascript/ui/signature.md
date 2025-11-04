---
title: Signature
page_title: Configuration, methods and events of the Signature
description: Code examples and tips how to configure Signature widget, use available methods and events.
res_type: api
component: signature
---

# kendo.ui.Signature

Represents the Kendo UI Signature widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### backgroundColor `String` *(default: "none")*

Gets or sets the background color of the signature.


<div class="meta-api-description">
How can I change the background color in a Kendo UI signature input area? Set, configure, or modify the background color behind drawn strokes in a signature input area using CSS color values such as hex codes, RGB/RGBA values, or named colors to personalize the canvas appearance; retrieve or read this background color dynamically during runtime to detect or respond to changes, control the visual backdrop for signatures, and ensure consistent styling in user interfaces where handwritten input is captured or displayed.
</div>

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            backgroundColor: "red"
        });
    </script>

### color `String` *(default: "#000000")*

The stroke color of the signature.


<div class="meta-api-description">
How can I change the color of lines drawn in a Kendo UI signature input area? Adjust the stroke color for drawing lines in signature input areas by specifying any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors to customize the appearance of pen strokes, ink lines, or digital sign shapes. Control, set, or configure the drawing or pen color dynamically during initialization or runtime to achieve desired signature line colors, ink hues, or stylus effects in digital signature widgets, components, or drawing canvases.
</div>

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            color: "#ed1c24"
        });
    </script>

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.


<div class="meta-api-description">
How do I enable user interaction with the Kendo UI signature input area? Control the ability to activate or deactivate user interaction with the signature input area, allowing or preventing drawing, signing, and input via mouse, touch, or keyboard events; toggle whether the signature field is responsive to user actions, enable or disable input functionality to accept or block handwritten input or digital signatures, control interactivity for capturing user scribbles or sign gestures, and manage whether the component accepts user input for signature capture in forms or applications.
</div>

#### Example - disable the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            enable: false
        });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"
- "none"


<div class="meta-api-description">
How to change signature color rendering style in Kendo UI for jQuery? Set the stroke and shape color rendering style for signatures by choosing how fill is applied, including options to enable solid color filling, flat shading without depth, outline-only rendering without fill, or disabling color rendering entirely. Control stroke and shape visualization by configuring fill modes to achieve filled, flat, outlined, or transparent appearances, allowing customization of signature color presentation, fill style, and rendering effects for different visual preferences or UI themes. Adjust signature drawing color application, fill style configuration, and appearance settings for strokes and shapes using fill rendering options such as solid fill, flat color, outline-only, or no fill, optimizing visual clarity and stylistic control.
</div>

#### Example - sets the fillMode

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            fillMode: "flat"
        });
    </script>

### height `Number`

Determines the height of the signature in pixels.


<div class="meta-api-description">
How do I set the height of a Kendo UI signature input area? Adjust or configure the vertical dimension, height, or pixel size of a signature input area or drawing space to control how much visible canvas is available for user drawing, signature capture, or touch input. Enable setting, changing, or customizing the signature pad’s vertical size or drawing region height in pixels to fit various UI layouts, ensuring appropriate rendering space and responsive input area for signature capture, drawing apps, or touch-based interfaces requiring a configurable height or vertical dimension.
</div>

#### Example - sets the height

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            height: 200
        });
    </script>

### hideLine `Boolean` *(default: false)*

A value indicating whether the dotted line should be displayed in the background.


<div class="meta-api-description">
How do I hide the alignment guide in Kendo UI signature component? Control the visibility of the background alignment guide or dotted grid in signature or drawing components to enable or disable visual aids, such as dotted or dashed lines, that help users align their strokes accurately; configure whether the signature pad shows or hides the faint guide lines behind the canvas for better precision or a cleaner interface, adjusting visual cues for drawing, sketching, or signing by toggling the presence of alignment markers or background patterns.
</div>

#### Example - sets the hideLine

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            hideLine: true
        });
    </script>

### label `String`

Specifies the label that will be rendered on the `k-signature-canvas` element of the component with the `aria-label` attribute.


<div class="meta-api-description">
How do I set the accessible label for the signature drawing area in Kendo UI for jQuery? Configure or set the accessible name, aria-label, or descriptive text for the signature drawing area to improve screen reader support and accessibility on the signature canvas element. Enable custom labeling of the signature input surface to assist users relying on assistive technologies, enhance accessibility metadata, and provide clear, semantic descriptions for voiceover, JAWS, NVDA, or other screen readers. Control how the interactive signature pad is announced by accessibility tools by specifying the text label or accessible description associated with the signature canvas region.
</div>

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            label: "Signature canvas"
        });
    </script>

### maximizable `Boolean` *(default: true)*

A value indicating whether the component can be maximized


<div class="meta-api-description">
How to make a signature interface in Kendo UI maximizable? Control whether the signature interface can be expanded or maximized to fill its container by enabling or disabling resize functionality, allowing users to toggle full-screen view or restrict component growth; configure maximize options, enable or disable the maximize button or action, adjust user ability to enlarge the signature area, set expandable states for better usability, and manage whether the component supports interactive resizing or fixed dimensions.
</div>

#### Example - sets the hideLine

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            maximizable: false
        });
    </script>

### popupScale `Number` *(default: 3)*

Defines a value indicating the scaling size of the popup signature pad


<div class="meta-api-description">
How can I adjust the size of the signature popup in Kendo UI for jQuery to fit different screen sizes? Control the zoom level, scaling factor, or resize amount of a popup signature canvas or drawing area to adjust how large or small the signature input appears on various devices, screens, or display densities; configure the popup size for signature capture, signature pad scaling, or signature window dimensions to ensure optimal user interaction, visibility, and responsiveness on high-resolution, mobile, or desktop environments.
</div>

#### Example - sets the hideLine

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            popupScale: 2
        });
    </script>

### readonly `Boolean` *(default: false)*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly by default and allows user input.


<div class="meta-api-description">
How to make Kendo UI signature component read-only? Prevent user interaction, editing, drawing, or signing input by configuring the signature component to a non-interactive, locked, or read-only mode; enable or set this property to true to disable all user changes, restrict input, turn off editing capabilities, stop signature modifications, or make the signature display static without accepting drawing or touch input, ensuring the component is immutable, unchangeable, or non-editable during initialization or runtime.
</div>

#### Example - make the widget readonly

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            readonly: true
        });
    </script>

### rounded `String` *(default: 'medium')*

Sets a value controlling the border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
How can I adjust the corner style of a signature component in Kendo UI for jQuery? Adjust the corner style and curvature of a signature or avatar component by setting the corner radius, border-radius value, or predefined roundness levels such as small, medium, large, or none. Customize or control the rounded edges to achieve smooth, sharp, or subtle corner shapes, configure the shape's softness or angularity, and tailor the component's visual style by enabling or setting specific numerical radius values or named presets for border rounding during initialization or runtime.
</div>

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            rounded: "large"
        });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
How can I adjust the size of my signature element in Kendo UI for jQuery? Adjust the visual scale or dimensions of the signature element by specifying a numeric dimension or selecting from preset size options like small, medium, large, or none, enabling developers to customize the signature’s rendered width and height, control its compactness or prominence, scale the signature component up or down, set exact pixel or unit sizes for precise layout fitting, and toggle visibility by setting size to none for hiding the signature area.
</div>

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            size: "large"
        });
    </script>

### smooth `Boolean` *(default: false)*

A value indicating whether to smoothen out the signature lines.


<div class="meta-api-description">
How do I reduce jitter in handwritten signatures using Kendo UI for jQuery? Control the stroke smoothing or line stabilization when capturing signatures to reduce jitter, shakiness, or jagged edges in handwritten input, enabling smoother, more fluid, and natural-looking signature lines by adjusting the smoothing effect or enabling stabilization features within the signature capture component to produce polished, refined strokes that better mimic real pen movements and improve the overall visual quality of digital signatures.
</div>

#### Example - create not smooth lines

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            smooth: true
        });
    </script>

### strokeWidth `Number` *(default: 1)*

Defines how wide will the stroke be.


<div class="meta-api-description">
How to adjust stroke thickness in Kendo UI signature control? Adjust the thickness or width of pen strokes when drawing signatures to create fine, delicate lines or bold, prominent marks; configure or set stroke thickness for precise control over line weight, pen size, or brush width in signature capture, enabling customization of how thick or thin the drawn lines appear, suitable for detailed signature input or heavier, more visible strokes in digital handwriting or drawing contexts.
</div>

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            strokeWidth: 4
        });
    </script>

### value `String`*(default: "")*

A string value representing a Base64-encoded PNG image


<div class="meta-api-description">
How do I get the captured signature image as a Base64-encoded PNG string using the Kendo UI Signature widget? Configure, retrieve, store, or transmit a signature image represented as a Base64-encoded PNG string, enabling saving, uploading, binding, displaying, previewing, or sending captured handwritten signatures in various formats and applications. This facilitates persistent storage, API integration, image previews, data binding, and seamless handling of digital signature content within forms, documents, or workflows.
</div>

#### Example - specify value of the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            value: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAD6CAYAAAD+xcJuAAAAAXNSR0IArs4c6QAAEOVJREFUeF7t3b/r7QUdx/GXg4KDf4DQKtgicZWWlsit1BoaGm1qrsGGpsJFh6glHAUFXQQpIppycNOmpAgCh5ZuODjokg1yrpcQLsr9cU6c5/c8vvP5fu7r83i9h5eX6/d733wRIECAAAECBAgQIHD2AvedfUIBCRAgQIAAAQIECBCY4e4ICBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AwGcCD297fNsT265te+gKwlzf9pdt/9j2x20fXsF39EoECBAgQODKChjuV7ZaL3YHAj/a9tIdfP4qfPT9bT/Z9uZVeBnvQIAAAQIELkHAcL+Elr3jlwk8v+1nF0z0w20vX/D7e3UCBAgQIJARMNwzVQl6AoHXtv3gBM+tPfKRm/98ppZbXgIECBAgcFEChvtF1e1lPyfw1LbfEbkh8Idt32ZBgAABAgQInLeA4X7e/Uh3OoHfbnv6dI/PPfnRbX/PpRaYAAECBAhckIDhfkFle9X/Cfjb9luP4bvbDv8x44sAAQIECBA4UwHD/UyLEeukAv62/Vben2578aTqHk6AAAECBAjck4Dhfk98vjko8M1tfwrmPnVkP13m1MKeT4AAAQIE7lHAcL9HQN+eE/jlth/nUp8+8Ne3vXP6P8afQIAAAQIECNytgOF+t3K+ryrw7s3fkFrNf4rch9+k+rVtH5/i4Z5JgAABAgQIHEfAcD+Oo6c0BL6y7Z+NqP/XlIcfBXn4kZC+CBAgQIAAgTMWMNzPuBzRji7w1W1/PfpT2w/8lX861C5QegIECBC4HAHD/XK69qbb/ds+2vYAjBsCb2z7PgsCBAgQIECgIWC4N3qS8ngCf9527XiPyz3pP9ve2/bKtsPftvsiQIAAAQIEIgKGe6QoMY8m8Ny2F+7iaT/f9tZdfN85fcv1bYf/EfWTcwolCwECBAgQIHB7Aob77Tn51NUSeHvbN+7glX6/7Xvb/nsH3+OjBAgQIECAAIGjChjuR+X0sIjAM9te3fbQbeQ9/PjI72z792181kcIECBAgAABAicTMNxPRuvBZy7w2LZfbzv8JtUv+np92y+2/e3M30U8AgQIECBA4AIEDPcLKNkrfqHAg9ue3fbktm/d/NS/tn2w7TfbDsPdFwECBAgQIEDgLAQM97OoQQgCBAgQIECAAAECXy5guLsQAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKfApMoN/uXleriAAAAAElFTkSuQmCC"
        });
    </script>

### width `Number`

Determines the width of the signature in pixels.


<div class="meta-api-description">
How do I adjust the width of the signature input area in Kendo UI for jQuery? Adjust the horizontal dimension, pixel width, or canvas size of a digital signature input area to control its layout, rendering scale, and drawing space; set or configure the width in pixels to determine how wide the signature surface appears, affecting signature capture scaling and presentation within UI components, ensuring proper sizing for user input, visual alignment, and responsive design of signature pads or canvases.
</div>

#### Example - sets the width

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            width: 200
        });
    </script>

## Methods

### close

Closes the popup of the component.


<div class="meta-api-description">
How to programmatically close the Kendo UI signature popup in jQuery? Control the user interface by programmatically closing or dismissing the signature capture popup, hiding the signing dialog instantly without requiring user action, enabling you to manage the display flow, end or interrupt signature input sessions, automate popup dismissal after initialization, resume the normal app layout, or trigger subsequent processes and logic once the signature component is no longer visible.
</div>

#### Example - destroy  the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.open();
        setTimeout(function () {
            signature.close();
        },2000);
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.


<div class="meta-api-description">
How to completely remove and clean up Kendo UI signature component resources? Enable complete cleanup and resource release for signature or drawing components by invoking a method that detaches event listeners, removes associated data attributes, and triggers recursive destruction of any nested or child UI elements to prevent memory leaks and ensure efficient teardown without physically removing the component's DOM element, supporting safe disposal, component lifecycle management, event unbinding, and hierarchical resource cleanup in interactive web applications.
</div>

#### Example - destroy  the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How to dynamically enable or disable user signature capture in Kendo UI for jQuery? Control toggling of user input acceptance and signature capture dynamically by enabling or disabling the signature component without resetting or reinitializing it, allowing you to activate or deactivate the ability for users to sign through method calls like enabling or disabling interaction, input, or capture functionality on demand after setup.
</div>

#### Parameters

##### enable `Boolean`

If set to `true`, the widget will be enabled. If set to `false`, the widget will be disabled.

#### Example - enable the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            enable: false
        });
        var signature = $("#signature").data("kendoSignature");
        signature.enable(true);
    </script>

#### Example - disable the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.enable(false);
    </script>

### open

Opens the popup of the component.


<div class="meta-api-description">
How do I programmatically show the signature capture interface in Kendo UI? Trigger, invoke, or programmatically display the signature input popup or UI on demand by calling the open method after initialization to show the signature capture interface, enable users to start signing with the digital signature component dynamically, activate the signature modal or dialog through code without parameters, and control the visibility or rendering of the signature pad automatically from scripts or event handlers.
</div>

#### Example - destroy  the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.open();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.


<div class="meta-api-description">
How to make Kendo UI signature control read-only? Control the ability to enable or disable user input and drawing on a digital signature interface by setting it into a non-editable or readonly mode, managing interaction dynamically at runtime to lock or unlock input, prevent drawing or mark entry, and toggle between editable and locked states based on application logic or user permissions, allowing developers to programmatically inhibit or allow signature capture, disable input fields, restrict user interaction with the signing area, and switch modes to accommodate workflow events or validation requirements.
</div>

#### Parameters

##### readonly `Boolean`

If set to `true`, the widget will not allow user input. If set to `false`, the widget will allow user input.

#### Example - allow user input

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            readonly: true
        });
        var signature = $("#signature").data("kendoSignature");
        signature.readonly(false);
    </script>

#### Example - make the widget readonly

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.readonly(true);
    </script>

### reset

Removes the current value from the widget


<div class="meta-api-description">
How do I clear a drawn signature in Kendo UI for jQuery? Clear, erase, or reset the drawn signature to an empty, blank state by removing all existing strokes and stored input without destroying or uninitializing the signature capture area, allowing you to set, update, or rebind new signature data, restart signature input, clear prior user annotations, and prepare the signature field for fresh input or re-capture at runtime or via code.
</div>

#### Example - destroy  the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            value: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAD6CAYAAAD+xcJuAAAAAXNSR0IArs4c6QAAEOVJREFUeF7t3b/r7QUdx/GXg4KDf4DQKtgicZWWlsit1BoaGm1qrsGGpsJFh6glHAUFXQQpIppycNOmpAgCh5ZuODjokg1yrpcQLsr9cU6c5/c8vvP5fu7r83i9h5eX6/d733wRIECAAAECBAgQIHD2AvedfUIBCRAgQIAAAQIECBCY4e4ICBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AwGcCD297fNsT265te+gKwlzf9pdt/9j2x20fXsF39EoECBAgQODKChjuV7ZaL3YHAj/a9tIdfP4qfPT9bT/Z9uZVeBnvQIAAAQIELkHAcL+Elr3jlwk8v+1nF0z0w20vX/D7e3UCBAgQIJARMNwzVQl6AoHXtv3gBM+tPfKRm/98ppZbXgIECBAgcFEChvtF1e1lPyfw1LbfEbkh8Idt32ZBgAABAgQInLeA4X7e/Uh3OoHfbnv6dI/PPfnRbX/PpRaYAAECBAhckIDhfkFle9X/Cfjb9luP4bvbDv8x44sAAQIECBA4UwHD/UyLEeukAv62/Vben2578aTqHk6AAAECBAjck4Dhfk98vjko8M1tfwrmPnVkP13m1MKeT4AAAQIE7lHAcL9HQN+eE/jlth/nUp8+8Ne3vXP6P8afQIAAAQIECNytgOF+t3K+ryrw7s3fkFrNf4rch9+k+rVtH5/i4Z5JgAABAgQIHEfAcD+Oo6c0BL6y7Z+NqP/XlIcfBXn4kZC+CBAgQIAAgTMWMNzPuBzRji7w1W1/PfpT2w/8lX861C5QegIECBC4HAHD/XK69qbb/ds+2vYAjBsCb2z7PgsCBAgQIECgIWC4N3qS8ngCf9527XiPyz3pP9ve2/bKtsPftvsiQIAAAQIEIgKGe6QoMY8m8Ny2F+7iaT/f9tZdfN85fcv1bYf/EfWTcwolCwECBAgQIHB7Aob77Tn51NUSeHvbN+7glX6/7Xvb/nsH3+OjBAgQIECAAIGjChjuR+X0sIjAM9te3fbQbeQ9/PjI72z792181kcIECBAgAABAicTMNxPRuvBZy7w2LZfbzv8JtUv+np92y+2/e3M30U8AgQIECBA4AIEDPcLKNkrfqHAg9ue3fbktm/d/NS/tn2w7TfbDsPdFwECBAgQIEDgLAQM97OoQQgCBAgQIECAAAECXy5guLsQAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKfApMoN/uXleriAAAAAElFTkSuQmCC"
        });
        var signature = $("#signature").data("kendoSignature");
        signature.reset();
    </script>

### value

Gets or sets the value of the widget. The value is a Base64-encoded PNG image


<div class="meta-api-description">
How do I get or set the drawn signature image in Kendo UI for jQuery? Retrieve or assign the current drawn signature image by configuring, getting, or setting its value as a Base64-encoded PNG string, enabling seamless export, import, saving, loading, or restoring of signature data for storage, transmission, or integration with backend systems, signature capture, image serialization, digital signing processes, or user authentication workflows using methods to handle encoded signature image data efficiently.
</div>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` the value of the widget.

#### Example - set the value

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.value("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAD6CAYAAAD+xcJuAAAAAXNSR0IArs4c6QAAEOVJREFUeF7t3b/r7QUdx/GXg4KDf4DQKtgicZWWlsit1BoaGm1qrsGGpsJFh6glHAUFXQQpIppycNOmpAgCh5ZuODjokg1yrpcQLsr9cU6c5/c8vvP5fu7r83i9h5eX6/d733wRIECAAAECBAgQIHD2AvedfUIBCRAgQIAAAQIECBCY4e4ICBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AwGcCD297fNsT265te+gKwlzf9pdt/9j2x20fXsF39EoECBAgQODKChjuV7ZaL3YHAj/a9tIdfP4qfPT9bT/Z9uZVeBnvQIAAAQIELkHAcL+Elr3jlwk8v+1nF0z0w20vX/D7e3UCBAgQIJARMNwzVQl6AoHXtv3gBM+tPfKRm/98ppZbXgIECBAgcFEChvtF1e1lPyfw1LbfEbkh8Idt32ZBgAABAgQInLeA4X7e/Uh3OoHfbnv6dI/PPfnRbX/PpRaYAAECBAhckIDhfkFle9X/Cfjb9luP4bvbDv8x44sAAQIECBA4UwHD/UyLEeukAv62/Vben2578aTqHk6AAAECBAjck4Dhfk98vjko8M1tfwrmPnVkP13m1MKeT4AAAQIE7lHAcL9HQN+eE/jlth/nUp8+8Ne3vXP6P8afQIAAAQIECNytgOF+t3K+ryrw7s3fkFrNf4rch9+k+rVtH5/i4Z5JgAABAgQIHEfAcD+Oo6c0BL6y7Z+NqP/XlIcfBXn4kZC+CBAgQIAAgTMWMNzPuBzRji7w1W1/PfpT2w/8lX861C5QegIECBC4HAHD/XK69qbb/ds+2vYAjBsCb2z7PgsCBAgQIECgIWC4N3qS8ngCf9527XiPyz3pP9ve2/bKtsPftvsiQIAAAQIEIgKGe6QoMY8m8Ny2F+7iaT/f9tZdfN85fcv1bYf/EfWTcwolCwECBAgQIHB7Aob77Tn51NUSeHvbN+7glX6/7Xvb/nsH3+OjBAgQIECAAIGjChjuR+X0sIjAM9te3fbQbeQ9/PjI72z792181kcIECBAgAABAicTMNxPRuvBZy7w2LZfbzv8JtUv+np92y+2/e3M30U8AgQIECBA4AIEDPcLKNkrfqHAg9ue3fbktm/d/NS/tn2w7TfbDsPdFwECBAgQIEDgLAQM97OoQQgCBAgQIECAAAECXy5guLsQAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKfApMoN/uXleriAAAAAElFTkSuQmCC");
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect changes to a signature input in Kendo UI? Detect and handle user modifications to signature input such as drawing, erasing, or editing strokes by capturing events triggered when the signature content changes, enabling real-time validation, saving updates, or refreshing the interface whenever the signature is altered, adjusted, or manipulated by user actions within the signature input component, ensuring you can react immediately to edits, input changes, or stroke modifications for dynamic user interaction and data processing.
</div>

#### Example - subscribe to the "change" event after initialization

    <div id="signature"></div>
    <script>
        function signature_change() {
            var value = this.value();
        };
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.bind("change", signature_change);
    </script>

### close

Fired when the value popup of the component is changed


<div class="meta-api-description">
What event is triggered when a Kendo UI signature closes or finishes editing? Detect when a signature input or drawing panel closes or finishes editing to trigger actions, listen for changes in signature value, respond to popup dismissal or modification events, handle updates after signature completion or cancellation, synchronize signature data on closing, capture final signature input events, enable callbacks when signature editing ends, monitor and react to signature dialog or overlay closure, and update application state based on user finishing or altering the signature input component.
</div>

#### Example - subscribe to the "close" event after initialization

    <div id="signature"></div>
    <script>
        function signature_close() {
            console.log("closed");
        };
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.bind("close", signature_close);
    </script>

### open

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to detect user modifications in Kendo UI signature input field? Detect when a user modifies or changes a signature input, trigger custom code or event handlers upon user edits to signature fields, listen for signature updates to validate user input, synchronize data models in response to signature changes, execute functions on signature value changes, control user interaction with signature components, update related interface elements dynamically when signatures are altered, handle events signaling signature alterations for form validation or UI refresh, respond programmatically to user-drawn or updated signatures, and capture live changes to signature data for reactive application behavior or data binding.
</div>

#### Example - subscribe to the "open" event after initialization

    <div id="signature"></div>
    <script>
        function signature_open() {
            console.log("open");
        };
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.bind("open", signature_open);;
    </script>
