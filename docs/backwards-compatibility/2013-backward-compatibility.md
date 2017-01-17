---
title: 2013 Releases
page_title: 2013 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2013."
previous_url: /backwards-compatibility/2013/2013-backward-compatibility
slug: breakingchanges2013_kendoui
position: 5
---

# 2013 Releases

## Kendo UI 2013 Q3

### Changes from 2013 Q2 SP1 (2013.2.918)

#### Breaking Changes

**Core**

The `kendo.support.pointers` now only shows support for Internet Explorer (IE) 11 pointer events&mdash;`kendo.support.msPointers` was added to indicate that IE10 pointer events are supported too.

**Splitter**

* The internal `trigger("resize")` method, which has been provided as a workaround in certain scenarios, no longer works. It is now replaced with the [`resize()`]({% slug responsivewebdesign_integration_kendoui %}) public API method, which is now available in all Kendo UI widgets. For more information, refer to [`kendo.resize()`](/api/javascript/kendo#methods-resize).

* The `layoutChange` event is now obsolete and will be removed in the future. Use the `resize` event instead.

**Kendo UI Scheduler for ASP.NET MVC**

The `"ISchedulerEvent"` interface now includes two additional fields&mdash;`StartTimezone` and `EndTimezone` which store the timezone information of the event.

**Scheduler**

Changes in the `recurrenceEditor` messages:  

 -  `daily.days` becomes `daily.interval`.  
 -  `weekly.weeks` becomes `weekly.interval`.  
 -  `monthly.months` becomes `monthly.interval`.  
 -  `yearly.years` becomes `yearly.interval`.  
 -  `end.endLabel` becomes `end.label`.  
 -  `end.endNever` becomes `end.never`.  
 -  `end.endCountAfter` becomes `end.after`.  
 -  `end.endCountOccurrence` becomes `end.occurrence`.  
 -  `end.endUntilOn` becomes `end.on`.  

**MVC DataSource**

The MVC DataSource transport now serializes numbers based on the used Kendo UI culture. As a result, if you are using an invariant culture number model binder, the numbers will not be parsed correctly. You should either use the same culture to parse the numbers in the model binder or remove the model binder in order for numbers with a decimal separator to be parsed correctly.

**ModalView**

The ModalView now supports auto-sizing when its content changes and when no height is set. Unfortunately, we were able to implement this at the expense of the possibility to set the ModalView size in a CSS stylesheet. As a workaround, use the ModalView `width` and `height` options or set them through inline CSS instead.

## Kendo UI 2013 Q2

### Changes from 2013 Q1 SP1 (2013.1.514)

#### Breaking Changes

**Themes**

The icons in the sprite image have been rearranged to include more icons in two different sizes.

**Editor**

* The default tool set now includes the newly introduced table editing. Toolbar tools are now grouped, so their dimensions have been increased by 2px. On the other hand, the "Font name" and "Font size" tools no longer appear by default. The idea is to encourage developers (and users respectively) to use the formatting dropdown, which provides a predefined (and customizable) set of options. This will ultimately lead to better structured, formatted and consistent rich text documents, compared to the case when the user has the ability to apply arbitrary font styles.

    To revert to the old tool set, use the following configuration:

    ```
      $("#editor").kendoEditor({
          tools: [
              "bold", "italic", "underline", "strikethrough",
              "fontName", "fontSize", "foreColor", "backColor",
              "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
              "insertUnorderedList", "insertOrderedList",
              "indent", "outdent",
              "formatBlock",
              "createLink", "unlink", "insertImage"
          ]
      });
    ```

* Initializing the editor from a `div` element triggers the [inline editing mode](http://demos.telerik.com/kendo-ui/web/editor/inline-editing.html). To revert to the old behavior, initialize it from a `<textarea>` element.

**Mobile ListView**

The enabling of the endless scrolling or the press-to-load-more configuration options now puts the ListView in a virtual mode, which has different behavior than the one demonstrated in the Kendo UI Q1 2013 and previous releases.

1. The `endlessScrollParameters` and `loadMoreParameters` configuration options are not available anymore. Endless scrolling uses on the dataSource paging configuration to issue subsequent requests.

1. The `scrollTreshold` option is not available anymore. The ListView automatically pre-fetches the next page when 2/3 of the current page is reached.

1. The `stopEndlessScrolling` and `stopLoadMore` methods are no longer available. The ListView automatically hides the button and the loading indicator when the loaded items reach the number returned by the `schema.total` method of the bound DataSource.

1. The `lastPageReached` event is no longer triggered because of the same reasons.

#### Deprecated Functionality

**Editor**

The **formatBlock** and **style** tools have been deprecated in favor of the unified **formatting** tool. The new tool supports the functionality of both old tools as well as new styling options. If you need to keep the styles and block formats in different drop-downs, you can use two formatting tools in parallel. The old tool declarations work, yielding a `console.warn` about the deprecation, and will be removed with a future official release.

```tab-Old
	$("#editor").kendoEditor({
		tools: [
			{ name: "style", items: [
				// applies class "foo"
 			{ text: "foo", value: "foo" }
		] },

			{ name: "formatBlock", items: [
				// changes wrapping block to paragraph
			{ text: "paragraph", value: "p" }
		] }
			]
		});
```
```tab-New
	$("#editor").kendoEditor({
		tools: [
			{ name: "formatting", items: [
				// applies class "foo"
				{ text: "foo", value: ".foo" },

				// changes wrapping block to paragraph
				{ text: "paragraph", value: "p" },

				// changes wrapping block to paragraph with class "fine-print"
				{ text: "fine print", value: "p.fine-print" }
				] }
			]
		});
```

## Kendo UI 2013 Q1

### Changes from 2012 Q3 SP1 (2012.3.1315)

#### Breaking Changes

**jQuery**

jQuery is updated to 1.9.1.

**Mobile**

Renamed the `scrollTreshold` option of the ListView to `scrollThreshold`.

**AutoComplete/ComboBox/DropDownList**

Renamed the `enable` option to `enabled`.

**TreeView/HierarchicalDataSource/Node**

The `children` field is initialized depending on the `hasChildren` field, as previously documented. Tto initialize it, use the `append` and `load` methods, and if accessing the children field directly, verify if it is present.

**ASP.NET MVC**

Some ASP.NET MVC applications may be broken if using other libraries incompatible with jQuery 1.9.1. For more details, refer to the [troubleshooting guide](/aspnet-mvc/troubleshoot/troubleshooting#javascript-error-that-live-method-is-unavailable,-undefined-or-unsupported)

## See Also

Other articles on Kendo UI breaking changes and backwards compatibility:

* [2017 Breaking Changes]({% slug breakingchanges2017_kendoui %})
* [2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})
