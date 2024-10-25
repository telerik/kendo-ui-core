---
title: Templates
page_title: Templates
description: "Get started with the {{ site.product }} DatePicker and learn how to customize its templates."
slug: htmlhelpers_datepicker_aspnetcore_templates
position: 9
---
{% if site.core %}
    {% assign MonthEmpty = "/api/Kendo.Mvc.UI.Fluent/DatePickerMonthTemplateSettingsBuilder#emptysystemstring" %}
    {% assign Dates = "[`Dates`](/api/kendo.mvc.ui.fluent/datepickerbuilder#datessystemdatetime)" %}
{% else %}
    {% assign MonthEmpty = "/api/Kendo.Mvc.UI.Fluent/MonthTemplateBuilder#emptysystemstring" %}
    {% assign Dates = "[`BindTo`](/api/kendo.mvc.ui.fluent/datepickerbuilder#bindtosystemcollectionsgenericlistsystemdatetime)" %}
{% endif %}

# Templates

The DatePicker provides options for using and customizing its templates.  

To customize the cell template in the **Month** view, use the [`MonthTemplate`](/api/kendo.mvc.ui.fluent/datepickerbuilder#monthtemplatesystemstring) property. the calendar of the DatePicker loops over each cell and sets its HTML by using the month content template. you can implement a dynamic template by using the {{ Dates }} option which is passed as an argument to the month template. for the complete example, refer to the [demo on customizing the templates of the DatePicker](https://demos.telerik.com/{{ site.platform }}/datepicker/template).

To modify the footer template of the DatePicker calendar, use the [`Footer`](/api/kendo.mvc.ui.fluent/datepickerbuilder#footersystemstring) property. To remove the footer, set it to `false`.

To modify the week column template, use the [`WeekNumber`](/api/kendo.mvc.ui.fluent/datepickerbuilder#weeknumbersystemboolean) property.

The dates which are out of the `Min` and `Max` range are rendered as empty. To change their template, use the [`month.empty`]({{ MonthEmpty }}) option.

For more information on customizing the `aria-label` text, refer to the article on [accessibility]({% slug htmlhelpers_datepicker_aspnetcore_accessibility %}#wai-aria).

## See Also

* [Customizing Templates in the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/template)
* [Server-Side API](/api/datepicker)
