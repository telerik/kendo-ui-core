---
title: Overview
page_title: Overview of Localization in Kendo UI framework
description: Documentation on how to use the Kendo UI localization files in order to change the default messages of widgets.
position: 1
---
# Kendo Localization Overview

Localization is the process of adapting software to meet the requirements of local markets and different languages.
The developer may change the messages displayed in the Kendo UI widgets by including an additional script file in the document.

## Set the current language

By default all Kendo UI widgets display their messages in US English. Including a language specific `kendo.messages.<language>.js` file in the document will replace the default text messages.

> The localization script must be included **before** the widgets are initialized. The best place to include it is right after the Kendo UI JavaScript file(s).

### Example - add a localization script to the document

    <script src="jquery.js"></script>
    <script src="kendo.all.min.js"></script>
    <script src="kendo.messages.bg-BG.js"></script>

### Example - add a localization script to the document from the CDN

    <script src="http://cdn.kendostatic.com/<version>/js/jquery.min.js"></script>
    <script src="http://cdn.kendostatic.com/<version>/js/kendo.all.min.js"></script>
    <script src="http://cdn.kendostatic.com/<version>/js/messages/kendo.messages.bg-BG.min.js"></script>

## Contributing

Currently, translations are not available for every language and some of the localization files may be incomplete.
The full list of currently available translations can be found in the [Kendo UI Core repository](https://github.com/telerik/kendo-ui-core/tree/master/src/messages).
In case you notice any missing messages in the localization files or would like to add localization file for your language, do not hesitate to fork our repository, apply the respective changes, and [submit a pull request](https://github.com/telerik/kendo-ui-core/blob/master/CONTRIBUTING.md#3-submit-a-pull-request).

## Creating a new localization file

The localization script replaces default messages in the widget prototype with their equivalent translations. The file should be named kendo.messages.<language>.js.
A [language code identifier list](http://msdn.microsoft.com/en-us/library/cc233965.aspx) is freely available for download from the Microsoft developer network website.

### Example - localization script

    /* <Widget-name> messages */

    if (kendo.ui.<Widget-name>) {
    kendo.ui.<Widget-name>.prototype.options.messages =
    $.extend(true, kendo.ui.<Widget-name>.prototype.options.messages,{
      "<message-name>": "<translation",
      //...
    });
    }

> `kendo.messages.en-US.js` contains all widget messages and may be used as a reference when creating a new localization file. The easiest way to get started is to copy the file, rename it and translate the messages.

## Applying localization to widgets rendered by server-side wrappers

The server-side wrappers render some of the needed widgets' markup (and the respective messages) from the server; applying the UI localization on the client side may not work as expected.
Currently, the ASP.NET MVC wrappers come with localization resource files, which work with the default localization mechanism provided by ASP.NET MVC. For more details, check the [ASP.NET MVC Globalization article](/aspnet-mvc/globalization#localized-user-interface).

## Changing the Kendo UI Widgets language at run-time in AngularJS application

Check [this code library](http://www.telerik.com/support/code-library/kendo-globalization-localization-with-angular-translate) for working example that demonstrates changing the culture, language and widget messages in AngularJS application.