---
title: AngularJS Support
page_title: AngularJS Support | AngularJS Directives
description: "Learn which are the AngularJS versions which the Kendo UI for jQuery supports."
slug: supportedversions_kendoui
position: 6
---

# AngularJS Support

As of the Kendo UI 2014 Q2 release, the Kendo UI widgets support [AngularJS](https://angularjs.org/) integration.

To activate the AngularJS directives, install the AngularJS library. Just like jQuery, the minified format of the AngularJS library is located is in the `js` directory of the downloaded Kendo UI bundle.

> * Unlike their dependency on jQuery, the Kendo UI distributions can function correctly without AngularJS.
> * To use AngularJS versions 1.5.x together with Kendo UI version R1 2017 or earlier is only recommended if you use the Kendo UI `k-ng-model` directive because [the `ng-model` directive does not reflect the model value]({% slug common_issues_support_angularjs %}#widgets-with-ng-model-directives-reflect-no-model-value).

The following table provides a list of the AngularJS versions that are compatible with the major Kendo UI releases and their corresponding service packs.

| Major Releases												           | AngularJS Version     | Comments  |
| :---															               | :---			       	     | :---	     |
| [Kendo UI 2019.1.115 (R1 2019)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/progress-kendo-ui-2019-1-115-changelog-) |1.4\*, 1.5\*, 1.6\*, 1.7\* |- |
| [Kendo UI 2018.3.911 (R3 2018)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2018) |1.4\*, 1.5\*, 1.6\*, 1.7\* |- |
| [Kendo UI 2018.2.516 (R2 2018)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r2-2018) |1.4\*, 1.5\*, 1.6\* |- |
| [Kendo UI 2018.1.117 (R1 2018)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r1-2018) |1.4\*, 1.5\*, 1.6\* |- |
| [Kendo UI 2017.3.913 (R3 2017)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2017) |1.4\*, 1.5\*, 1.6\* |- |
| [Kendo UI 2017.2.504 (R2 2017)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r2-2017) |1.4\*, 1.5\*, 1.6\* |- |
| [Kendo UI 2017.1.118 (R1 2017)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r1-2017) |1.4\*, 1.5\*, 1.6\* |- |
| [Kendo UI 2016.3.914 (R3 2016)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2016) |1.4\*, 1.5\*|Kendo UI provides [limited `ngModel` support]({% slug common_issues_support_angularjs %}#widgets-with-ng-model-directives-reflect-no-model-value) for AngularJS 1.5\*. |
| [Kendo UI 2016.2.504 (R2 2016)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q2-2016) |1.4\*, 1.5\*|Kendo UI provides [limited `ngModel` support]({% slug common_issues_support_angularjs %}#widgets-with-ng-model-directives-reflect-no-model-value) for AngularJS 1.5\*. |
| [Kendo UI 2016.1.112 (Q1 2016)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q1-2016) |1.4\*, 1.5\*|Kendo UI provides [limited `ngModel` support]({% slug common_issues_support_angularjs %}#widgets-with-ng-model-directives-reflect-no-model-value) for AngularJS 1.5\*. |
| [Kendo UI 2015.3.930 (Q3 2015)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q3-2015) |1.4\*, 1.5\*|Kendo UI provides [limited `ngModel` support]({% slug common_issues_support_angularjs %}#widgets-with-ng-model-directives-reflect-no-model-value) for AngularJS 1.5\*. |
| [Kendo UI 2015.2.624 (Q2 2015)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q2-2015) |1.3.16|- |
| [Kendo UI 2015.1.318 (Q1 2015)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q1-2015) |1.3.0 |- |
| [Kendo UI 2014.3.1119 (Q3 2014)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q3-2014)|1.3.0 |- |
| [Kendo UI 2014.2.716 (Q2 2014)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/q2-2014-kendouicomplete-2014-2-716)   |1.2.16|Upgraded to 1.2.21 in subsequent internal builds. |


## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
