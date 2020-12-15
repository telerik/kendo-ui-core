---
title: FloatingActionButton
description: Configuration, methods and events of the Kendo UI FloatingActionButton
res_type: api
component: floatingactionbutton
---

# kendo.ui.FloatingActionButton

Represents the Kendo UI FloatingActionButton widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration


### align `String` *(default: "bottom end")*

Specifies position of the FloatingActionButton relative to its container. Valid position options are:

* `top start`: positions the button at top left corner of the container.
* `top center`: positions the button at top center of the container.
* `top end`: positions the button at top right corner of the container.
* `middle start`: positions the button at middle left of the container.
* `middle end`: positions the button at middle right of the container.
* `bottom start`: positions the button at bottom left corner of the container.
* `bottom center`: positions the button at top center of the container.
* `bottom end`: positions the button at bottom right corner of the container.

`align` works in conjunction with [`positionMode`](/api/javascript/ui/floatingactionbutton/configuration/positionmode) and [`alignOffset`](/api/javascript/ui/floatingactionbutton/configuration/alignoffset).

**Note: when using `align`, make sure the FloatingActionButton container has [css position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) other than `static` and allows [overflow content](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).

#### Example
    <div class="fab-container" style="position: relative;">
        <button id="fab-top-start">Top Start</button>
        <button id="fab-top-center">Top Center</button>
        <button id="fab-top-end">Top End</button>

        <button id="fab-middle-start">Middle Start</button>
        <button id="fab-middle-end">Middle End</button>

        <button id="fab-bottom-start">Bottom Start</button>
        <button id="fab-bottom-center">Bottom Center</button>
        <button id="fab-bottom-end">Bottom End</button>
    </div>

	<script>
        $('#fab-top-start').kendoFloatingActionButton({  align: 'top start' });
        $('#fab-top-center').kendoFloatingActionButton({  align: 'top center' });
        $('#fab-top-end').kendoFloatingActionButton({  align: 'top end' });
        $('#fab-middle-start').kendoFloatingActionButton({  align: 'middle start' });
        $('#fab-middle-end').kendoFloatingActionButton({  align: 'middle end' });
        $('#fab-bottom-start').kendoFloatingActionButton({  align: 'bottom start' });
        $('#fab-bottom-center').kendoFloatingActionButton({  align: 'bottom center' });
        $('#fab-bottom-end').kendoFloatingActionButton({  align: 'bottom end' });
    </script>

### alignOffset `Object` *(default: { x: 16, y: 16 })*

Specifies the horizontal and vertical offset of the FloatingActionButton.

#### Example

    <button id="fab-top-start">Top Start</button>

	<script>
        $('#fab-top-start').kendoFloatingActionButton({
            align: 'top start',
            alignOffset: { x: 50, y: 50 }
        });
    </script>

### alignOffset.x `Number|String`

Specifies the initial horizontal offset of the FloatingActionButton. Numeric values are treated as pixels. String values can specify pixels, percentages, ems, or other valid values.

### alignOffset.y `Number|String`

Specifies the initial vertical offset of the FloatingActionButton. Numeric values are treated as pixels. String values can specify pixels, percentages, ems or other valid values.

### enabled `Boolean` *(default: true)*

Specifies whether the FloatingActionButton is enabled (true) or disabled (false).

#### Example

	<button id="fab-top-start">Top Start</button>

	<script>
        $('#fab-top-start').kendoFloatingActionButton({
            align: 'top start',
            enabled: false
        });
    </script>

### icon `String` *(default: "")*

Specifies the name for an existing icon in a Kendo UI theme that is rendered in the FloatingActionButton.

See [`the Web Font Icons help article`](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) for more details on Kendo UI icons.

#### Example - display icon

	<button id="fab-icon"></button>

	<script>
        $('#fab-icon').kendoFloatingActionButton({
            align: 'top start',
            icon: 'plus'
        });
    </script>

### items `Array`

Specifies the speed-dial items that will be rendered in a popup container anchored to the FloatingActionButton.

**Note: when using the `items` configuration, clicking on the FloatingActionButton will open the popup containing the speed-dial list.

#### Example - define speed-dial items

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            align: 'top start',
            icon: 'home',
            items: [{
                label: 'Save',
                icon: 'save',
                click: function() { console.log('save action'); }
            }, {
                label: 'Print',
                icon: 'print',
                click: function() { console.log('print action'); }
            }]
        });
    </script>

### items.enabled `Boolean` *(default: true)*

Specifies whether the Item is enabled or not. By default all items are enabled.

#### Example

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            align: 'top start',
            icon: 'home',
            items: [{
                label: 'Save',
                icon: 'save',
                click: function() { console.log('save action'); }
            }, {
                label: 'Print',
                icon: 'print',
                click: function() { console.log('print action'); },
                enabled: false
            }]
        });
    </script>

### items.click `Function` *(default: false)*

Specifies the click event handler of the speed-dial item.

#### Example

    <button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            align: 'top start',
            icon: 'home',
            items: [{
                label: 'Download',
                icon: 'download',
                click: function() { console.log('download action'); }
            }]
        });
    </script>

### items.cssClass `String`

Specifies a set of CSS classes for the speed-dial item.

#### Example

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            align: 'top start',
            icon: 'home',
            items: [{
                label: 'Download',
                icon: 'download',
                cssClass: 'fab-download-action',
                click: function() { console.log('download action'); }
            }]
        });
    </script>

### items.icon `String`

Specifies the name for an existing icon in a Kendo UI theme that is rendered in the speed-dial item.

See [`the Web Font Icons help article`](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) for more details on Kendo UI icons.

#### Example

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            align: 'top start',
            icon: 'home',
            items: [{
                icon: 'download',
                click: function() { console.log('download action'); }
            }]
        });
    </script>


### items.label `String`

Specifies the label for the speed-dial item.

#### Example

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            icon: 'home',
            items: [{
                label: 'Save',
                icon: 'save',
                click: function() { console.log('save action'); }
            }]
        });
    </script>

### items.template `String|Function`

Specifies the [template](/api/javascript/kendo/methods/template) used to render the contents of the speed-dial item.

The fields which can be used inside the template are:

* text `String` - the label of the item (if configured).
* icon `String` - the icon specified for this step (if configured).

#### Example - Use a string template

    <button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            icon: 'home',
            items: [{
                label: 'print',
                template: '#:text#',
                click: function() { console.log('print action'); }
            }]
        });
    </script>

#### Example - Use a function

    <button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            icon: 'home',
            items: [{
                label: 'print',
                template: function(e) {
                    return '<strong>' + e.text + '</strong>';
                },
                click: function() { console.log('print action'); }
            }]
        });
    </script>


### items.title `String`

Specifies the label for the speed-dial item that will be read by assistive technologies.

#### Example

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            icon: 'home',
            items: [{
                icon: 'print',
                title: 'print action title',
                click: function() { console.log('print action'); }
            }]
        });
    </script>

### positionMode `String` *(default: 'fixed')*

Specifies CSS position of the FloatingActionButton in the document. Valid options are:

* `absolute`: positions the button relative to the nearest positioned ancestor .
* `fixed`: positions the button relative to the viewport.

#### Example - fixed position

    <button id="fab-fixed"></button>

	<script>
        $('#fab-fixed').kendoFloatingActionButton({
            icon: 'home'
            align: 'bottom start'
        });
    </script>

#### Example - absolute position

    <div class="fab-container" style="width: 200px; height: 200px; position: relative;">
        <button id="fab-absolute"></button>
    </div>

	<script>
        $('#fab-absolute').kendoFloatingActionButton({
            icon: 'home',
            align: 'bottom start',
            positionMode: 'absolute'
        });
    </script>

### shape  `String` *(default: 'pill')*

Specifies the shape of the FloatingActionButton.

* `rectangle`: applies no border radius on the button.
* `rounded`: applies default border radius on the button.
* `pill`: applies border radius equal to half the height of the button.
* `circle`: forces circular shape on the button.

#### Example

    <button id="fab-shape"></button>

	<script>
        $('#fab-shape').kendoFloatingActionButton({
            icon: 'home',
            shape: 'rectangle',
            items: [{
                icon: 'print',
                title: 'print action title',
                click: function() { console.log('print action'); }
            }]
        });
    </script>

### size  `String` *(default: 'medium')*

Specifies the size of the FloatingActionButton. Valid options are `small`, `medium` and `large`.

#### Example

    <button id="fab-small">Small</button>
    <button id="fab-medium">Medium</button>
    <button id="fab-large">Large</button>

    <script>
        $('#fab-small').kendoFloatingActionButton({
            size: 'small',
            align: 'top start'
        });
        $('#fab-medium').kendoFloatingActionButton({
            size: 'medium',
            align: 'top end'
        });
        $('#fab-large').kendoFloatingActionButton({
            size: 'large',
            align: 'top center'
        });
    </script>

### text `String` *(default: '')*

Specifies the text of the FloatingActionButton. Default is empty string.

#### Example

    <button id="fab-text"></button>

	<script>
        $('#fab-text').kendoFloatingActionButton({
            text: 'Actions'
        });
    </script>

### themeColor `String` *(default: 'secondary')*

Specifies the theme color of the FloatingActionButton. Valid options are:

* `primary`:  apply coloring based on **primary** theme color.
* `secondary`: apply coloring based on **secondary** theme color.
* `tertiary`: apply coloring based on **tertiary** theme color.
* `info`: apply coloring based on **info** theme color.
* `success`: apply coloring based on **success** theme color.
* `warning`:apply coloring based on **warning** theme color.
* `error`: apply coloring based on **error** theme color.
* `dark`: apply coloring based on **dark** theme color.
* `light`: always coloring based on **light** theme color.

#### Example

    <button id="fab-primary"></button>
    <button id="fab-secondary"></button>
    <button id="fab-tertiary"></button>

    <script>
        $('#fab-primary').kendoFloatingActionButton({
            themeColor: 'primary',
            icon: 'home',
            align: 'top start'
        });
        $('#fab-secondary').kendoFloatingActionButton({
            themeColor: 'secondary',
            icon: 'home',
            align: 'top center'
        });
        $('#fab-tertiary').kendoFloatingActionButton({
            themeColor: 'tertiary',
            icon: 'home',
            align: 'top end'
        });
    </script>

### visible `Boolean` *(default: true)*

Specifies if the FloatingActionButton is visible initially.

#### Example

    <button id="fab-text"></button>

	<script>
        var fab = $('#fab-text').kendoFloatingActionButton({
            text: 'Action',
            visible: true
        });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            items: [{
                icon: 'print',
                title: 'print action title',
                click: function() { console.log('print action'); }
            }]
        }).getKendoFloatingActionButton();

        fab.destroy();
    </script>

### enable

Enables or disables the FloatingActionButton.

#### Parameters

##### value `Boolean`

Specifies whether the button should be enabled (true) or disabled (false).

#### Example

	<button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            icon: 'plus'
        }).getKendoFloatingActionButton();

        fab.enable(false);
    </script>

### hide

Hides the FloatingActionButton.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            icon: 'plus'
        }).getKendoFloatingActionButton();

        fab.hide();
    </script>


### icon

Sets or gets the icon of the FloatingActionButton.

#### Parameters

##### icon `String`

See [`floatingactionbutton.options.icon`](/api/javascript/ui/floatingactionbutton/configuration/icon) for valid options.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions'
        }).getKendoFloatingActionButton();

        fab.icon('plus');
    </script>


### setOptions

Modifies the initial configuration of the FloatingActionButton

#### Parameters

##### options `Object`

The new options.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions'
        }).getKendoFloatingActionButton();

        fab.setOptions({
            text: 'Print',
            icon: 'print',
            align: 'top start'
        });
    </script>


### shape

Sets or gets the FloatingActionButton shape. See [`floatingactionbutton.options.shape`](/api/javascript/ui/floatingactionbutton/configuration/shape) for valid options.

#### Parameters

##### shape `String`

The new shape of the button.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            icon: 'home'
        }).getKendoFloatingActionButton();

        fab.shape('rectangle');
    </script>


### show

Shows the FloatingActionButton.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            icon: 'home',
            visible: false
        }).getKendoFloatingActionButton();

        fab.show();
    </script>

### text

Sets / gets the text of the FloatingActionButton.

#### Parameters

##### text `String`

The new text of the FloatingActionButton.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions'
        }).getKendoFloatingActionButton();

        fab.text('Print');
    </script>

### themeColor

Sets or gets the theme color of the FloatingActionButton.

#### Parameters

##### themeColor `String`

See [`floatingactionbutton.options.themeColor`](/api/javascript/ui/floatingactionbutton/configuration/themeColor) for valid options.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions'
        }).getKendoFloatingActionButton();

        fab.themeColor('secondary');
    </script>


## Events

### click

Fires when the user clicks on a the FloatingActionButton.

**Note: when using [`items`](/api/javascript/ui/floatingactionbutton/configuration/items) configuration, clicking on the FloatingActionButton will open the speed-dial list popup.

#### Event Data

##### e.event `Object`

The original DOM event.

##### e.sender `kendo.ui.FloatingActionButton`

The **FloatingActionButton** instance that triggered the event.

##### e.preventDefault `Function`

If invoked prevents the click .

#### Example

	<button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Print',
            click: function() {
                console.log('print');
            }
        });
    </script>

### collapse

Fires when the speed-dial popup is closed and its animation is finished.

**Note: this event is triggered only when using [`items`](/api/javascript/ui/floatingactionbutton/configuration/items) configuration.

#### Event Data

##### e.sender `kendo.ui.FloatingActionButton`

The **FloatingActionButton** instance that triggered the event.

#### Example

	<button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            items: [{
                icon: 'print',
                title: 'print action title',
                click: function() { console.log('print action'); }
            }],
            collapse: function() {
                console.log('collapse event triggered');
            }
        }).getKendoFloatingActionButton();

        fab.element.trigger("click");
    </script>

### expand

Fires when the speed-dial popup is opened and its animation is finished.

**Note: this event is triggered only when using [`items`](/api/javascript/ui/floatingactionbutton/configuration/items) configuration.

#### Event Data

##### e.sender `kendo.ui.FloatingActionButton`

The **FloatingActionButton** instance that triggered the event.

#### Example

	<button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            items: [{
                icon: 'print',
                title: 'print action title',
                click: function() { console.log('print action'); }
            }],
            expand: function() {
                console.log('expand event triggered');
            }
        }).getKendoFloatingActionButton();

        fab.element.trigger("click");
    </script>
