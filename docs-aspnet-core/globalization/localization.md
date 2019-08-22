---
title: Localization
page_title: Localization | Telerik UI for ASP.NET Core
description: "Learn how to use the Telerik UI for ASP.NET Core localization files in order to change the default messages of helpers."
slug: overview_localization_core
position: 3
---

# Localization

[Localization](https://en.wikipedia.org/wiki/Internationalization_and_localization) is the process of adapting software to meet the requirements of local markets and different languages.

You can change the messages that are displayed in the Telerik UI for ASP.NET Core helpers by including an additional script file in the document.

## Setting the Current Language

By default, all Telerik UI for ASP.NET Core helpers display their messages in US English. To replace the default text messages, include a language specific `kendo.messages.<language>.js` file in the document.

> Include the localization script before the helpers are initialized. The best place to include it is right after the Kendo UI JavaScript files.

The following example demonstrates how to register the localization script in the `_Layout.cshtml` file.

    <script src="~/lib/jquery/dist/jquery.js"></script>
    <script src="~/lib/kendo-ui/js/kendo.all.min.js"></script>
    <script src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"></script>
    <script src="~/lib/kendo-ui/js/cultures/kendo.messages.es-ES.min.js"></script>

The following example demonstrates how to register the localization script in the`_Layout.cshtml` file by using CDN.    

    <script src="https://kendo.cdn.telerik.com/<version>/js/jquery.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/<version>/js/kendo.all.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/<version>/js/kendo.aspnetmvc.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/<version>/js/messages/kendo.messages.es-ES.min.js"></script>

> Currently, translations are not available for every language and some of the localization files may be incomplete. For more information on the full list of available translations, refer to the [section on contributing](#contribution).

## Creating New Localization Files

The localization script replaces the default messages in the helper prototype with their equivalent translations. The file has to be named by following the `kendo.messages.<language>.js` convention. A [language code identifier list](http://msdn.microsoft.com/en-us/library/cc233965.aspx) is available for free download from the Microsoft developer network website.

The following example demonstrates how to create a new localization file. The `kendo.messages.en-US.js` contains all messages and may be used as a reference when you create the new localization file&mdash;copy the file, rename it, and translate the messages.

    /* <Helper-name> messages */

    if (kendo.ui.<Helper-name>) {
    kendo.ui.<Helper-name>.prototype.options.messages =
    $.extend(true, kendo.ui.<Helper-name>.prototype.options.messages,{
      "<message-name>": "<translation",
      //...
    });
    }

<!--*-->

## Contribution

Currently, translations are not available for every language and some of the localization files may be incomplete. The full list of currently available translations is available in the [Kendo UI Core repository](https://github.com/telerik/kendo-ui-core/tree/master/src/messages).

If you notice any missing messages in the localization files or would like to add localization files for your language, do not hesitate to:

1. Fork the repository.
1. Apply the respective changes.
1. [Submit a pull request](https://github.com/telerik/kendo-ui-core/blob/master/CONTRIBUTING.md#3-submit-a-pull-request).

## See Also

* [Overview of Globalization by Telerik UI for ASP.NET Core]({% slug overview_globalization_core %})
