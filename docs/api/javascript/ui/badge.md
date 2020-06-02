---
title: Badge
description: Configuration, methods and events of the Kendo UI Badge
res_type: api
component: badge
---

# kendo.ui.Badge

Represents the Kendo UI Badge widget. Inherits from [Widget](/api/javascript/ui/widget).

> **Important** Note about changes in API




## Configuration


### appearance  `String` *(default: 'rounded')*

**Deprecated!** Use [`badge.options.shape`](/api/javascript/ui/badge/configuration/shape) instead.

For compatibility `badge.options.appearance` maps to `badge.options.shape`.


### badgeStyle `String` *(default: 'solid')*

Specifies the structure of a badge. Valid options are `solid` (default) and `outline`.

#### Example

    <span id="badge-solid">Solid</span>
    <span id="badge-outline">Outline</span>
    <script>
        $('#badge-solid').kendoBadge({ badgeStyle: 'solid' });
        $('#badge-outline').kendoBadge({ badgeStyle: 'outline' });
    </script>


### color `String` *(default: 'secondary')*

Specifies the color of the component. Valid options are

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
        $('#badge-inherit').kendoBadge({ color: 'inherit' });
        $('#badge-secondary').kendoBadge({ color: 'secondary' });
        $('#badge-primary').kendoBadge({ color: 'primary' });
        $('#badge-secondary').kendoBadge({ color: 'secondary' });
        $('#badge-tertiary').kendoBadge({ color: 'tertiary' });
        $('#badge-info').kendoBadge({ color: 'info' });
        $('#badge-success').kendoBadge({ color: 'success' });
        $('#badge-warning').kendoBadge({ color: 'warning' });
        $('#badge-error').kendoBadge({ color: 'error' });
        $('#badge-dark').kendoBadge({ color: 'dark' });
        $('#badge-light').kendoBadge({ color: 'light' });
        $('#badge-inverted').kendoBadge({ color: 'inverted' });
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


### icon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the badge by a `span.k-icon` or `span.k-svg-icon` element.

See [web font icons help article](/kendo-ui/styles-and-layout/icons-web) for more details on Kendo UI icons.

#### Example

    <span id="badge"></span>
    <script>
        $('#badge').kendoBadge({
            icon: 'add',
            color: 'primary'
        });
    </script>


### look `String` *(default: 'solid')*

**Deprecated!** Use [`badge.options.badgeStyle`](/api/javascript/ui/badge/configuration/badgestyle) instead.

For compatibility `badge.options.look` maps to `badge.options.badgeStyle`.


### max `Number` *(default: Infinity)*

If `text` is a number, it will cap that number.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            text: 1234,
            max: 1024
        });
    </script>


### overlay `Boolean` *(default: true)*

**Deprecated!** Use [`position`](/api/javascript/ui/badge/configuration/position) instead.

There is no built in mapping between `overlay` and `position`:

* `overlay: false` can be achieved by setting `position: "inline"`
* `overlay: true` can be achieved by setting `position: "top end"`, or not setting it at all.

For compatibility `overlay` is kept, even though it has no effect on the badge.


### placement `String` *(default: 'edge')*

Specifies position of the badge relative to the edge of the container. Valid placemnt options are:

* `edge`: the center of the badge is positioned on the edge of the container.
* `inside`: the badge is entirely positioned inside the container.
* `outside`: the badge is entirely positioned oustide the container.

Note: placement configuration requires the badge to be positioned. See [`position`](/api/javascript/ui/badge/configuration/position) for more details.

#### Example

    <button class="k-button">Inside badge <span id="badge-inside"></span></button>
    <button class="k-button">Edge badge <span id="badge-edge"></span></button>
    <button class="k-button">Outside badge <span id="badge-outside"></span></button>
    <script>
        $('#badge-inside').kendoBadge({position: 'top end', placement: 'inside'});
        $('#badge-edge').kendoBadge({position: 'top end', placement: 'edge'});
        $('#badge-outside').kendoBadge({position: 'top end', placement: 'outside'});
    </script>


### position `String` *(default: 'inline')*

Specifies position of the badge relative to its container. Valid position options are:

* `inline`: positions the badge inside the container, next to the text.
* `top start`: positions the badge at top left corner of the container; top right in RTL mode.
* `top end`: positions the badge at top right corner of the container; top left in RTL mode.
* `bottom start`: positions the badge at bottom left corner of the container; bottom right in RTL mode.
* `bottom end`: positions the badge at bottom right corner of the container; bottom right in RTL mode.

`position` works in conjunction with [`placement`](/api/javascript/ui/badge/configuration/placement).

Note: when using position other than `inline`, make sure the badge container has [css position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) other than `static` and allows [overflow content](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).

#### Example

    <button class="k-button">Inline Badge <span id="badge-inline"></span></button>
    <button class="k-button">Top Start Badge <span id="badge-top-start"></span></button>
    <button class="k-button">Top End Badge <span id="badge-top-end"></span></button>
    <button class="k-button">Bottom Start Badge <span id="badge-bottom-start"></span></button>
    <button class="k-button">Bottom End Badge <span id="badge-bottom-end"></span></button>
    <script>
        $('#badge-inline').kendoBadge({position: 'inline'});
        $('#badge-top-start').kendoBadge({position: 'top start'});
        $('#badge-top-end').kendoBadge({position: 'top end'});
        $('#badge-bottom-start').kendoBadge({position: 'bottom start'});
        $('#badge-bottom-end').kendoBadge({position: 'bottom end'});
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
        $('#badge-small').kendoBadge({ size: 'small' });
        $('#badge-medium').kendoBadge({ size: 'medium' });
        $('#badge-large').kendoBadge({ size: 'large' });
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
            template: '#= current # of #= total #'
        });
    </script>

#### Example - function template

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            text: 1234,
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
            text: 'Badge'
        });
        $('#notext-badge').kendoBadge();
    </script>


### type `String` *(default: 'secondary')*

**Deprecated!** Use [`badge.options.color`](/api/javascript/ui/badge/configuration/color) instead.

For compatibility `badge.options.type` maps to `badge.options.color`.


### value `String|Number` *(default: '')*

**Deprecated!** Use [`badge.options.text`](/api/javascript/ui/badge/configuration/text) instead.

For compatibility `badge.options.value` maps to `badge.options.text`.


### visible `Boolean` *(default: true)*

If set to false the badge will not be displayed.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            text: 1234
            visible: false
        });
    </script>




## Methods


### color

Sets or gets the color of the badge.

#### Parameters

##### color `String`

See [`badge.options.color`](/api/javascript/ui/badge/configuration/color) for valid options.

#### Example

Set badge color after initialization.

    <span id="badge">Badge</span>

    <script>
        var badge = $('#badge').kendoBadge({ color: 'secondary' }).data('kendoBadge');

        window.setTimeOut(function() {
            badge.color('primary');
        }, 1000);
    </script>


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
            color:'primary'
        }).data('kendoBadge');

        badge.setOptions({
            text: 1234
            color: 'error'
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

        window.setTiemout(function() {
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


### value

**Deprecated!** Use [`badge.text()`](/api/javascript/ui/badge/methods/text) instead.

For compatibility `badge.value()` maps to `badge.text()`.
