---
title: Overview
page_title: Overview
description: "Learn the basics when working with the  DateRangePicker component for {{ site.framework }}."
previous_url: /helpers/html-helpers/daterangepicker, /helpers/editors/daterangepicker/overview
slug: htmlhelpers_daterangepicker_aspnetcore
position: 1
---

# {{ site.framework }} DateRangePicker Overview

{% if site.core %}
The Telerik UI DateRangePicker TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI DateRangePicker widget.
{% else %}
The Telerik UI DateRangePicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DateRangePicker widget.
{% endif %}


The DateRangePicker is a container for holding start and end date inputs. It allows the user to select a date range from a calendar or through a direct input. The helper also supports custom templates for its `month` view, configuration options for minimum and maximum dates, a start view, and a depth for navigation.

* [Demo page for the DateRangePicker HtmlHelper](https://demos.telerik.com/{{ site.platform }}/daterangepicker/index)
{% if site.core %}
* [Demo page for the DateRangePicker TagHelper](https://demos.telerik.com/aspnet-core/daterangepicker/tag-helper)
{% endif %}
## Basic Configuration

The following example demonstrates the basic configuration for the DateRangePicker.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker") // The name of the DateRangePicker is mandatory. It specifies the "id" attribute of the DateRangePicker.
        .Min(new DateTime(1900, 1, 1)) // Sets the min date of the DateRangePicker.
        .Max(new DateTime(2099, 12, 31)) // Sets the min date of the DateRangePicker.
        .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10))) // Sets the range of the DateRangePicker.
    )
```
{% if site.core %}
```TagHelper
     <kendo-daterangepicker name="daterangepicker" 
                            min="new DateTime(1900, 1, 1)"
                            max="new DateTime(2099, 12, 31)">
             <range start="DateTime.Now" end="DateTime.Now.AddDays(10)"/>
     </kendo-daterangepicker>
```
{% endif %}

## Functionality and Features

* [Disabled dates]({% slug disableddates_daterangepicker_aspnetcore %})
* [Selected dates]({% slug selecteddates_daterangepicker_aspnetcore %})
* [Start view and navigation depth]({% slug navdepth_daterangepicker_aspnetcore %})
* [Validation]({% slug validation_daterangepicker_aspnetcore %})
* [Date formatting]({% slug dateformatting_daterangepicker_aspnetcore %})
* [Calendar types]({% slug calendartypes_daterangepicker_aspnetcore %})
* [Week number column]({% slug weeknumcolumn_daterangepicker_aspnetcore %})
* [Globalization]({% slug globalization_daterangepicker_aspnetcore %})
* [Accessibility]({% slug accessibility_daterangepicker_aspnetcore %})

## Events

You can subscribe to all DateRangePicker [events](/api/daterangepicker). For a complete example on basic DateRangePicker events, refer to the [demo on using the events of the DateRangePicker](https://demos.telerik.com/{{ site.platform }}/daterangepicker/events).

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
      .Name("daterangepicker")
      .Events(e => e
            .Open("daterangepicker_open")
            .Close("daterangepicker_close")
            .Change("daterangepicker_change")
      )
    )

    <script>
    function daterangepicker_open() {
        // Handle the open event.
    }

    function daterangepicker_close() {
        // Handle the close event.
    }

    function daterangepicker_change() {
        // Handle the change event.
    }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker"
                           on-open="daterangepicker_open"
                           on-close="daterangepicker_close"
                           on-change="daterangepicker_change">
    </kendo-daterangepicker>

    <script>
    function daterangepicker_open() {
        // Handle the open event.
    }

    function daterangepicker_close() {
        // Handle the close event.
    }

    function daterangepicker_change() {
        // Handle the change event.
    }
    </script>
```
{% endif %}

{% if site.core %}
### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
      .Name("daterangepicker")
      .Events(e => e
          .Open(@<text>
            function() {
                // Handle the open event inline.
            }
          </text>)
          .Change(@<text>
            function() {
                // Handle the change event inline.
            }
            </text>)
      )
    )
```
```TagHelper
    <kendo-daterangepicker name="daterangepicker"
                           on-open="
                           function(){
                                // Handle the open event inline.
                           }"
                           on-change="
                           function() {
                               // Handle the change event inline.
                           }">
    </kendo-daterangepicker>
```
{% endif %}

## Referencing Existing Instances

To reference an existing DateRangePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the [DateRangePicker client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker#methods) to control its behavior.

The following example demonstrates how to access an existing DateRangePicker instance.

        // Place the following after the DateRangePicker for {{ site.framework }} declaration.
        <script>
        $(function() {
        // The Name() of the DateRangePicker is used to get its client-side instance.
            var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");
        });
        </script>

## See Also

* [Basic Usage of the DateRangePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/index)
{% if site.core %}
* [Basic Usage of the DateRangePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/daterangepicker/tag-helper)
{% endif %}
* [Using the API of the DateRangePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/api)
* [Server-Side API](/api/daterangepicker)
