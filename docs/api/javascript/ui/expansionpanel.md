---
title: ExpansionPanel
description: Configuration, methods and events of the Kendo UI ExpansionPanel
description: Code examples and tips how to configure ExpansionPanel widget, use available methods and events.
res_type: api
component: expansionpanel
---

# kendo.ui.ExpansionPanel

Represents the Kendo UI ExpansionPanel widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object|Boolean`

A collection of visual animations used when **ExpansionPanel** is expand or collapsed through
user interactions. Setting this option to `false` will disable all animations.

`animation:true` is not a valid configuration.

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
                // fade-out closing items over 1000 milliseconds
                collapse: {
                    duration: 1000,
                    effects: "fadeOut"
                },
               // fade-in and expand opening items over 500 milliseconds
               expand: {
                   duration: 500,
                   effects: "expandVertical fadeIn"
               }
           }
        });
    </script>

### animation.collapse `Object`

The visual animation(s) that will be used when **ExpansionPanel** items are closed.

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
                collapse: {
                    duration: 200,
                    effects: "fadeOut"
                }
            }
        });
    </script>

### animation.collapse.duration `Number`*(default: 200)*

The number of milliseconds used for the visual animation when a **ExpansionPanel** item is closed.

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
               collapse: {
                    duration: 1000
               }
          }
        });
    </script>

### animation.collapse.effects `String`

A whitespace-delimited string of animation effects that are utilized when a **ExpansionPanel** item
is closed. Available options are **"fadeOut"** and **"zoomOut"**.

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
                collapse: {
                    duration: 1000,
                    effects: "fadeOut"
                }
            }
        });
    </script>

### animation.expand `Object`

The visual animation(s) that will be used when opening items.

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
                expand: {
                    duration: 200,
                    effects: "expandVertical"
                }
            }
        });
    </script>

### animation.expand.duration `Number`*(default: 200)*

The number of milliseconds used for the visual animation when an item is opened.

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
         animation: {
              expand: {
                  duration: 1000
              }
           }
        });
    </script>

### animation.expand.effects `String`*(default: "expandVertical")*

A whitespace-delimited string of animation effects that are used when an item is expanded. Available options are
**"expandVertical"**, **"zoomIn"** and **"fadeIn"**.

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
                expand: {
                    effects: "expandVertical"
                }
            }
        });
    </script>

### collapseIconClass `String` *(default: "k-icon k-i-arrow-chevron-up")*

The class of the collapse icon.

### disabled `Boolean` *(default: false)*

If set to true the widget will be disabled.

#### Example - disable the widget

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            disabled: true
        });
    </script>

### expanded `Boolean` *(default: false)*

If set to true the widget will be expanded by default.

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            expanded: true
        });
    </script>

### expandIconClass `String` *(default: "k-icon k-i-arrow-chevron-down")*

The class of the collapse icon.

### height `Number|String`

The height of the widget. Numeric values are treated as pixels.

### subTitle `String` *(default: null)*

The subtitle of the widget.

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            subTitle: "Lorem ipsum"
        });
    </script>

### title `String` *(default: null)*

The title of the widget.

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            title: "Lorem ipsum"
        });
    </script>

### toggleable `Boolean` *(default: true)*

If set to false the user will not be able to expand/collapse the widget.

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            expanded: true,
            toggleable: false
        });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.

#### Example - destroy  the widget

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        var widget = $("#expansionPanel").kendoExpansionPanel({
            expanded: true
        }).data('kendoExpansionPanel');

        widget.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If `true`, the widget will be enabled. If `false`, the widget will be disabled.

#### Example - disable the widget

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        var widget = $("#expansionPanel").kendoExpansionPanel({
            expanded: true
        }).data('kendoExpansionPanel');

        widget.enable(false);
    </script>

### toggle

Toggles the widget. Both `expand` and `animation` parameters are optional.

#### Parameters

##### expand `Boolean`

If `true`, the widget will be expanded. If `false`, the widget will be collapsed.

##### animation `Boolean`

If `false`, the widget will be toggled without animations.

#### Example - disable the widget

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        var widget = $("#expansionPanel").kendoExpansionPanel({
            expanded: true
        }).data('kendoExpansionPanel');

        widget.toggle();
    </script>

## Events

### expand

Fired when the widget is expanded.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

### collapse

Fired when the widget is collapsed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

### complete

Fired when the animation during collapse/expand is completed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.