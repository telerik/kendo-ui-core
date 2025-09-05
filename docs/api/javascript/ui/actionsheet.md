---
title: ActionSheet
page_title: Configuration, methods and events of Kendo UI ActionSheet
description: How to initialize an ActionSheet UI widget, configure its properties and open it.
res_type: api
---

# kendo.ui.ActionSheet

Represents the Kendo UI ActionSheet widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### actionButtons `Array`

A JavaScript array that contains the ActionSheet's action buttons configuration. They will be rendered in the footer of the widget.

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>


### actionButtons.click `Function`

Specifies the click event handler of the action button.

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.disabled `Boolean`

If set to true, the action button will be disabled.

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick,
                    disabled: true
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.fillMode `String` *(default: 'solid')*

Controls how the color is applied to the button. Valid values are: `"solid"`, `"outline"`, `"flat"`, `"link"`, and `"none"`. Default value is `"solid"`.

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    iconClass: "custom-confirm-button-class",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.icon `String`

Specifies the icon's name of the action button.


#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>


### actionButtons.iconClass `String`

Specifies the icon's class of the action button.


#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    iconClass: "custom-confirm-button-class",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.rounded `String` *(default: 'medium')*

Controls what border radius is applied to a button. Valid values are: `"small"`, `"medium"`, `"large"`, `"full"`, and `"none"`. Default value is `"medium"`.


#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    iconClass: "custom-confirm-button-class",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.size `String` *(default: 'medium')*

Controls the overall physical size of a button. Valid values are:  `"small"`, `"medium"`, `"large"`, and `"none"`. Default value is `"medium"`.

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    iconClass: "custom-confirm-button-class",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>


### actionButtons.text `String`

Specifies the text of the action button.

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.themeColor `String` *(default: 'base')*

Controls the main color applied to the button. Valid values are:  `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"dark"`, `"light"`, `"inverse"`, and `"none"`. Default value is `"base"`.

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    iconClass: "custom-confirm-button-class",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtonsOrientation `String`*(default: "horizontal")*

Determines the orientation of the action buttons in the footer. Valid values are `"horizontal"` and `"vertical"`.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Confirmation',
          actionButtonsOrientation: "vertical",
          actionButtons: [
              {
                  text: "Confirm",
                  icon: "check",
                  fillMode: "solid",
                  themeColor: "primary",
                  click: onClick
              },
              {
                  text: "Cancel",
                  icon: "x",
                  fillMode: "flat",
                  click: onClick
              }
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }

      actionsheet.open();
    </script>

### actionButtonsAlignment `String`*(default: "stretched")*

Controls the alignment of the action buttons in the footer. This configuation works only in horizontal mode.

Valid values are `"stretched"`, `"justify"`, `"start"`, `"center"`, and `"end"`.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Confirmation',
          actionButtonsAlignment: "end",
          actionButtons: [
              {
                  text: "Confirm",
                  icon: "check",
                  fillMode: "solid",
                  themeColor: "primary",
                  click: onClick
              },
              {
                  text: "Cancel",
                  icon: "x",
                  fillMode: "flat",
                  click: onClick
              }
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }

      actionsheet.open();
    </script>

### adaptive `Boolean`*(default: false)*

When the ActionSheet is adaptive, it occupies the full width of the screen and has the option to cover the entire screen if the `fullscreen` is set to `true` as well.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          adaptive: true,
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### animation `Boolean|Object`*(default: false)*

Configures the opening and closing animations of the ActionSheet. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the ActionSheet will open and close instantly. This property has effect only in `adaptive` mode.

`animation:true` is not a valid configuration.

#### Example - disable open and close animations

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Action Sheet',
          adaptive: true,
          animation: false,
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil'
              }
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
    </script>

#### Example - configure custom animation

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Action Sheet',
          adaptive: true,
          animation: {
              open: {
                  effects: "fadeIn",
                  duration: 300
              },
              close: {
                  effects: "fadeOut",
                  duration: 150
              }
          },
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil'
              }
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
    </script>

### closeButton `Boolean`*(default: false)*

Whether a close button would be rendered in the titlebar. A title needs to be set to get the titlebar rendered.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          closeButton: true,
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### closeOnClick `Boolean`*(default: true)*

Determines whether the ActionSheet will close when clicking outside of it. If set to `false`, the ActionSheet will remain open until explicitly closed through code or by clicking the close button (if enabled).

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Select item',
          closeOnClick: false,
          closeButton: true,
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              }
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### contentTemplate `String|Function`

The text or the function whose result will be shown within the ActionSheet. By default, the ActionSheet will display the content of the target element. The content template will be disregarded if there are `items` defined in the widget options.

> If the content that is passed to the ActionSheet includes scripts, they will be executed. If this is not desired, strip any undesired content in advance.


#### Example

    <div id="actionsheet"></div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Title',
            contentTemplate: () => "This is a content template",
        }).data('kendoActionSheet');

        actionsheet.open();
    </script>

#### Example - using the content of the target element

    <div id="actionsheet"><span class="test" style="font-weight: bold">This is some content</span></div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Title'
        }).data('kendoActionSheet');

        actionsheet.open();
    </script>

### footerTemplate `String|Function`

The text or the function whose result will be shown within the footer of the ActionSheet. The footer template will be disregarded if there are `actionButtons` defined in the widget options.

> If the content that is passed to the ActionSheet includes scripts, they will be executed. If this is not desired, strip any undesired content in advance.

#### Example

    <div id="actionsheet"></div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Title',
            contentTemplate: () => "This is a content template",
            footerTemplate: () => "This is a footer template"
        }).data('kendoActionSheet');

        actionsheet.open();
    </script>

### fullscreen `Boolean`*(default: false)*

Specifies whether the adaptive actionsheet would cover the entire screen when opened.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          adaptive: true,
          fullscreen: true,
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items `Array`

A JavaScript array that contains the ActionSheet's items configuration.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.click `Function`

Specifies the click event handler of the item.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.description `String`

Specifies the description of the item.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick,
                  description: "Select to enter edit mode."
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.disabled `Boolean`

If set to true, the item will be disabled.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick,
                  description: "Select to enter edit mode.",
                  disabled: true
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.group `String`

Specifies the group of the item. Items can be segregated in two groups - `top` and `bottom`.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>


### items.icon `String`

Specifies the icon's name of the item.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.iconClass `String`

Specifies the icon's class of the item.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  iconClass: 'custom-edit-class',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.iconColor `String`

The icon color. Available options are `inherit`, `default`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `dark`, `light`, `inverted` or any hexadecimal value.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  iconColor: "info",
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.iconSize `Number`

The icon size in pixels.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  iconColor: "info",
                  iconSize: 40,
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.text `String`

Specifies the main text of the item

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### startButton `Object`*(default: false)*

When configured, a start button will be rendered in the left side of the header section of the ActionSheet. Typically used for navigation or back functionality. The button is only visible when `title` is also specified.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Select item',
          startButton: {
              icon: "chevron-left",
              click: function(e) {
                  console.log("Start button clicked");
              }
          },
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              }
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
      }
    </script>

### startButton.icon `String`

Specifies the icon to be displayed in the start button.

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        startButton: {
            text: "Start",
            icon: "play"
        }
    }).data("kendoActionSheet").open();
    </script>

### startButton.click `Function`

The function that will be executed when the start button is clicked.

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        startButton: {
            text: "Start",
            click: function(e) {
                console.log("Start button clicked");
            }
        }
    }).data("kendoActionSheet").open();
    </script>

### subtitle `String`

Specifies the subtitle of the component. Requires the `title` to be configured in order to have the titlebar rendered.

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Select item',
          subtitle: 'Selecting an item closes the actionsheet',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### title `String`

Specifies the title of the component

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

## Methods

### close

Closes the popup element of the widget.

#### Example - close the widget

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
      actionsheet.open();
      setTimeout(function(){actionsheet.close()},2000)
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.

#### Example - destroy  the widget

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
      actionsheet.destroy();
    </script>


### fullscreen

Sets whether the adaptive ActionSheet would occupy the entire screen or only the bottom part and have a modal overlay.

#### Example - make the adaptive widget fullscreen

    <div id="actionsheet"></div>
    <script>
        var actionsheet = $("#actionsheet").kendoActionSheet({
            adaptive: true,
            title: "Fullscreen actionsheet",
            closeButton: true
        }).getKendoActionSheet();

        actionsheet.fullscreen(true);
        actionsheet.open();
    </script>


### open

Opens the popup element of the widget.

#### Example - open the widget

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
      actionsheet.open();
    </script>

### toggle

Toggles the popup element of the widget.

#### Example - toggle the widget

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Close',
                  icon: 'cancel',
                  group: 'bottom',
                  click: (ev) => actionsheet.toggle()
              },
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
      }

      actionsheet.toggle();
    </script>

### visible

Checks whether the actionsheet is visible

#### Returns

`Boolean` True when the actionsheet is visible

#### Example

    <div id="actionsheet">CONTENT</div>
    <script>
        var actionsheet = $("#actionsheet").kendoActionSheet().data("kendoActionSheet");
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(actionsheet.visible());
    </script>

## Events

### activate

Fired when the widget is opened.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        activate: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("ActionSheet activated");
        }
    }).data("kendoActionSheet").open();
    </script>

### close

Fired when the widget closes.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        close: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("ActionSheet closed");
        }
    }).data("kendoActionSheet").open();
    </script>

### deactivate

Fired when the widget is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        deactivate: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("ActionSheet deactivated");
        }
    }).data("kendoActionSheet").open();
    </script>

### open

Fired when the widget opens.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        open: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("ActionSheet opened");
        }
    }).data("kendoActionSheet").open();
    </script>
