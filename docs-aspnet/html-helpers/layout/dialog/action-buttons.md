---
title: Action Buttons
page_title: Action Buttons
description: "Learn about the Action Buttons of the Telerik UI Dialog component for {{ site.framework }}."
slug: action_buttons_dialoghelper_aspnetcore
position: 3
---

# Action Buttons

The Dialog action buttons allow you to provide specific interaction to users.

Each defined button has a text and an action handler attached to it. By default, the action buttons close the Dialog, but you can prevent the Dialog from closing by setting the respective action handler to return `false`.

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Software Update")
        ...
        {
            actions.Add().Text("Ok");
            actions.Add().Text("Cancel").Action("onCancel");
        })
    )

    <script type="text/javascript">
        function onCancel(e) {
            alert("Cancel action was clicked");
            return false; // Returning false will prevent the closing of the Dialog.
        }
    </script>
```
{% if site.core %}
```TagHelper
  <kendo-dialog name="dialog" title="Software Update">
        <actions>
            <action text="Ok">
            </action>
            <action text="Cancel" action="onCancel">
            </action>
        </actions>
        <!-- Other configuration -->
    </kendo-dialog>

    <script type="text/javascript">
        function onCancel(e) {
            alert("Cancel action was clicked");
            return false; // Returning false will prevent the closing of the Dialog.
        }
    </script>
```
{% endif %}

The order of the values in the `Actions()` configuration method determines the order in which the action buttons are rendered in the Dialog. You can also define a button as `Primary(true)`.

The following example demonstrates how to set three action buttons in a Dialog with a `stretched` layout. The last button has an `Action()` event handler attached and is set as `Primary(true)`.

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Software Update")
        .Content("<p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?<p>")
        .Width(400)
        .Modal(false)
        .ButtonLayout("stretched")
        .Actions(actions =>
        {
            actions.Add().Text("Skip this version");
            actions.Add().Text("Remind me later");
            actions.Add().Text("Install update").Primary(true).Action("onInstall");
        })
    )

    <script type="text/javascript">
        function onInstall(e) {
            alert("Install update action was clicked");
            // Returning false will prevent the closing of the dialog.
            return true;
        }
    </script>
```
{% if site.core %}
```TagHelper
  <kendo-dialog name="dialog" title="Software Update" width="400" modal="false">
        <actions>
            <action text="Skip this version">
            </action>
            <action text="Remind me later">
            </action>
            <action text="Install update" primary="true" action="onInstall">
            </action>
        </actions>
        <content>
            <p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?</p>
        </content>
    </kendo-dialog>

    <script type="text/javascript">
        function onInstall(e) {
            alert("Install update action was clicked");
            // Returning false will prevent the closing of the dialog.
            return true;
        }
    </script>

```
{% endif %}

## See Also

* [Server-Side API](/api/dialog)
