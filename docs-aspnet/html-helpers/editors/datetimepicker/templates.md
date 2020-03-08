---
title: Templates
page_title: DateTimePicker Templates
description: "Get started with the Telerik UI DateTimePicker for {{ site.framework }} and learn how to customize its templates."
slug: templates_datetimepicker_aspnetcore
position: 10
---
{% if site.core %}
    {% assign Dates = "[`Dates`](/api/Kendo.Mvc.UI.Fluent/DateTimePickerBuilder#datessystemdatetime)" %}
{% else %}
    {% assign Dates = "[`BindTo`](/api/Kendo.Mvc.UI.Fluent/DatePickerBuilder#bindtosystemcollectionsgenericlistsystemdatetime)" %}
{% endif %}

# Templates

The DatePicker provides options for using and customizing its templates.  

To customize the cell template in the **Month** view, use the [`MonthTemplate`](/api/Kendo.Mvc.UI.Fluent/DateTimePickerBuilder#monthtemplatesystemstring) property. The calendar of the DateTimePicker loops over each cell and sets its HTML by using the month template. You can implement a dynamic template by using the {{ Dates }} option which is passed as an argument to the `MonthTemplate.Content` template. For the complete example, refer to the [demo on customizing the templates of the DateTimePicker](https://demos.telerik.com/{{ site.platform }}/datetimepicker/template).

To modify the footer template of the DatePicker calendar, use the [`Footer`](/api/Kendo.Mvc.UI.Fluent/DateTimePickerBuilder#footersystemstring) property.

For more information on customizing the `aria-label` text, refer to the article on [accessibility]({% slug accessibility_datetimepicker_aspnetcore %}#wai-aria).

## See Also

* [Customizing Templates in the DateTimePicker (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/template)
* [Server-Side API](/api/datetimepicker)
