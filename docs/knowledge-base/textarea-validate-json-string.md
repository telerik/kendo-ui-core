---
title: Validate JSON String With TextArea and Validator
page_title: Validate JSON String With TextArea and Validator - Kendo UI TextArea for jQuery
description: "An example demonstrating how to validate a JSON string inside a Kendo UI TextArea with the help of Kendo UI Validator."
type: how-to
slug: textarea-validate-json-string
tags: textarea, json, parse, validate, string, input
ticketid: 1540635
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2021.3.1207</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® TextArea for jQuery</td>
	</tr>
</table>

## Description

How can I validate a JSON string inside a Kendo UI TextArea?

## Solution

1. Create a `form` element and place the `textarea` and `button` elements inside it.
1. Initialize a [`Kendo Validator`](https://demos.telerik.com/kendo-ui/validator/index) on the `form` element.
1. Create a custom validation [`rule`](/api/javascript/ui/validator/configuration/rules). Perform a check to determine if the JSON inside the form is valid or not.
1. Define an error [`message`](/api/javascript/ui/validator/configuration/messages) for the custom rule.

```dojo
<h3>The following example is in VALID json format, you can copy and paste it in the textarea to test it.</h3>
<p>{
    "glossary": {
    "title": "example glossary",
    "GlossDiv": {
    "title": "S",
    "GlossList": {
    "GlossEntry": {
    "ID": "SGML",
    "SortAs": "SGML",
    "GlossTerm": "Standard Generalized Markup Language",
    "Acronym": "SGML",
    "Abbrev": "ISO 8879:1986",
    "GlossDef": {
    "para": "A meta-markup language, used to create markup languages such as DocBook.",
    "GlossSeeAlso": ["GML", "XML"]
    },
    "GlossSee": "markup"
    }
    }
    }
    }
    }</p>
<h3>The following example is in INVALID json format, you can copy and paste it in the textarea to test it.</h3>
<p>{
    "glossary": {
    "title": "example glossary",
    "GlossDiv": {
    "title": "S",
    "GlossList": {
    "GlossEntry": {
    "ID": "SGML",
    "SortAs": "SGML",
    "GlossTerm": "Standard Generalized Markup Language",
    "Acronym": "SGML",
    "Abbrev": "ISO 8879:1986",
    "GlossDef": {
    "para": "A meta-markup language, used to create markup languages such as DocBook.",
    "GlossSeeAlso": ["GML", "XML"]
    },
    "GlossSee": "markup"

    }
    }
    }
    }</p>
<form id="jsonForm">
    <h4>JSON:</h4>
    <textarea id="json-text-area" style="width: 100%;"></textarea>
    <div class="k-form-footer">
        <button class="k-button k-primary">Send</button>
    </div>
</form>
</div>

<script>
    $(document).ready(function () {
        // create TextArea from input HTML element
        $("#json-text-area").kendoTextArea({
            rows: 10
        });

        // Initialize the Validator.
        $("#jsonForm").kendoValidator({
            validateOnBlur: false,
            rules: {
                // Add a custom rule.
                jsonRule: function (input) {
                    if (input.is("#json-text-area")) {
                        return validateJson(input.val());
                    }
                }
            },
            messages: {
                // Error message if the validation does not pass.
                jsonRule: "The JSON is invalid."
            }
        });

        // Submit the form if all validations have passed.
        $("form").submit(function (event) {
            event.preventDefault();
            kendo.alert("VALID JSON!")
        });
    });

    function validateJson(json) {
        // Try to parse the JSON.
        try {
            JSON.parse(json);
            // If the parsing is successful, the validation passes.
            return true;
        } catch {
            // If the parsing fails, the error message will be displayed.
            return false;
        }
    }
</script>
```
