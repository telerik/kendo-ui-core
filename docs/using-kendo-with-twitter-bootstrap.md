---
title: Twitter Bootstrap Integration
position: 16
---

# Using Kendo UI widgets with Twitter Bootstrap

Kendo UI widgets can be used seamlessly alongside [Twitter Bootstrap](http://getbootstrap.com/). This can be seen in the [Kendo UI + Twitter Bootstrap demo](http://demos.telerik.com/kendo-ui/bootstrap) ([source on GitHub](https://github.com/telerik/kendo-bootstrap-demo)).

To replicate the look and feel of Bootstrap in Kendo UI, take the following steps:

  1. Use the kendo.common-bootstrap.min.css instead of kendo.common.css. This ensures that the dimensions of Kendo UI will match the ones in Bootstrap.
  2. Use the kendo.bootstrap.min.css theme, which applies the Bootstrap colors to the Kendo UI widgets.

The following example demonstrates the necessary links to these stylesheets (replace VERSION with the Kendo UI version that you want to use):

    <link rel="stylesheet" href="http://cdn.kendostatic.com/VERSION/styles/kendo.common-bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.kendostatic.com/VERSION/styles/kendo.bootstrap.min.css">

While these files will ensure that Kendo UI looks a lot like Bootstrap, it is not mandatory to use them.
The default Kendo UI common.css and any other theme will style the widgets differently, but they will continue to function properly.

Please note that the `kendo.bootstrap.min.css` theme styles Kendo UI to match the **default** Bootstrap look and feel.
Other Bootstrap themes should (or can) be used with any other Kendo UI theme, or with a custom Kendo UI theme  (e.g. created with the [Kendo UI ThemeBuilder](/themebuilder)).

## Using the responsive features of Bootstrap

Using the responsive features of Bootstrap does not differ from other responsive sites;
refer to the help topic on [how to use Kendo UI in responsive web pages](./using-kendo-in-responsive-web-pages).

## Using a customized version of Bootstrap

If you have customized the colors of Bootstrap before using it, and need Kendo UI to match the newly chosen colors,
you will need to customize Kendo UI's bootstrap theme through the [Kendo UI ThemeBuilder](http://demos.telerik.com/kendo-ui/themebuilder/web.html).

## Nesting Kendo UI widgets and Bootstrap Grid layout

Kendo UI uses the default `content-box` box model (`box-sizing` CSS property), while Bootstrap uses the non-default `bordex-box` model and applies it to all elements on the page,
including ones that are unrelated to Bootstrap. This breaks the layout of the Kendo UI widgets, which are placed inside a Bootstrap grid layout,
forcing us to override the Bootstrap CSS and reapply the `content-box` box model to Kendo UI widgets. As a result, a Bootstrap grid layout placed inside a Kendo UI widget
will not work as expected. In general, multiple level nesting of the two products is bound to break the one that is on the inside, unless an additional CSS rule is used for each new level of nesting.

A possible easy workaround is to override the Bootstrap CSS, apply `content-box` box model to all elements on the page and use a `border-box` box model only to selected Bootstrap elements, which need it
(these are all `.col-...` classes, `.row`, `.container`, `.container-fluid` and `form-control`). You can add the following CSS rules **after** the Bootstrap and Kendo UI stylesheets.

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

## Using FontAwesome icons in Kendo UI widgets

FontAwesome icons can be used alongside the Kendo UI widgets, by adjusting the font-size of the generated content:

    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

    <style>
      .fa.k-sprite,
      .fa.k-sprite::before {
        font-size: 12px;
        line-height: 12px;
      }
    </style>

    // use spriteCssClass: "fa fa-some-great-icon"

## Using the form-control Bootstrap CSS class with Kendo UI widgets

The `form-control` Bootstrap CSS class is normally added to textboxes in order to apply some border, padding, background and font styles.
The problem is that some Kendo UI widgets copy the custom CSS classes of their originating `<input>` elements to the widget wrapper element.
This results in an incorrect padding style applied to a widget element that should not have a padding.
Also, `.form-control` defines a 100% width style, which the Kendo UI widgets may override. The resolution is to use:

    .form-control.k-widget
    {
        padding: 0;
        width: 100%;
    }

## Known limitations

With the latest version of the Bootstrap library, a code that prevents the input in elements with `data-role=filter` has been introduced in the bootstrap.js file. This causes a problem with data input in filter menu
input elements.

##See Also
[Responsive Web Design](http://docs.telerik.com/kendo-ui/using-kendo-in-responsive-web-pages)
