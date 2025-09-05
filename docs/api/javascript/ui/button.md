---
title: Button
description: Configuration, methods and events of the Kendo UI Button
res_type: api
component: button
---

# kendo.ui.Button

Represents the Kendo UI Button widget. Inherits from [Widget](/api/javascript/ui/widget).


## Configuration

### badge `Boolean|String|Number|Object`

If set to true a default overlay badge will be displayed. If set to a string, an ovelay with content set to the specified string will be displayed. Can be set to a JavaScript object which represents the configuration of the [`Badge widget`](/api/javascript/ui/badge).

#### Example - Various badge settings

    <div style="padding: 10px; background: #cccccc;">
        <button id="button" type="button">Foo</button>
    </div>
    <script>
        $("#button").kendoButton({
            badge: {
                text: 1234,
                max: 99,
                themeColor: "warning",
                shape: "circle",
                cutoutBorder: true
            }
        });
    </script>


### badge.align `String` *(default: '')*

Specifies alignment of the badge relative to button. Valid position options are: `top start`, `top end`, `bottom start`, `bottom end`.

`badge.align` works in conjunction with [`badge.position`](/api/javascript/ui/button/configuration/badge.position).

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "5",
          position: "edge",
          align: "top end"
        }
      });
    </script>

### badge.cutoutBorder `Boolean` *(default: false)*

Specifies wether or not to render additional "cutout" border around the badge.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "New",
          cutoutBorder: true
        }
      });
    </script>

### badge.fillMode `String` *(default: 'solid')*

Specifies how theme colors apply to a badge. Valid options are `solid` (default) and `outline`.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "3",
          fillMode: "outline",
          themeColor: "primary"
        }
      });
    </script>

### badge.icon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the badge by a `span.k-icon` or `span.k-svg-icon` element.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          icon: "check",
          themeColor: "success"
        }
      });
    </script>

### badge.max `Number` *(default: Infinity)*

If `text` is a number, it will cap that number.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: 150,
          max: 99
        }
      });
    </script>

### badge.position `String` *(default: 'edge')*

Specifies position of the badge relative to the edge of the button. Valid placemnt options are: `inline`, `edge`, `inside`, `outside`.

Note: position configuration, other than `inline`, requires the badge to be aligned. See [`badge.align`](/api/javascript/ui/button/configuration/badge.align) for more details.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "8",
          position: "inside",
          align: "bottom end"
        }
      });
    </script>

### badge.shape `String` *(default: 'rounded')*

Specifies the shape of the badge. Valid options are: `rectangle`, `rounded`, `pill`, `circle`, `dot`.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "7",
          shape: "circle"
        }
      });
    </script>

### badge.size  `String` *(default: 'medium')*

Specifies the size of the badge. Valid options are `small`, `medium` and `large`.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "10",
          size: "large"
        }
      });
    </script>

### badge.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the badge.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          template: (data) => `${data.value}+`,
          text: 42
        }
      });
    </script>

### badge.text `String|Number` *(default: '')*

The text of the badge. Valid input includes `string`, `number` or `object` with `toString` method. Default is empty string.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "New",
          themeColor: "info"
        }
      });
    </script>


### badge.themeColor `String` *(default: 'secondary')*

Specifies the color of the component. Valid options are `inherit`, `default`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `dark`, `light`, `inverted`.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "Alert",
          themeColor: "warning"
        }
      });
    </script>

### badge.visible `Boolean` *(default: true)*

If set to false the badge will not be displayed.

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: 21,
          visible: false
        }
      });
    </script>

### enable `Boolean` *(default: true)*

Indicates whether the **Button** should be enabled or disabled. By default, it is enabled, unless a `disabled="disabled"` attribute is detected.

#### Example

    <button id="button" type="button">Foo</button>
    <script>
    $("#button").kendoButton({
        enable: false
    });
    </script>


### fillMode `String` *(default: 'solid')*

Controls how the color is applied to the button. Valid values are: `"solid"`, `"outline"`, `"flat"`, `"link"`, and `"none"`. Default value is `"solid"`.

#### Example

    <button id="button" type="button">Cancel</button>
    <script>
        $("#button").kendoButton({
            fillMode: "outline"
        });
    </script>

### icon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be applied as background image of a `span` element inside the **Button**.
The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-icon` CSS class applied.
For a list of available icon names, please refer to the [Icon Button article](https://docs.telerik.com/kendo-ui/controls/button/icons).

#### Example

    <button id="button" type="button">Cancel</button>
    <script>
    $("#button").kendoButton({
        icon: "cancel"
    });
    </script>

#### Example with an existing span element

    <button id="button" type="button">
        <span class="k-icon"></span> Cancel
    </button>
    <script>
    $("#button").kendoButton({
        icon: "cancel"
    });
    </script>


### iconClass `String`

Defines a CSS class - or multiple classes separated by spaced - which are applied to a `span` element inside the **Button**. Allows the usage of custom icons.

#### Example

    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
    <button id="button" type="button">Cancel</button>
    <script>
        $("#button").kendoButton({
            iconClass: "fa fa-male"
        });
    </script>

### imageUrl `String`

Defines a URL, which will be used for an `img` element inside the Button. The URL can be relative or absolute. In case it is relative, it will be evaluated with relation to the web page URL.

The `img` element can be added automatically by the widget, or an existing element can be used, if it has a `k-image` CSS class applied.

#### Example

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton({
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/treeview/edit.png"
        });
    </script>

#### Example with an existing img element

    <button id="button" type="button">
        <img class="k-image" alt="Edit" /> Edit
    </button>
    <script>
        $("#button").kendoButton({
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/treeview/edit.png"
        });
    </script>

### rounded `String` *(default: 'medium')*

Controls what border radius is applied to a button. Valid values are: `"small"`, `"medium"`, `"large"`, `"full"`, and `"none"`. Default value is `"medium"`.

#### Example

    <button id="button" type="button">Cancel</button>
    <script>
        $("#button").kendoButton({
            rounded: "full"
        });
    </script>

### size `String` *(default: 'medium')*

Controls the overall physical size of a button. Valid values are:  `"small"`, `"medium"`, `"large"`, and `"none"`. Default value is `"medium"`.

#### Example

    <button id="button" type="button">Cancel</button>
    <script>
        $("#button").kendoButton({
            size: "large"
        });
    </script>

### spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a `span` element inside the **Button**.
In case you want to use an icon from the Kendo UI theme sprite background image, it is easier to use the [`icon` property](/api/javascript/ui/button#configuration-icon).

The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-sprite` CSS class applied.

#### Example

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton({
            spriteCssClass: "myEditIcon"
        });
    </script>

#### Example with an existing span element

    <button id="button" type="button">
        <span class="k-sprite"></span> Edit
    </button>
    <script>
        $("#button").kendoButton({
            spriteCssClass: "myEditIcon"
        });
    </script>

### themeColor `String` *(default: 'base')*

Controls the main color applied to the button. Valid values are:  `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"dark"`, `"light"`, `"inverse"`, and `"none"`. Default value is `"base"`.

#### Example

    <button id="button" type="button">Cancel</button>
    <script>
        $("#button").kendoButton({
            themeColor: "dark"
        });
    </script>

## Methods

### enable

Enables or disables the Button.

#### Parameters

##### toggle `Boolean`

Indicates whether the **Button** should be enabled or disabled. `true` and `false` arguments are accepted. If no argument is supplied, the **Button** will assume `true` and will be enabled.

#### Example

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton();
        var button = $("#button").data("kendoButton");
        // disable button
        button.enable(false);
        // enable button
        button.enable(true);
    </script>

## Events

### click

Fires when the **Button** is clicked with the mouse, touched on a touch device, or ENTER (or SPACE) is pressed while the **Button** is focused.

#### Event Data

##### e.event `Object`

The original DOM event.

#### Example - subscribe to the "click" event during initialization

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton({
            click: function(e) {
                alert(e.event.target.tagName);
            }
        });
    </script>

#### Example - subscribe to the "click" event after initialization

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton();
        var button = $("#button").data("kendoButton");
        button.bind("click", function(e) {
            alert(e.event.target.tagName);
        });
    </script>
