---
title: Overview
page_title: Overview
description: "Discover the Telerik UI for {{ site.framework }} Dialog component and its features like custom action buttons and built-in customization options."
previous_url: /helpers/layout/dialog/overview
slug: overview_dialoghelper_aspnetcore
position: 0
---

# {{ site.framework }} Dialog Overview

{% if site.core %}
The Telerik UI Dialog TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Dialog widget.
{% else %}
The Telerik UI Dialog HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Dialog widget.
{% endif %}

The Dialog is a modal popup that brings information to the user. It also enables the user to perform specific actions by using action buttons, for example, to enter data or choose between options. If needed, the Dialog can accommodate complex UI elements that require the focus of the user. The Dialog is a subtype of the [Kendo UI for jQuery Window]({% slug htmlhelpers_window_aspnetcore %}) with the most prominent differences being the added actions and predefined dialogs.

* [Demo page for the Dialog HtmlHelper](https://demos.telerik.com/{{ site.platform }}/dialog/index)
{% if site.core %}
* [Demo page for the Dialog TagHelper](https://demos.telerik.com/aspnet-core/dialog/tag-helper)
{% endif %}

## Initializing the Dialog

In the most common use case, the Dialog opens as a result of a user action rather than of the `load` event of the page. To achieve this, you must initialize the widget as non-visible and open it when needed.

The following example demonstrates how to define the Dialog.

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog") // The name of the Dialog is mandatory. It specifies the "id" attribute of the widget.
        .Title("Software Update")// Set the title of the Dialog.
        .Content("Do you agree terms and conditions?") // Define the content of the Dialog.
        .Visible(false) // The widget will be initialized as invisible.
    )
```
{% if site.core %}
```TagHelper
    <kendo-dialog name="dialog1">
        <content>Dialog contents</content>
    </kendo-dialog>
```
{% endif %}


## Basic Configuration

The Dialog provides default configuration options that you can set during its initialization&mdash;height and width, custom action buttons, title, close buttons, animation effects, and so on.

The following example demonstrates a basic Dialog configuration.

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Software Update")
        .Content("Do you agree terms and conditions?")
        .Width(400)  // Set the width of the Dialog.
        .Modal(false) // Disable the modality of the Dialog.
        .ButtonLayout("stretched") // Set a "stretched" layout for the action buttons.
        .Actions(actions =>
        {
            actions.Add().Text("NO"); // Set text of the first button.
            actions.Add().Text("YES").Primary(true); // Set text of the second button and define it as primary.
        })
    )

    <script type="text/javascript">
        $(function() {
            // The Name() of the Dialog is used to get its client-side instance.
            var dialog = $("#dialog").data("kendoDialog");
        });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-dialog name="dialog" title="Software Update" modal="false" on-close="dialog_close">
        <content>
            <p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?<p>
        </content>
        <actions>
            <action text="Skip this version">
            </action>
            <action text="Remind me later">
            </action>
            <action primary="true" text="Install update">
            </action>
        </actions>
    </kendo-dialog>
```
{% endif %}

## Functionality and Features

* [Custom action buttons]({% slug action_buttons_dialoghelper_aspnetcore %})—Adding action buttons to the Dialog allows you to interact with the user. 
* [Height and width]({% slug dimensions_dialoghelper_aspnetcore %})—You can control the dimensions of the Dialog by setting its height and width. The default size of the Dialog depends on its content.
* [HTML structure and DOM placement]({% slug structure_and_placement_dialoghelper_aspnetcore %})—Regardless of where you initialize the UI component, the HTML code of the Dialog will be appended as a child of the document's `<body>` element.
* [Accessibility]({% slug accessbility_aspnetcore_dialog %})—The Dialog is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_numerictextbox_aspnetcore %}) for faster navigation.
* [Events]({% slug events_dialog %})—The Dialog emits a variety of events that allow you to implement custom functionality.

## Next Steps

* [Getting Started with the Dialog]({% slug getting_started_dialog %})
* [Basic Usage of the Dialog HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dialog)
{% if site.core %}
* [Basic Usage of the Dialog TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dialog/tag-helper)
{% endif %}

## See Also

* [Using the API of the Dialog for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dialog/api)
* [Knowledge Base Section](/knowledge-base)
