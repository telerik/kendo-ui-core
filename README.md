# Kendo UI Core

## About Kendo UI Core

Kendo UI is everything you need to build sites and apps with HTML5 & JavaScript. Kendo UI Core is the free and open-source version of Kendo UI that provides access to the web's best UI widgets and key framework features, essential for developing great experiences for the web and mobile.

[![Build Status](https://travis-ci.org/telerik/kendo-ui-core.svg?branch=master)](https://travis-ci.org/telerik/kendo-ui-core)

## Features of Kendo UI Core

Kendo UI Core is a free and open-source subset of Kendo UI. The following table details the widgets and features available in Kendo UI Core, as well as the additional features available via a commercial Kendo UI license.

| Feature | Core | [Professional](http://www.telerik.com/kendo-ui) | UI for [MVC](http://www.telerik.com/aspnet-mvc)/[JSP](http://www.telerik.com/jsp-ui)/[PHP](http://www.telerik.com/php-ui) |
| ------- | :----: | :--------: | :------------------: |
| **Framework** |
| DataSource | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| MVVM | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| SPA | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Effects | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Drag & Drop | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Validator | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Widgets** |
| AutoComplete | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Calendar | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| ComboBox | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| DatePicker | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| DateTimePicker | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| DropDownList | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| ListView | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Menu | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| NumericTextBox | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| PanelBar | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Slider | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Splitter | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| TabStrip | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| TimePicker | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Tooltip | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Window | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Sortable | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Progress | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Button | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Color Picker | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| ContextMenu | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Toolbar | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| MultiSelect | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| MaskedTextBox | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Notification | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Editor | :x: | :white_check_mark: | :white_check_mark: |
| Grid | :x: | :white_check_mark: | :white_check_mark: |
| PivotGrid | :x: | :white_check_mark: | :white_check_mark: |
| Scheduler | :x: | :white_check_mark: | :white_check_mark: |
| Gantt | :x: | :white_check_mark: | :white_check_mark: |
| TreeView | :x: | :white_check_mark: | :white_check_mark: |
| TreeList | :x: | :white_check_mark: | :white_check_mark: |
| TreeMap | :x: | :white_check_mark: | :white_check_mark: |
| Upload | :x: | :white_check_mark: | :white_check_mark: |
| **Data Viz** |
| Charts | :x: | :white_check_mark: | :white_check_mark: |
| Gauges | :x: | :white_check_mark: | :white_check_mark: |
| QR Code | :x: | :white_check_mark: | :white_check_mark: |
| Bar Code | :x: | :white_check_mark: | :white_check_mark: |
| **Mobile** |
| Mobile Widgets | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Mobile Framework Features | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Official Support** | :x: | :white_check_mark: | :white_check_mark:

## Compatibility and Requirements

Kendo UI Core depends on the following libraries:

- [jQuery](http://www.jquery.com) v1.9.1+

Kendo UI Core has not been tested against any other versions of these libraries. You may find that versions other than these are compatible with Kendo UI Core. However, we make no claims to support those versions, and will not troubleshoot issues that arise when using those versions.


## Building Kendo UI Core

There are two ways to get the source code for Kendo UI Core. You can either download a pre-built zip from [Telerik.com](http://www.telerik.com/kendo-ui/open-source-core), or build the source yourself using Gulp. The latter approach includes an option for building a distribution of Kendo UI Core that includes only the widgets and framework features required by your app.

### Installing Dependencies

In order to build Kendo UI Core, you need to have Node.js/npm latest and git 1.7 or later.

For Windows you have to download and install [git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/download/).

Mac OS users should install [Homebrew](http://mxcl.github.com/homebrew/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.

Linux/BSD users should use their appropriate package managers to install git and Node.js, or build them from source.

### How to build Kendo UI Core

Clone a copy of the repository by running

```bash
git clone https://github.com/telerik/kendo-ui-core.git
```

Enter the repository directory

```bash
cd kendo-ui-core
```

Initialize the submodule repository

```bash
git submodule update --init
```

Run the build script:
```bash
npm run build
```
The minified version of the scripts and styles of Kendo UI Core will be put in the `dist/` subdirectory.

If you want to create custom build or help with Kendo UI Core development, it would be better to install the [gulp command line interface](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#1-install-gulp-globally) as a global package:

```sh
[sudo] npm install --global gulp
```
Make sure you have `gulp` installed by testing:

```sh
gulp --version
```

Now by running the `gulp` command in the Kendo UI Core directory, you can build the full version of Kendo UI Core. This works just like the `npm run build` command:
```sh
gulp build
```

There are several other tasks available:
```sh
gulp --help
```

### Building only what you need

The gulp `custom` task will create a custom minified file - `dist/kendo.custom.min.js`, which includes only the specified components. The following command will include only the autocomplete and dropdownlist widgets:

```sh
gulp custom -c autocomplete,dropdownlist
```

## Source Code and Downloads

If you want to skip building Kendo UI Core yourself, head on over to [Telerik.com](http://www.telerik.com/kendo-ui/open-source-core) to grab the full source.

## Using Kendo UI Core via the Kendo Static CDN

You can also easily include Kendo UI Core in your site or application by using the Kendo CDN:

```html
<link href="http://kendo.cdn.telerik.com/2014.2.716/styles/kendo.common.min.css" rel="stylesheet" />
<link href="http://kendo.cdn.telerik.com/2014.2.716/styles/kendo.default.min.css" rel="stylesheet" />
<script src="http://kendo.cdn.telerik.com/2014.2.716/js/jquery.min.js"></script>
<script src="http://kendo.cdn.telerik.com/2014.2.716/js/kendo.ui.core.min.js"></script>
```
The main advantage of the CDN approach is that your users may be able to leverage a primed cache version of Kendo UI Core if they've visited other sites using the framework.

## Documentation

For complete Kendo UI Documentation, including Kendo UI Core, please visit http://docs.telerik.com/kendo-ui.

## How to Contribute

Kendo UI Core is free and open-source. We encourage and support an active, healthy community that accepts contributions from the public. We'd like you to be a part of that community.

Before contributing to Kendo UI Core, please:

1. Read and sign the [Kendo UI Core Contribution License Agreement](http://www.telerik.com/kendo-ui/cla), to confirm you've read and acknowledged the legal aspects of your contributions, and
2. Read our [contribution guide](CONTRIBUTING.md), which houses all of the necessary info to:
	- submit bugs,
	- request new features, and
	- walk you through the entire process of preparing your code for a Pull Request.

## Getting Help

**TL;DR** - Use the [issues list](https://github.com/telerik/kendo-ui-core/issues) of this repo for bugs, [Stack Overflow](http://stackoverflow.com/questions/tagged/kendo-ui) or the [Kendo UI Premium Forums](http://www.telerik.com/forums/kendo-ui-framework) for help and [User Voice](http://kendoui-feedback.telerik.com/forums/127393-kendo-ui-feedback) for feature requests. Misfiled items will be closed.

As a fully-open source project, Kendo UI Core is a primarily community-supported project, As such, you are encouraged to use forums like Stack Overflow to post questions, and the issues list of this repo to report bugs.

The Kendo UI team does *not* provide formal support for Kendo UI Core, except to those customers who have purchased a [commercial license for Kendo UI](http://www.telerik.com/kendo-ui) (Professional, UI for MVC, etc.) or a support-only package from Telerik.com. Please do not create support requests for this project in the issues list for this repo, as these will be immediately closed. You'll be directed to post your question on a community forum.

## Release Notes

For change logs and release notes, see the [online release notes at Telerik.com](http://www.telerik.com/support/whats-new/kendo-ui/release-history).

## License Information

This project has been released under the [Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html), the text of which is included below. This license applies ONLY to the source of this repository and does not extend to any other Kendo UI distribution or variant, or any other 3rd party libraries used in a repository. For licensing information about Kendo UI, see the [License Agreements page](https://www.kendoui.com/purchase/license-agreement.aspx) at [KendoUI.com](http://www.kendoui.com).

> Copyright © 2014-2015 Telerik

> Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

> [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

>  Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
