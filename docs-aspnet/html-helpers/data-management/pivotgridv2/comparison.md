---
title: Comparison
page_title: Comparison
description: "Learn about the differences between the old and the new version of the Telerik UI PivotGrid HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_pivotgridv2_aspnetcore_comparison
position: 4
---

# Comparison

As of the November 2021 release, {{ site.framework }} introduces the new PivotGridV2 component, which, at some point in the future, will replace the old {{ site.framework }} PivotGrid. This article explains the major differences between the two components.

- [Why Do Two PivotGrid Widgets Exist?](#why-do-two-pivotgrid-helpers-exist)
- [What Can I Expect from the New PivotGridV2?](#what-can-i-expect-from-the-new-pivotgridv2)
    - [New Engine](#new-engine)
    - [Performance](#performance)
    - [Design](#design)
    - [Customization](#customization)
- [Summary](#summary)

## Why Do Two PivotGrid Helpers Exist?

There are many developers who use and depend on the PivotGrid. Making any drastic changes to the source code of the old widget would undoubtedly interfere with their work. That is why the decision to introduce a second widget, was taken.

The old and new versions of the PivotGrid can coexist. The old PivotGrid will not disappear with the upcoming release. This allows developers to smoothly transition to the new version without rushing their projects.

We have decided to keep the PivotGrid and introduce PivotGridV2 as a separate component. This approach allows us to avoid making breaking changes to the PivotGrid, which could affect many developers that use and depend on the PivotGrid. The old PivotGrid will not be removed in the upcoming release, which gives the developers the opportunity to smoothly transition to the new version.

## What Can I Expect from the New PivotGridV2?

The new PivotGridV2 has a new design, improved performance and is easier to customize.

### New Engine

The engine for the new PivotGridV2 is a cross-team development effort. It will be used by multiple different Kendo suites: JQuery, Angular, React, and so on. This approach will lead to the implementation of many new PivotGridV2 features, as all of them will be shared between the different products.

### Performance

Performance is another key aspect that has been improved in the new PivotGridV2. Merging newly requested data on top of data that is already present, is considerably faster.

### Design

The new PivotGridV2 has a brand new design and some additional basic UX functionalities such as hiding the [`configurator`]({% slug htmlhelpers_pivotgridv2_aspnetcore_configurator %}) when it is not in use. This approach will provide the end user with much better experience when working with the component.

### Customization

The new PivotGridV2 is easier to customize, when it comes down to functionalities such as data aggregation.

## Summary

We encourage the developers that start new projects, to use the PivotGridV2 instead of the PivotGrid.

The following list summarizes the key benefits of the new PivotGridV2:

- Brand new engine, which allows for quicker implementation of features and quicker bugfixes.
- Improved performance of the component.
- Brand new design.
- Easier to customize compared to the old PivotGrid.
- Improved API, as new features are implemented.

## See Also

* [Basic Usage of the PivotGridV2 (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgridv2/index)
* [PivotGridV2 JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgridv2)
