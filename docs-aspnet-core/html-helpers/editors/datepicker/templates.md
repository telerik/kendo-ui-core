---
title: Templates
page_title: Templates | Telerik UI DatePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI for ASP.NET Core DatePicker and learn how to customize its templates."
slug: htmlhelpers_datepicker_aspnetcore_templates
position: 9
---

# Templates

The DatePicker provides options for using and customizing its templates.  

To customize the cell template in the **Month** view, use the [`MonthTemplate`](/api//Kendo.Mvc.UI.Fluent/DatePickerBuilder#monthtemplatesystemstring) property. The calendar of the DatePicker loops over each cell and sets its HTML by using the month content template. You can implement a dynamic template by using the [`Dates`](/api//Kendo.Mvc.UI.Fluent/DatePickerBuilder#datessystemdatetime) option which is passed as an argument to the month template. For the complete example, refer to the [demo on customizing the templates of the DatePicker](https://demos.telerik.com/aspnet-core/datepicker/template).

To modify the footer template of the DatePicker calendar, use the [`Footer`](/api//Kendo.Mvc.UI.Fluent/DatePickerBuilder#footersystemstring) property. To remove the footer, set it to `false`.

To modify the week column template, use the [`WeekNumber`](/api//Kendo.Mvc.UI.Fluent/DatePickerBuilder#weeknumbersystemboolean) property.

The dates which are out of the `Min` and `Max` range are rendered as empty. To change their template, use the [`month.empty`](/api/Kendo.Mvc.UI.Fluent/DatePickerMonthTemplateSettingsBuilder#emptysystemstring) option.

For more information on customizing the `aria-label` text, refer to the article on [accessibility]({% slug htmlhelpers_datepicker_aspnetcore_accessibility %}#wai-aria).

## See Also

* [Customizing Templates in the DatePicker HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datepicker/template)
* [Server-Side API](/api/datepicker)
