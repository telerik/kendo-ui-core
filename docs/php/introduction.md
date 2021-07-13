---
title: Overview
page_title: Overview | Progress Telerik UI for PHP
description: "Download and install Progress Telerik UI for PHP, and run a sample application."
previous_url: /tutorials/PHP/build-apps-with-kendo-ui-and-php, /tutorials/PHP/build-apps-with-kendo-ui-and-php-2, /php/widgets/map/overview, /using-kendo-with/php/widgets/map/overview, /php/widgets/responsivepanel/overview, /using-kendo-with/php/widgets/responsivepanel/overview, /php/widgets/spreadsheet/overview, /using-kendo-with/php/widgets/spreadsheet/overview, /php/widgets/treemap/overview
slug: overview_uiforphp
position: 1
---

# Progress<sup>®</sup> Telerik<sup>®</sup> UI for PHP

[Progress Telerik UI for PHP](https://www.telerik.com/php-ui) is a set of PHP classes which help you configure Kendo UI widgets by using server-side code in PHP websites.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

## Getting Started

### Requirements

* [Download the controls](https://www.telerik.com/download-trial-file/v2/ui-for-php)
* Progress Telerik UI for PHP requires a PHP 5.3.3+ version.
* The sample application uses [PDO](http://www.php.net/manual/en/intro.pdo.php) and [SQLite](http://www.php.net/manual/en/ref.pdo-sqlite.php). Both extensions should be enabled in the PHP configuration (php.ini).
* The [`phpinfo`](http://php.net/manual/en/function.phpinfo.php) function can be used to verify that PDO and the SQLite extensions are successfully installed.

### Download and Install

You can download Progress Telerik UI for PHP from the [official download page](https://www.telerik.com/account/product-download?product=KENDOUIPHP). The distribution `.zip` file contains the following directories:

* `/js`&mdash;These are the minified JavaScript files.
* `/styles`&mdash;The minified CSS files and background images used by the themes.
* `/src`&mdash;The JavaScript and CSS source files. Not available in the trial version.
* `/wrappers/php/lib/Kendo/`&mdash;The PHP files required to use Progress Telerik UI for PHP.
* `/wrappers/php/`&mdash;The sample PHP website.

## Sample Application Setup

### Prerequisites

You can find a sample PHP website in the `/wrappers/php/` directory of the Progress Telerik UI for PHP distribution. To run the website, copy this directory to your web root. Then navigate to `index.php`.

### Configuration

To use Progress Telerik UI for PHP in your PHP website, follow the steps below:

**Step 1** Copy `/wrappers/php/lib/Kendo` to your website root, e.g. to your `lib` directory.

**Step 2** Copy the Kendo UI JavaScript and CSS files from `/js` and `/styles` to your website root. If you prefer to use [Kendo UI CDN Service]({% slug kendoui_cdn_services_installation %}), skip this step and the following ones, and check the [article on the jQuery dependency]({% slug jquerysupport_kendoui %}) as well as the [article on the export libraries dependencies]({% slug export_support_kendoui %}).

**Step 3** Include the Kendo UI JavaScript and CSS files in your PHP page.



        <link href="styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
        <link href="styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
        <script src="js/jquery.min.js"></script>
        <script src="js/kendo.web.min.js"></script>

> **Important**
>
> If you want to use Kendo UI widgets for the web, including the ones that render data visualization, at the same time, you should include `kendo.all.min.js` instead of `kendo.web.min.js` and `kendo.dataviz.min.js`. You can also create a custom JavaScript file by using the [Custom Download Builder](https://www.telerik.com/login/v2/telerik?ReturnUrl=https://www.telerik.com/download/custom-download).

**Step 4** Include the Kendo PHP [`Autoload`](http://php.net/manual/en/language.oop5.autoload.php) file.



        <?php require_once 'lib/Kendo/Autoload.php'; ?>

**Step 5** Use any Kendo UI PHP wrapper.



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

## Trial Version and Commercial License

This Progress Telerik UI for PHP library is a commercial UI library. You are welcome to explore its full functionality and get technical support from the team when you register for a free 30-day trial. To use it commercially, you need to [purchase a license](https://www.telerik.com/purchase/kendo-ui). Feel free to review the Progress Telerik UI for PHP [License Agreement](https://www.telerik.com/purchase/license-agreement/kendo-ui) to get acquainted with the full terms of use.

## Support Options

For any issues you might encounter while working with the Progress Telerik UI for PHP, use any of the available support channels:

* Kendo UI Professional license holders and active trialists can take advantage of our outstanding customer support delivered by the developers building the library. To submit a support ticket, use the [Progress Telerik UI for PHP dedicated support](https://www.telerik.com/account/support-tickets/) system.
* [Progress Telerik UI for PHP forums](https://www.telerik.com/forums/php) are part of the free support you can get from the community and UI for PHP team on all kinds of general issues.
* [Progress Telerik UI for PHP feedback portal](https://feedback.telerik.com/php-ui) and [Progress Telerik UI for PHP roadmap](https://www.telerik.com/support/whats-new/php-ui/roadmap) provide information on the features in discussion and also the planned ones for release.
* Progress Telerik UI for PHP uses GitHub Issues as its bug tracker and you can submit any related reports there. 
* You may still need a tailor-made solution for your project. In such cases, go straight to [Progress Services](https://www.progress.com/services).

## Learning Resources

* [Progress Telerik UI for PHP forum](https://www.telerik.com/forums/php)
* [Progress Telerik UI for PHP feedback portal](https://feedback.telerik.com/php-ui)

## Next Steps

Watch the video tutorials on getting started with Progress Telerik UI for PHP in the [Kendo UI YouTube channel](https://www.youtube.com/kendouitv):

* [Get Started with the PHP Wrappers for Kendo UI: Part 1](https://www.youtube.com/watch?v=2Kpgp_nocEI)
* [Get Started with the PHP Wrappers for Kendo UI: Part 2](https://www.youtube.com/watch?v=RQCLqA6Pu_E)
* [Get Started with the PHP Wrappers for Kendo UI: Part 3](https://www.youtube.com/watch?v=zYh6cuU_leQ)

For more examples on how to use Kendo UI with PHP server-side wrappers, visit the [GitHub repository with the collected Kendo UI examples on using PHP](https://github.com/telerik/kendo-examples-php).

## See Also

* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Tags Folder]({% slug overview_autocomplete_uiforphp %})
