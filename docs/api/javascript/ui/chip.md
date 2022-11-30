---
title: Chip
description: Configuration, methods and events of the Kendo UI Chip
res_type: api
component: Chip
---

# kendo.ui.Chip

Represents the Kendo UI Chip widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### icon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the chip by a `span.k-icon` or `span.k-svg-icon` element.

See [web font icons help article](/kendo-ui/styles-and-layout/icons-web) for more details on Kendo UI icons.

#### Example

    <span id="chip"></span>
    <script>
        $('#chip').kendoChip({
            icon: 'plus',
            label: 'Add'
        });
    </script>

### iconClass `String` *(default: '')*

If set, value will be appended to the icon's element class attribute.

#### Example

    <span id="chip"></span>
    <script>
        $('#chip').kendoChip({
            iconClass: 'k-icon k-i-add',
            label: 'Add'
        });
    </script>

### avatarClass `String` *(default: '')*

If set, value will be appended to the icon's element class attribute. It also appends "k-chip avatar" and "k-avatar" classes to the icon's element.

#### Example
    <style>
        .maria {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/BERGS.jpg");
        }
    </style>
    <span id="chip"></span>
    <script>
        $('#chip').kendoChip({
            avatarClass: 'maria',
            label: 'Maria'
        });
    </script>


### removeIcon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content for the remove button when `removable=true`. The icon is rendered inside the chip by a `span.k-icon` or `span.k-svg-icon` element.

See [web font icons help article](/kendo-ui/styles-and-layout/icons-web) for more details on Kendo UI icons.

#### Example

    <span id="chip"></span>
    <script>
        $('#chip').kendoChip({
            removable: true,
            removeIcon: 'close',
            themeColor: 'success'
        });
    </script>

### removeIconClass `String` *(default: '')*

If set, value will be appended to the remove icon's element class attribute.

#### Example

    <span id="chip"></span>
    <script>
        $('#chip').kendoChip({
            removable: true,
            removeIconClass: 'k-chip-icon k-icon k-i-close',
            themeColor: 'success'
        });
    </script>


### fillMode `String` *(default: 'solid')*

Specifies the background and border styles of the Chip. Valid fillMode options are:

* `solid` *(default)*
* `outline`

#### Example

    <span id="chip-solid"></span>
    <span id="chip-outline"></span>
    <script>
        $('#chip-solid').kendoChip({fillMode: 'solid', label: 'Solid' });
        $('#chip-outline').kendoChip({fillMode: 'outline', label: 'Outline' });
    </script>


### rounded  `String` *(default: 'medium')*

Specifies the size of the chip. Valid options are `small`, `medium`, `large`, `full` and `none`.

#### Example

    <span id="chip-small">Small chip</span>
    <span id="chip-medium">Medium chip</span>
    <span id="chip-large">Large chip</span>
    <span id="chip-full">Full chip</span>
    <span id="chip-none">Non-rounded chip</span>
    <script>
        $('#chip-small').kendoChip({ rounded: 'small', themeColor: 'success' });
        $('#chip-medium').kendoChip({ rounded: 'medium', themeColor: 'success' });
        $('#chip-large').kendoChip({ rounded: 'large', themeColor: 'success' });
        $('#chip-full').kendoChip({ rounded: 'full', themeColor: 'success' });
        $('#chip-none').kendoChip({ rounded: 'none', themeColor: 'success' });
    </script>

### size  `String` *(default: 'medium')*

Specifies the size of the chip. Valid options are `small`, `medium`, `large` and `none`.

#### Example

    <span id="chip-small">Small chip</span>
    <span id="chip-medium">Medium chip</span>
    <span id="chip-large">Large chip</span>
    <span id="chip-none">No padding chip</span>
    <script>
        $('#chip-small').kendoChip({ size: 'small', themeColor: 'success' });
        $('#chip-medium').kendoChip({ size: 'medium', themeColor: 'success' });
        $('#chip-large').kendoChip({ size: 'large', themeColor: 'success' });
        $('#chip-none').kendoChip({ size: 'none', themeColor: 'success' });
    </script>


### label `String` *(default: '')*

The label text of the chip. Default is empty string.

#### Example

    <span id="text-chip"></span>
    <span id="notext-chip"></span>
    <script>
        $('#text-chip').kendoChip({
            themeColor: 'success',
            text: 'Chip'
        });
        $('#notext-chip').kendoChip({icon : 'home' });
    </script>


### themeColor `String` *(default: 'base')*

Specifies the theme color of the component. Valid options are

* `base`: apply coloring based on surface theme color.
* `info`: apply coloring based on **info** theme color.
* `success`: apply coloring based on **success** theme color.
* `warning`:apply coloring based on **warning** theme color.
* `error`: apply coloring based on **error** theme color.

#### Example

    <span id="chip-base">Base</span>
    <span id="chip-info">Info</span>
    <span id="chip-success">Success</span>
    <span id="chip-warning">Warning</span>
    <span id="chip-error">Error</span>

    <script>
        $('#chip-base').kendoChip({ themeColor: 'base' });
        $('#chip-info').kendoChip({ themeColor: 'info' });
        $('#chip-success').kendoChip({ themeColor: 'success' });
        $('#chip-warning').kendoChip({ themeColor: 'warning' });
        $('#chip-error').kendoChip({ themeColor: 'error' });
    </script>


### removable `Boolean` *(default: false)*

Specifies if the Chip will be removable or not. If the property is set to true, the Chip renders a remove icon.

> **Important:** Clicking the remove icon will not remove the Chip itself.

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: 'Chip text',
            removable: true
        });
    </script>

### selectable `Boolean` *(default: false)*

Sets whether the Chip can be selected.

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: 'Chip text',
            selectable: true
        });
    </script>

### selected `Boolean` *(default: false)*

Toggles the selected state of the Chip.

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: 'Selected',
            selectable: true,
        });
    </script>


### enabled `Boolean` *(default: true)*

Toggles the enabled state of the Chip.

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: 'Disabled chip',
            enabled: false
        });
    </script>

### attributes `Object`

Defines custom attributes of the Chip's element.

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: 'Disabled chip',
            attributes: { "data-val" : "custom data attribute" }
        });
    </script>

## Methods

### setOptions

Modifies the initial configuration of the chip

#### Parameters

##### options `Object`

The new options.

#### Example

    <span id="chip"></span>
    <script>
        var chip =  $('#chip').kendoChip({
            label: 'Old chip text',
            themeColor:'success'
        }).data('kendoChip');

        chip.setOptions({
            label: 'New chip text',
            themeColor: 'error'
        });
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <span id="chip"></span>
    <script>
        $("#chip").kendoChip({
            label: 'Chip text',
            enable: false
        });

        var chip = $("#chip").data("kendoChip");
        chip.enable(true);
    </script>

### select

Selects the widget.

#### Parameters

##### state `Boolean`

If set to `true` the widget will be selected. If set to `false` the widget will be deselected.

#### Example - enable the widget

    <span id="chip"></span>
    <script>
        $("#chip").kendoChip({
            label: 'Chip text'
        });

        var chip = $("#chip").data("kendoChip");
        chip.select(true);
    </script>

#### Example - disable the widget

    <span id="chip"></span>
    <script>
        $("#chip").kendoChip({
            label: 'Chip text',
            enable: true
        });

        var chip = $("#chip").data("kendoChip");
        chip.enable(false);
    </script>

### focus

Focuses the widget.

#### Example - focus the widget

    <span id="chip"></span>
    <script>
        $("#chip").kendoChip({ label: 'Chip text' });
        var chip = $("#chip").data("kendoChip");
        chip.focus();
    </script>

### destroy

Prepares the **Chip** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks.

> **Important:** This method does not remove the Chip element from DOM.

#### Example

    <span id="chip"></span>
    <script>
        $("#chip").kendoChip({ label: 'Chip text' });
        var chip = $("#chip").data("kendoChip");
        chip.destroy();
    </script>

## Events

### click

Fires when the user clicks the content of the Chip or activates it with the Enter or Space keys.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.Chip`

The **Chip** instance that triggered the event.


#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: "Chip",
            selectable: true,
            click: function (ev) {
                var chip = ev.sender;
                alert(chip.element.text());
            }
        })
    </script>

### select

Fires when the selection of a selectable the Chip toggles.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.Chip`

The **Chip** instance that triggered the event.

##### e.preventDefault `Function`

If invoked prevents the Chip selection change.

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: "Chip",
            selectable: true,
            select: function (ev) {
                var chip = ev.sender;

                // prevent selection
                ev.preventDefault();
                alert("Selection prevented");
            }
        })
    </script>

### remove

Fires when the user clicks the remove icon of the Chip. After this event, the Chip will not remove itself.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.Chip`

The **Chip** instance that triggered the event.

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: "Chip",
            removable: true,
            remove: function (ev) {
                var chip = ev.sender;
                alert(chip.element.text());
            }
        })
    </script>

