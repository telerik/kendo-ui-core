---
title: Templates
page_title: jQuery DatePicker Documentation | Templates
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to customize its templates."
slug: templates_datepicker
position: 9
---

# Templates

The DatePicker provides options for using and customizing its templates.  

To customize the cell template in the **Month** view, use the [`month.content`](/api/javascript/ui/datepicker/configuration/month) property. The calendar of the DatePicker loops over each cell and sets its HTML by using the month content template. You can implement a dynamic template by using the [`dates`](/api/javascript/ui/datepicker/configuration/dates) option which is passed as an argument to the `month.content` template. For the complete example, refer to the [demo on customizing the templates of the DatePicker](https://demos.telerik.com/kendo-ui/datepicker/template).

To modify the footer template of the DatePicker calendar, use the [`footerTemplate`](/api/javascript/ui/datepicker/configuration/footer) property. To remove the footer, set it to `footerTemplate:false`.

To modify the week column template, use the [`month.weekNumber`](/api/javascript/ui/datepicker/configuration/month) property.

The dates which are out of the `min` and `max` range are rendered as empty. To change their template, use the [`month.empty`](/api/javascript/ui/datepicker/configuration/month#monthempty) option.

For more information on customizing the `aria-label` text, refer to the article on [accessibility]({% slug accessibility_datepicker %}#wai-aria).

## See Also

* [Customizing the Templates (Demo)](https://demos.telerik.com/kendo-ui/datepicker/template)
* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
