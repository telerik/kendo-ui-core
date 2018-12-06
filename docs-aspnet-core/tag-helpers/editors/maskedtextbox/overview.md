---
title: Overview
page_title: MaskedTextBox  | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI MaskedTextBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/maskedtextbox, /aspnet-core/helpers/tag-helpers/maskedtextbox
slug: taghelpers_maskedtextbox_aspnetcore
position: 1
---

# MaskedTextBox Tag Helper Overview

The MaskedTextBox tag helper helps you configure the Kendo UI MaskedTextBox widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the MaskedTextBox by using the MaskedTextBox tag helper.

###### Example

        <kendo-maskedtextbox name="ssn" mask="000-00-0000" value="003-12-3456"></kendo-maskedtextbox>

## Configuration

The MaskedTextBox tag helper configuration options are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().MaskedTextBox()
			.Name("phone_number")
			.Mask("(999) 000-0000")
			.Value("555 123 4567")
		)
```
```tagHelper

        <kendo-maskedtextbox name="phone_number" mask="(999) 000-0000" value="555 123 4567"></kendo-maskedtextbox>
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
