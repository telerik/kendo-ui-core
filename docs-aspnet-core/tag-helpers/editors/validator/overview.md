---
title: Overview
page_title: Validator Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Telerik UI Validator tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/validator, /aspnet-core/helpers/tag-helpers/validator
slug: taghelpers_validator_aspnetcore
position: 1
---

# Validator Tag Helper Overview

The Telerik UI Validator tag helper for ASP.NET Core is a server-side wrapper for the Kendo UI Validator widget.

The Validator offers options for implementing client-side form validation.

* [Demo page for the Validator](https://demos.telerik.com/aspnet-core/validator/tag-helper)

## Initializing the Validator

The following example demonstrates how to define the Validator by using the Validator tag helper.

		@{
			var messages = new Dictionary<string, string>() { { "custom", "Please choose another Start Time." } };
			var rules = new Dictionary<string, string>() { { "custom", "customFunction" } };
		}
        <form id="ticketsForm" kendo-validator="true" kendo-messages="messages" kendo-rules="rules">
            <ul id="fieldlist">
                <li>
                    <label for="fullname" class="required">Your Name</label>
                    @(Html.Kendo().TextBox()
						.Name("fullname")
						.HtmlAttributes(new { placeholder = "Full name", required = "required", style = "width:220px" })
                    )
                </li>             
            </ul>
        </form>

## See Also

* [Basic Usage of the Validator Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/validator/tag-helper)
* [API Reference of the Validator Helper for ASP.NET Core](/api/validator)
