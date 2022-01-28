---
title: Action Buttons
page_title: Action Buttons
description: "Learn about the Action Buttons of the Telerik UI Dialog HtmlHelper for {{ site.framework }}."
slug: action_buttons_dialoghelper_aspnetcore
position: 3
---

# Action Buttons

The Dialog action buttons allow you to provide specific interaction to users.

Each button has a text and an action handler attached to it. Generally, each button closes the Dialog as its last action but you can cancel this from the custom action handler. The order of the values in the `Actions()` configuration method determines the order in which the action buttons are rendered in the Dialog. You can also define a button as `Primary(true)`.

The following example demonstrates how to set three action buttons in a Dialog with a `stretched` layout. The last button has an `Action()` event handler attached and is set as `Primary(true)`.

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

## See Also

* [Server-Side API](/api/dialog)
