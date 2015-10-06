---
title: Getting Started with Kendo UI
page_title: Getting Started with Kendo UI
description: "Get your project up and running: download and host Kendo UI, install Kendo UI as a bower package, or use the Kendo UI CDN service and include only what you need."
previous_url: /install/bower, /install/cdn, /install/custom, /install/onsite
position: 1
---

# Getting Started with Kendo UI

### Host Kendo UI in Your Project

Depending on your preferences and the requirements of your project, you can:

* [Download](http://www.telerik.com/download/kendo-ui) Kendo UI for a 30-day trial period
* [Use]((https://github.com/telerik/kendo-ui-core)) the GitHub open-source license for Telerik Kendo UI® Core
* [Get](http://www.telerik.com/purchase/kendo-ui) your commercial license for Telerik Kendo UI® Professional
* [Get](http://www.telerik.com/purchase/aspnet-mvc) your commercial license for Telerik UI for ASP.NET MVC
* [Get](http://www.telerik.com/purchase/jsp-ui) your commercial license for Telerik UI for JSP
* [Get](http://www.telerik.com/purchase/php-ui) your commercial license for Telerik UI for PHP

#### Step 1: Download Kendo UI

Once you [download](http://www.telerik.com/download/kendo-ui) any of the Kendo UI packages, you will get the following folders in your local repository:

* `/examples` - the folder accommodates the quick start demo files
* `/js` - the location contains the minified JavaScript files
* `/src` - this directory holds the source code files. Note that it is not available in the 30-day trial version.
* `/styles` - the folder consists of the minified CSS files and theme images
* `/wrappers` - the directory includes the server-side wrappers. As it is necessary for the Telerik UI for ASP.NET MVC, UI for JSP or UI for PHP distributions only, the folder is available in the commercial packages of these versions.
* `changelog.html` - the folder provides the Kendo UI release notes

#### Step 2: Add CSS and JavaScript References to Your Project

To use Kendo UI in your project, you need to include the required JavaScript and CSS files.

**Step 1:** Extract the `/js` and `/styles` directories from the bundle archive and copy them to your web application root directory
**Step 2:** Include the Kendo UI JavaScript and CSS files in the `head` tag of your HTML document. Make sure the common CSS file is registered before the theme CSS file.

Here goes the example:

		<!DOCTYPE html>
	        <html>
	        <head>
	            <title>Welcome to Kendo UI!</title>
	            <!-- Common Kendo UI CSS for web and dataviz widgets -->
	            <link href="styles/kendo.common.min.css" rel="stylesheet" />

	            <!-- (optional) Kendo UI web widgets' RTL CSS, include only in right-to-left applications -->
	            <link href="styles/kendo.rtl.min.css" rel="stylesheet" type="text/css" />

	            <!-- Default Kendo UI theme CSS for web and dataviz widgets -->
	            <link href="styles/kendo.default.min.css" rel="stylesheet" />

	            <!-- (optional) Kendo UI Mobile CSS, include only if you will use the mobile devices features -->
	            <link href="styles/kendo.default.mobile.min.css" rel="stylesheet" type="text/css" />

	            <!-- jQuery JavaScript -->
	            <script src="js/jquery.min.js"></script>

	            <!-- Kendo UI combined JavaScript -->
	            <script src="js/kendo.all.min.js"></script>
	        </head>
	        <body>
	            Hello World!
	        </body>
	        </html>

> The code examples onwards assume that the Kendo UI scripts and stylesheets were added to the document.

**Step 3:** Initialize a Kendo UI Widget

Example with the DataPicker widget:

        <!-- HTML element from which the DatePicker would be initialized -->
        <input id="datepicker" />
        <script>
        $(function() {
            // Initialize the Kendo DatePicker by calling the kendoDatePicker jQuery plugin
            $("#datepicker").kendoDatePicker();
        });
        </script>

Here is the complete example:

    <!DOCTYPE html>
    <html>
        <head>
            <title>Welcome to Kendo UI!</title>
            <link href="styles/kendo.common.min.css" rel="stylesheet" />
            <link href="styles/kendo.default.min.css" rel="stylesheet" />
            <script src="js/jquery.min.js"></script>
            <script src="js/kendo.all.min.js"></script>
        </head>
        <body>
            <input id="datepicker" />
            <script>
                $(function() {
                    $("#datepicker").kendoDatePicker();
                });
            </script>
        </body>
    </html>

### Install Kendo UI As a Kendo UI Core or Kendo UI Professional Bower Package

[Bower](http://bower.io/) is a popular package manager for the web.

Kendo UI maintains 2 bower packages, namely Kendo UI Core and Kendo UI Professional. Official releases, service packs and internal builds are uploaded to both of them.

> Kendo UI Professional bower package is available for licensed user accounts only. Check out the list of Kendo UI components and their bundle support [here](http://docs.telerik.com/kendo-ui/intro/list-of-widgets).

#### Option 1: Install Kendo UI Core Bower Package

The Kendo UI Core Bower package is available as a [public GitHub repository](https://github.com/kendo-labs/bower-kendo-ui) and is also registered as `kendo-ui-core` in the bower registry:

```sh
bower install kendo-ui-core
```

#### Option 2: Install Kendo UI Professional Bower Package

The Kendo UI Professional Bower Package is hosted as a [private GitHub repository](https://bower.telerik.com). To access it, you need an active account for Telerik Platform. Bower will prompt for your username and password during the installation and update processes:

```sh
bower install https://bower.telerik.com/bower-kendo-ui.git
```

You can also add the package to the `bower.json` file:

```json
"dependencies": {
"kendo-ui": "https://bower.telerik.com/bower-kendo-ui.git#~2014.3.1425"
}
```

> During the installation of the Bower package, you may be requested to confirm your credentials more than once. For further information, refer to [Storing Repository Credentials](...) below.

#### Storing Your Repository Credentials

**Option 1:** In order to avoid retyping your credentials, you may cache them. The easiest way to do that is to store them as plain text in a [.netrc file](http://www.mavetju.org/unix/netrc.php).

**Option 2:** A secure alternative to do the same is to use the GitHub credential helpers. Refer to [Stack Overflow](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github) to follow the discussion on the topic.

##### Store Your Credentials on Windows

> Caching your credentials is required if you use the Kendo UI Bower Package in an ASP.NET vNext project.

**Step 1:** Create a text file called `_netrc` in your home directory (e.g. `c:\users\jane\_netrc`)
**Step 2:** Declare a `HOME` environment variable:

```
C:\> SETX HOME %USERPROFILE%
```

**Step 3:** Add the credentials using the format listed above.

GitHub might have problems resolving your home directory if it contains spaces in its path (e.g. `c:\Documents and Settings\jane`). Therefore, update your `%HOME%` environment variable to point to a directory having no spaces in its name.

##### Store Your Credentials on Linux, OS X and Unix-Like Systems

**Step 1:** Create a file called `.netrc` in your home directory (`~/.netrc`). Make sure you modify the file permissions to make it readable only to you.

```sh
touch ~/.netrc
chmod 0600 ~/.netrc
```

**Step 2:** Add your credentials to the `~/.netrc` file using the format listed in the example below:

```
machine bower.telerik.com
    login my-telerik.identity@example.com
    password mysecret
```

##### Troubleshooting

**Issue 1:** Bower on Windows has troubles installing the repository showing the error message

```
fatal: unable to access 'https://bower.telerik.com/bower-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate
```

**Cause:** The cause of this issue is the underlying GitHub installation is missing the certificate bundle.

**Fix:** To resolve the issue, follow the steps in this [help article](http://blogs.msdn.com/b/phkelley/archive/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exe-s-store.aspx).

> 1.9.5 Git build will not work with the Bower package.

> When using @ symbol in the url for accessing the Kendo UI Bower repository (due to network restrictions or admin rules, for instance), make sure you encode it as follows: https://firstname.lasname**%40**domain.com@bower.telerik.com/bower-kendo-ui.git.

### Use the Kendo UI CDN Service

The Kendo UI CDN is hosted on [Amazon CloudFront](https://aws.amazon.com/cloudfront/). In order to access the Kendo UI CDN Service, you can use either of the options described below.

#### Option 1: Through the HTTP Protocol

The minified versions of all JavaScript files are available via the following URLs:
<http://kendo.cdn.telerik.com/VERSION/js/FILENAME.min.js>
<http://kendo.cdn.telerik.com/VERSION/styles/FILENAME.min.css>

For example, the 2014.1.318 version can be loaded from:
<http://kendo.cdn.telerik.com/2014.1.318/js/kendo.all.min.js>
<http://kendo.cdn.telerik.com/2014.1.318/styles/kendo.common.min.css>

Use the following URL to load the minified Kendo UI Core script (available since Q1 2014 SP1):
<http://kendo.cdn.telerik.com/2014.1.416/js/kendo.ui.core.min.js>

>The <http://cdn.kendostatic.com> URL will remain active, but is no longer recommended for new projects.

#### Option 2: Through the HTTPS Protocol

To access the Kendo UI CDN service through the HTTPS protocol, use the same host name as above, only replacing the scheme (protocol) with `https`:
<https://kendo.cdn.telerik.com/2014.1.318/js/kendo.all.min.js>

>The <https://da7xgjtj801h2.cloudfront.net> URL will remain active, but are no longer recommended for new projects.

#### Troubleshooting

**Issue 1:** Disruption and connection problems
Although the Amazon CloudFront service provides for a reliable level of uptime support, you may encounter disruption or connection troubles. After you have checked the status of the systems at [http://status.aws.amazon.com/](http://status.aws.amazon.com/), the CDN status is reported as healthy and is operating normally.

**Cause:** You could be experiencing Internet or network connectivity problems, or DNS problems, or it is possible that firewalls, antivirus or other security software incorrectly filters out the CDN scripts or modifies (breaks) them on-the-fly.

**Fix:** Contact your system administrator, as remote investigation of connection problems is outside the scope of Kendo UI support.

**Issue 2:** How to refer Kendo UI From CDN With a Local Script Fallback

**Cause:** Kendo UI internal builds are not uploaded on CDN, because they are intended only for clients with a commercial license. Only major releases and service packs are uploaded on the Kendo UI CDN.

**Fix:** You should use a private CDN for internal builds. It is recommendable to implement a local fallback when using any kind of CDN in the way displayed here:

    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Kendo UI</title>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2014.1.318/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2014.1.318/styles/kendo.blueopal.min.css" />

        <script src="http://kendo.cdn.telerik.com/2014.1.318/js/jquery.min.js"></script>
        <script>
            if (typeof jQuery == "undefined") {
                // fallback to local jQuery
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/jquery.min.js" %3E%3C/script%3E'));
            }
        </script>

        <script src="http://kendo.cdn.telerik.com/2014.1.318/js/kendo.all.min.js"></script>
        <script>
            if (typeof kendo == "undefined") {
                // checking for loaded CSS files is cumbersome,
                // that's why we assume that if the scripts have failed, so have the stylesheets

                // fallback to local Kendo UI stylesheets
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.common.min.css" %3C/%3E'));
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.blueopal.min.css" %3C/%3E'));

                // fallback to local Kendo UI scripts
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/kendo.all.min.js" %3E%3C/script%3E'));
                // also add kendo.aspnetmvc.min.js or kendo.timezones.min.js, if needed
            }
        </script>
    </head>
    <body>
        Hello world!
    </body>
    </html>

> You will be able to find more information on the topic at [Scott HanselMann - Fallback from CDN to Local Scripts](http://www.hanselman.com/blog/CDNsFailButYourScriptsDontHaveToFallbackFromCDNToLocalJQuery.aspx).

### Include Only What You Need

#### Pick the Right Combined Script Based on Your Project Type

The following combined scripts are available in the bundles or at the CDN in order to facilitate the common project types:

*  `kendo.ui.core.min.js` contains all widgets supported by the [Kendo UI Core distribution](http://docs.telerik.com/kendo-ui/intro/list-of-widgets). The relevant script is available in the Kendo UI Core package as well.
*  `kendo.all.min.js` contains a minified version of all features provided by Kendo UI.

> `kendo.all.min.js` is available in the Kendo UI Professional, Telerik UI for ASP.NET MVC, Telerik UI for JSP and Telerik UI for PHP bundles. However, `kendo.all.min.js` does not include the `kendo.aspnetmvc.min.js`. To install it, add `kendo.aspnetmvc.min.js` to `kendo.all.min.js` or use the [custom download builder tool](http://www.telerik.com/download/custom-download).

* `kendo.web.min.js` is available in Kendo UI Professional, JSP, PHP and MVC. It includes the core framework and all desktop browser widgets (previously distributed as Kendo UI Web).
* `kendo.dataviz.min.js` is available in Kendo UI Professional, JSP, PHP and MVC. It includes the core framework and all data visualization widgets (previously distributed as Kendo UI DataViz).
* `kendo.mobile.min.js` is available in Kendo UI Professional, JSP, PHP and MVC. Includes the core framework and all mobile device specific widgets (previously distributed as Kendo UI Mobile).

> Only one of the combined JavaScript files can be included at a time, because they include the Kendo UI framework. If you want to simultaneously use widgets from different Kendo UI suites, use `kendo.all.min.js` or build a custom script.

In addition, each of the combined script files should not be registered together with an individual widget script from the same suite. For example, `kendo.grid.js` should not be registered together with `kendo.web.js` or `kendo.all.js`, because they already include the Grid scripts.

> Registering duplicate scripts may cause JavaScript errors and unexpected behavior.

#### Build a Custom Combined Script with the Kendo UI Download Builder

Users with a commercial license may use the [custom download builder tool](http://www.telerik.com/download/custom-download) to create a single JavaScript file which contains only the required widgets and features.

> Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file, which includes everything you need.

#### Use Grunt to Build a Custom Script

If you use the Kendo UI Core package, you can build a custom distribution using the `grunt` build tool by following the instructions in [README](https://github.com/telerik/kendo-ui-core#building-only-what-you-need).

Since Q3 2014, the necessary build scripts are shipped in the `src/` directory of the downloadable commercial bundles. To build a custom distribution from the shipped source, run the following shell commands:

```sh
    cd src
    npm install -g grunt-cli
    npm install
    grunt custom:autocomplete,dropdownlist
```

List the components you want to be included in the custom build and separated them with comma (`,`). The example above will build a custom minified script which includes the AutoComplete and the DropDownList widgets.

> When complete, the grunt command will output a `kendo.custom.min.js` file in the `src/dist` directory.
The grunt build task automatically resolves the needed dependencies for each component, so you don't have to list them.
Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file, which includes everything you need.

#### Include Individual Widget Scripts

The following script files, either minified or not, can be included on a per-widget basis depending on the flavor you want to add to your project. Refer to the list with Kendo UI widgets in terms of their bundle support [here](/intro/list-of-widgets).

##### Kendo UI Widgets

Here is the list of the script files for desktop UI widgets for mobile-ready websites and applications:

| Widget				| Script Files								| Comments					|
| :---					| :---										| :---						|
| [AutoComplete](http://demos.telerik.com/kendo-ui/autocomplete/index)| jquery.js| 				|
|						| kendo.core.js								|							|
|						| kendo.data.js								|							|
|						| kendo.popup.js							|							|
|						| kendo.list.js								|							|
|						| kendo.fx.js 								| Mobile scroller feature	|
|						| kendo.userevents.js 						| Mobile scroller feature	|
|						| kendo.draganddrop.js 						| Mobile scroller feature	|
|						| kendo.mobile.scroller.js 					| Mobile scroller feature	|
|						| kendo.virtuallist.js 						| VirtualList feature		|
|						| kendo.autocomplete.js						| 							|
| 						| kendo.angular.js							| 							|
| [Button](http://demos.telerik.com/kendo-ui/button/index)| jquery.js|							|
| 						| kendo.core.js								| 							|
| 						| kendo.button.js							| 							|
| [Calendar](http://demos.telerik.com/kendo-ui/calendar/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.calendar.js							| 							|
| [Color Tools](http://demos.telerik.com/kendo-ui/colorpicker/index)| jquery.js| 				|
| 						| kendo.core.js								| 							|
| 						| kendo.color.js							| 							|
| 						| kendo.popup.js							|  							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.draganddrop.js						| 							|
| 						| kendo.slider.js							| 							|
| 						| kendo.colorpicker.js						| 							|
| [ComboBox](http://demos.telerik.com/kendo-ui/combobox/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.list.js								| 							|
| 						| kendo.fx.js 								| Mobile scroller feature	|
| 						| kendo.userevents.js 						| Mobile scroller feature	|
| 						| kendo.draganddrop.js 						| Mobile scroller feature	|
| 						| kendo.mobile.scroller.js 					| Mobile scroller feature	|
| 						| kendo.virtuallist.js 						| VirtualList feature		|
| 						| kendo.combobox.js							| 							|
| [DatePicker](http://demos.telerik.com/kendo-ui/datepicker/index)	| jquery.js|				|
| 						| kendo.core.js								| 							|
| 						| kendo.calendar.js							| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.datepicker.js						| 							|
|						| kendo.timepicker.js						| 							|
| 						| kendo.datetimepicker.js					| 							|
| [DateTimePicker](http://demos.telerik.com/kendo-ui/datetimepicker/index)| jquery.js| 			|
|						| kendo.core.js								| 							|
|						| kendo.fx.js								| 							|
| [DropDownList](http://demos.telerik.com/kendo-ui/dropdownlist/index)| jquery.js|				|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.list.js								| 							|
| 						| kendo.fx.js 								| Mobile scroller feature	|
| 						| kendo.userevents.js 						| Mobile scroller feature	|
| 						| kendo.draganddrop.js 						| Mobile scroller feature	|
| 						| kendo.mobile.scroller.js 					| Mobile scroller feature	|
| 						| kendo.virtuallist.js 						| VirtualList feature		|
| 						| kendo.dropdownlist.js						| 							|
| [Editor](http://demos.telerik.com/kendo-ui/editor/index)| jquery.js| 							|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.list.js								| 							|
| 						| kendo.combobox.js							| 							|
| 						| kendo.dropdownlist.js						| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.draganddrop.js						| 							|
| 						| kendo.window.js							| 							|
| 						| kendo.color.js 							| 							|
|						| kendo.slider.js							| 							|
| 						| kendo.colorpicker.js						| 							|
| 						| kendo.selectable.js 						| Image Browser feature		|
|						| kendo.listview.js 						| Image Browser feature		|
| 						| kendo.upload.js 							| Image Browser feature		|
| 						| kendo.filebrowser.js  					| Image Browser feature		|
|						| kendo.imagebrowser.js  					| Image Browser feature		|
| 						| kendo.resizable.js 						| Resize handle feature		|
| 						| kendo.drawing.js 							| PDF export feature		|
| 						| kendo.pdf.js 								| PDF export feature		|
|						| kendo.editor.js							|  							|
| [Gantt](http://demos.telerik.com/kendo-ui/gantt/index)| jquery.js|  							|
| 						| kendo.core.js								|  							|
| 						| kendo.data.js								|  							|
| 						| kendo.popup.js							|  							|
| 						| kendo.userevents.js						|  							|
| 						| kendo.draganddrop.js						|  							|
| 						| kendo.resizable.js						|  							|
|						| kendo.window.js							|  							|
| 						| kendo.dom.js								|  							|
| 						| kendo.touch.js							| 							|
|						| kendo.columnsorter.js						| 							|
|						| kendo.calendar.js							| 							|
|						| kendo.datepicker.js						| 							|
| 						| kendo.timepicker.js						| 							|
| 						| kendo.datetimepicker.js					| 							|
| 						| kendo.numerictextbox.js					| 							|
| 						| kendo.validator.js						| 							|
| 						| kendo.binder.js							| 							|
| 						| kendo.editable.js							| 							|
| 						| kendo.gantt.list.js						| 							|
| 						| kendo.gantt.timeline.js					| 							|
|						| kendo.grid.js								| 							|
|						| kendo.gantt.js							| 							|
| [Grid](http://demos.telerik.com/kendo-ui/grid/index)| jquery.js| 								|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.columnsorter.js						| 							|
| 						| kendo.calendar.js 						| Editing feature			|
| 						| kendo.popup.js 							| Editing feature			|
| 						| kendo.datepicker.js 						| Editing feature			|
| 						| kendo.userevents.js 						| Editing feature			|
| 						| kendo.numerictextbox.js 					| Editing feature			|
|						| kendo.validator.js 						| Editing feature			|
| 						| kendo.binder.js 							| Editing feature			|
| 						| kendo.editable.js 						| Editing feature			|
| 						| kendo.draganddrop.js 						| Editing feature			|
| 						| kendo.window.js 							| Editing feature			|
| 						| kendo.calendar.js 						| Filtering feature			|
|						| kendo.popup.js 							| Filtering feature			|
| 						| kendo.datepicker.js 						| Filtering feature			|
| 						| kendo.userevents.js 						| Filtering feature			|
| 						| kendo.numerictextbox.js 					| Filtering feature			|
| 						| kendo.list.js 							| Filtering feature			|
|						| kendo.dropdownlist.js 					| Filtering feature			|
| 						| kendo.binder.js 							| Filtering feature			|
| 						| kendo.filtermenu.js 						| Filtering feature			|
| 						| kendo.popup.js 							| Column menu feature		|
| 						| kendo.calendar.js 						| Column menu feature		|
| 						| kendo.datepicker.js 						| Column menu feature		|
| 						| kendo.userevents.js 						| Column menu feature		|
| 						| kendo.numerictextbox.js 					| Column menu feature		|
| 						| kendo.list.js 							| Column menu feature		|
| 						| kendo.dropdownlist.js 					| Column menu feature		|
| 						| kendo.binder.js 							| Column menu feature		|
| 						| kendo.filtermenu.js 						| Column menu feature		|
| 						| kendo.menu.js 							| Column menu feature		|
| 						| kendo.columnmenu.js 						| Column menu feature		|
| 						| kendo.userevents.js 						| Grouping feature 			|
| 						| kendo.draganddrop.js 						| Grouping feature			|
| 						| kendo.groupable.js 						| Grouping feature			|
| 						| kendo.popup.js 							| Row filter feature  		|
| 						| kendo.list.js 							| Row filter feature		|
| 						| kendo.autocomplete.js  					| Row filter feature		|
| 						| kendo.filtercell.js 						| Row filter feature		|
| 						| kendo.pager.js 							| Paging Feature			|
| 						| kendo.userevents.js 						| Selection Feature			|
| 						| kendo.selectable.js 						| Selection Feature			|
|						| kendo.userevents.js 						| Column reordering feature |
| 						| kendo.draganddrop.js						| Column reordering feature	|
| 						| kendo.reorderable.js 						| Column reordering feature	|
| 						| kendo.userevents.js 						| Column resizing feature	|
| 						| kendo.draganddrop.js 						| Column resizing feature 	|
| 						| kendo.resizable.js 						| Column resizing feature	|
| 						| kendo.popup.js 							| Grid adaptive rendering feature|
| 						| kendo.fx.js 								| Grid adaptive rendering feature|
| 						| kendo.userevents.js 						| Grid adaptive rendering feature|
| 						| kendo.draganddrop.js 						| Grid adaptive rendering feature|
| 						| kendo.mobile.scroller.js 					| Grid adaptive rendering feature|
| 						| kendo.binder.js 							| Grid adaptive rendering feature|
| 						| kendo.view.js 							| Grid adaptive rendering feature|
| 						| kendo.mobile.view.js 						| Grid adaptive rendering feature|
| 						| kendo.mobile.loader.js 					| Grid adaptive rendering feature|
| 						| kendo.mobile.pane.js 						| Grid adaptive rendering feature|
| 						| kendo.mobile.popover.js 					| Grid adaptive rendering feature|
| 						| kendo.mobile.shim.js 						| Grid adaptive rendering feature|
| 						| kendo.mobile.actionsheet.js 				| Grid adaptive rendering feature|
| 						| kendo.ooxml.js 							| Excel export feature		|
| 						| kendo.excel.js 							| Excel export feature		|
| 						| kendo.color.js 							| PDF export feature 		|
| 						| kendo.drawing.js 							| PDF export feature		|
| 						| kendo.pdf.js 								| PDF export feature		|
| 						| kendo.progressbar.js 						| PDF export feature		|
| [ListView](http://demos.telerik.com/kendo-ui/listview/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.calendar.js 						| Editing feature			|
| 						| kendo.popup.js 							| Editing feature			|
| 						| kendo.datepicker.js 						| Editing feature			|
| 						| kendo.userevents.js 						| Editing feature			|
|						| kendo.numerictextbox.js 					| Editing feature			|
| 						| kendo.validator.js 						| Editing feature			|
| 						| kendo.binder.js 							| Editing feature			|
| 						| kendo.editable.js 						| Editing feature			|
| 						| kendo.userevents.js 						| Selection feature			|
| 						| kendo.selectable.js 						| Selection feature			|
| 						| kendo.listview.js							| 							|
| [MaskedTextBox](http://demos.telerik.com/kendo-ui/maskedtextbox/index)| jquery.js|			|
| 						| kendo.core.js								| 							|
| 						| kendo.maskedtextbox.js					| 							|
| [Menu](http://demos.telerik.com/kendo-ui/menu/index)| jquery.js|	 							|
| 						| kendo.core.js								| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.menu.js								| 							|
| [MultiSelect](http://demos.telerik.com/kendo-ui/multiselect/index)| jquery.js|				|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.list.js								| 							|
| 						| kendo.fx.js 								| Mobile scroller feature	|
| 						| kendo.userevents.js 						| Mobile scroller feature	|
| 						| kendo.draganddrop.js 						| Mobile scroller feature	|
| 						| kendo.mobile.scroller.js 					| Mobile scroller feature	|
| 						| kendo.virtuallist.js 						| VirtualList feature		|
| 						| kendo.multiselect.js						| 							|
| [Notification](http://demos.telerik.com/kendo-ui/notification/index)| jquery.js|				|
| 						| kendo.core.js								| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.notification.js						| 							|
| [NumericTextBox](http://demos.telerik.com/kendo-ui/numerictextbox/index)| jquery.js|			|
| 						| kendo.core.js								| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.numerictextbox.js 					| 							|
| [PanelBar](http://demos.telerik.com/kendo-ui/panelbar/index)| jquery.js| 						|
| 						| kendo.core.js								| 							|
| 						| kendo.panelbar.js							| 							|
| [PivotGrid](http://demos.telerik.com/kendo-ui/pivotgrid/index)| jquery.js|					|
| 						| kendo.core.js								| 							|
| 						| kendo.dom.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.data.xml.js							| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.draganddrop.js						| 							|
| 						| kendo.sortable.js							| 							|
| 						| kendo.popup.js 							| Configurator feature		|
| 						| kendo.list.js 							| Configurator feature		|
| 						| kendo.dropdownlist.js						| Configurator feature		|
| 						| kendo.treeview.js 						| Configurator feature		|
| 						| kendo.menu.js 							| Configurator feature		|
| 						| kendo.window.js 							| Configurator feature		|
| 						| kendo.pivot.fieldmenu.js 					| Configurator feature		|
| 						| kendo.pivot.configurator.js 				| Configurator feature		|
| 						| kendo.popup.js 							| Filtering feature			|
| 						| kendo.menu.js 							| Filtering feature			|
| 						| kendo.window.js 							| Filtering feature			|
| 						| kendo.treeview.js 						| Filtering feature			|
| 						| kendo.list.js 							| Filtering feature			|
| 						| kendo.dropdownlist.js 					| Filtering feature			|
| 						| kendo.pivot.fieldmenu.js 					| Filtering feature			|
| 						| kendo.ooxml.js 							| Excel export feature		|
| 						| kendo.color.js 							| PDF export feature		|
| 						| kendo.drawing.js 							| PDF export feature		|
| 						| kendo.pdf.js 								| PDF export feature		|
| 						| kendo.fx.js 								| Mobile scroller feature	|
| 						| kendo.mobile.scroller.js					| Mobile scroller feature	|
| 						| kendo.pivotgrid.js						| 							|
| [ProgressBar](http://demos.telerik.com/kendo-ui/progressbar/index)| jquery.js| 				|
| 						| kendo.core.js								| 							|
| 						| kendo.progressbar.js						| 							|
| [Responsive Panel](http://demos.telerik.com/kendo-ui/responsive-panel/index)| jquery.js|		|
| 						| kendo.core.js								| 							|
| 						| kendo.responsive-panel.js					| 							|
| [Scheduler](http://demos.telerik.com/kendo-ui/scheduler/index)| jquery.js|					|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.list.js								| 							|
|						| kendo.dropdownlist.js						| 							|
| 						| kendo.calendar.js							| 							|
| 						| kendo.datepicker.js						| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.numerictextbox.js					| 							|
| 						| kendo.validator.js						| 							|
| 						| kendo.binder.js							| 							|
| 						| kendo.editable.js							| 							|
| 						| kendo.multiselect.js						| 							|
| 						| kendo.draganddrop.js						| 							|
| 						| kendo.window.js							| 							|
| 						| kendo.timepicker.js						| 							|
| 						| kendo.datetimepicker.js					| 							|
| 						| kendo.scheduler.recurrence.js				| 							|
| 						| kendo.scheduler.view.js					| 							|
| 						| kendo.scheduler.dayview.js 				| Scheduler Day View feature|
| 						| kendo.scheduler.agendaview.js 			| Scheduler Agenda View feature|
| 						| kendo.scheduler.monthview.js 				| Scheduler Month View feature|
| 						| kendo.scheduler.timelineview.js 			| Scheduler Timeline View feature|
| 						| kendo.fx.js 								| Scheduler adaptive rendering feature|
| 						| kendo.mobile.scroller.js 					| Scheduler adaptive rendering feature|
| 						| kendo.view.js 							| Scheduler adaptive rendering feature|
| 						| kendo.mobile.view.js 						| Scheduler adaptive rendering feature|
| 						| kendo.mobile.loader.js 					| Scheduler adaptive rendering feature|
| 						| kendo.mobile.pane.js 						| Scheduler adaptive rendering feature|
| 						| kendo.mobile.popover.js 					| Scheduler adaptive rendering feature|
| 						| kendo.mobile.shim.js 						| Scheduler adaptive rendering feature|
| 						| kendo.mobile.actionsheet.js				| Scheduler adaptive rendering feature|
| 						| kendo.color.js 							| PDF export feature		|
| 						| kendo.drawing.js 							| PDF export feature		|
| 						| kendo.pdf.js 								| PDF export feature		|
| 						| kendo.scheduler.js						| 							|
| [Slider](http://demos.telerik.com/kendo-ui/slider/index)| jquery.js| 							|
| 						| kendo.core.js								| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.draganddrop.js						| 							|
| 						| kendo.slider.js							| 							|
| 						| kendo.view.js								| 							|
| [Splitter](http://demos.telerik.com/kendo-ui/splitter/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.draganddrop.js						| 							|
| 						| kendo.resizable.js						| 							|
| 						| kendo.splitter.js							| 							|
| [TabStrip](http://demos.telerik.com/kendo-ui/tabstrip/index)| jjquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.tabstrip.js							| 							|
| [TimePicker](http://demos.telerik.com/kendo-ui/timepicker/index)| jquery.js|					|
| 						| kendo.core.js								| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.timepicker.js						| 							|
| [ToolBar](http://demos.telerik.com/kendo-ui/toolbar/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.toolbar.js							| 							|
| [Tooltip](http://demos.telerik.com/kendo-ui/tooltip/index)| jquery.js| 						|
| 						| kendo.core.js								| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.tooltip.js							| 							|
| [TreeList](http://demos.telerik.com/kendo-ui/treelist/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.dom.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.columnsorter.js 					| Sorting feature			|
| 						| kendo.calendar.js 						| Filtering feature			|
| 						| kendo.popup.js 							| Filtering feature			|
| 						| kendo.datepicker.js 						| Filtering feature			|
| 						| kendo.userevents.js 						| Filtering feature			|
| 						| kendo.numerictextbox.js 					| Filtering feature			|
| 						| kendo.list.js 							| Filtering feature			|
| 						| kendo.dropdownlist.js 					| Filtering feature			|
| 						| kendo.binder.js 							| Filtering feature			|
| 						| kendo.filtermenu.js 						| Filtering feature			|
| 						| kendo.calendar.js 						| Editing feature			|
| 						| kendo.popup.js 							| Editing feature			|
| 						| kendo.datepicker.js						| Editing feature			|
| 						| kendo.userevents.js 						| Editing feature			|
| 						| kendo.numerictextbox.js 					| Editing feature			|
| 						| kendo.validator.js 						| Editing feature			|
| 						| kendo.binder.js 							| Editing feature			|
| 						| kendo.editable.js 						| Editing feature			|
| 						| kendo.draganddrop.js 						| Editing feature			|
| 						| kendo.window.js 							| Editing feature			|
| 						| kendo.userevents.js 						| Selection feature			|
| 						| kendo.selectable.js 						| Selection feature			|
| 						| kendo.userevents.js 						| Column resizing feature	|
| 						| kendo.draganddrop.js 						| Column resizing feature	|
| 						| kendo.resizable.js 						| Column resizing feature	|
| 						| kendo.ooxml.js 							| Excel export feature 		|
| 						| kendo.excel.js 							| Excel export feature		|
| 						| kendo.color.js 							| PDF export feature 		|
| 						| kendo.drawing.js 							| PDF export feature		|
| 						| kendo.pdf.js 								| PDF export feature		|
| 						| kendo.treelist.js							| 							|
| [TreeView](http://demos.telerik.com/kendo-ui/treeview/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 				 		| kendo.userevents.js						| 							|
| 						| kendo.draganddrop.js						| 							|
| 						| kendo.treeview.js							| 							|
| [Upload](http://demos.telerik.com/kendo-ui/upload/index)| jquery.js|							|
| 						| kendo.core.js								| 							|
| 						| kendo.upload.js							| 							|
| [Validator](http://demos.telerik.com/kendo-ui/validator/index)| jquery.js|					|
| 						| kendo.core.js`							| 							|
| 						| kendo.validator.js						| 							|
| [Window](http://demos.telerik.com/kendo-ui/window/index)| jquery.js|							|
| 						| kendo.core.js								| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.draganddrop.js						| 							|
| 						| kendo.window.js							| 							|

##### Widgets for Data Visualization

Here is the list of the script files for data visualization widgets for desktop and mobile web applications:

| Widget				| Script Files								|Comments					|
| :---					| :---										|:---						|
| [Barcode](http://demos.telerik.com/kendo-ui/barcode/index)| jquery.js| 						|
| 						| kendo.core.js								| 							|
| 						| kendo.color.js							| 							|
| 						| kendo.drawing.js							| 							|
| 						| kendo.dataviz.core.js						| 							|
| 						| kendo.dataviz.barcode.js					| 							|
| [Chart](http://demos.telerik.com/kendo-ui/chart-api/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.color.js							| 							|
| 						| kendo.drawing.js							| 							|
| 						| kendo.dataviz.core.js						| 							|
| 						| kendo.dataviz.themes.js					| 							|
| 						| kendo.dataviz.chart.js					| Polar & Radar feature		|
| 						| kendo.dataviz.chart.polar.js 				| Polar & Radar feature		|
| 						| kendo.dataviz.chart.js 					| Funnel chart feature 		|
| 						| kendo.dataviz.chart.funnel.js				| Funnel chart feature		|
| 						| kendo.pdf.js 								| PDF export feature		|
| 						| kendo.dataviz.chart.js					| 							|
| [Diagram](http://demos.telerik.com/kendo-ui/diagram/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.userevents.js						|  							|
| 						| kendo.fx.js								| 							|
| 						| kendo.draganddrop.js						| 							|
| 						| kendo.mobile.scroller.js					| 							|
| 						| kendo.color.js							| 							|
| 						| kendo.drawing.js							| 							|
| 						| kendo.dataviz.core.js						| 							|
| 						| kendo.dataviz.themes.js					| 							|
| 						| kendo.toolbar.js							| 							|
| 						| kendo.pdf.js 								| PDF export feature		|
| 						| kendo.calendar.js							| Editing feature			|
| 						| kendo.popup.js 							| Editing feature			|
| 						| kendo.datepicker.js 						| Editing feature			|
| 						| kendo.numerictextbox.js 					| Editing feature			|
| 						| kendo.validator.js 						| Editing feature			|
| 						| kendo.binder.js 							| Editing feature			|
| 						| kendo.editable.js 						| Editing feature			|
| 						| kendo.window.js 							| Editing feature			|
| 						| kendo.list.js 							| Editing feature			|
| 						| kendo.dropdownlist.js 					| Editing feature			|
| 						| kendo.dataviz.diagram.js					| 							|
| [Gauge](http://demos.telerik.com/kendo-ui/linear-gauge/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.color.js							| 							|
| 						| kendo.drawing.js							| 							|
| 						| kendo.dataviz.core.js						| 							|
| 						| kendo.dataviz.themes.js					| 							|
| 						| kendo.dataviz.gauge.js					| 							|
| [Map](http://demos.telerik.com/kendo-ui/map/index)| jquery.js|								|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.popup.js							| 							|
| 						| kendo.tooltip.js							| 							|
| 						| kendo.color.js							| 							|
| 						| kendo.drawing.js							| 							|
| 						| kendo.dataviz.core.js						| 							|
| 						| kendo.fx.js								| 							|
| 						| kendo.draganddrop.js						| 							|
| 						| kendo.mobile.scroller.js					| 							|
| 						| kendo.dataviz.map.js						| 							|
| [QRCode](http://demos.telerik.com/kendo-ui/qrcode/index)| jquery.js|							|
| 						| kendo.core.js								| 							|
| 						| kendo.color.js							| 							|
| 						| kendo.drawing.js							| 							|
| 						| kendo.dataviz.core.js						| 							|
| 						| kendo.dataviz.qrcode.js					| 							|
| [Sparklines](http://demos.telerik.com/kendo-ui/sparklines/index)| jquery.js| 					|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.color.js							| 							|
| 						| kendo.drawing.js							| 							|
| 						| kendo.dataviz.core.js						| 							|
| 						| kendo.dataviz.themes.js					| 							|
| 						| kendo.dataviz.chart.js					| 							|
| 						| kendo.dataviz.sparkline.js				| 							|
| [StockCharts](http://demos.telerik.com/kendo-ui/financial/index)| jquery.js|					|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.color.js							| 							|
| 						| kendo.drawing.js							| 							|
| 						| kendo.dataviz.core.js						| 							|
| 						| kendo.dataviz.themes.js					| 							|
| 						| kendo.dataviz.chart.js					| 							|
| 						| kendo.dataviz.stockchart.js				| 							|
| [TreeMap](http://demos.telerik.com/kendo-ui/treemap/index)| jquery.js|						|
| 						| kendo.core.js								| 							|
| 						| kendo.data.js								| 							|
| 						| kendo.userevents.js						| 							|
| 						| kendo.color.js							| 							|
| 						| kendo.drawing.js							| 							|
| 						| kendo.dataviz.core.js						| 							|
| 						| kendo.dataviz.themes.js					| 							|
| 						| kendo.dataviz.treeMap.js					| 							|

##### Hybrid UI

Here is the list of the script files for the frameworks and widgets for mobile applications:

| Widget				| Script Files								|
| :---					| :---										|
| [ActionSheet](http://demos.telerik.com/kendo-ui/m/index#actionsheet/index)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.popup.js							|
| 						| kendo.fx.js								|
| 						| kendo.userevents.js						|
| 						| kendo.draganddrop.js						|
| 						| kendo.mobile.scroller.js					|
| 						| kendo.data.js								|
| 						| kendo.binder.js							|
| 						| kendo.view.js								|
| 						| kendo.mobile.view.js						|
| 						| kendo.mobile.loader.js					|
| 						| kendo.mobile.pane.js						|
| 						| kendo.mobile.popover.js					|
| 						| kendo.mobile.shim.js						|
| 						| kendo.mobile.actionsheet.js				|
| [Application](http://demos.telerik.com/kendo-ui/m/index#application/loadingpopup)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.fx.js								|
| 						| kendo.userevents.js						|
| 						| kendo.draganddrop.js						|
| 						| kendo.mobile.scroller.js					|
| 						| kendo.data.js								|
| 						| kendo.binder.js							|
| 						| kendo.view.js								|
| 						| kendo.mobile.view.js						|
| 						| kendo.mobile.loader.js					|
| 						| kendo.mobile.pane.js						|
| 						| kendo.router.js							|
| 						| kendo.mobile.application.js				|
| [Button](http://demos.telerik.com/kendo-ui/m/index#mobile-button/index)|jquery.js|
| 						| kendo.core.js								|
| 						| kendo.userevents.js						|
| 						| kendo.mobile.button.js					|
| [ButtonGroup](http://demos.telerik.com/kendo-ui/m/index#buttongroup/mobile)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.mobile.buttongroup.js				|
| [Collapsible](http://demos.telerik.com/kendo-ui/m/index#collapsible/index)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.userevents.js						|
| 						| kendo.mobile.collapsible.js				|
| [Drawer](http://demos.telerik.com/kendo-ui/m/index#drawer/index)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.fx.js								|
| 						| kendo.userevents.js						|
| 						| kendo.draganddrop.js						|
| 						| kendo.mobile.scroller.js					|
| 						| kendo.data.js								|
| 						| kendo.binder.js							|
| 						| kendo.view.js								|
| 						| kendo.mobile.view.js						|
| 						| kendo.mobile.drawer.js					|
| [ListView](http://demos.telerik.com/kendo-ui/m/index#mobile-listview/index)|jquery.js|
| 						| kendo.core.js								|
| 						| kendo.data.js								|
| 						| kendo.userevents.js						|
| 						| kendo.mobile.button.js					|
| 						| kendo.mobile.listview.js					|
| [ModalView](http://demos.telerik.com/kendo-ui/m/index#modalview/index)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.popup.js							|
| 						| kendo.mobile.shim.js						|
| 						| kendo.fx.js								|
| 						| kendo.userevents.js						|
| 						| kendo.draganddrop.js						|
| 						| kendo.mobile.scroller.js					|
| 						| kendo.data.js								|
| 						| kendo.binder.js							|
| 						| kendo.view.js								|
| 						| kendo.mobile.view.js						|
| 						| kendo.mobile.modalview.js					|
| [NavBar](http://demos.telerik.com/kendo-ui/m/index#navbar/index)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.mobile.navbar.js					|
| [PopOver](http://demos.telerik.com/kendo-ui/m/index#popover/index)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.popup.js							|
| 						| kendo.fx.js								|
| 						| kendo.userevents.js						|
| 						| kendo.draganddrop.js						|
| 						| kendo.mobile.scroller.js					|
| 						| kendo.data.js								|
| 						| kendo.binder.js							|
| 						| kendo.view.js								|
| 						| kendo.mobile.view.js						|
| 						| kendo.mobile.loader.js					|
| 						| kendo.mobile.pane.js						|
| 						| kendo.mobile.popover.js					|
| [Scroller](http://demos.telerik.com/kendo-ui/m/index#scroller/index)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.fx.js								|
| 						| kendo.userevents.js						|
| 						| kendo.draganddrop.js						|
| 						| kendo.mobile.scroller.js					|
| [ScrollView](http://demos.telerik.com/kendo-ui/m/index#scrollview/mobile)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.fx.js								|
| 						| kendo.data.js								|
| 						| kendo.userevents.js						|
| 						| kendo.draganddrop.js						|
| 						| kendo.mobile.scrollview.js				|
| [SplitView](http://demos.telerik.com/kendo-ui/m/index#splitview/index)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.fx.js								|
| 						| kendo.userevents.js						|
| 						| kendo.draganddrop.js						|
| 						| kendo.mobile.scroller.js					|
| 						| kendo.data.js								|
| 						| kendo.binder.js							|
| 						| kendo.view.js								|
| 						| kendo.mobile.view.js						|
| 						| kendo.mobile.loader.js					|
| 						| kendo.mobile.pane.js						|
| 						| kendo.mobile.splitview.js					|
| [Switch](http://demos.telerik.com/kendo-ui/m/index#switch/mobile)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.fx.js								|
| 						| kendo.userevents.js						|
| 						| kendo.mobile.switch.js					|
| [TabStrip](http://demos.telerik.com/kendo-ui/m/index#mobile-tabstrip/index)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.mobile.tabstrip.js					|
| [Touch](http://demos.telerik.com/kendo-ui/m/index#touchevents/mobile)| jquery.js|
| 						| kendo.core.js								|
| 						| kendo.userevents.js						|
| 						| kendo.touch.js							|

##### Tools, Frameworks and Utilities

Here is the list of the script files for the shared components providing behaviors, data access and other services:

| Feature				| Script Files						|Comments 		|
| :---					| :---								|:---			|
| [Angular JS Directives](http://demos.telerik.com/kendo-ui/integration/index)| jquery.js||
|						| kendo.core.js						|				|
| 						| kendo.angular.js					|				|
| [MVVM](http://demos.telerik.com/kendo-ui/mvvm/index)| jquery.js|			|
|						| kendo.core.js						|				|
| 						| kendo.data.js						|				|
| 						| kendo.binder.js					|				|
| [Core](https://github.com/telerik/kendo-ui-core)| jquery.js|				|
|						| kendo.core.js						|				|
| [Data Source](http://demos.telerik.com/kendo-ui/datasource/index)| jquery.js||
|						| kendo.core.js						|				|
|						| kendo.data.odata.js 				| OData feature	|
|						| kendo.data.xml.js 				| XML feature	|
|						| kendo.data.js						|				|
| [Drag and Drop](http://demos.telerik.com/kendo-ui/dragdrop/index)| jquery.js||
|						| kendo.core.js						|				|
|						| kendo.userevents.js				|				|
|						| kendo.draganddrop.js				|				|
| [Drawing API](http://demos.telerik.com/kendo-ui/drawing/index)| jquery.js||
|						| kendo.core.js						|				|
|						| kendo.color.js					|				|
|						| kendo.drawing.jsjquery.js			|				|
| [Effects](http://demos.telerik.com/kendo-ui/fx/expand)| jquery.js|		|
|						| kendo.core.js						|				|
|						| kendo.fx.js						|				|
| [PDF Export](http://demos.telerik.com/kendo-ui/pdf-export/index)| jquery.js||
|						| kendo.core.js						|				|
| 						| kendo.color.js					|				|
| 						| kendo.drawing.js					|				|
| 						| kendo.pdf.js						|				|
| [Router](http://demos.telerik.com/kendo-ui/spa/index)| jquery.js|			|
|						| kendo.core.js						|				|
|						| kendo.router.js					|				|
| [Sortable](http://demos.telerik.com/kendo-ui/sortable/index)| jquery.js|	|
|						| kendo.core.js						|				|
|						| kendo.userevents.js				|				|
| 						| kendo.draganddrop.js				|				|
| 						| kendo.sortable.js					|				|
| [View](http://demos.telerik.com/kendo-ui/m/index#mobile-view/index)| jquery.js||
|						| kendo.core.js						|				|
|						| kendo.data.js						|				|
| 						| kendo.binder.js					|				|
| 						| kendo.fx.js						|				|
| 						| kendo.view.js						|				|

##### Server-Side Wrappers

This is the list of the script files for the supplementary scripts for integration with server-side technologies:

| Server-Side Wrapper	| Script Files						|
| :---					| :---								|
| [ASP.NET MVC](http://docs.telerik.com/kendo-ui/aspnet-mvc/introduction)| jquery.js|
| 						| kendo.core.js						|
| 						| kendo.data.js						|
| 						| kendo.popup.js					|
| 						| kendo.list.js						|
| 						| kendo.combobox.js					|
| 						| kendo.dropdownlist.js				|
| 						| kendo.multiselect.js				|
| 						| kendo.validator.js				|
| 						| kendo.aspnetmvc.js				|
