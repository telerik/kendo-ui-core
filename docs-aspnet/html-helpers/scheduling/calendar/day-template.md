---
title: Day Template
page_title: Day Template
description: "Customize the rendered day for the month view in the Telerik UI Calendar HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_daytemplate_calendar_aspnetcore
position: 3
---

# Day Template

The Calendar enables you to customize the rendered day for the `month` view.

The following example demonstrates how to create a Calendar by using a custom template.

```

    @(Html.Kendo().Calendar()
                .Name("calendar")
                .MonthTemplate(x=> x.Content("<div class='custom'><#=data.value#></div>")))

```

The template wraps the `value` in a `<div>` HTML element. The structure of the `data` object that is passed to the template function:

```
    data = {
        date: date, // A date object corresponding to the current cell.
        title: kendo.toString(date, "D"),
        value: date.getDate(),
        dateString: "2011/0/1" // A formatted date based on the yyyy/MM/dd format and a zero-based month.
    };
```

## See Also

* [Customizing Templates in the Calendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/calendar/template)
* [Server-Side API](/api/calendar)
