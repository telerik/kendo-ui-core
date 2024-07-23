---
title: Declarative Initialization
page_title: Declarative Initialization
description: "Learn how to enable the declarative initialization of the Telerik UI for {{ site.framework }} components."
slug: declarative_initialization_overview
position: 3
---

# Declarative Initialization

By default, the HTML and Tag Helpers output an initialization script after the helper's HTML markup. However, this behavior may not always be desirable. For instance, when the [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) is enabled, the inline scripts are blocked, or when the components are nested within each other and are loaded through [Kendo UI templates](https://docs.telerik.com/kendo-ui/framework/templates/overview), and more. In such scenarios, you can switch to declarative component initialization, where the component serializes an MVVM declarative configuration instead of an inline initialization script.

> Currently, the declarative initialization is supported only when using HTML Helpers.

## Using Declarative Initialization

The declarative initialization feature serializes the helper declaration as an MVVM configuration and initializes the component from the DOM elements on the client. 

To enable the declarative initialization:

1. Add the `UseMvvmInitialization()` method in the HTML Helper declaration. This option will instruct the respective component to serialize its helper declaration as an MVVM declarative configuration.
1. Call the <a href="https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/bind" target="_blank">`kendo.bind()`</a> method after the component's definition by passing the jQuery selector of the element that wraps the helper declaration or the `Name()` of the component. It is important to call the `kendo.bind()` in the `$(document).ready()` function.

The following example illustrates the generated declarative configuration of a [TextBox]({% slug htmlhelpers_overview_textbox %}) component when declarative initialization is enabled:

* TextBox declaration

    ```HtmlHelper
        <div id="textbox-container">
            @(Html.Kendo().TextBox()
                .Name("textbox")
                .Label(l => l.Content("Comments:"))
                .UseMvvmInitialization(true)
            )
        </div>

        <script>
            $(document).on("kendoReady", function () {
                kendo.bind($("#textbox-container"), {});
            });
        </script>
    ```

* Generated declarative configuration

    ```
        <div id="textbox-container">
            <label class="k-label k-input-label" for="textbox">Comments:</label>
            <span class="k-input k-textbox k-input-solid k-input-md k-rounded-md">
                <input data-label="{'content':'Comments:'}" data-role="textbox" id="textbox" name="textbox" type="text" value="" aria-disabled="false" class="k-input-inner" autocomplete="off" style="width: 100%;">
            </span>
        </div>
    ```

For a runnable example, refer to the [demo on using the declarative initialization of the TextBox](https://demos.telerik.com/{{ site.platform }}/textbox/declarative-initialization).

## Supported Components

The following table provides a list of the Telerik UI for {{ site.framework }} components that support the declarative initialization feature.

| Component | Documentation |
|-----------|---------------|
| AutoComplete | [AutoComplete Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/autocomplete/overview) |
| ColorPicker | [ColorPicker Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/colorpicker/overview) |
| ComboBox | [ComboBox Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/combobox/overview) |
| DateInput | [DateInput Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/dateinput/overview) |
| DatePicker | [DatePicker Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/datepicker/overview) |
| DateRangePicker | [DateRangePicker Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/daterangepicker/overview) |
| DateTimePicker | [DateTimePicker Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/datetimepicker/overview) |
| DropDownList | [DropDownList Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/dropdownlist/overview) |
| DropDownTree | [DropDownTree Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/dropdowntree/overview) |
| FlatColorPicker | [FlatColorPicker Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/flatcolorpicker/overview) |
| MaskedTextBox | [MaskedTextBox Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/maskedtextbox/overview) |
| MultiSelect | [MultiSelect Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/multiselect/overview) |
| NumericTextBox | [NumericTextBox Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/numerictextbox/overview) |
| TextArea | [TextArea Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/textarea/overview) |
| TextBox | [TextBox Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/textbox/overview) |
| TimeDurationPicker | [TimeDurationPicker Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/timedurationpicker/overview) |
| TimePicker | [TimePicker Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/timepicker/overview) |
| Upload | [Upload Overview](https://docs.telerik.com/{{site.platform}}/html-helpers/editors/upload/overview) |

## See Also

* [Content Security Policy]({% slug troubleshooting_content_security_policy_aspnetmvc%})
* [Deferred Initialization]({% slug deferred_initialization_overview %})