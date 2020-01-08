---
title: Validation
page_title: Validation
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn how to implement validation rules for its input value."
slug: validation_daterangepicker_aspnetcore
position: 5
---

# Validation

The DateRangePicker is designed to keep its input value unchanged even when the typed date is invalid.

This behavior is set because the DateRangePicker does not automatically update the typed text when the typed text is invalid. Such a change in the input value may lead to unexpected behavior.

To validate the input value of the DateRangePicker, use a client-validation framework such as the [Kendo UI Validator for jQuery](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview). In this way, you can provide an error message to end users which prompts them to do the right actions for them to resolve the issue.

## See Also

* [Server-Side API](/api/daterangepicker)
