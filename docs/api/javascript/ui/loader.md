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


<div class="meta-api-description">
Customize, set, or configure localized text strings, translations, or language-specific messages for loading indicators, spinners, progress displays, or Loader UI components; enable internationalization, multilingual support, or override default loading messages and prompts in various languages and formats to control user-facing text during asynchronous operations or content fetching phases.
</div>

#### Example

    <div id="loader"></nav>

	<script>
        $('#loader').kendoLoader({
            messages: { loading: 'Loading' }
        });
	</script>

### messages.loading `String` *(default: "Loading")*

The aria label text for the loader.


<div class="meta-api-description">
Set or customize the accessible label text that describes a loading or processing state for screen readers and assistive technologies, enabling clear communication of progress, wait status, or busy indicators, with options to define or control the spoken message during loading, updating, or resource fetching phases.
</div>

#### Example

    <div id="loader"></nav>

	<script>
        $('#loader').kendoLoader({
            messages: { loading: 'Loading data' }
        });
	</script>

### size  `String` *(default: 'medium')*

Specifies the size of the loader. Valid options are `small`, `medium` and `large`.


<div class="meta-api-description">
Adjust the visual dimensions, scale, or footprint of the loading spinner or progress indicator by setting its size to small, medium, or large to control how prominent, noticeable, or subtle the loader appears in the user interface; this setting enables customization of the loader’s display scale, enabling developers to configure, set, or modify the loader’s visual presence and responsiveness to fit various design layouts, screen sizes, or user experience preferences for indicating loading status or processing activity.
</div>

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


<div class="meta-api-description">
Set or configure the loader color using theme-driven hues, including primary, secondary, tertiary, info, success, warning, error, dark, light, or inverse shades to ensure consistent visual feedback and semantic meaning in user interfaces; apply accent and semantic color variants to control loader styling that adapts to UI themes, toggles between light and dark modes, supports status indicators like success or error, and maintains visual emphasis or inversion based on background luminance, enabling developers to customize loader appearance for different states, accessibility, and branding requirements.
</div>

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


<div class="meta-api-description">
Configure and customize the loading animation style by selecting from various predefined visual patterns such as pulsing circles, infinite spinners with rotating multiple circles, or converging spinner animations where shapes rotate and merge centrally, enabling control over the appearance and behavior of loading indicators, progress animations, and spinners for user interface feedback during asynchronous operations or data fetching.
</div>

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


<div class="meta-api-description">
Toggle the display or visibility of a loading spinner or progress indicator, control whether a loader or loading animation is shown or hidden, enable or disable the presence of a loading overlay, set a flag to show the loading status during data fetching or processing, manage visibility state to display or conceal an activity indicator, configure whether a loader component is visible or hidden during asynchronous operations, switch the loading indicator on or off, manipulate the boolean state to control if loading animations appear on the screen, define the appearance or absence of a progress loader while content is loading, and set visibility for UI feedback elements that inform users about ongoing background tasks.
</div>

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


<div class="meta-api-description">
Set, get, or modify the loader's color dynamically during runtime by specifying or retrieving the current color value, including CSS color strings, hex codes, or color names, enabling control over visual appearance, theming, styling, customization, or real-time color updates for loading indicators and spinners.
</div>

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


<div class="meta-api-description">
Control hiding or dismissing the loading indicator or spinner programmatically by invoking a method that stops showing the loading animation and overlay, enabling the interface to return to its normal interactive state; configure your app to cancel or remove the visible loading element from code after initialization or background tasks complete, allowing developers to programmatically disable or conceal progress spinners, overlays, or loaders and resume standard UI behavior when loading is finished, hidden, or no longer needed.
</div>

#### Example

    <button>Button <span id="loader"></span></button>
    <script>
        var loader = $('#loader').kendoLoader().data('kendoLoader');

        loader.hide();
    </script>


### setOptions

Modifies the initial configuration of the loader


<div class="meta-api-description">
Modify or update the loader’s configuration, settings, appearance, behavior, or displayed messages dynamically at runtime by applying a new options object to the existing loader instance without recreating it; control, customize, enable, disable, or adjust any configurable parameters, properties, or features after initialization to change loading indicators, animations, styles, text, and other behaviors on the fly in applications.
</div>

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


<div class="meta-api-description">
Trigger or enable a loading indicator, spinner, or visual overlay to signal ongoing operations, processing, or asynchronous tasks by activating or displaying a progress loader programmatically. Control visibility of progress animations during data fetching, background tasks, or UI waits by showing or turning on loading spinners, overlays, or progress indicators dynamically through methods that start or reveal loading states, often used before hiding or dismissing once the process completes.
</div>

#### Example

    <button>Button <span id="loader"></span></button>
    <script>
        var loader =  $('#loader').kendoLoader({
            visible: false
        }).data('kendoLoader');

        loader.show();
    </script>



