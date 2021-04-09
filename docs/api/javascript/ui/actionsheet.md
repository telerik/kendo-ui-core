---
title: ActionSheet
page_title: Configuration, methods and events of Kendo UI ActionSheet
description: How to initialize an ActionSheet UI widget, configure its properties and open it.
res_type: api
---

# kendo.ui.ActionSheet

Represents the Kendo UI ActionSheet widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

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
                  iconClass: 'k-icon k-i-edit',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  iconClass: 'k-icon k-i-heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  iconClass: 'k-icon k-i-upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  iconClass: 'k-icon k-i-cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

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
                  iconClass: 'k-icon k-i-edit',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  iconClass: 'k-icon k-i-heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  iconClass: 'k-icon k-i-upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  iconClass: 'k-icon k-i-cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

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
                  iconClass: 'k-icon k-i-edit',
                  click: onClick,
                  description: "Select to enter edit mode."
              },
              {
                  text: 'Add to Favorites',
                  iconClass: 'k-icon k-i-heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  iconClass: 'k-icon k-i-upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  iconClass: 'k-icon k-i-cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

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
                  iconClass: 'k-icon k-i-edit',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  iconClass: 'k-icon k-i-heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  iconClass: 'k-icon k-i-upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  iconClass: 'k-icon k-i-cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

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
                  iconClass: 'k-icon k-i-edit',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  iconClass: 'k-icon k-i-heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  iconClass: 'k-icon k-i-upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  iconClass: 'k-icon k-i-cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

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
                  iconClass: 'k-icon k-i-edit',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  iconClass: 'k-icon k-i-heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  iconClass: 'k-icon k-i-upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  iconClass: 'k-icon k-i-cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

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
                  iconClass: 'k-icon k-i-edit',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  iconClass: 'k-icon k-i-heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  iconClass: 'k-icon k-i-upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  iconClass: 'k-icon k-i-cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

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
          title:'Select item',1
          items:[
              {
                  text: 'Edit Item',
                  iconClass: 'k-icon k-i-edit',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  iconClass: 'k-icon k-i-heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  iconClass: 'k-icon k-i-upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  iconClass: 'k-icon k-i-cancel',
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
                  iconClass: 'k-icon k-i-edit',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  iconClass: 'k-icon k-i-heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  iconClass: 'k-icon k-i-upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  iconClass: 'k-icon k-i-cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
      actionsheet.destroy();
    </script>

### open

Opens the popup element of the widget.

#### Example - open the widget

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',1
          items:[
              {
                  text: 'Edit Item',
                  iconClass: 'k-icon k-i-edit',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  iconClass: 'k-icon k-i-heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  iconClass: 'k-icon k-i-upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  iconClass: 'k-icon k-i-cancel',
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

## Events

### close

Fired when the widget is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

### open

Fired when the widget is opened.

The event handler function context (available via the `this` keyword) will be set to the widget instance.
