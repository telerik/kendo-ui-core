---
title: Overview
page_title: Overview
description: "Discover the features and functionalities of the Telerik UI ActionSheet component for {{ site.framework }}. Learn how to initialize and configure the ActionSheet control." 
slug: htmlhelpers_actionsheet_aspnetcore
position: 0
---

# {{ site.framework }} ActionSheet Overview

{% if site.core %}
The Telerik UI ActionSheet TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ActionSheet widget.
{% else %}
The Telerik UI ActionSheet HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ActionSheet widget.
{% endif %}

The ActionSheet is a dialog that displays a set of options for the user to choose from. The component appears on top of the app's content, and the user must manually dismiss it before resuming the interaction with the app.

* [Demo page for the ActionSheet HtmlHelper](https://demos.telerik.com/{{ site.platform }}/actionsheet/index)
{% if site.core %}
* [Demo page for the ActionSheet TagHelper](https://demos.telerik.com/aspnet-core/actionsheet/tag-helper)
{% endif %}

## Initializing the ActionSheet

The following example demonstrates how to define the ActionSheet.

```HtmlHelper
    @(Html.Kendo().ActionSheet()
        .Name("actionsheet")
    )
```
{% if site.core %}
```TagHelper
    <kendo-actionsheet name="actionsheet">
    </kendo-actionsheet>
```
{% endif %}

## Basic Configuration

The following example demonstrates a basic configuration of the ActionSheet component with multiple items.

```HtmlHelper
    @(Html.Kendo().ActionSheet()
        .Name("actionsheet")
        .Title("Select item")
        .Items(items =>
        {
            items.Add().Text("Edit Item").IconClass("k-icon k-i-edit").Click("onClick");
            items.Add().Text("Add to Favorites").IconClass("k-icon k-i-heart").Click("onClick");
            items.Add().Text("Upload New").IconClass("k-icon k-i-upload").Click("onClick");
            items.Add().Text("Cancel").IconClass("k-icon k-i-cancel").Group("bottom").Click("onClick");
        })
        .Animation(animation =>
        {
            animation.Open(open =>
            {
                open.Expand(ExpandDirection.Vertical);
            });
        })
        .CloseOnClick(true)
        .ActionButtonsAlignment(ActionButtonsAlignment.Justify)
        .ActionButtonsOrientation(ActionButtonsOrientation.Vertical)
        .StartButton(startButton =>
        {
            startButton
                .Icon("pencil")
                .Click("startButtonClick");
        })
    )

    <script>
    $(function() {
        // The Name() of the ActionSheet is used to get its client-side instance.
        function onClick(e) {
            e.preventDefault();
            var actionsheet = $("#actionsheet").data("kendoActionSheet");
            actionsheet.close();
        }

        function startButtonClick(e) {
            // Handle the "click" event of the start button.
        }
    });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-actionsheet
        name="actionsheet"
        title="Select item"
        close-on-click="true"
        action-buttons-alignment="ActionButtonsAlignment.Justify"
        action-buttons-orientation="ActionButtonsOrientation.Vertical"
    >
        <start-button icon="pencil" click="startButtonClick"/>
        <popup-animation enabled="true">
            <open effects="expand:vertical" />
        </popup-animation>
        <items>
            @* add actionsheet items *@
        </items>
    </kendo-actionsheet>

    <script>
    $(function() {
        // The Name() of the ActionSheet is used to get its client-side instance.
        function onClick(e) {
            e.preventDefault();
            var actionsheet = $("#actionsheet").data("kendoActionSheet");
            actionsheet.close();
        }

        function startButtonClick(e) {
            // Handle the "click" event of the start button.
        }
    });
    </script>
```
{% endif %}

## Functionality and Features

* [Items]({% slug htmlhelpers_items_actionsheet_aspnetcore %})&mdash;You can configure the desired items and set various attributes like icons, text, descriptions, and more.
* [Animations]({% slug htmlhelpers_animations_actionsheet %})&mdash;The ActionSheet allows you to define opening and closing animations.
* [Action_Buttons]({% slug htmlhelpers_actionbuttons_actionsheet %})&mdash;The ActionSheet allows you to configure the orientation and alignment of the action buttons.
* [Events]({% slug htmlhelpers_events_actionsheet_aspnetcore %})&mdash;Handle the component events and implement the any custom functionality.
* [Accessibility]({% slug htmlhelpers_actionsheet_accessibility %})&mdash;The ActionSheet is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_wizard %}) for faster navigation.

## Next Steps

* [Getting Started with the ActionSheet]({% slug action_sheet_getting_started %})
* [Basic Usage of the ActionSheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/actionsheet)
{% if site.core %}
* [Basic Usage of the ActionSheet TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/actionsheet/tag-helper)
{% endif %}

## See Also

* [Using the API of the ActionSheet for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/actionsheet/api)
* [Knowledge Base Section](/knowledge-base)