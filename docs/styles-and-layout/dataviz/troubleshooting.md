---
title: Troubleshooting
page_title: Troubleshooting guide for Kendo UI DataViz
description: Find a detailed list of common issues and possible solutions for Kendo UI DataViz suite.
---

List of common problems and suggested solutions.

# Problem: The chart graphics do not render in Internet Explorer

![Chart in IE](/dataviz/chart-ie.png)

**_Note:_**

A security message suggesting you to enable *Intranet* settings might appear.

You do **not** need to follow the steps below if you choose to enable *Intranet* settings.

## Suggested actions

*   Set the following option to "Enable" in Internet Explorer: "Internet Options -> Security -> Internet (or Local intranet) -> Custom Level -> Binary and script behaviors"

![IEscript behaviors](/dataviz/chart-ie-script-behaviors.png)

# Problem: The chart does not render with JavaScript disabled

The Kendo Chart requires JavaScript to run.

## Suggested actions
*   Enable JavaScript.

# Problem: The chart does not render on some mobile devices/tablets

The browser must support SVG. The following mobile browsers are supported:

1.  iOS Safari 3.2 and up
2.  Opera Mobile 10.0 and up
3.  Android 3.0 and up
