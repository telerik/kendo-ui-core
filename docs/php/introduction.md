---
title: Overview
page_title: Overview | Telerik UI for PHP
description: "Download and install Telerik UI for PHP, and run a sample application."
previous_url: /tutorials/PHP/build-apps-with-kendo-ui-and-php, /tutorials/PHP/build-apps-with-kendo-ui-and-php-2
slug: overview_uiforphp
position: 1
---

# Telerik<sup>®</sup> UI for PHP by Progress

[Telerik UI for PHP](http://www.telerik.com/php-ui) is a set of PHP classes which help you configure Kendo UI widgets by using server-side code in PHP web sites.

## Getting Started

### Requirements

* Telerik UI for PHP requires a PHP 5.3.3+ version.
* The sample application uses [PDO](http://www.php.net/manual/en/intro.pdo.php) and [SQLite](http://www.php.net/manual/en/ref.pdo-sqlite.php). Both extensions should be enabled in the PHP configuration (php.ini).
* The [`phpinfo`](http://php.net/manual/en/function.phpinfo.php) function can be used to verify that PDO and the SQLite extensions are successfully installed.

### Download and Install

You can download Telerik UI for PHP from the [official download page](http://demos.telerik.com/php-ui/). The distribution `.zip` file contains the following directories:

* `/js`&mdash;These are the minified JavaScript files.
* `/styles`&mdash;The minified CSS files and background images used by the themes.
* `/src`&mdash;The JavaScript and CSS source files. Not available in the trial version.
* `/wrappers/php/lib/Kendo/`&mdash;The PHP files required to use Telerik UI for PHP.
* `/wrappers/php/`&mdash;The sample PHP web site.

## Sample Application Setup

### Prerequisites

You can find a sample PHP web site in the `/wrappers/php/` directory of the Telerik UI for PHP distribution. To run the web site, copy this directory to your web root. Then navigate to `index.php`.

### Configuration

To use Telerik UI for PHP in your PHP web site, follow the steps below:

**Step 1** Copy `/wrappers/php/lib/Kendo` to your web site root, e.g. to your `lib` directory.

**Step 2** Copy the Kendo UI JavaScript and CSS files from `/js` and `/styles` to your web site root. If you prefer to use [Kendo UI CDN Service]({% slug kendoui_cdn_services_installation %}), skip this step and the following ones, and check the [article on the JavaScript dependencies]({% slug javascript_prerequisites_kendoui_installation %}).

**Step 3** Include the Kendo UI JavaScript and CSS files in your PHP page.

###### Example

        <link href="styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
        <link href="styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
        <script src="js/jquery.min.js"></script>
        <script src="js/kendo.web.min.js"></script>

> **Important**  
>
> If you want to use Kendo UI widgets for the web, including the ones that render data visualization, at the same time, you should include `kendo.all.min.js` instead of `kendo.web.min.js` and `kendo.dataviz.min.js`. You can also create a custom JavaScript file by using the [Custom Download Builder](https://www.telerik.com/login/v2/telerik?ReturnUrl=https://www.telerik.com/download/custom-download).

**Step 4** Include the Kendo PHP [`Autoload`](http://php.net/manual/en/language.oop5.autoload.php) file.

###### Example

        <?php require_once 'lib/Kendo/Autoload.php'; ?>

**Step 5** Use any Kendo UI PHP wrapper.

###### Example

        <?php
        // Instantiate a new instance of the DatePicker class and specify its 'id'
        $datepicker = new \Kendo\UI\DatePicker('datepicker');

        // Configure the datepicker using the fluent API
        $datepicker->start('year')
                   ->format('MMMM yyyy');

        // Output the datepicker HTML and JavaScript by echo-ing the result of the render method
        echo $datepicker->render();
        ?>

The example below demonstrates the complete source code.

###### Example

    <!DOCTYPE html>
    <html>
        <head>
            <link href="styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
            <link href="styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
            <script src="js/jquery.min.js"></script>
            <script src="js/kendo.web.min.js"></script>
        </head>
        <body>
        <?php require_once 'lib/Kendo/Autoload.php'; ?>
        <?php
        // Instantiate a new instance of the DatePicker class and specify its 'id'
        $datepicker = new \Kendo\UI\DatePicker('datepicker');

        // Configure the datepicker using the fluent API
        $datepicker->start('year')
                   ->format('MMMM yyyy');

        // Output the datepicker HTML and JavaScript by echo-ing the result of the render method
        echo $datepicker->render();
        ?>
        </body>
    </html>

## Next Steps

Watch the video tutorials on getting started with Telerik UI for PHP in the [Kendo UI YouTube channel](http://www.youtube.com/kendouitv):

* [Get Started with the PHP Wrappers for Kendo UI: Part 1](http://www.youtube.com/watch?v=2Kpgp_nocEI)
* [Get Started with the PHP Wrappers for Kendo UI: Part 2](https://www.youtube.com/watch?v=RQCLqA6Pu_E)
* [Get Started with the PHP Wrappers for Kendo UI: Part 3](https://www.youtube.com/watch?v=zYh6cuU_leQ)

For more examples on how to use Kendo UI with PHP server-side wrappers, visit the [GitHub repository with the collected Kendo UI examples on using PHP](https://github.com/telerik/kendo-examples-php).

## See Also

Other articles on Telerik UI for PHP:

* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Tags Folder]({% slug overview_autocomplete_uiforphp %})
