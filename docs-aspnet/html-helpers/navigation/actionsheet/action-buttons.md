---
title: Action Buttons
page_title: ActionSheet Documentation - Action Buttons
description: "Learn how to control the Action Buttons alignment and orientation in the Telerik UI ActionSheet component for {{ site.framework }}."
components: ["actionsheet"]
slug: htmlhelpers_actionbuttons_actionsheet
position: 3
---

# Action Buttons

Starting with 2025 Q2 release, the ActionSheet allows configuring of orientation and layout of the action buttons.

## Orientation

By default, the ActionSheet component displays the action buttons in a `Horizontal` mode, but also allows you to set their visualization to `Vertical`. You can control the orientation with the [`ActionButtonsOrientation`](/api/kendo.mvc.ui.fluent/actionsheetbuilder#actionbuttonsorientationkendomvcuiactionbuttonsorientation) configuration option. 

The example below demonstrates the action buttons appearance in `Vertical` mode.

```HtmlHelper
    @(Html.Kendo().ActionSheet()
        .Name("actionsheet")
        .Title("Select item")
        .ActionButtonsOrientation(ActionButtonsOrientation.Vertical)
        .Items(items =>
        {
            items.Add().Text("Edit Item").IconClass("k-i-pencil").Click("onClick");
            items.Add().Text("Add to Favorites").IconClass("k-i-heart").Click("onClick");
        })
        .ActionButtons(buttons =>
        {
            buttons.Add().Icon("check").FillMode("solid").ThemeColor("primary").Rounded("full").Size("large").Text("Confirm");
            buttons.Add().Icon("cancel").FillMode("outline").ThemeColor("info").Rounded("full").Size("large").Text("Cancel");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-actionsheet
        name="actionsheet"
        title="Select item"
        action-buttons-orientation="ActionButtonsOrientation.Vertical"
    >
        <items>
            <item text="Edit Item" icon-class="k-i-pencil" click="onClick" />
            <item text="Add to Favorites" icon-class="k-i-heart" click="onClick" />
        </items>
        <action-buttons>
            <action-button icon="check" fill-mode="solid" theme-color="primary" rounded="full" size="large" text="Confirm"/>
            <action-button icon="cancel" fill-mode="outline" theme-color="info" rounded="full" size="large" text="Cancel"/>
        </action-buttons>
    </kendo-actionsheet>
```
{% endif %}
```JS scripts
    <script>
        function onClick() {
            var actionsheet = $("#actionsheet").data("kendoActionSheet");
            actionsheet.close();
        }
    </script>
```

## Alignment

The ActionSheet component supports multiple types of [`ActionButtonsAlignment`](/api/kendo.mvc.ui.fluent/actionsheetbuilder#actionbuttonsalignmentkendomvcuiactionbuttonsalignment). By default, the action buttons are rendered `Stretched`. This alignment of the action buttons works only when the `ActionButtonsOrientation` is set to `Horizontal` mode. 

The example below demonstrates how to align the action buttons at the start edge of the footer container.

```HtmlHelper
    @(Html.Kendo().ActionSheet()
        .Name("actionsheet")
        .Title("Select item")
        .ActionButtonsAlignment(ActionButtonsAlignment.Start)
        .Items(items =>
        {
            items.Add().Text("Edit Item").IconClass("k-i-pencil").Click("onClick");
            items.Add().Text("Add to Favorites").IconClass("k-i-heart").Click("onClick");
        })
        .ActionButtons(buttons =>
        {
            buttons.Add().Icon("check").FillMode("solid").ThemeColor("primary").Rounded("full").Size("large").Text("Confirm");
            buttons.Add().Icon("cancel").FillMode("outline").ThemeColor("info").Rounded("full").Size("large").Text("Cancel");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-actionsheet
        name="actionsheet"
        title="Select item"
        action-buttons-alignment="ActionButtonsAlignment.Start"
    >
        <items>
            <item text="Edit Item" icon-class="k-i-pencil" click="onClick" />
            <item text="Add to Favorites" icon-class="k-i-heart" click="onClick" />
        </items>
        <action-buttons>
            <action-button icon="check" fill-mode="solid" theme-color="primary" rounded="full" size="large" text="Confirm"/>
            <action-button icon="cancel" fill-mode="outline" theme-color="info" rounded="full" size="large" text="Cancel"/>
        </action-buttons>
    </kendo-actionsheet>
```
{% endif %}
```JS scripts
    <script>
        function onClick() {
            var actionsheet = $("#actionsheet").data("kendoActionSheet");
            actionsheet.close();
        }
    </script>
```

## See Also

* [Action Buttons of the ActionSheet for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/actionsheet/action-buttons)
* [Server-Side API of the ActionSheet HtmlHelper](/api/actionsheet)
{% if site.core %}
* [Server-Side API of the ActionSheet TagHelper](/api/taghelpers/actionsheet)
{% endif %}
* [Client-Side API of the ActionSheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/actionsheet)