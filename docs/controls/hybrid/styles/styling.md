---
title: Styling
page_title: Styling | Kendo UI Hybrid Components
description: "Style Kendo UI hybrid applications by using CSS."
previous_url: /controls/hybrid/styling
slug: styling_hybridkendoui
position: 2
---

# Styling

The Kendo UI Hybrid framework is shipped with several separate CSS files:

* `kendo.mobile.all.min.css`&mdash;This is the default one and includes all supported themes, common and icon CSS.
* `kendo.mobile.\*.min.css`&mdash;The separate CSS files for every supported platform and skin, which are self-sufficient.
* `kendo.mobile.common.min.css`&mdash;The common and icon CSS needed for the Kendo UI Mobile theme skeleton - use this one if you want to start a skin from scratch.

> **Important**
>
> All themes and skins require the `images` sub-folder, which contains a mask for the iOS back button, icon fonts and the Windows Phone 8 PhoneGap icon workaround images.

Depending on the project requirements, the mobile application may be styled in several different ways. Each approach requires a different set of stylesheets and `mobile.Application` configuration options.

## Common Scenarios

### Mobile Application Which Changes Its Theme Depending on the Device

For the platform-adaptive styling to work as expected, the `kendo.mobile.all.min.css` CSS should be referred.

###### Example

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="http://cdn.kendostatic.com/2014.3.1316/styles/kendo.mobile.all.min.css" />
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2015.3.930/js/kendo.all.min.js"></script>
</head>
<body>
    <div data-role="view" data-title="Hello world">

    <div data-role="header">
        <div data-role="navbar">
            <span data-role="view-title">Hello</span>
        </div>
    </div>
        <a data-role="button">I am a button</a>
    </div>

    <script>
        new kendo.mobile.Application(document.body, {
        });
    </script>
</body>
</html>
```

### Mobile Application with iOS Look on All Devices

If you are targeting iOS devices only, or you want your application to have the iOS look regardless of the device, you may use either `kendo.mobile.all.min.css` or `kendo.mobile.ios.min.css`. Each of the two stylesheet files includes both the iOS6 (default) and iOS7+ looks. The `majorVersion` of the `platform` configuration option determines which one is going to be used.

###### Example

```html
<!DOCTYPE html>
<html>
<head>
    <!-- both stylesheets may be used here -->
    <!-- <link rel="stylesheet" href="http://cdn.kendostatic.com/2015.3.930/styles/kendo.mobile.ios.min.css" />  -->
    <link rel="stylesheet" href="http://cdn.kendostatic.com/2015.3.930/styles/kendo.mobile.ios.min.css" />
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2015.3.930/js/kendo.all.min.js"></script>
</head>
<body>
    <div data-role="view" data-title="Hello world">

    <div data-role="header">
        <div data-role="navbar">
            <span data-role="view-title">Hello</span>
        </div>
    </div>
        <a data-role="button">I am a button</a>
    </div>

    <script>
        new kendo.mobile.Application(document.body, {
            platform: {
                name: "ios",
                majorVersion: 9 // Major OS version - may be set to 6 or removed for the skeuomorphism look.
            }
        });
    </script>
</body>
</html>
```

### Mobile Application with Android Look on All Devices

If you are targeting Android devices only, or you want your application to have the Android look regardless of the device, you may use either `kendo.mobile.all.min.css`, `kendo.mobile.android.dark.min.css` (for dark, default mode) or `kendo.mobile.android.light.min.css`. The platform configuration option should be set, too.

#### Mobile Application with Android Halo Dark Look

###### Example

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="http://cdn.kendostatic.com/2015.3.930/styles/kendo.mobile.android.dark.min.css" />
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2015.3.930/js/kendo.all.min.js"></script>
</head>
<body>
    <div data-role="view" data-title="Hello world">

    <div data-role="header">
        <div data-role="navbar">
            <span data-role="view-title">Hello</span>
        </div>
    </div>
        <a data-role="button">I am a button</a>
    </div>

    <script>
        new kendo.mobile.Application(document.body, {
            platform: "android"
        });
    </script>
</body>
</html>
```

#### Mobile Application with Android Halo Light Look

###### Example

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="http://cdn.kendostatic.com/2015.3.930/styles/kendo.mobile.android.light.min.css" />
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2015.3.930/js/kendo.all.min.js"></script>
</head>
<body>
    <div data-role="view" data-title="Hello world">

    <div data-role="header">
        <div data-role="navbar">
            <span data-role="view-title">Hello</span>
        </div>
    </div>
        <a data-role="button">I am a button</a>
    </div>

    <script>
        new kendo.mobile.Application(document.body, {
            platform: "android"
        });
    </script>
</body>
</html>
```

### Mobile Application with Windows Phone 8 Look on All Devices

If you are targeting Windows Phone devices only, or you want your application to have the Windows Phone look regardless of the device, you may use either `kendo.mobile.all.min.css` or `kendo.mobile.wp8.min.css`. The platform configuration option should be set, too.

#### Mobile Application with Windows Phone 8 Look

###### Example

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="http://cdn.kendostatic.com/2015.3.930/styles/kendo.mobile.wp8.min.css" />
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2015.3.930/js/kendo.all.min.js"></script>
</head>
<body>
    <div data-role="view" data-title="Hello world">

    <div data-role="header">
        <div data-role="navbar">
            <span data-role="view-title">Hello</span>
        </div>
    </div>
        <a data-role="button">I am a button</a>
    </div>

    <script>
        new kendo.mobile.Application(document.body, {
            platform: "wp"
        });
    </script>
</body>
</html>
```

### Mobile Application with Platform Agnostic Skin

The Kendo UI Hybrid framework ships several device agnostic skins:

 * `flat`&mdash;`kendo.mobile.flat.min.css`
 * `nova`&mdash;`kendo.mobile.nova.min.css`
 * `material`&mdash;`kendo.mobile.material.min.css`
 * `fiori`&mdash;`kendo.mobile.fiori.min.css`
 * `office365`&mdash;`kendo.mobile.office365.min.css`

The skin should be activated by including the respective skin CSS file `kendo.mobile.${skin}.min.css` and setting the `skin` option.

### Mobile Application with Nova Skin

###### Example

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="http://cdn.kendostatic.com/2015.3.930/styles/kendo.mobile.nova.min.css" />
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2015.3.930/js/kendo.all.min.js"></script>
</head>
<body>
    <div data-role="view" data-title="Hello world">

    <div data-role="header">
        <div data-role="navbar">
            <span data-role="view-title">Hello</span>
        </div>
    </div>
        <a data-role="button">I am a button</a>
    </div>

    <script>
        new kendo.mobile.Application(document.body, { skin: "nova" });
    </script>
</body>
</html>
```

### Hybrid Widgets in Web Context without Mobile Application Instance

The case is described in further details in [this article](/controls/hybrid/support/regular-usage).

## Color Modifications

### Change iOS7 Tint Color

On 10th September 2013 Kendo UI released an iOS7 theme for mobile devices as an internal build which is also included in the Q2 service pack.

In iOS7 every application can have the ability to set a tint color which is used for highlighting specific interactive elements throughout the whole application. The tint color can be also set per single view. The Kendo UI iOS7 theme for mobile is created to be similarly easy to change the application tint color with the simple CSS rule shown below.

###### Example

    .km-ios7 .k-list,
    .km-ios7 .k-slider,
    .km-ios7 .km-widget
    {
        color: green;
    }

### Change iOS7 Tint Color for Specific Views

Additionally, a single View tint color can be changed by simply adding a CSS class to it and changing the above CSS accordingly. Make sure to avoid raising the CSS specificity above 20 (avoid `#ID` selectors and `!important`), otherwise all the text in the View will be colorized.

###### Example

    .specific-view .k-list,
    .specific-view .k-slider,
    .specific-view .km-widget
    {
        color: green;
    }

The example below demonstrates an application and a View-specific tint.

###### Example

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

### Change Android Tint Color

As of Kendo UI Q1 2014 release, every Android application can also have the ability to set a tint color which is used for highlighting specific interactive elements throughout the whole application. The tint color can also be set per a single view. The Kendo UI Android themes for mobile (`android-light` and `android-dark`) are created to be similarly easy to change the application tint color with the CSS rule demonstrated below.

###### Example

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

The CSS rule is longer than the iOS one, as the Android theme has mostly highlight colors on its active states.

### Change Android Tint Color for Specific Views

Additionally, a single View tint color can be changed by simply adding a CSS class to it and changing the above CSS accordingly. Make sure to avoid raising the CSS specificity above 20
(avoid `#ID` selectors and `!important`).

###### Example

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

The example below demonstrates an application and a View-specific tint.

###### Example

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

### Change Flat Skin Active Color

The Flat skin, shipped with Kendo UI Q2 2013 release for mobile, was created to provide a maximum performance. Also the active color of the skin can be easily changed with several CSS rules.

The example below demonstrates how to change the flat skin active background to blue.

###### Example

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

The example below demonstrates how to change the flat skin active background to red and the color to beige.

###### Example

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

<!--*-->
## Nova Theme Features

### Generic Content Styles

The Kendo UI Nova theme provides predefined generic styles for the `h1`, `h2`, `h3`, `h4`, `h5`, `h6` and `p` elements which are in a mobile view.

### Font Weights

The Kendo UI Nova theme provides three predefined font weights&mdash;light, medium, and bold. To activate them, use the `km-light-font`, `km-medium-font`, or `km-bold-font` classes.

The example below demonstrates Nova theme font weights.

###### Example

	<div data-role="view" data-title="Typography">
		<!-- h1 with bold font weight -->
		<h1 class="km-bold-font">Bold Heading 1</h1>
		<!-- h1 with medium font weight -->
		<h1 class="km-medium-font">Medium Heading 1</h1>
		<!-- h1 with light font weight -->
		<h1 class="km-light-font">Heading 1</h1>
	</div>

## See Also

Other articles related to the appearance and styling of Kendo UI hybrid distribution:

* [Style the Hybrid UI Form Elements]({% slug forms_hybridkendoui %})
* [Define the Layout]({% slug layout_hybridkendoui %})
* [Touch Events]({% slug touchevents_hybridkendoui %})
* [Hybrid UI Font Icons]({% slug hybridiconfonts_hybridkendoui %})
