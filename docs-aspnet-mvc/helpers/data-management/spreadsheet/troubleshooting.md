---
title: Troubleshooting
page_title: Troubleshooting | Telerik UI Spreadsheet HtmlHelper for ASP.NET MVC
description: "Learn about the solutions of common issues that may occur while working with Telerik UI Spreadsheet HtmlHelper for ASP.NET MVC."
previous_url: /helpers/data-management/spreadsheet/troubleshoot/troubleshooting
slug: troubleshoot_spreadsheethelper_aspnetmvc
position: 1
---

# Troubleshooting

This article provides solutions for common issues you may encounter while working with the Telerik UI Spreadsheet HtmlHelper for ASP.NET MVC.

## Processing fails for files with small amount of data

The conversion and processing can hang or fail even if the Spreadsheet file does not contain a lot of data. Even cells that appear empty are processed if they have a non-default styling.

**Solution** Reset all cells outside the used range to the default borders, formatting and colors.

## See Also

* [Basic Usage of the Spreadsheet HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/spreadsheet/index)
* [API Reference of the Spreadsheet HtmlHelper for ASP.NET MVC](/api/spreadsheet)
