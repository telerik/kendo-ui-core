---
title: Action Buttons
page_title: jQuery Dialog Documentation | Action Buttons
description: "Get started with the jQuery Dialog by Kendo UI and set the action buttons of the widget."
slug: actionbuttons_kendoui_dialog
position: 4
---

# Action Buttons

The action buttons of the Dialog allow you to provide specific interaction to users.

Each button has a text and an action handler attached to it. Generally, each button closes the Dialog as its last action but you can cancel this from the custom action handler. The order of the values in the actions array determines the order in which the action buttons will be rendered in the Dialog. You can also define the button as `primary`.

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

## See Also

* [Basic Usage of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/index)
* [Using the API of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/api)
* [JavaScript API Reference of the Dialog](/api/javascript/ui/dialog)
