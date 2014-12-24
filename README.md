# Kendo UI Core

## About Kendo UI Core

Kendo UI is everything you need to build sites and apps with HTML5 & JavaScript. Kendo UI Core is the free and open-source version of Kendo UI that provides access to the web's best UI widgets and key framework features, essential for developing great experiences for the web and mobile.

[![Build Status](https://travis-ci.org/telerik/kendo-ui-core.svg?branch=master)](https://travis-ci.org/telerik/kendo-ui-core)

## Features of Kendo UI Core

Kendo UI Core is a free and open-source subset of Kendo UI. The following table details the widgets and features available in Kendo UI Core, as well as the additional features available via a commercial Kendo UI license.

| Feature | Core | [Professional](http://www.telerik.com/kendo-ui) | UI for [MVC](http://www.telerik.com/aspnet-mvc)/[JSP](http://www.telerik.com/jsp-ui)/[PHP](http://www.telerik.com/php-ui) |
| ------- | :----: | :--------: | :------------------: |
| **Framework** |
| DataSource | Yes | Yes | Yes |
| MVVM | Yes | Yes | Yes |
| SPA | Yes | Yes | Yes |
| Effects | Yes | Yes | Yes |
| Drag & Drop | Yes | Yes | Yes |
| Validator | Yes | Yes | Yes |
| **Widgets** |
| AutoComplete | Yes | Yes | Yes |
| Calendar | Yes | Yes | Yes |
| ComboBox | Yes | Yes | Yes |
| DatePicker | Yes | Yes | Yes |
| DateTimePicker | Yes | Yes | Yes |
| DropDownList | Yes | Yes | Yes |
| ListView | Yes | Yes | Yes |
| Menu | Yes | Yes | Yes |
| NumericTextBox | Yes | Yes | Yes |
| PanelBar | Yes | Yes | Yes |
| Slider | Yes | Yes | Yes |
| Splitter | Yes | Yes | Yes |
| TabStrip | Yes | Yes | Yes |
| TimePicker | Yes | Yes | Yes |
| Tooltip | Yes | Yes | Yes |
| Window | Yes | Yes | Yes |
| Sortable | Yes | Yes | Yes |
| Progress | Yes | Yes | Yes |
| Button | Yes | Yes | Yes |
| Color Picker | Yes | Yes | Yes |
| ContextMenu | Yes | Yes | Yes |
| Toolbar | Yes | Yes | Yes |
| MultiSelect | Yes | Yes | Yes |
| MaskedTextBox | Yes | Yes | Yes |
| Notification | Yes | Yes | Yes |
| Editor | No | Yes | Yes |
| Grid | No | Yes | Yes |
| PivotGrid | No | Yes | Yes |
| Scheduler | No | Yes | Yes |
| Gantt | No | Yes | Yes |
| TreeView | No | Yes | Yes |
| TreeList | No | Yes | Yes |
| TreeMap | No | Yes | Yes |
| Upload | No | Yes | Yes |
| **Data Viz** |
| Charts | No | Yes | Yes |
| Gauges | No | Yes | Yes |
| QR Code | No | Yes | Yes |
| Bar Code | No | Yes | Yes |
| **Mobile** |
| Mobile Widgets | Yes | Yes | Yes |
| Mobile Framework Features | Yes | Yes | Yes |
| **Official Support** | No | Yes | Yes

## Compatibility and Requirements

Kendo UI Core depends on the following libraries:

- [jQuery](http://www.jquery.com) v1.9.1+

Kendo UI Core has not been tested against any other versions of these libraries. You may find that versions other than these are compatible with Kendo UI Core. However, we make no claims to support those versions, and will not troubleshoot issues that arise when using those versions.


## Building Kendo UI Core

There are two ways to get the source code for Kendo UI Core. You can either download a pre-built zip from [Telerik.com](http://www.telerik.com/kendo-ui/open-source-core), or build the source yourself using Grunt. The latter approach includes an option for building a distribution of Kendo UI Core that includes only the widgets and framework features required by your app.

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

If you want to create custom build or help with Kendo UI Core development, it would be better to install the [grunt command line interface](https://github.com/gruntjs/grunt-cli) as a global package:

```
[sudo] npm install -g grunt-cli
```
Make sure you have `grunt` installed by testing:

```
grunt --version
```

Now by running the `grunt` command in the Kendo UI Core directory, you can build the full version of Kendo UI Core. This works just like the `npm run build` command:
```
grunt build
```

There are several other tasks available:
```
grunt --help
```

### Building only what you need

The grunt `custom` task will create a custom minified file - `dist/kendo.custom.min.js`, which includes only the specified components. The following command will include only the autocomplete and dropdownlist widgets:

```
grunt custom:autocomplete,dropdownlist
```

## Source Code and Downloads

If you want to skip building Kendo UI Core yourself, head on over to [Telerik.com](http://www.telerik.com/kendo-ui/open-source-core) to grab the full source.

## Using Kendo UI Core via the Kendo Static CDN

You can also easily include Kendo UI Core in your site or application by using the Kendo CDN:

```
<link href="http://cdn.kendostatic.com/2014.2.716/styles/kendo.common.min.css" rel="stylesheet" />
<link href="http://cdn.kendostatic.com/2014.2.716/styles/kendo.default.min.css" rel="stylesheet" />
<script src="http://cdn.kendostatic.com/2014.2.716/js/jquery.min.js"></script>
<script src="http://cdn.kendostatic.com/2014.2.716/js/kendo.ui.core.min.js"></script>
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

**Tl;dr** - Use the [issues list](https://github.com/telerik/kendo-ui-core/issues) of this repo for bugs, [Stack Overflow](http://stackoverflow.com/questions/tagged/kendo-ui) or the [Kendo UI Premium Forums](http://www.telerik.com/forums/kendo-ui-framework) for help and [User Voice](http://kendoui-feedback.telerik.com/forums/127393-kendo-ui-feedback) for feature requests. Misfiled items will be closed.

As a fully-open source project, Kendo UI Core is a primarily community-supported project, As such, you are encouraged to use forums like Stack Overflow to post questions, and the issues list of this repo to report bugs.

The Kendo UI team does *not* provide formal support for Kendo UI Core, except to those customers who have purchased a [commercial license for Kendo UI](http://www.telerik.com/kendo-ui) (Professional, UI for MVC, etc.) or a support-only package from Telerik.com. Please do not create support requests for this project in the issues list for this repo, as these will be immediately closed. You'll be directed to post your question on a community forum.

## Release Notes

For change logs and release notes, see the [online release notes at Telerik.com](http://www.telerik.com/support/whats-new/kendo-ui/release-history).

## License Information

This project has been released under the [Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html), the text of which is included below. This license applies ONLY to the source of this repository and does not extend to any other Kendo UI distribution or variant, or any other 3rd party libraries used in a repository. For licensing information about Kendo UI, see the [License Agreements page](https://www.kendoui.com/purchase/license-agreement.aspx) at [KendoUI.com](http://www.kendoui.com).

> Copyright © 2014 Telerik

> Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

> [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

>  Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
