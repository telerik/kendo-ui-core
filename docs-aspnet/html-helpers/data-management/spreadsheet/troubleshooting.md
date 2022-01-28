---
title: Troubleshooting
page_title: Troubleshooting
description: "Learn about the solutions of common issues that may occur while working with Telerik UI Spreadsheet HtmlHelper for {{ site.framework }}."
previous_url: /helpers/data-management/spreadsheet/troubleshoot/troubleshooting, /helpers/data-management/spreadsheet/troubleshooting
slug: troubleshoot_spreadsheethelper_aspnetmvc
position: 11
---

# Troubleshooting

This article provides solutions for common issues you may encounter while working with the Telerik UI Spreadsheet HtmlHelper for {{ site.framework }}.

## Processing fails for files with small amount of data

The conversion and processing can hang or fail even if the Spreadsheet file does not contain a lot of data. Even cells that appear empty are processed if they have a non-default styling.

**Solution** Reset all cells outside the used range to the default borders, formatting and colors.

## See Also

* [Basic Usage of the Spreadsheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/spreadsheet/index)
* [API Reference of the Spreadsheet HtmlHelper for {{ site.framework }}](/api/spreadsheet)
