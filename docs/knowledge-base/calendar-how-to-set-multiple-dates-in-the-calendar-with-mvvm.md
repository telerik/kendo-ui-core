---
title: Set Multiple Dates in the Calendar with MVVM
page_title: Set Multiple Dates in with MVVM | Kendo UI Calendar for jQuery
description: An example on how to set multiple dates in the Kendo UI Calendar with MVVM.
type: how-to
slug: calendar-how-to-set-multiple-dates-in-the-calendar-with-mvvm
tags: calendar, multiple, dates, mvvm, binding
ticketid: 1140439
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Calendar for Progress® Kendo UI®</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

How can I set multiple Calendar dates as selected from the `viewModel`?

## Solution

Use [custom binding](https://docs.telerik.com/kendo-ui/framework/mvvm/bindings/custom#custom-widget-binding).

````dojo
<div data-role="calendar" id="calendar" data-selectable="multiple" data-bind="selectDates: dates"></div>

    <script>
    kendo.data.binders.widget.selectDates = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function() {
            var that = this,
            value = that.bindings["selectDates"].get(); //get the value from the View-Model
            $(that.element).data("kendoCalendar").selectDates(value); //update the widget
        }
    });

    //View-Model source
    var viewModel = kendo.observable({
        dates: [new Date(2017, 10, 10), new Date(2017, 10, 11)]
    });

    kendo.bind(document.body, viewModel);    
    </script>
````
