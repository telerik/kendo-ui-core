---
title: Loader
description: Configuration, methods and events of the Kendo UI Loader
res_type: api
component: loader
---

# kendo.ui.Loader

Represents the Kendo UI Loader widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### messages `Object`

Allows localization of the strings that are used in the widget.

#### Example

    <div id="loader"></nav>

	<script>
        $('#loader').kendoLoader({
            messages: { loading: 'Loading' }
        });
	</script>

### messages.loading `String` *(default: "Loading")*

The aria label text for the loader.

#### Example

    <div id="loader"></nav>

	<script>
        $('#loader').kendoLoader({
            messages: { loading: 'Loading data' }
        });
	</script>

### size  `String` *(default: 'medium')*

Specifies the size of the loader. Valid options are `small`, `medium` and `large`.

#### Example

    <span id="loader-small">Small loader</span>
    <span id="loader-medium">Medium loader</span>
    <span id="loader-large">Large loader</span>
    <script>
        $('#loader-small').kendoLoader({ size: 'small' });
        $('#loader-medium').kendoLoader({ size: 'medium' });
        $('#loader-large').kendoLoader({ size: 'large' });
    </script>

### themeColor `String` *(default: 'primary')*

Specifies the color of the component. Valid options are

* `primary`:  apply coloring based on **primary** theme color.
* `secondary`: apply coloring based on **secondary** theme color.
* `tertiary`: apply coloring based on **tertiary** theme color.
* `info`: apply coloring based on **info** theme color.
* `success`: apply coloring based on **success** theme color.
* `warning`:apply coloring based on **warning** theme color.
* `error`: apply coloring based on **error** theme color.
* `dark`: apply coloring based on **dark** theme color.
* `light`: always coloring based on **light** theme color.
* `inverse`: depending on the luminance of the theme, light or dark, inverted will be dark or light.

#### Example

    <span id="loader-primary"></span>
    <span id="loader-secondary"></span>
    <span id="loader-tertiary"></span>
    <span id="loader-info"></span>
    <span id="loader-success"></span>
    <span id="loader-warning"></span>
    <span id="loader-error"></span>
    <span id="loader-dark"></span>
    <span id="loader-light"></span>
    <span id="loader-inverse"></span>

    <script>
        $('#loader-primary').kendoLoader({ themeColor: 'primary' });
        $('#loader-secondary').kendoLoader({ themeColor: 'secondary' });
        $('#loader-tertiary').kendoLoader({ themeColor: 'tertiary' });
        $('#loader-info').kendoLoader({ themeColor: 'info' });
        $('#loader-success').kendoLoader({ themeColor: 'success' });
        $('#loader-warning').kendoLoader({ themeColor: 'warning' });
        $('#loader-error').kendoLoader({ themeColor: 'error' });
        $('#loader-dark').kendoLoader({ themeColor: 'dark' });
        $('#loader-light').kendoLoader({ themeColor: 'light' });
        $('#loader-inverse').kendoLoader({ themeColor: 'inverse' });
    </script>


### type `String` *(default: 'pulsing')*

Specifies the type of the component. Valid options are

* `pulsing`: two pulsating circles.
* `infinite-spinner`: three circles moving counterclockwise.
* `converging-spinner`: four circles positioned as square rotate clockwise and unite at the center position.

#### Example

    <span id="loader-pulsing"></span>
    <span id="loader-infinite-spinner"></span>
    <span id="loader-converging-spinner"></span>

    <script>
        $('#loader-pulsing').kendoLoader({ type: 'pulsing' });
        $('#loader-infinite-spinner').kendoLoader({ type: 'infinite-spinner' });
        $('#loader-converging-spinner').kendoLoader({ type: 'converging-spinner' });
    </script>


### visible `Boolean` *(default: true)*

If set to false the loader will not be displayed.

#### Example

    <button>Loading... <span id="loader"></span></button>
    <script>
        $('#loader').kendoLoader({
            visible: false
        });
    </script>

## Methods


### themeColor

Gets or sets the color of the loader.

#### Parameters

##### color `String`

See [`loader.options.themeColor`](/api/javascript/ui/loader/configuration/themeColor) for valid options.

#### Example

Set loader color after initialization.

    <span id="loader"></span>

    <script>
        var loader = $('#loader').kendoLoader({ themeColor: 'secondary' }).data('kendoLoader');

        window.setTimeout(function() {
            loader.themeColor('primary');
        }, 1000);
    </script>


### hide

Hides the loader.

#### Example

    <button>Button <span id="loader"></span></button>
    <script>
        var loader = $('#loader').kendoLoader().data('kendoLoader');

        loader.hide();
    </script>


### setOptions

Modifies the initial configuration of the loader

#### Parameters

##### options `Object`

The new options.

#### Example

    <button>Button <span id="loader"></span></button>
    <script>
        var loader =  $('#loader').kendoLoader({
            visible: false,
            themeColor:'secondary'
        }).data('kendoLoader');

        loader.setOptions({
            visible: true,
            themeColor: 'tertiary'
        });
    </script>


### show

Shows the loader.

#### Example

    <button>Button <span id="loader"></span></button>
    <script>
        var loader =  $('#loader').kendoLoader({
            visible: false
        }).data('kendoLoader');

        loader.show();
    </script>



