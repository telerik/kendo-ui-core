---
title: Action Buttons
page_title: Dialog Action Buttons | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn about the Action Buttons of the Kendo UI Dialog HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: action_buttons_dialoghelper_aspnetcore
position: 3
---

# Action Buttons

The Dialog action buttons allow you to provide specific interaction to users.

Each button has a text and an action handler attached to it. Generally, each button closes the Dialog as its last action but you can cancel this from the custom action handler. The order of the values in the `Actions()` configuration method determines the order in which the action buttons are rendered in the Dialog. You can also define a button as `Primary(true)`.

The following example demonstrates how to set three action buttons in a Dialog with a `stretched` layout. The last button has an `Action()` event handler attached and is set as `Primary(true)`.

###### Example

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
            // Returning false will prevent the closing of the dialog
            return true;
        }
    </script>

## See Also

* [Overview of the Telerik UI for ASP.NET Core Dialog HTML Helper]({% slug overview_dialoghelper_aspnetcore %})
* [Structure and Placement of the Telerik UI for ASP.NET Core Dialog HTML Helper]({% slug structure_and_placement_dialoghelper_aspnetcore %})
* [Dimensions of the Telerik UI for ASP.NET Core Dialog HTML Helper]({% slug dimensions_dialoghelper_aspnetcore %})
