---
title: Overview
page_title: Overview
description: "The Telerik UI for {{ site.framework }} SmartPasteButton component extracts form data from clipboard text using AI."
components: ["smartpastebutton"]
slug: htmlhelpers_overview_smartpastebutton
position: 1
---

# {{ site.framework }} SmartPasteButton Overview

{% if site.core %}
The Telerik UI SmartPasteButton TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI SmartPasteButton widget.
{% else %}
The Telerik UI SmartPasteButton HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI SmartPasteButton widget.
{% endif %}

The SmartPasteButton enables users to copy unstructured text (for example, a message or an email signature) and paste it into a form. The component sends the clipboard content to an AI service, receives structured data, and populates the available form fields.

* [Demo page for the SmartPasteButton](https://demos.telerik.com/{{ site.platform }}/smartpastebutton)

## Initializing the SmartPasteButton

The following example demonstrates how to define a SmartPasteButton.

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPasteButton")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPasteButton"
                        text="Smart Paste">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>
```
{% endif %}

## Using the SmartPasteButton with Editors

In the SmartPasteButton demo, the component is used next to editors that represent the target form fields.

```HtmlHelper
<form id="form1">
    @(Html.Kendo().TextBox()
        .Name("fullName")
        .Label(l => l.Content("Full Name"))
        .Placeholder("Full Name")
    )

    @(Html.Kendo().TextBox()
        .Name("city")
        .Label(l => l.Content("City"))
        .Placeholder("City")
    )

    @(Html.Kendo().MaskedTextBox()
        .Name("phone_number")
        .Label(l => l.Content("Phone Number"))
        .HtmlAttributes(new { placeholder = "e.g. XXXXXXXX" })
        .Mask("(000) 000-00-00")
    )

    <div class="form-actions">
        @(Html.Kendo().SmartPasteButton()
            .Name("smartPaste")
            .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
            .Text("Smart Paste")
            .Events(e => e.RequestStart("onRequestStart").RequestEnd("onRequestEnd"))
        )
    </div>
</form>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<form id="form1">
    <kendo-textbox name="fullName" placeholder="Full Name">
        <textbox-label content="Full Name" />
    </kendo-textbox>

    <kendo-textbox name="city" placeholder="City">
        <textbox-label content="City" />
    </kendo-textbox>

    <kendo-maskedtextbox name="phone_number"
                         mask="(000) 000-00-00"
                         placeholder="e.g. XXXXXXXX">
        <maskedtextbox-label content="Phone Number" />
    </kendo-maskedtextbox>

    <div class="form-actions">
        <kendo-smartpastebutton name="smartPaste"
                                text="Smart Paste"
                                on-request-start="onRequestStart"
                                on-request-end="onRequestEnd">
            <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
        </kendo-smartpastebutton>
    </div>
</form>
```
{% endif %}

## Functionality and Features

* [Getting Started]({% slug smartpastebutton_getting_started %})&mdash;Step-by-step guide to create and initialize the SmartPasteButton.
* [AI service integration]({% slug smartpastebutton_ai_service_integration %})&mdash;Configure the AI service endpoint that processes clipboard content and returns structured data.
* [Events]({% slug smartpastebutton_events %})&mdash;Handle the request lifecycle and customize the component behavior.
* [Appearance]({% slug smartpastebutton_appearance %})&mdash;Customize size, theme color, border radius, fill mode, and icon.
* [Error Handling]({% slug smartpastebutton_error_handling %})&mdash;Reset and clear validation error states in form scenarios.
* [Keyboard Navigation]({% slug smartpastebutton_keyboard_navigation %})&mdash;Navigate and interact with the SmartPasteButton through keyboard shortcuts.

## Supported Kendo UI Components

The SmartPasteButton can be used next to common editors and with the Telerik UI Form.

| Component | Documentation |
|-----------|---------------|
| AutoComplete | [AutoComplete Overview]({% slug htmlhelpers_autocomplete_aspnetcore %}) |
| ComboBox | [ComboBox Overview]({% slug htmlhelpers_combobox_aspnetcore %}) |
| DateInput | [DateInput Overview]({% slug htmlhelpers_dateinput_aspnetcore %}) |
| DatePicker | [DatePicker Overview]({% slug htmlhelpers_datepicker_aspnetcore %}) |
| DateRangePicker | [DateRangePicker Overview]({% slug htmlhelpers_daterangepicker_aspnetcore %}) |
| DateTimePicker | [DateTimePicker Overview]({% slug htmlhelpers_datetimepicker_aspnetcore %}) |
| DropDownList | [DropDownList Overview]({% slug htmlhelpers_dropdownlist_aspnetcore %}) |
| DropDownTree | [DropDownTree Overview]({% slug htmlhelpers_dropdowntree_aspnetcore %}) |
| Form | [Form Overview]({% slug htmlhelpers_form_aspnetcore_overview %}) |
| MaskedTextBox | [MaskedTextBox Overview]({% slug htmlhelpers_maskedtextbox_aspnetcore %}) |
| MultiColumnComboBox | [MultiColumnComboBox Overview]({% slug htmlhelpers_multicolumncombobox_aspnetcore %}) |
| MultiSelect | [MultiSelect Overview]({% slug htmlhelpers_multiselect_aspnetcore %}) |
| NumericTextBox | [NumericTextBox Overview]({% slug htmlhelpers_numerictextbox_aspnetcore %}) |
| RadioGroup | [RadioGroup Overview]({% slug htmlhelpers_radiogroup_aspnetcore_overview %}) |
| Rating | [Rating Overview]({% slug htmlhelpers_rating_aspnetcore_overview %}) |
| Switch | [Switch Overview]({% slug overview_switchhelper_aspnetcore %}) |
| TextArea | [TextArea Overview]({% slug htmlhelpers_overview_textarea %}) |
| TextBox | [TextBox Overview]({% slug htmlhelpers_overview_textbox %}) |
| TimeDurationPicker | [TimeDurationPicker Overview]({% slug htmlhelpers_timedurationpickerhelper_overview %}) |
| TimePicker | [TimePicker Overview]({% slug overview_timepickerhelper_aspnetcore %}) |

## Next Steps

* [Getting Started with the SmartPasteButton]({% slug smartpastebutton_getting_started %})
* [Basic Usage of the SmartPasteButton (Demo)](https://demos.telerik.com/{{ site.platform }}/smartpastebutton)
* [SmartPasteButton Events (Demo)](https://demos.telerik.com/{{ site.platform }}/smartpastebutton/events)
* [SmartPasteButton Appearance (Demo)](https://demos.telerik.com/{{ site.platform }}/smartpastebutton/appearance)
* [JavaScript API Reference of the SmartPasteButton](https://docs.telerik.com/kendo-ui/api/javascript/ui/smartpastebutton)

## See Also

* [Getting Started with the SmartPasteButton]({% slug smartpastebutton_getting_started %})
* [Appearance of the SmartPasteButton]({% slug smartpastebutton_appearance %})
* [Events of the SmartPasteButton]({% slug smartpastebutton_events %})
* [AI Service Integration]({% slug smartpastebutton_ai_service_integration %})
* [Server-Side API of the SmartPasteButton ](/api/smartpastebutton)
{% if site.core %}
* [Server-Side API of the SmartPasteButton TagHelper](/api/taghelpers/smartpastebutton)
{% endif %}* 
* [Knowledge Base Section](/knowledge-base)
