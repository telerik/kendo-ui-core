---
title: Twitter Bootstrap
page_title: Twitter Bootstrap | Kendo UI Third-Party Tools
description: "Learn more about the integration with the Twitter Bootstrap framework that Kendo UI provides to its users and enjoy the full set of resulting functionalities."
previous_url: /using-kendo-with-twitter-bootstrap
slug: twitterbootstrapintegration_integration_kendoui
position: 1
---

# Twitter Bootstrap

The [Kendo UI widgets](http://demos.telerik.com/kendo-ui/) can be used seamlessly alongside [Twitter Bootstrap](http://getbootstrap.com/), as demonstrated in [this live demo](http://demos.telerik.com/kendo-ui/bootstrap) having its [source on GitHub](https://github.com/telerik/kendo-bootstrap-demo).

## Overview

To replicate the look and feel of Bootstrap in Kendo UI, follow the steps below:

  1. Use the `kendo.common-bootstrap.min.css` instead of `kendo.common.css`. This ensures that the dimensions of Kendo UI are going to match match the ones in Bootstrap.
  2. Use the `kendo.bootstrap.min.css` theme which applies the Bootstrap colors to the Kendo UI widgets.

The following example demonstrates the necessary links to these stylesheets. Make sure you replace **VERSION** with the Kendo UI version that you want to use.

###### Example

    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/VERSION/styles/kendo.common-bootstrap.min.css">
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/VERSION/styles/kendo.bootstrap.min.css">

While these files ensure that Kendo UI looks a lot like Bootstrap, it is not mandatory to use them. The default Kendo UI `common.css` and any other theme are going to style the widgets differently, but they will continue to function properly.

Note that the `kendo.bootstrap.min.css` theme styles Kendo UI to match the default Bootstrap look and feel. Other Bootstrap themes should (or can) be used with any other Kendo UI theme, or with a custom Kendo UI theme, such as themes created with the [Kendo UI ThemeBuilder](/themebuilder).

## How-To Examples

### Use Bootstrap Responsive Features

Using the responsive features of Bootstrap does not differ from other responsive sites.

For detailed information on how to use Kendo UI in responsive web pages, refer to [this article on responsive web design]({% slug responsivewebdesign_integration_kendoui %}).

### Use Custom Bootstrap Themes

If you have customized the Bootstrap color scheme and need Kendo UI to match it, follow the steps of any of the two options below:

**Option 1**

1. Customize the Bootstrap theme of Kendo UI through the [Kendo UI ThemeBuilder](http://demos.telerik.com/kendo-ui/themebuilder/web.html).
2. Compile a custom version of the Kendo UI Bootstrap theme by using the Bootstrap Less file and an auxiliary file that Kendo UI provides, which maps Bootstrap Less variables to Kendo UI variables.

This second option assumes that you are familiar with the process of [generating CSS files from Less files](http://lesscss.org/#getting-started).

**Option 2**

1. Locate the `kendo.bootstrap.less` file in the Kendo UI installation folder. The Less file is placed in `src/styles/web/`. Check the [Less Structure documentation section]({% slug themesandappearnce_kendoui_desktopwidgets %}#less-files).
1. Open the `kendo.bootstrap.less` file and uncomment the two `@import` statements at the bottom:

        /*@import "bootstrap-variables.less";*/
        /*@import "bootstrap-mapper.less";*/

1. Make sure that the two files, which the above two `@imports` reference, exist at the specified locations. `bootstrap-variables.less` is a file that you need to take from the Bootstrap source code. `bootstrap-mapper.less` exists in the same folder as `kendo.bootstrap.less`.
1. Compile your custom Kendo UI Bootstrap theme and use it together with [`kendo.common-bootstrap.min.css`]({% slug themesandappearnce_kendoui_desktopwidgets %}#common-css-files).
1. There is no straightforward relationship between all Bootstrap Less variables and all Kendo UI Less variables. The variable mappings inside `bootstrap-mapper.less` have been created to achieve a decent level of compatibility and follow common sense logic. It is possible to change a specific mapping to change the logic by which the custom Kendo UI theme is generated.

For any suggestion how to improve the [`bootstrap-mapper.less` file](https://github.com/telerik/kendo-ui-core/blob/master/styles/web/bootstrap-mapper.less) you are willing to share, feel free to send your [pull request to the Kendo UI Core repository](https://github.com/telerik/kendo-ui-core/#how-to-contribute).  

### Nest Widgets and Bootstrap Grid Layout

Kendo UI uses the default `content-box` box model (`box-sizing` CSS property), while Bootstrap uses the non-default `border-box` model and applies it to all elements on the page, including the ones that are unrelated to Bootstrap. This breaks the layout of the Kendo UI widgets, which are placed inside a Bootstrap grid layout, leading to the overriding of the Bootstrap CSS and reapplying the `content-box` box model to the widgets. As a result, a Bootstrap grid layout, placed inside a Kendo UI widget, is not going to work as expected. In general, the multiple-level nesting of the two products is bound to break the one that is on the inside, unless an additional CSS rule is used for each new level of nesting.

A possible easy workaround is to override the Bootstrap CSS, apply the `content-box` box model to all elements on the page and use a `border-box` box model only to the Bootstrap elements which need it. These are all `.col-...` classes, `.row`, `.container`, `.container-fluid` and `form-control`.

You can add the following CSS rules _after_ the Bootstrap and Kendo UI stylesheets.

    /* reset everything to the default box model */

    *, :before, :after
    {
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
    }

    /* set a border-box model only to elements that need it */

    .form-control, /* if this class is applied to a Kendo UI widget, its layout may change */
    .container,
    .container-fluid,
    .row,
    .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1,
    .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2,
    .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3,
    .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4,
    .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5,
    .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6,
    .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7,
    .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8,
    .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9,
    .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10,
    .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11,
    .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12
    {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

### Use FontAwesome Icons

You are able to use FontAwesome icons alongside the Kendo UI widgets by adjusting the font-size of the generated content, as demonstrated in the example below.

###### Example

    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

    <style>
      .fa.k-sprite,
      .fa.k-sprite::before {
        font-size: 12px;
        line-height: 12px;
      }
    </style>

    // use spriteCssClass: "fa fa-some-great-icon"

### Use `form-control` Bootstrap CSS Class

The `form-control` Bootstrap CSS class is normally added to textboxes to apply borders, padding, background, and font styles. However, some Kendo UI widgets copy the custom CSS classes of their originating `<input>` elements to the widget wrapper element. This results in an incorrect padding style applied to a widget element that is not intended to have such. Also, `.form-control` defines a 100% width style, which the widgets may override. Finally, the `.form-control` class applies height, border and other styles that may interfere with the Kendo UI styling.

To resolve this issue, follow some of the possible solutions below.

**Solution 1**

* Place the Bootstrap stylesheet _before_ the Kendo UI stylesheet, so that same-specificity Kendo UI selectors can take precedence.

**Solution 2**

* Use custom CSS to fix any other outstanding issues, as demonstrated in the example below.

###### Example

    .form-control.k-widget
    {
        padding: 0;
        width: 100%;
        height: auto;
    }

    .form-control.k-widget:not(.k-autocomplete)
    {
      	border-width: 0;
    }

## Known Limitations

* Bootstrap modal dialogs prevent access to Kendo UI popups, which are opened by widgets placed inside the modal dialog. In such cases, use non-modal Bootstrap dialogs or [modal](/api/javascript/ui/window#configuration-modal) [Kendo UI Windows]({% slug overview_kendoui_window_widget %}).
* The latest version of the Bootstrap library introduces code in the `bootstrap.js` file that prevents the input in elements with `data-role=filter`. This causes trouble with data input in filter menu input elements.

## See Also

Other articles on Kendo UI integration with third-party tools and frameworks:

* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [Web Components]({% slug webcomponents_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
