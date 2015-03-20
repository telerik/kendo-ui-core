---
title: Styling
page_title: User guide to styling Kendo UI Mobile applications
description: How to style Kendo UI Mobile applications with CSS.
---

# Styling Kendo UI Mobile

<br/>
## Kendo UI Mobile CSS Dependencies

<br/>
By default Kendo UI Mobile is shipped with several separate CSS files:

* **kendo.mobile.all.min.css** - is the default one and includes all supported themes, along with the Flat skin, common and icon CSSes.
* **kendo.mobile.\*.min.css** - separate CSS files for every supported platform, which (every one) are self-sufficient - they include the needed common and icon CSS.
* **kendo.mobile.common.min.css** - common and icon CSS needed for the Kendo UI Mobile theme skeleton - use this one if you want to start a skin from scratch.
* **kendo.icenium.min.css** - Separate CSS build for Icenium - it includes only the iOS and Android themes.

All themes and skins ***require*** the **images** subfolder, which contains a mask for the iOS back button, icon fonts and the WP8 PhoneGap icon workaround images.

## Kendo UI Mobile ThemeBuilder

<br/>
Kendo UI Mobile's themes are designed to be easily customizable with different colors and backgrounds.
To further ease the task, we also provide a special tool called [Kendo UI Mobile ThemeBuilder](http://demos.telerik.com/kendo-ui/mobilethemebuilder/index.html).
It is very simple to use - just drag and drop your chosen colors, gradients, patterns and font styles onto the platform theme you need restyled and finally click the export button to get
the needed CSS stylesheet.

## Changing iOS7 tint color

On 10th September 2013 Kendo UI Mobile released an iOS7 theme as an internal build which will be also included in the upcoming Q2 service pack.

In iOS7 every application can have the ability to set "tint color" which is used for highlighting specific interactive elements throughout the whole application.
The tint color can be also set per single view. The Kendo UI Mobile's iOS7 theme is created to be similarly easy to change the application tint color with this simple CSS rule:

    .km-ios7 .k-list,
    .km-ios7 .k-slider,
    .km-ios7 .km-widget
    {
        color: green;
    }

Additionally a single View tint color can be changed by simply adding a CSS class to it and changing the above CSS accordingly. Make sure to avoid raising the CSS specificity above 20
(avoid #ID selectors and !important), or all text in the View will be colorized.

### Change the iOS7 tint color for a specific View

    .specific-view .k-list,
    .specific-view .k-slider,
    .specific-view .km-widget
    {
        color: green;
    }

### Example with application and View-specific tint

    <style scoped>
      .km-ios7 .k-list,
      .km-ios7 .k-slider,
      .km-ios7 .km-widget
      {
        color: green;
      }
      .view2 .k-list,
      .view2 .k-slider,
      .view2 .km-widget
      {
        color: red;
      }
    </style>

    <div data-role="view" data-title="View 1" id="view1">
      <header data-role="header">
        <div data-role="navbar">
          <div data-role="view-title"></div>
        </div>
      </header>
      <footer data-role="footer">
        <div data-role="tabstrip">
          <a data-role="button" data-icon="favorites" href="#view1">Favorites</a>
          <a data-role="button" data-icon="home" href="#view2">Home</a>
        </div>
      </footer>
    </div>
    <div data-role="view" data-title="View 2" id="view2" class="view2">
      <header data-role="header">
        <div data-role="navbar">
          <div data-role="view-title"></div>
        </div>
      </header>
      <footer data-role="footer">
        <div data-role="tabstrip">
          <a data-role="button" data-icon="favorites" href="#view1">Favorites</a>
          <a data-role="button" data-icon="home" href="#view2">Home</a>
        </div>
      </footer>
    </div>
    <script>
      new kendo.mobile.Application();
    </script>

## Changing Android tint color

As of Q1 2014, every Android application also can have the ability to set "tint color" which is used for highlighting specific interactive elements throughout the whole application.
The tint color can be also set per single view. The Kendo UI Mobile's Android theme (android-light and android-dark) are created to be similarly easy to change the application tint color with this CSS rule:

    .km-android .km-shim,
    .km-android .km-popup,
    .km-android .k-slider,
    .km-android .km-badge,
    .km-android .km-switch-on,
    .km-android .km-current-page,
    .km-android input:focus,
    .km-android select:focus,
    .km-android textarea:focus,
    .km-android input:checked,
    .km-android .km-touch-scrollbar,
    .km-android .km-widget .k-state-focused,
    .km-android .km-widget .km-state-active
    {
        color: pink;
    }

The CSS rule is bigger than the iOS one, as the Android theme mostly has highlight colors on its active states.

Additionally a single View tint color can be changed by simply adding a CSS class to it and changing the above CSS accordingly. Make sure to avoid raising the CSS specificity above 20
(avoid #ID selectors and !important).

### Change the iOS7 tint color for a specific View

    .specific-view .km-shim,
    .specific-view .km-popup,
    .specific-view .k-slider,
    .specific-view .km-badge,
    .specific-view .km-switch-on,
    .specific-view .km-current-page,
    .specific-view input:focus,
    .specific-view select:focus,
    .specific-view textarea:focus,
    .specific-view input:checked,
    .specific-view .km-touch-scrollbar,
    .specific-view .km-widget .k-state-focused,
    .specific-view .km-widget .km-state-active
    {
        color: green;
    }

### Example with application and View-specific tint

    <style scoped>
      .km-android .km-shim,
      .km-android .km-popup,
      .km-android .k-slider,
      .km-android .km-badge,
      .km-android .km-switch-on,
      .km-android .km-current-page,
      .km-android input:focus,
      .km-android select:focus,
      .km-android textarea:focus,
      .km-android input:checked,
      .km-android .km-touch-scrollbar,
      .km-android .km-widget .k-state-focused,
      .km-android .km-widget .km-state-active
      {
        color: green;
      }
      .view2 .km-shim,
      .view2 .km-popup,
      .view2 .k-slider,
      .view2 .km-badge,
      .view2 .km-switch-on,
      .view2 .km-current-page,
      .view2 input:focus,
      .view2 select:focus,
      .view2 textarea:focus,
      .view2 input:checked,
      .view2 .km-touch-scrollbar,
      .view2 .km-widget .k-state-focused,
      .view2 .km-widget .km-state-active
      {
        color: red;
      }
    </style>

    <div data-role="view" data-title="View 1" id="view1">
      <header data-role="header">
        <div data-role="navbar">
          <div data-role="view-title"></div>
        </div>
      </header>
      <footer data-role="footer">
        <div data-role="tabstrip">
          <a data-role="button" data-icon="favorites" href="#view1">Favorites</a>
          <a data-role="button" data-icon="home" href="#view2">Home</a>
        </div>
      </footer>
    </div>
    <div data-role="view" data-title="View 2" id="view2" class="view2">
      <header data-role="header">
        <div data-role="navbar">
          <div data-role="view-title"></div>
        </div>
      </header>
      <footer data-role="footer">
        <div data-role="tabstrip">
          <a data-role="button" data-icon="favorites" href="#view1">Favorites</a>
          <a data-role="button" data-icon="home" href="#view2">Home</a>
        </div>
      </footer>
    </div>
    <script>
      new kendo.mobile.Application();
    </script>

## Changing Flat skin active color

<br/>
The Flat skin shipped with Kendo UI Mobile Q2 2013, was created to provide maximum performance. Also the active color of the skin can be easily changed with several CSS rules.

### Change the Flat skin active background to blue

    .km-flat .km-switch-handle,
    .km-flat .k-slider-selection,
    .km-flat .km-switch-background
    {
        color: #369;
    }

    .km-flat .km-loader,
    .km-flat .km-rowinsert,
    .km-flat .km-state-active,
    .km-flat .km-scroller-pull,
    .km-flat .k-slider-selection,
    .km-flat .km-touch-scrollbar,
    .km-flat .km-pages .km-current-page,
    .km-flat .k-slider .k-draghandle,
    .km-flat .k-slider .k-draghandle:hover,
    .km-flat .km-tabstrip .km-state-active,
    .km-flat .km-scroller-refresh.km-load-more,
    .km-flat .km-popup .k-state-hover,
    .km-flat .km-popup .k-state-focused,
    .km-flat .km-popup .k-state-selected,
    .km-flat .km-actionsheet > li > a:active,
    .km-flat .km-actionsheet > li > a:hover,
    .km-flat li.km-state-active .km-listview-link,
    .km-flat li.km-state-active .km-listview-label,
    .km-flat .km-listview-label input[type=radio]:checked,
    .km-flat .km-listview-label input[type=checkbox]:checked
    {
        background: #369;
    }

    .km-flat .km-filter-wrap > input:focus
    {
        border-color: #369;
    }

### Change the Flat skin active background to red and the color to beige

    .km-flat .km-badge,
    .km-flat .km-rowinsert,
    .km-flat .km-rowdelete,
    .km-flat .km-state-active,
    .km-flat .km-switch-label-on,
    .km-flat .km-switch-label-off,
    .km-flat .km-tabstrip .km-button,
    .km-flat .km-popup .k-item,
    .km-flat .km-actionsheet > li > a,
    .km-flat .km-tabstrip .km-state-active,
    .km-flat .k-slider .k-draghandle,
    .km-flat .k-slider .k-draghandle:hover,
    .km-flat .km-scroller-pull .km-icon,
    .km-flat .km-popup.km-pane .km-navbar,
    .km-flat .km-popup.km-pane .km-toolbar,
    .km-flat .km-popup.km-pane .km-tabstrip,
    .km-flat .km-popup .k-state-hover,
    .km-flat .km-popup .k-state-focused,
    .km-flat .km-popup .k-state-selected,
    .km-flat .km-actionsheet > li > a:active,
    .km-flat .km-actionsheet > li > a:hover,
    .km-flat li.km-state-active .km-listview-link,
    .km-flat li.km-state-active .km-listview-label,
    .km-flat .km-state-active .km-listview-link:after
    {
        color: #fff3c9;
    }

    .km-flat .km-loader > *:not(h1),
    .km-flat .km-filter-wrap > input,
    .km-flat .km-switch-handle.km-state-active,
    .km-root .km-flat .km-scroller-refresh span:not(.km-template),
    .km-flat .km-listview-label input[type=checkbox]:checked:after
    {
        background: #fff3c9;
    }

    .km-flat .km-switch-handle,
    .km-flat .k-slider-selection,
    .km-flat .km-switch-background
    {
        color: #ff6363;
    }

    .km-flat .km-loader,
    .km-flat .km-rowinsert,
    .km-flat .km-state-active,
    .km-flat .km-scroller-pull,
    .km-flat .k-slider-selection,
    .km-flat .km-touch-scrollbar,
    .km-flat .km-pages .km-current-page,
    .km-flat .k-slider .k-draghandle,
    .km-flat .k-slider .k-draghandle:hover,
    .km-flat .km-tabstrip .km-state-active,
    .km-flat .km-scroller-refresh.km-load-more,
    .km-flat .km-popup .k-state-hover,
    .km-flat .km-popup .k-state-focused,
    .km-flat .km-popup .k-state-selected,
    .km-flat .km-actionsheet > li > a:active,
    .km-flat .km-actionsheet > li > a:hover,
    .km-flat li.km-state-active .km-listview-link,
    .km-flat li.km-state-active .km-listview-label,
    .km-flat .km-listview-label input[type=radio]:checked,
    .km-flat .km-listview-label input[type=checkbox]:checked
    {
        background: #ff6363;
    }

    .km-flat .km-filter-wrap > input:focus
    {
        border-color: #ff6363;
    }

