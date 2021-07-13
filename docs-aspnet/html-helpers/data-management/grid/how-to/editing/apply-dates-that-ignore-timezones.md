---
title: Apply Dates that Ignore Timezones
page_title: Apply Dates that Ignore Timezones
description: "Apply dates that ignore timezones when working with the Kendo UI Grid in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/apply-dates-that-ignore-timezones
slug: howto_applydatesignoretimezones_gridaspnetmv
---

# Apply Dates that Ignore Timezones

Use the property of the model that should ignore the timezone. Set the value of the property as UTC time by using its ticks. Here is an example:

```
    public class Person
    {
        public int PersonID { get; set; }
        public string Name { get; set; }
        private DateTime birthDate;
        public DateTime BirthDate
        {
            get { return this.birthDate; }
            set
            {
                this.birthDate = new DateTime(value.Ticks, DateTimeKind.Utc);
            }

        }
    }
```

To see the example, refer to the project on how to [apply dates that ignore timezones when working with the Kendo UI Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/date-ignoring-timezones) in ASP.NET MVC applications.

## See Also

* [Overview of the Grid HtmlHelper]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [GridBuilder API Reference](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/GridBuilder)
