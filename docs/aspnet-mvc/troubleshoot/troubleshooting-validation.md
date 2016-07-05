---
title: Validation
page_title: Validation | UI for ASP.NET MVC Troubleshooting
description: "Learn about the solutions of issues that may occur while using the Kendo UI Validator or jQuery client-side validation."
slug: troubleshooting_validation_aspnetmvc
position: 3
---

# Validation

This page provides solutions to common issues you may encounter while implementing the client-side validation.

## Common Validation Issues

### Validation Tooltips Are Shown in Widget Wrappers When Using the Validator

By default, the Tooltip is added right after the input so that if the input is used for a widget, the Tooltip is added inside the wrapper element and is not displayed correctly.

**Solution**

Customize the Tooltip position by using either of the following approaches:

* Use the `ValidationMessage` or `ValidationMessageFor` helpers for the property.

###### Example

        @Html.Kendo().NumericTextBoxFor(model => model.UnitPrice)
        @Html.ValidationMessageFor(model => model.UnitPrice)

* Use the approach demonstrated [in the introductory article on the Kendo UI Validator]({% slug overview_kendoui_validator_widget %}) to add a placeholder.

### Widgets Are Hidden after Postbacks When Using jQuery Validation

If the client-side validation does not prevent the form to be posted and the server-side validation fails for a property, the `input-validation-error` class is added to the input. For styling purposes, custom classes assigned to the inputs are copied to the wrapper element and because all elements with the error class will be hidden on validation, the widget will be hidden too.

**Solution**

To avoid this behavior, either implement a client-side validation for the rule that caused the validation to fail on the server, or remove the class from the wrapper elements after the initialization of the widgets.

###### Example

    @using (Html.BeginForm()) {
        //omitted for brevity
    }

    <script type="text/javascript">
        $(function () {
            $(".k-widget").removeClass("input-validation-error");
        });
    </script>

### Globalized Dates and Numbers Are Not Recognized As Valid When Using the Validator

The Kendo UI Validator uses the current Kendo UI culture to determine whether a value is in a valid format.

**Solution**

In order for the values to be recognized as valid, use the same culture on the client and on the server as described in the [article on globalization]({% slug globalization_aspnetmvc %}).

If the above solution is not feasible, because a custom date format is used, then the build-in `mvcdate` rule that comes from `kendo.aspnetmvc.min.js` needs to be overriden.

###### Example

    <script src="../kendo/js/kendo.aspnetmvc.min.js"></script>
    <script>
        kendo.ui.validator.rules.mvcdate = function (input) {
            //use the custom date format here
            //kendo.parseDate - http://docs.telerik.com/kendo-ui/api/javascript/kendo#methods-parseDate

            return input.val() === "" || kendo.parseDate(input.val(), "dd/MM/yyyy") !== null;
        }
    </script>

### Globalized Dates and Numbers Are Not Recognized As Valid When Using jQuery Validation

The jQuery validation does not support globalized dates and numbers.

**Solution**

In order for the values to be recognized as valid when using a non-default culture, override the Validator date and number methods.

###### Example

    jQuery.extend(jQuery.validator.methods, {
        date: function (value, element) {
            return this.optional(element) || kendo.parseDate(value) != null;
        },
        number: function (value, element) {
            return this.optional(element) || kendo.parseFloat(value) != null;
        }
    });

## See Also

Other articles on troubleshooting:

* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})
* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Kendo UI JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Kendo UI Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Kendo UI Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [Common Issues in Kendo UI Excel Export]({% slug troubleshooting_excel_export_kendoui %})
* [Common Issues in Kendo UI Charts]({% slug troubleshooting_chart_widget %})
* [Performance Issues in Kendo UI Widgets for Data Visualization]({% slug tipsandtricks_kendouistyling %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
* [Common Issues in Kendo UI Diagram]({% slug troubleshooting_diagram_widget %})
* [Common Issues in Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [Common Issues in Kendo UI Scheduler]({% slug troubleshooting_scheduler_widget %})
* [Common Issues in Kendo UI Upload]({% slug troubleshooting_upload_widget %})
* [Common Issues Related to Styling, Appearance, and Rendering]({% slug commonissues_troubleshooting_kendouistyling %})
