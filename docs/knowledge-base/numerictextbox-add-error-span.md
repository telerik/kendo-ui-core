---
title: Display Additional Error Notification
description: An example on how to add additional validation span in the Kendo UI NumericTextBox.
type: how-to
page_title: Add Error Notification Span | Kendo UI NumericTextBox
slug: numerictextbox-add-error-span
tags: numerictextbox, error, span, validation, notification
ticketid: 1149027
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.1 117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI NumericTextBox</td>
	</tr>
</table>


## Description

How can I provide additional notification that the NumericTextBox value must be a number to the user?

## Solution

1. In the `document ready` event handler, [`append`](https://api.jquery.com/append/) the desired `span` by using the `k-numeric-wrap` class selector.
1. Display the span when the NumericTextBox has the `k-state-invalid` class by using CSS.

    ```dojo
    <style>
        span.myInvalid {
            position: relative;
            top: 30px;
            left: -130px;
            color: red;
            visibility: hidden;
        }

        .k-state-invalid>span.myInvalid {
            visibility: visible;
        }
    </style>
    <input id="textbox">

    <script>
        $("#textbox").kendoNumericTextBox({
            value: 10
        });

        $(document).ready(function() {
            $(".k-numeric-wrap").append("<span class='myInvalid'>Enter a number!</span>");

        });
    </script>
    ```
