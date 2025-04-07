---
title: Passing a Parameter Dynamically to a Dialog Action Button
description: An example on how to pass a parametery dynamically to an action button when using the Telerik UI for {{ site.framework }} Dialog.
type: how-to
page_title: Passing a Parameter Dynamically to an Action Button of the Dialog
slug: dialog-dynamic-action-parameter
tags: dialog, dynamic, parameter, action, button, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Dialog</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1010 version</td>
 </tr>
</table>

## Description

How can I pass a parameter dynamically to a specified action button of a Dialog before opening the Dialog?

## Solution

1. Create a [`Button`]({% slug htmlhelpers_button_aspnetcore %}) to open the Dialog when clicked.
1. Get a reference to the hidden Dialog within the Button's [`Click`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/buttoneventbuilder#clicksystemstring) event handler.
1. Access the current actions configuration of the Dialog.
1. Set a new callback function of the Action and pass the desired parameter.
1. Call the `setOptions()` method to update the Dialog's actions settings.
1. Open the Dialog by using the `open()` method.

    ```HtmlHelper
        @(Html.Kendo().Button()
            .Name("openDialogBtn")
            .Content("Open Dialog")
            .Events(ev=>ev.Click("onClick"))
        )

        @(Html.Kendo().Dialog()
            .Name("dialog")
            .Title("Confirm Remove User")
            .Content("<p>Are you sure you want to Remove this User?<p>")
            .Width(400)
            .Modal(true)
            .Actions(actions =>
            {
                actions.Add().Text("Cancel");
                actions.Add().Text("Confirm").Action("onConfirmRemoveUser").Primary(true);
            })
            .Visible(false)
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-button name="openDialogBtn" on-click="onClick">
            Open Dialog
        </kendo-button>

        <kendo-dialog name="dialog" title="Confirm Remove User" width="400" modal="true" visible="false">
            <actions>            
                <action text="Cancel"></action>
                <action text="Confirm" primary="true" action="onConfirmRemoveUser"></action>
            </actions>
            <content>
                <p>Are you sure you want to Remove this User?</p>
            </content>
        </kendo-dialog>
    ```
    {% endif %}
    ```Script
        <script>
            function onClick() {
                var customParam = "ABC123";
                var dialog = $('#dialog').data("kendoDialog");
                let dialogActions = dialog.options.actions;
                dialogActions[1].action = function() { // Update the callback function of the "Confirm" action.
                    return onConfirmRemoveUser(customParam);
                };
                dialog.setOptions({actions: dialogActions});
                dialog.open();
            }

            function onConfirmRemoveUser(idParam) {
                alert(idParam);
            }
        </script>
    ```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Dialog HtmlHelper](https://netcorerepl.telerik.com/wRFacjOW08flKnDM08)
* [Sample code with the Dialog TagHelper](https://netcorerepl.telerik.com/QnlYwZus08humtSF55)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on passing a parameter dynamically to a specified action button of the Dialog](https://netcorerepl.telerik.com/wRFacjOW08flKnDM08).
{% endif %}

## More {{ site.framework }} Dialog Resources

* [{{ site.framework }} Dialog Documentation]({%slug overview_dialoghelper_aspnetcore%})

* [{{ site.framework }} Dialog Demos](https://demos.telerik.com/{{ site.platform }}/dialog/index)

{% if site.core %}
* [{{ site.framework }} Dialog Product Page](https://www.telerik.com/aspnet-core-ui/dialog)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Dialog Product Page](https://www.telerik.com/aspnet-mvc/dialog-for-mvc)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Dialog for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/dialog)
* [Server-Side API Reference of the Dialog for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/dialog)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Dialog for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/dialog)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

