---
title: Overview
page_title: Overview | Kendo UI Localization
description: "Learn how to use the Kendo UI localization files in order to change the default messages of widgets."
slug: overview_localization_kendoui
position: 1
---

# Localization Overview

[Localization](https://en.wikipedia.org/wiki/Internationalization_and_localization) is the process of adapting software to meet the requirements of local markets and different languages. You are able to change the messages displayed in any Kendo UI widget by including an additional script file in the document.

## Configuration

### Set Current Language

By default, all Kendo UI widgets display their messages in US English. Include a language specific `kendo.messages.<language>.js` file in the document to replace the default text messages.

> **Important**
>
> The localization script must be included before the widgets are initialized. The best place to include it is right after the Kendo UI JavaScript files.

The example below demonstrates how to add the localization script to a document.

###### Example

    <script src="jquery.js"></script>
    <script src="kendo.all.min.js"></script>
    <script src="kendo.messages.bg-BG.js"></script>

The example below demonstrates how to add the localization script to a document from the CDN.    

###### Example

    <script src="http://kendo.cdn.telerik.com/<version>/js/jquery.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/<version>/js/kendo.all.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/<version>/js/messages/kendo.messages.bg-BG.min.js"></script>

> **Important**
>
> Currently, translations are not available for every language and some of the localization files may be incomplete. For more information on where to find the full list of available translations, refer to the [section on contributing]({% slug overview_localization_kendoui%}#contribution).

### Create New Localization File

The localization script replaces default messages in the widget prototype with their equivalent translations. The file should be named `kendo.messages.<language>.js`. A [language code identifier list](http://msdn.microsoft.com/en-us/library/cc233965.aspx) is freely available for download from the Microsoft developer network website.

The example below demonstrates how to create a new localization file.

###### Example

    /* <Widget-name> messages */

    if (kendo.ui.<Widget-name>) {
    kendo.ui.<Widget-name>.prototype.options.messages =
    $.extend(true, kendo.ui.<Widget-name>.prototype.options.messages,{
      "<message-name>": "<translation",
      //...
    });
    }

<!--*-->
> **Important**
>
> The `kendo.messages.en-US.js` contains all widget messages and may be used as a reference when creating a new localization file. The easiest way to get started is to copy the file, rename it, and translate the messages.

## Common Scenarios

### Localize Widgets Rendered by Server-Side Wrappers

The server-side wrappers render some of the needed widgets' markup (and the respective messages) from the server; applying the UI localization on the client side may not work as expected.
Currently, the ASP.NET MVC wrappers come with localization resource files, which work with the default localization mechanism provided by ASP.NET MVC. For more details, check the [ASP.NET MVC Globalization article](/aspnet-mvc/globalization#localized-user-interface).

### Change Widget Language at Runtime in AngularJS Applications

Check [this code library](http://www.telerik.com/support/code-library/kendo-globalization-localization-with-angular-translate) for working example that demonstrates changing the culture, language and widget messages in AngularJS application.

## Contribution

Currently, translations are not available for every language and some of the localization files may be incomplete. The full list of currently available translations can be found in the [Kendo UI Core repository](https://github.com/telerik/kendo-ui-core/tree/master/src/messages). If you notice any missing messages in the localization files or would like to add localization files for your language, do not hesitate to fork our repository, apply the respective changes, and [submit a pull request](https://github.com/telerik/kendo-ui-core/blob/master/CONTRIBUTING.md#3-submit-a-pull-request).

## See Also

Articles on the localization of Kendo UI widgets:

* [Localize the Grid Widget]({% slug localization_kendoui_grid_widget %})
* [Globalization and Localization in Telerik UI for ASP.NET MVC](/aspnet-mvc/globalization)
* [JSP API Reference on Localization of the Upload Widget](/api/jsp/upload/localization)
