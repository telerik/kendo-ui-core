---
title: HTML5 Form Constraints
page_title: jQuery Validator Documentation | HTML5 Form Constraints
description: "Get started with the jQuery Validator by Kendo UI and use the HTML5 form validation attributes."
slug: forms_kendoui_validator
position: 2
---

# HTML5 Form Constraints

The Validator enables you to use the [HTML5 form validation attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation).

## Getting Started

When used, the form attributes set constraints to HTML inputs which are enforced by the browser.

The available constraints are the following:
- `required`
- `pattern` (regex)
- `min` and `max`
- [HTML5 data types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-type) (for example, `email`, `URL`, `number`, and so on)

For details on setting up the Kendo Validator and the usage of thе built-in validation rules and creating custom validation rules refer to the [Validation Rules section.]({% slug rules_kendoui_validator %})

To use HTML5 form validation, add the desired HTML5 attributes to the HTML `input` elements.

    <input type="email" required>

When a browser supports HTML5 validation, it automatically attempts to validate if the input matches the defined constraints before it allows the form submission. If an input element fails to meet the constraints, the browser displays a validation message for the user. HTML5 also provides a number of new JavaScript APIs that can be used for manual input validation handling, such as `checkValidity()`.

> An application must never rely on client-side validation as the only form of input validation. Client-side validation can help improve the user experience in an application but it does not replace the need for server-side data validation on all user input.

## Browser Issues

Depending on the validation constraints, browsers may expose the following issues:  

* Old browsers offer no support for HTML5 form validation.
* The support for HTML5 forms in modern browsers [is incomplete](http://www.wufoo.com/html5/).
* The validation error messages created by the browser are difficult or impossible to re-style.

The Kendo UI Validator addresses real-time requirements browser web application and enables you to enhance HTML5 form validation concepts by using JavaScript.

## See Also

* [Basic Usage of the Validator (Demo)](https://demos.telerik.com/kendo-ui/validator/index)
* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)
