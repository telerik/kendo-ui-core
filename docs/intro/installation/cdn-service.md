---
title: Using CDN
page_title: Using CDN - Download and Installation 
description: "Get started with Kendo UI for jQuery and install the Kendo UI components by using the Kendo UI CDN services."
components: ["general"]
previous_url: /install/cdn
slug: kendoui_cdn_services_installation
position: 40
---

# Using CDN

Use jsDelivr to load Kendo UI for jQuery from its NPM packages without hosting the assets locally. Pin the Kendo UI and theme package versions in each URL and use the matching Subresource Integrity (SRI) value.

>note As of the R3 2022 release, you must activate the CDN distribution by [adding your script license key]({% slug using-license-code %}).

## Installation Steps

1. Add the required CSS and JavaScript files.

  Load a theme from the `@progress/kendo-theme-default` package. This example uses the `14.5.0` version of the Ocean Blue theme:

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@progress/kendo-theme-default@14.5.0/dist/default-ocean-blue.css" integrity="sha256-eNPRBUJRAdbNuZjjM0HWX4qWYUQONec3soGf9AgbjbE=" crossorigin="anonymous" />
  ```

  >note Starting with the 2023 R3 release, the font icons are detached from the Kendo Themes CDN. For more information on referencing the icons in your project, see the [font icon usage documentation](https://www.telerik.com/design-system/docs/foundation/iconography/font-icons/#usage).

  Add the JavaScript files by using either the [JavaScript modules]({% slug kendoui_ecmascript_overview %}) or the bundled JavaScript files.

  The [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) are located in the `/esm/` folder. To include a JavaScript module in your project, use the `script` tag with the `type="module"` attribute.

  The following example demonstrates how to include an individual component module from version `{{ site.cdnVersion }}`.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.cdnVersion }}/esm/kendo.grid.js" type="module"></script>
  ```

  The following example demonstrates how to include the bundled module file.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.cdnVersion }}/esm/kendo.all.js" type="module"></script>
  ```

  The UMD bundles are located in the `/umd/` folder. To load the full bundle, use the exact Kendo UI version and its matching SRI value:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@2026.3.811/umd/kendo.all.min.js" integrity="sha256-Bjy6F9ho2vlkrHseUGTTc+Y6swvrpO7a10REh+IJHD4=" crossorigin="anonymous"></script>
  ```

  To load the smaller Core bundle, use `https://cdn.jsdelivr.net/npm/@progress/kendo-ui@2026.3.811/umd/kendo.ui.core.min.js` with its matching SRI value:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@2026.3.811/umd/kendo.ui.core.min.js" integrity="sha256-/wzJ3w2XwU5qiMCixBzKG0oQkxEJryRsnOB4uiyKNYE=" crossorigin="anonymous"></script>
  ```

1. Add your script license key.

  [Generate and reference your script license key]({% slug using-license-code %}) by following the current licensing instructions for CDN-based installations.

1. Add the HTML element and initialize the component.

  Depending on the component you require, you can initialize the Kendo UI controls from different elements. The following example demonstrates a complete page that adds the `input` element, loads the CDN assets, and initializes a DropDownList with basic configuration.

```dojo
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Kendo UI using CDN</title>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@progress/kendo-theme-default@14.5.0/dist/default-ocean-blue.css" integrity="sha256-eNPRBUJRAdbNuZjjM0HWX4qWYUQONec3soGf9AgbjbE=" crossorigin="anonymous" />

        <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@2026.3.811/umd/kendo.all.min.js" integrity="sha256-Bjy6F9ho2vlkrHseUGTTc+Y6swvrpO7a10REh+IJHD4=" crossorigin="anonymous"></script>
    </head>
    <body>
      <input id="ddl" />
      <script>
        $("#ddl").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ]
        });
      </script>
    </body>
</html>
```

## Using Legacy Kendo CDNs

Up to Kendo UI version `<DEPRICATION_VERSION>`, client-side resources were also hosted on the legacy Kendo CDN services:

* `https://kendo.cdn.telerik.com`&mdash;The Kendo CDN.
* `https://cdn.kendostatic.com`&mdash;The cookieless Kendo CDN host.

The historical URL patterns used a Kendo UI version for JavaScript and older CSS files, and a separate theme version for Sass theme CSS:

```text
https://kendo.cdn.telerik.com/{KENDO_VERSION}/js/{FILE}
https://cdn.kendostatic.com/{KENDO_VERSION}/js/{FILE}
https://kendo.cdn.telerik.com/{KENDO_VERSION}/mjs/{FILE}
https://kendo.cdn.telerik.com/{KENDO_VERSION}/styles/{FILE}
https://kendo.cdn.telerik.com/themes/{THEME_VERSION}/{THEME}/{SWATCH}.css
```

For example, a legacy application could build its URLs from the Kendo UI and theme versions:

```javascript
const KENDO_VERSION = "2026.3.811";
const THEME_VERSION = "14.5.0";
const kendoAllUrl = `https://kendo.cdn.telerik.com/${KENDO_VERSION}/js/kendo.all.min.js`;
const cookielessKendoAllUrl = `https://cdn.kendostatic.com/${KENDO_VERSION}/js/kendo.all.min.js`;
const themeUrl = `https://kendo.cdn.telerik.com/themes/${THEME_VERSION}/default/default-main.css`;
```

Use the version-pinned jsDelivr package URLs described above for new integrations.

## Next Steps

* [Create Your Own Custom Bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [The Component DOM Element Structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize Components as jQuery Plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Components with MVVM]({% slug mvvm_initialization_kendoui %})
* [jQuery Version Support]({% slug jquerysupport_kendoui %})
* [Web Browser Support]({% slug wbe_browserand_operating_system_support %})
* [Operating System Support]({% slug ossupport_kendo %})
* [PDF and Excel Export Support]({% slug export_support_kendoui %})
* [Create Your Own Custom Components]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Troubleshooting When Using Kendo UI CDN services]({% slug troubleshoot_cdn_installing %})
* [Troubleshooting When Trying to Refer Kendo UI Internal Builds from CDN]({% slug cannot_refer_internal_builds_cdn %})
* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
* [Licensing Overview]({% slug licensing-overview %})
