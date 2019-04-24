---
title: Overview
page_title: Globalization Overview | Kendo UI Globalization
description: "Learn how to define current culture settings, format number or date objects in the process of globalization when working with Kendo UI."
previous_url: /framework/globalization/overview
slug: overview_kendoui_globalization
position: 1
---

# Globalization Overview

Globalization is the process of designing and developing an application that works in multiple cultures.

It combines localization (the translation of component messages) with internationalization (their adaptation to a specific culture). Cultures require and define particular information for their number formats, week and month names, date and time formats, and so on.

> The Kendo UI culture scripts are generated from the Windows 10 and .NET 4.7 server-side culture definitions and match them by design. To customize the culture in your application, refer to the article on [culture definition]({% slug culture_definition_kendoui_globalization %}#customization).

For more information, refer to:

* [Overview of localization in Kendo UI for jQuery]({% slug overview_localization_kendoui %})
* [Date formatting in Kendo UI for jQuery]({% slug dateformatting_kendoui_globalization %})
* [Date parsing in Kendo UI for jQuery]({% slug dateparsing_kendoui_globalization %})
* [Number formatting in Kendo UI for jQuery]({% slug numberformatting_kendoui_globalization %})
* [Number parsing in Kendo UI for jQuery]({% slug numberparsing_kendoui_globalization %})

## Deprecated Support for GlobalizeJS 0.1

> The GlobalizeJS 0.1 library is no longer supported by Kendo UI for jQuery and it is advisable not to use it. For more information, refer to [issue #1354](https://github.com/telerik/kendo-ui-core/issues/1354).

If you load GlobalizeJS, the default globalization features in Kendo UI are overridden. Some features might not work. For example, custom number formats are unsupported in this case.

## See Also

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Culture Definition]({% slug culture_definition_kendoui_globalization %})
* [Date Formatting]({% slug dateformatting_kendoui_globalization %})
* [Date Parsing]({% slug dateparsing_kendoui_globalization %})
* [Number Formatting]({% slug numberformatting_kendoui_globalization %})
* [Number Parsing]({% slug numberparsing_kendoui_globalization %})
