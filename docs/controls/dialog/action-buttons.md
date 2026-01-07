---
title: Action Buttons
page_title: jQuery Dialog Documentation - Action Buttons
description: "Get started with the jQuery Dialog by Kendo UI and set the action buttons of the widget."
components: ["dialog"]
slug: actionbuttons_kendoui_dialog
position: 4
---

# Action Buttons

The action buttons of the Dialog allow you to provide specific interaction to users.

Each button has a text and an action handler attached to it. Generally, each button closes the Dialog as its last action but you can cancel this from the custom action handler. The order of the values in the actions array determines the order in which the action buttons will be rendered in the Dialog.

## Basic Configuration

The following example demonstrates how to set three action buttons in a Dialog with a `stretched` layout. The last button has an `action` event handler attached and is set as `primary`.

      $("#dialog").kendoDialog({
          width: "400px",
          title: "Software Update",
          buttonLayout: "stretched",
          content: "<p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?<p>",
          actions: [
              { text: 'Skip this version' },
              { text: 'Remind me later' },
              {
                  text: 'Install update',
                  primary: true,
                  action: function (e) {
                      alert("Install update action was clicked");
                      // Returning false will prevent the closing of the dialog
                      return true;
                    },
              }
          ],
      });

## Available Options

The Dialog action buttons support the following configuration options:

* `text`&mdash;The text displayed on the button.
* `action`&mdash;The callback function executed when the button is clicked.
* `primary`&mdash;A boolean indicating whether the button is styled as a primary button.
* `themeColor`&mdash;Controls the main color applied to the button.
* `size`&mdash;Controls the physical size of the button.
* `rounded`&mdash;Controls the border radius of the button.
* `fillMode`&mdash;Controls how the color is applied to the button.
* `icon`&mdash;Defines a built-in Kendo UI icon to display in the button.
* `iconClass`&mdash;Defines custom CSS classes for displaying custom icons.
* `cssClass`&mdash;Adds custom CSS classes to the button.

## Adding Icons to Action Buttons

You can enhance action buttons with icons to improve visual communication and user experience. The Dialog supports both built-in Kendo UI icons and custom icon libraries.

### Using Built-in Icons

Use the `icon` property to add a built-in Kendo UI icon to an action button. For a complete list of available icons, refer to the [List of Icons](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/).

      $("#dialog").kendoDialog({
          title: "Delete File",
          content: "Are you sure you want to delete this file?",
          actions: [
              { 
                  text: "Cancel",
                  fillMode: "flat"
              },
              { 
                  text: "Delete",
                  themeColor: "error",
                  icon: "trash",
                  primary: true,
                  action: function(e) {
                      console.log("Delete action triggered");
                      return true;
                  }
              }
          ]
      });

### Using Custom Icons

Use the `iconClass` property to add icons from external icon libraries such as Font Awesome or Material Icons.

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
      <div id="dialog"></div>
      <script>
          $("#dialog").kendoDialog({
              title: "Archive Document",
              content: "Would you like to archive this document?",
              actions: [
                  { 
                      text: "Cancel",
                      fillMode: "flat"
                  },
                  { 
                      text: "Archive",
                      themeColor: "primary",
                      iconClass: "fas fa-archive",
                      action: function(e) {
                          console.log("Archive action triggered");
                          return true;
                      }
                  }
              ]
          });
      </script>

## Customizing Button Appearance

The Dialog action buttons support extensive appearance customization through several properties.

### Theme Colors

The `themeColor` property controls the color scheme of the button. Available values are: `base`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `dark`, `light`, `inverse`, and `none`.

      $("#dialog").kendoDialog({
          title: "Confirm Action",
          content: "Please choose an option:",
          actions: [
              { text: "Info", themeColor: "info" },
              { text: "Success", themeColor: "success" },
              { text: "Warning", themeColor: "warning" },
              { text: "Error", themeColor: "error" }
          ]
      });

### Button Sizes

The `size` property controls the physical size of the button. Available values are: `small`, `medium`, `large`, and `none`. The default value is `medium`.

      $("#dialog").kendoDialog({
          title: "Button Sizes",
          content: "Buttons with different sizes:",
          actions: [
              { text: "Small", size: "small" },
              { text: "Medium", size: "medium" },
              { text: "Large", size: "large" }
          ]
      });

### Border Radius

The `rounded` property controls the border radius of the button. Available values are: `small`, `medium`, `large`, `full`, and `none`. The default value is `medium`.

      $("#dialog").kendoDialog({
          title: "Button Shapes",
          content: "Buttons with different border radius:",
          actions: [
              { text: "Sharp", rounded: "none" },
              { text: "Rounded", rounded: "medium" },
              { text: "Pill", rounded: "full" }
          ]
      });

### Fill Modes

The `fillMode` property controls how the color is applied to the button. Available values are: `solid`, `outline`, `flat`, `link`, and `none`. The default value is `solid`.

      $("#dialog").kendoDialog({
          title: "Fill Modes",
          content: "Buttons with different fill modes:",
          actions: [
              { text: "Solid", themeColor: "primary", fillMode: "solid" },
              { text: "Outline", themeColor: "primary", fillMode: "outline" },
              { text: "Flat", themeColor: "primary", fillMode: "flat" },
              { text: "Link", themeColor: "primary", fillMode: "link" }
          ]
      });

## Comprehensive Example

The following example demonstrates a Dialog with enhanced action buttons combining icons, colors, and custom styling:

      $("#dialog").kendoDialog({
          width: "450px",
          title: "Confirm Delete",
          content: "<p>This action cannot be undone. Are you sure you want to permanently delete this item?</p>",
          actions: [
              {
                  text: "Cancel",
                  fillMode: "flat",
                  action: function(e) {
                      console.log("Cancelled");
                      return true;
                  }
              },
              {
                  text: "Delete",
                  icon: "trash",
                  themeColor: "error",
                  size: "medium",
                  rounded: "medium",
                  fillMode: "solid",
                  primary: true,
                  action: function(e) {
                      console.log("Item deleted");
                      // Perform delete operation
                      return true;
                  }
              }
          ]
      });

## See Also

* [Basic Usage of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/index)
* [Using the API of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/api)
* [JavaScript API Reference of the Dialog](/api/javascript/ui/dialog)
