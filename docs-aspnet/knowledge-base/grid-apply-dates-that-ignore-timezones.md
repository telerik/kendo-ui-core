---
title: Apply Dates that Ignore Timezones
page_title: Apply Dates that Ignore Timezones
description: "Apply dates that ignore the time zone when working with the {{ site.product }} Grid in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/apply-dates-that-ignore-timezones, /html-helpers/data-management/grid/how-to/editing/apply-dates-that-ignore-timezones
slug: howto_applydatesignoretimezones_gridaspnetmv
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I use dates that ignore the time zone in the {{ site.product }} Grid?

## Solution

Set the value of the `DateTime` property as UTC time by using its ticks:

```C#
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

What the code does in reality is to convert a standard `DateTime` value coming through `value.Ticks` and make it in UTC format using the `DateTimeKind.Utc` configuration parameter.

To review the complete example, refer to the ASP.NET MVC application on how to [use dates that ignore time zones when working with the Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridDateIgnoreTimeZones).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
