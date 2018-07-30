---
title: Send DateTime Instead of String to Controller Through POST Request.
description: An example demonstrating how to send a DateTime type from the DatePicker to a Controller through a POST request
type: how-to
page_title: Send DatePicker Value as a DateTime in POST Request | UI for ASP.NET MVC DatePicker
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

At the moment, I'm using a POST request to send the value of the DatePicker to the controller but it is sending a String and I would like to receive a DateTime instead. What's the best approach to implement this functionality?

## Solution

In order for the parameter to be received in the Controller as a DateTime instead of a String, take advantage of JavaScript's [Date.toUTCString method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString) when configuring the POST request.

The following code snippet demonstrates how the post can be configured:

```
$.post('/MyController/MyMethod', { 
  start: start.toUTCString(), 
  end: end.toUTCString() }, 
  function (result) {
    callback(result); 
});
```

And the method in the controller would look like the following:

```
public ActionResult MyMethod(DateTime start, DateTime end){
  ...
}
```

## See Also

* [toUTCString method Reference.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString)
