---
title: Badge
description: Configuration, methods and events of the Kendo UI Badge
res_type: api
component: badge
---

# kendo.ui.Badge

Represents the Kendo UI Badge widget. Inherits from [Widget](/api/javascript/ui/widget).




## Configuration


### align `String` *(default: '')*

Specifies position of the badge relative to its container. Valid position options are:

* `top start`: positions the badge at top left corner of the container; top right in RTL mode.
* `top end`: positions the badge at top right corner of the container; top left in RTL mode.
* `bottom start`: positions the badge at bottom left corner of the container; bottom right in RTL mode.
* `bottom end`: positions the badge at bottom right corner of the container; bottom right in RTL mode.

`align` works in conjunction with [`position`](/api/javascript/ui/badge/configuration/position).

Note: when using align, make sure the badge container has [css position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) other than `static` and allows [overflow content](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).

#### Example

    <button class="k-button">Top Start Badge <span id="badge-top-start"></span></button>
    <button class="k-button">Top End Badge <span id="badge-top-end"></span></button>
    <button class="k-button">Bottom Start Badge <span id="badge-bottom-start"></span></button>
    <button class="k-button">Bottom End Badge <span id="badge-bottom-end"></span></button>
    <script>
        $('#badge-top-start').kendoBadge({position: 'edge', align: 'top start', themeColor: 'primary'});
        $('#badge-top-end').kendoBadge({position: 'edge', align: 'top end', themeColor: 'primary'});
        $('#badge-bottom-start').kendoBadge({position: 'edge', align: 'bottom start', themeColor: 'primary'});
        $('#badge-bottom-end').kendoBadge({position: 'edge', align: 'bottom end', themeColor: 'primary'});
    </script>


### cutoutBorder `Boolean` *(default: false)*

Specifies wether or not to render additional "cutout" border around the badge.

#### Example

    <div style="padding: 10px; background: #cccccc;">
        <span id="badge-normal"></span>
        <span id="badge-bordered"></span>
    </div>
    <script>
        $('#badge-normal').kendoBadge({ cutoutBorder: false, shape: 'circle' });
        $('#badge-bordered').kendoBadge({ cutoutBorder: true, shape: 'circle' });
    </script>


### fill `String` *(default: 'solid')*

Specifies how themeColor is applied to a badge. Valid options are `solid` (default) and `outline`.

#### Example

    <span id="badge-solid">Solid</span>
    <span id="badge-outline">Outline</span>
    <script>
        $('#badge-solid').kendoBadge({ fill: 'solid' });
        $('#badge-outline').kendoBadge({ fill: 'outline' });
    </script>


### icon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the badge by a `span.k-icon` or `span.k-svg-icon` element.

See [web font icons help article](/kendo-ui/styles-and-layout/icons-web) for more details on Kendo UI icons.

#### Example

    <span id="badge"></span>
    <script>
        $('#badge').kendoBadge({
            icon: 'add',
            themeColor: 'primary'
        });
    </script>


### max `Number` *(default: Infinity)*

If `text` is a number, it will cap that number.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            text: 1234,
            themeColor: 'primary',
            max: 1024
        });
    </script>


### position `String` *(default: 'inline')*

Specifies position of the badge relative to the edge of the container. Valid options are:

* `inline`: positions the badge inside the container, next to the text.
* `edge`: the center of the badge is positioned on the edge of the container.
* `inside`: the badge is entirely positioned inside the container.
* `outside`: the badge is entirely positioned oustide the container.

Note: position configuration, other than `inline`, requires the badge to be aligned. See [`align`](/api/javascript/ui/badge/configuration/align) for more details.

#### Example

    <button class="k-button">Inline badge <span id="badge-inline"></span></button>
    <button class="k-button">Inside badge <span id="badge-inside"></span></button>
    <button class="k-button">Edge badge <span id="badge-edge"></span></button>
    <button class="k-button">Outside badge <span id="badge-outside"></span></button>
    <script>
        $('#badge-inside').kendoBadge({position: 'inline', themeColor: 'primary'});
        $('#badge-inside').kendoBadge({align: 'top end', position: 'inside', themeColor: 'primary'});
        $('#badge-edge').kendoBadge({align: 'top end', position: 'edge', themeColor: 'primary'});
        $('#badge-outside').kendoBadge({align: 'top end', position: 'outside', themeColor: 'primary'});
    </script>


### shape  `String` *(default: 'rounded')*

Specifies the shape of the badge

* `rectangle`: applies no border radius on the badge.
* `rounded`: applies default border radius on the badge. Note: rounded shape is theme specific and in some themes there might be no rounding of edges.
* `pill`: applies border radius equal to half the height of the badge. Note: pill shape is not theme specific and is always applied when set.
* `circle`: forces circular shape on the badge. Note: circle shape is not theme specific and is always applied when set.
* `dot`: forces dot shape on the badge. Note: dot shape is not theme specific and is always applied when set.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            text: 'badge',
            themeColor: 'primary',
            shape: 'rounded'
        });
    </script>


### size  `String` *(default: 'medium')*

Specifies the size of the badge. Valid options are `small`, `medium` and `large`.

#### Example

    <span id="badge-small">Small badge</span>
    <span id="badge-medium">Medium badge</span>
    <span id="badge-large">Large badge</span>
    <script>
        $('#badge-small').kendoBadge({ size: 'small', themeColor: 'primary' });
        $('#badge-medium').kendoBadge({ size: 'medium', themeColor: 'primary' });
        $('#badge-large').kendoBadge({ size: 'large', themeColor: 'primary' });
    </script>


### template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the badge.

#### Example - string template

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            data: {
                current: 2,
                total: 10
            },
            themeColor: 'primary',
            template: '#= current # of #= total #'
        });
    </script>

#### Example - function template

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            text: 1234,
            themeColor: 'primary',
            template: function() {
                var text = this.options.text;
                return text > 99 ? 'A lot' : text;
            }
        });
    </script>


### text `String|Number` *(default: '')*

The text of the badge. Valid input includes `string`, `number` or `object` with `toString` method. Default is empty string.

#### Example

    <span id="text-badge"></span>
    <span id="notext-badge"></span>
    <script>
        $('#text-badge').kendoBadge({
            themeColor: 'primary',
            text: 'Badge'
        });
        $('#notext-badge').kendoBadge();
    </script>


### themeColor `String` *(default: 'secondary')*

Specifies the theme color of the component. Valid options are

* `inherit`: no coloring will be applied to the badge. Useful when the badge needs to blend-in with the surrounding elements.
* `default`: apply coloring based on surface theme color.
* `primary`:  apply coloring based on **primary** theme color.
* `secondary`: apply coloring based on **secondary** theme color.
* `tertiary`: apply coloring based on **tertiary** theme color.
* `info`: apply coloring based on **info** theme color.
* `success`: apply coloring based on **success** theme color.
* `warning`:apply coloring based on **warning** theme color.
* `error`: apply coloring based on **error** theme color.
* `dark`: apply coloring based on **dark** theme color.
* `light`: always coloring based on **light** theme color.
* `inverted`: depending on the luminance of the theme, light or dark, inverted will be dark or light.

#### Example

    <span id="badge-inherit">Inherit</span>
    <span id="badge-default">Default</span>
    <span id="badge-primary">Primary</span>
    <span id="badge-secondary">Secondary</span>
    <span id="badge-tertiary">Tertiary</span>
    <span id="badge-info">Info</span>
    <span id="badge-success">Success</span>
    <span id="badge-warning">Warning</span>
    <span id="badge-error">Error</span>
    <span id="badge-dark">Dark</span>
    <span id="badge-light">Light</span>
    <span id="badge-inverted">Inverted</span>

    <script>
        $('#badge-inherit').kendoBadge({ themeColor: 'inherit' });
        $('#badge-secondary').kendoBadge({ themeColor: 'secondary' });
        $('#badge-primary').kendoBadge({ themeColor: 'primary' });
        $('#badge-secondary').kendoBadge({ themeColor: 'secondary' });
        $('#badge-tertiary').kendoBadge({ themeColor: 'tertiary' });
        $('#badge-info').kendoBadge({ themeColor: 'info' });
        $('#badge-success').kendoBadge({ themeColor: 'success' });
        $('#badge-warning').kendoBadge({ themeColor: 'warning' });
        $('#badge-error').kendoBadge({ themeColor: 'error' });
        $('#badge-dark').kendoBadge({ themeColor: 'dark' });
        $('#badge-light').kendoBadge({ themeColor: 'light' });
        $('#badge-inverted').kendoBadge({ themeColor: 'inverted' });
    </script>


### visible `Boolean` *(default: true)*

If set to false the badge will not be displayed.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            text: 1234,
            visible: false
        });
    </script>




## Methods


### hide

Hides the badge.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        var badge =  $('#badge').kendoBadge({
            text: 'badge'
        }).data('kendoBadge');

        badge.hide();
    </script>


### icon

Sets or gets the icon of the badge.

#### Parameters

##### icon `String`

See [`badge.options.icon`](/api/javascript/ui/badge/configuration/icon) for valid options.

#### Example

Set badge icon after initialization.

    <span id="badge">Badge</span>

    <script>
        var badge = $('#badge').kendoBadge({ icon: 'add' }).data('kendoBadge');

        window.setTimeOut(function() {
            badge.color('cog');
        }, 1000);
    </script>


### setOptions

Modifies the initial configuration of the badge

#### Parameters

##### options `Object`

The new options.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        var badge =  $('#badge').kendoBadge({
            text: 7
            themeColor:'primary'
        }).data('kendoBadge');

        badge.setOptions({
            text: 1234
            themeColor: 'error'
        });
    </script>


### shape

Sets / gets the badge shape. See [`badge.options.shape`](/api/javascript/ui/badge/configuration/shape) for valid options.

#### Parameters

##### shape `String`

The new shape of the badge.

#### Example

Set badge shape after initialization.

    <span id="badge">Badge</span>
    <script>
        var badge =  $('#badge').kendoBadge({
            shape: 'rounded',
        }).data('kendoBadge');

        window.setTimeout(function() {
            badge.shape('pill')
        }, 1000);
    </script>


### show

Shows the badge.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        var badge =  $('#badge').kendoBadge({
            text: 'badge',
            visible: false
        }).data('kendoBadge');

        badge.show();
    </script>


### text

Sets / gets the text of the badge.

#### Parameters

##### text `String|Number`

The new text of the badge.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        var badge =  $('#badge').kendoBadge({
            text: 7,
        }).data('kendoBadge');

        badge.text('badge');
    </script>


### themeColor

Sets or gets the theme color of the badge.

#### Parameters

##### themeColor `String`

See [`badge.options.themeColor`](/api/javascript/ui/badge/configuration/themeColor) for valid options.

#### Example

Set badge theme color after initialization.

    <span id="badge">Badge</span>

    <script>
        var badge = $('#badge').kendoBadge({ themeColor: 'secondary' }).data('kendoBadge');

        window.setTimeOut(function() {
            badge.themeColor('primary');
        }, 1000);
    </script>
