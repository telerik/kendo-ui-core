---
title: Overview
page_title: Validator | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Validator tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/validator, /aspnet-core/helpers/tag-helpers/validator
slug: taghelpers_validator_aspnetcore
position: 1
---

# Validator Tag Helper Overview

The Validator tag helper helps you configure the Kendo UI Validator widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Validator by using the Validator tag helper.

###### Example

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
