---
title: Downloading the Bundles
page_title: Downloading the Bundles - Download and Installation 
description: "Get started with Kendo UI for jQuery and learn how to host the library in your project by downloading the bundles."
components: ["general"]
slug: hosting_kendoui
position: 20
---

## Downloading the Kendo UI Bundles

You can download the Kendo UI for jQuery ZIP package directly or get the Windows MSI installer from the Downloads section of your Telerik account.

Choose the option that matches how you want to get the distribution:

* **ZIP package:** Download the ZIP file from the [Kendo UI for jQuery download page](https://www.telerik.com/download/kendo-ui), then extract it to a folder on your computer.
* **Windows MSI installer:** Sign in to your [Telerik account Downloads section](https://www.telerik.com/account/downloads), find **Progress Kendo UI for jQuery**, select the version you want to use, and download the MSI installer.

## 2. Install or Extract the Files

### ZIP Package

Extract the downloaded ZIP package to a folder on your computer. Use the extracted files in the same way as the files installed by the MSI.

### Windows MSI Installer

1. Run the downloaded `.msi` file.
1. Follow the setup wizard to complete the installation.
1. Open the Kendo UI for jQuery installation folder specified during setup. By default, the MSI installs the files under `C:\Program Files (x86)\Progress\Kendo UI for jQuery <version>`. You will copy the required scripts and styles from this folder into your application.

The MSI installs the distribution files on your computer. You must still reference the required files and activate the license in each application.


### Included Files and Folders

The distribution contains the following files and folders:

|Folders 						|Contents |
|:---								|:---			|
|`/examples`				|Accommodates the quick-start demo files. Although they are static HTML files, it is recommended that you open them through a web server instead of directly from the file system. The latter approach breaks all AJAX data requests.|
|`/js`							|Contains the minified JavaScript files needed by Kendo UI to operate.|
|`/mjs`							|Contains the JavaScript modules that can be used instead of the bundled scripts from the `js` folder.|
|`/license-agreements`| Contains the End User License Agreement (EULA) that has to be read before installing Kendo UI.|
|`/src`							|Used to hold the source code files but they are now provided in a separate download package. Access the source code package from the [**Downloads** section](https://www.telerik.com/account/downloads) of your account. Note that the source code is not available to trial users.|
|`/styles`					|Contains the compiled CSS of all the [themes]({% slug sassbasedthemes_kendoui %}) Kendo UI provides. |
|`/typescript`			|Includes the Kendo UI [TypeScript definitions](https://docs.telerik.com/kendo-ui/third-party/typescript).|
|`changelog.html`		|Provides the Kendo UI release notes.|

## 3. Copy the Scripts and Styles

Create an `index.html` file and `js` and `styles` subfolders in your project, then add the required files. Use the jQuery version and theme that are compatible with your Kendo UI release and application:

1. Copy `kendo.all.min.js` from the distribution's `js` folder into your project's `js` folder.
1. Copy the compiled CSS file for your preferred theme from the distribution's `styles` folder into your project's `styles` folder. For example, you can copy the Default theme as `default-main.css`.
1. Download a compatible jQuery version from the [jQuery download page](https://jquery.com/download/) and save it in your project's `js` folder. For example, you can use the file name `jquery.min.js`.

>note As of R3 2023, the Kendo UI bundles do not include jQuery in their `js` folders. Obtain jQuery separately and load it before the Kendo UI scripts. For other supported versions, see [jQuery Version Support]({% slug jquerysupport_kendoui %}).

## 4. Add Your Script License Key

Follow [Adding Your Script License Key]({% slug using-license-code %}) to create a license script and save it in your project as `js/telerik-license.js`. Both trial and commercial licenses require activation.

Load the license script after the Kendo UI scripts and before initializing any components. Running the MSI installer does not replace this step.

## 5. Reference the Files and Initialize a Component

Add the following markup to `index.html`. The theme and file names in this example are placeholders. Replace them with the files you selected in the previous step. All script and stylesheet references point to files in your project.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Kendo UI with Local Files</title>
    <link rel="stylesheet" href="./styles/default-main.css" />
    <script src="./js/jquery.min.js"></script>
    <script src="./js/kendo.all.min.js"></script>
    <script src="./js/telerik-license.js"></script>
</head>
<body>
    <input id="my-datepicker" />
    <script>
        $(function() {
            $("#my-datepicker").kendoDatePicker();
        });
    </script>
</body>
</html>
```

Serve the project folder through a local web server and open `index.html` in your browser.

## Alternative Download Options

Based on the preferred technologies, you can also use other approaches to add Kendo UI to a project. For more details, refer to the following articles:

* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})


## Next Steps

* [Using Kendo UI for jQuery ECMAScript Modules]({% slug kendoui_ecmascript_overview %})
* [Create Your Own Custom Bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [The Component DOM Element Structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize Components as jQuery Plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Components with MVVM]({% slug mvvm_initialization_kendoui %})
* [jQuery Version Support]({% slug jquerysupport_kendoui %})
* [Web Browser Support]({% slug wbe_browserand_operating_system_support %})
* [Operation System Support]({% slug ossupport_kendo %})
* [PDF and Excel Export Support]({% slug export_support_kendoui %})
* [Create Your Own Custom Components]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
* [Licensing Overview]({% slug licensing-overview %})
