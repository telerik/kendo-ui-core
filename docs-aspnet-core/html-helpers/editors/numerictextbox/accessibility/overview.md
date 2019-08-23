---
title: Overview
page_title: NumericTextBox Accessibility | Telerik UI NumericTextBox HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI NumericTextBox for ASP.NET Core and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
slug: accessibility_numerictextbox_aspnetcore
position: 1
---

# NumericTextBox Accessibility

The NumericTextBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.1, and keyboard support.

For more information, refer to:
* [Keyboard navigation by Kendo UI NumericTextBox]({% slug keynav_numerictextbox_aspnetcore %})
* [Accessibility in Telerik UI for ASP.NET Core](https://docs.telerik.com/aspnet-core/accessibility/overview)

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers.

## Section 508

The NumericTextBox is compliant with the Section 508 requirements.

## WCAG 2.1

The NumericTextBox supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/).

## label Element Support

Because of the NumericTextBox complex rendering, to focus the widget through the `label` element, you need to manually handle the click event of the label and focus the widget as shown below.

```
    @Html.Label("numeric", "Value")
    @Html.Kendo().NumericTextBox().Name("numeric")

    <script>
        var roles = {
        numerictextbox: "kendoNumericTextBox",
        combobox: "kendoComboBox",
        multiselect: "kendoMultiSelect"
        }

        function getWidget(element) {
        var role = element.data("role");
        role = roles[role];

        if (role) {
            return element.data(role);
        }    
        }

        $("label").click(function() {
        var label = $(this),
            id = label.attr("for"),
            widget;

        if (id) {
            widget = getWidget($("#" + id));
            if (widget) {
            widget.focus();
            }
        }
        });
    </script>
```

## See Also

* [Keyboard Navigation by the NumericTextBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/keyboard-navigation)
* [Accessibility in Telerik UI for ASP.NET Core]({% slug overview_accessibility %})
