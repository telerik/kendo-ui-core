---
title: Signature
description: Configuration, methods and events of the Signature
description: Code examples and tips how to configure Signature widget, use available methods and events.
res_type: api
component: signature
---

# kendo.ui.Signature

Represents the Kendo UI Signature widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### backgroundColor `String` *(default: "none")*

Gets or sets the background color of the signature.

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            backgroundColor: "red"
        });
    </script>

### color `String` *(default: "#000000")*

The stroke color of the signature.

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            color: "#ed1c24"
        });
    </script>

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

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

#### Example - sets the fillMode

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            fillMode: "flat"
        });
    </script>

### height `Number`

Determines the height of the signature in pixels.

#### Example - sets the height

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            height: 200
        });
    </script>

### hideLine `Boolean` *(default: false)*

A value indicating whether the dotted line should be displayed in the background.

#### Example - sets the hideLine

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            hideLine: true
        });
    </script>

### label `String`

Specifies the label that will be rendered on the `k-signature-canvas` element of the component with the `aria-label` attribute.

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            label: "Signature canvas"
        });
    </script>

### maximizable `Boolean` *(default: true)*

A value indicating whether the component can be maximized

#### Example - sets the hideLine

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            maximizable: false
        });
    </script>

### popupScale `Number` *(default: 3)*

Defines a value indicating the scaling size of the popup signature pad

#### Example - sets the hideLine

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            popupScale: 2
        });
    </script>

### readonly `Boolean` *(default: false)*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly by default and allows user input.

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

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            size: "large"
        });
    </script>

### smooth `Boolean` *(default: false)*

A value indicating whether to smoothen out the signature lines.

#### Example - create not smooth lines

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            smooth: true
        });
    </script>

### strokeWidth `Number` *(default: 1)*

Defines how wide will the stroke be.

#### Example

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            strokeWidth: 4
        });
    </script>

### value `String`*(default: "")*

A string value representing a Base64-encoded PNG image

#### Example - specify value of the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({
            value: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAD6CAYAAAD+xcJuAAAAAXNSR0IArs4c6QAAEOVJREFUeF7t3b/r7QUdx/GXg4KDf4DQKtgicZWWlsit1BoaGm1qrsGGpsJFh6glHAUFXQQpIppycNOmpAgCh5ZuODjokg1yrpcQLsr9cU6c5/c8vvP5fu7r83i9h5eX6/d733wRIECAAAECBAgQIHD2AvedfUIBCRAgQIAAAQIECBCY4e4ICBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AwGcCD297fNsT265te+gKwlzf9pdt/9j2x20fXsF39EoECBAgQODKChjuV7ZaL3YHAj/a9tIdfP4qfPT9bT/Z9uZVeBnvQIAAAQIELkHAcL+Elr3jlwk8v+1nF0z0w20vX/D7e3UCBAgQIJARMNwzVQl6AoHXtv3gBM+tPfKRm/98ppZbXgIECBAgcFEChvtF1e1lPyfw1LbfEbkh8Idt32ZBgAABAgQInLeA4X7e/Uh3OoHfbnv6dI/PPfnRbX/PpRaYAAECBAhckIDhfkFle9X/Cfjb9luP4bvbDv8x44sAAQIECBA4UwHD/UyLEeukAv62/Vben2578aTqHk6AAAECBAjck4Dhfk98vjko8M1tfwrmPnVkP13m1MKeT4AAAQIE7lHAcL9HQN+eE/jlth/nUp8+8Ne3vXP6P8afQIAAAQIECNytgOF+t3K+ryrw7s3fkFrNf4rch9+k+rVtH5/i4Z5JgAABAgQIHEfAcD+Oo6c0BL6y7Z+NqP/XlIcfBXn4kZC+CBAgQIAAgTMWMNzPuBzRji7w1W1/PfpT2w/8lX861C5QegIECBC4HAHD/XK69qbb/ds+2vYAjBsCb2z7PgsCBAgQIECgIWC4N3qS8ngCf9527XiPyz3pP9ve2/bKtsPftvsiQIAAAQIEIgKGe6QoMY8m8Ny2F+7iaT/f9tZdfN85fcv1bYf/EfWTcwolCwECBAgQIHB7Aob77Tn51NUSeHvbN+7glX6/7Xvb/nsH3+OjBAgQIECAAIGjChjuR+X0sIjAM9te3fbQbeQ9/PjI72z792181kcIECBAgAABAicTMNxPRuvBZy7w2LZfbzv8JtUv+np92y+2/e3M30U8AgQIECBA4AIEDPcLKNkrfqHAg9ue3fbktm/d/NS/tn2w7TfbDsPdFwECBAgQIEDgLAQM97OoQQgCBAgQIECAAAECXy5guLsQAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKGe6AkEQkQIECAAAECBAgY7m6AAAECBAgQIECAQEDAcA+UJCIBAgQIECBAgAABw90NECBAgAABAgQIEAgIGO6BkkQkQIAAAQIECBAgYLi7AQIECBAgQIAAAQIBAcM9UJKIBAgQIECAAAECBAx3N0CAAAECBAgQIEAgIGC4B0oSkQABAgQIECBAgIDh7gYIECBAgAABAgQIBAQM90BJIhIgQIAAAQIECBAw3N0AAQIECBAgQIAAgYCA4R4oSUQCBAgQIECAAAEChrsbIECAAAECBAgQIBAQMNwDJYlIgAABAgQIECBAwHB3AwQIECBAgAABAgQCAoZ7oCQRCRAgQIAAAQIECBjuboAAAQIECBAgQIBAQMBwD5QkIgECBAgQIECAAAHD3Q0QIECAAAECBAgQCAgY7oGSRCRAgAABAgQIECBguLsBAgQIECBAgAABAgEBwz1QkogECBAgQIAAAQIEDHc3QIAAAQIECBAgQCAgYLgHShKRAAECBAgQIECAgOHuBggQIECAAAECBAgEBAz3QEkiEiBAgAABAgQIEDDc3QABAgQIECBAgACBgIDhHihJRAIECBAgQIAAAQKGuxsgQIAAAQIECBAgEBAw3AMliUiAAAECBAgQIEDAcHcDBAgQIECAAAECBAIChnugJBEJECBAgAABAgQIGO5ugAABAgQIECBAgEBAwHAPlCQiAQIECBAgQIAAAcPdDRAgQIAAAQIECBAICBjugZJEJECAAAECBAgQIGC4uwECBAgQIECAAAECAQHDPVCSiAQIECBAgAABAgQMdzdAgAABAgQIECBAICBguAdKEpEAAQIECBAgQICA4e4GCBAgQIAAAQIECAQEDPdASSISIECAAAECBAgQMNzdAAECBAgQIECAAIGAgOEeKElEAgQIECBAgAABAoa7GyBAgAABAgQIECAQEDDcAyWJSIAAAQIECBAgQMBwdwMECBAgQIAAAQIEAgKfApMoN/uXleriAAAAAElFTkSuQmCC"
        });
    </script>

### width `Number`

Determines the width of the signature in pixels.

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

#### Example - destroy  the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true`, the widget will be enabled. If set to `false`, the widget will be disabled.

#### Example - enable the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature({}
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

#### Example - destroy  the widget

    <div id="signature"></div>
    <script>
        $("#signature").kendoSignature();
        var signature = $("#signature").data("kendoSignature");
        signature.open();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

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
