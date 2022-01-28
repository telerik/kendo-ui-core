---
title: Send DateTime instead of String to Controller through POST Request
description: An example on how to send a DateTime type from the Kendo UI DatePicker for jQuery to a controller through a POST request.
type: how-to
page_title: Send DatePicker Value as a DateTime in POST Request | Kendo UI DatePicker for ASP.NET MVC
slug: datepicker-send-datetime-in-post-request
tags: datepicker, mvc, asp.net, date, picker, datetime, post, request, not, string
ticketid: 1160064
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DatePicker for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.620</td>
 </tr>
</table>

## Description

In my DatePicker project, I am using a POST request to send the value of the widget to the controller but the widget is sending a string. How can I receive a `DateTime` value instead of a string value and what is the best approach to implement this functionality?

## Solution

In order for the parameter to be received in the controller as a `DateTime` value instead of a string value, use the [`Date.toUTCString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString) JavaScript method when you configure the POST request.

```
$.post('/MyController/MyMethod', {
  start: start.toUTCString(),
  end: end.toUTCString() },
  function (result) {
    callback(result);
});
```

The method in the controller looks similar to the what the following example demonstrates.

```
public ActionResult MyMethod(DateTime start, DateTime end){
  ...
}
```

## See Also

* [API Reference of the toUTCString Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString)
