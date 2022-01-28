---
title: Localization
page_title: Localization | Kendo UI Globalization
description: "Learn how to use the Kendo UI localization files in order to change the default messages of widgets."
previous_url: /framework/localization/overview, /localization
slug: overview_localization_kendoui
position: 3
---

# Localization

[Localization](https://en.wikipedia.org/wiki/Internationalization_and_localization) is the process of adapting software to meet the requirements of local markets and different languages.

You can change the messages that are displayed in the Kendo UI widgets by including an additional script file in the document.

## Setting the Current Language

By default, all Kendo UI widgets display their messages in US English. To replace the default text messages, include a language specific `kendo.messages.<language>.js` file in the document.

> Include the localization script before the widgets are initialized. The best place to include it is right after the Kendo UI JavaScript files.

The following example demonstrates how to add the localization script to a document.

    <script src="jquery.js"></script>
    <script src="kendo.all.min.js"></script>
    <script src="kendo.messages.bg-BG.js"></script>

The following example demonstrates how to add the localization script to a document from the CDN.    

    <script src="https://kendo.cdn.telerik.com/<version>/js/jquery.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/<version>/js/kendo.all.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/<version>/js/messages/kendo.messages.bg-BG.min.js"></script>

> Currently, translations are not available for every language and some of the localization files may be incomplete. For more information on where to find the full list of available translations, refer to the [section on contributing]({% slug overview_localization_kendoui%}#contribution).

## Creating New Localization Files

The localization script replaces the default messages in the widget prototype with their equivalent translations. The file has to be named by following the `kendo.messages.<language>.js` convention. A [language code identifier list](https://msdn.microsoft.com/en-us/library/cc233965.aspx) is available for free download from the Microsoft developer network website.

The following example demonstrates how to create a new localization file. The `kendo.messages.en-US.js` contains all widget messages and may be used as a reference when you create the new localization file&mdash;copy the file, rename it, and translate the messages.

    /* <Widget-name> messages */

    if (kendo.ui.<Widget-name>) {
    kendo.ui.<Widget-name>.prototype.options.messages =
    $.extend(true, kendo.ui.<Widget-name>.prototype.options.messages,{
      "<message-name>": "<translation",
      //...
    });
    }

<!--*-->

## Common Scenarios

### Localizing Widgets That Are Rendered by Server-Side Wrappers

The server-side wrappers (helpers) render some of the markup and the respective messages that are needed for the widgets from the server. Applying the UI localization on the client side may not work as expected. Currently, the ASP.NET MVC wrappers come with localization resource files which work with the default localization mechanism provided by ASP.NET MVC. For more information, refer to the article on [globalization in ASP.NET MVC](/aspnet-mvc/globalization#localized-user-interface).

### Changing the Language at Runtime in AngularJS Applications

For a runnable example on changing the culture, language, and messages in an AngularJS application, refer to [this code library](https://www.telerik.com/support/code-library/kendo-globalization-localization-with-angular-translate).

## Contribution

Currently, translations are not available for every language and some of the localization files may be incomplete. The full list of currently available translations is available in the [Kendo UI Core repository](https://github.com/telerik/kendo-ui-core/tree/master/src/messages).

If you notice any missing messages in the localization files or would like to add localization files for your language, do not hesitate to:

1. Fork the repository.
1. Apply the respective changes.
1. [Submit a pull request](https://github.com/telerik/kendo-ui-core/blob/master/CONTRIBUTING.md#3-submit-a-pull-request).

## See Also

* [Localize the Grid Widget]({% slug localization_kendoui_grid_widget %})
* [Globalization and Localization in Telerik UI for ASP.NET MVC](/aspnet-mvc/globalization)
* [JSP API Reference on Localization of the Upload Widget](/api/jsp/upload/localization)
