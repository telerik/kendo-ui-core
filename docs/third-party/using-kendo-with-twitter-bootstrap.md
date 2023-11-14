---
title: Twitter Bootstrap
page_title: Twitter Bootstrap - Kendo UI Third-Party Tools
description: "Learn more about the integration with the Twitter Bootstrap framework that Kendo UI provides to its users and enjoy the full set of resulting functionalities."
previous_url: /using-kendo-with-twitter-bootstrap
slug: twitterbootstrapintegration_integration_kendoui
---

# Twitter Bootstrap

The [Kendo UI components](https://demos.telerik.com/kendo-ui/) can be used seamlessly alongside [Twitter Bootstrap](http://getbootstrap.com/), as demonstrated in [this live demo](https://demos.telerik.com/kendo-ui/bootstrap) having its [source on GitHub](https://github.com/telerik/kendo-bootstrap-demo).


## Getting Started

To replicate the look and feel of Bootstrap in Kendo UI, follow the steps below:

  1. Use the [`Kendo Bootstrap`](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/overview) theme which applies the Bootstrap colors to the Kendo UI components and choose a theme swatch at your preference. The `Kendo Bootstrap` styles Kendo UI to match the default Bootstrap look and feel. 

The following example demonstrates the necessary link to these stylesheets.

    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" /

## Using Bootstrap Responsive Features

Using the responsive features of Bootstrap does not differ from other responsive sites.

## Nesting Components and Bootstrap Grid Layout

Kendo UI uses the default `content-box` box model (`box-sizing` CSS property), while Bootstrap uses the non-default `border-box` model and applies it to all elements on the page, including the ones that are unrelated to Bootstrap. This breaks the layout of the Kendo UI components, which are placed inside a Bootstrap grid layout, leading to the overriding of the Bootstrap CSS and reapplying the `content-box` box model to the components. As a result, a Bootstrap grid layout, placed inside a Kendo UI widget, is not going to work as expected. In general, the multiple-level nesting of the two products will break the one that is on the inside, unless an additional CSS rule is used for each new level of nesting.

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
    a.dropdown-item,
    .col-1, .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xl-1, .col-xxl-1,
    .col-2, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xl-2, .col-xxl-2,
    .col-3, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xl-3, .col-xxl-3,
    .col-4, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xl-4, .col-xxl-4,
    .col-5, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xl-5, .col-xxl-5,
    .col-6, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xl-6, .col-xxl-6,
    .col-7, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xl-7, .col-xxl-7,
    .col-8, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xl-8, .col-xxl-8,
    .col-9, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xl-9, .col-xxl-9,
    .col-10, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xl-10, .col-xxl-10,
    .col-11, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xl-11, .col-xxl-11,
    .col-12, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 .col-xl-12, .col-xxl-12
    {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

## Using FontAwesome Icons

You can use FontAwesome icons alongside the Kendo UI components by adjusting the font-size of the generated content, as demonstrated in the example below.

    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

    <style>
      .fa.k-sprite,
      .fa.k-sprite::before {
        font-size: 12px;
        line-height: 12px;
      }
    </style>

    // use spriteCssClass: "fa fa-some-great-icon"

## Using `form-control` Bootstrap CSS Class

The `form-control` Bootstrap CSS class is normally added to textboxes to apply borders, padding, background, and font styles. However, some Kendo UI components copy the custom CSS classes of their originating `<input>` elements to the widget wrapper element. This results in an incorrect padding style applied to a widget element that is not intended to have such. Also, `.form-control` defines a 100% width style, which the components may override. Finally, the `.form-control` class applies height, border and other styles that may interfere with the Kendo UI styling.

**Solution One** Place the Bootstrap stylesheet _before_ the Kendo UI stylesheet, so that same-specificity Kendo UI selectors can take precedence.

**Solution Two** Use custom CSS to fix any other outstanding issues.

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

* Bootstrap modal dialogs prevent access to Kendo UI popups, which are opened by components placed inside the modal dialog. In such cases, use non-modal Bootstrap dialogs or [modal](/api/javascript/ui/window/configuration/modal) [Kendo UI Windows]({% slug overview_kendoui_window_widget %}).
* The latest version of the Bootstrap library introduces code in the `bootstrap.js` file that prevents the input in elements with `data-role=filter`. This causes trouble with data input in filter menu input elements.

## See Also

* [SharePoint Add-Ins]({% slug sharepoint_tutorials %})
* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Module Bundlers]({% slug module_bundlers_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
