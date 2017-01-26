---
title: 2017 Releases
page_title: 2017 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2017."
slug: breakingchanges2017_kendoui
position: 1
---

# 2017 Releases

## Kendo UI 2017 R1 SP1

### Changes from 2017 R1

#### Breaking Changes

**DropDownList**

* The widget will not select the focused item on click outside (on blur).

## Kendo UI 2017 R1

### Changes from 2016 R3 SP2

#### Breaking Changes

**Icons**

**All icons are now font icons.** Raster images and images sprites are no longer used. The implications are as follows:

* To be unified around the semantic meaning, **icon classes are changed**. If your code depends on them, for example, for DOM traversal, you might need to update it according to **Table 1** below. For the full list of available icons and classes in the latest release, refer to the article on [web font icons]({% slug webfonticons_kendoui_desktopwidgets %}).

* The `font-size: 0;` rule is **no longer applied** to elements using Kendo UI icons. In this way, if they have **text**, it will now show up and obscure the icon. You should move it to a **title** attribute.

	###### Example

	```tab-Old
			<span class="k-icon k-i-close">Hide</span>
	```
	```tab-New
			<span class="k-icon k-i-close" title="Hide"></span>
	```

	###### Example

	```tab-Old
			<a href=""><span class="k-icon k-i-close">Hide</span></a>
	```
	```tab-New
			<a href="" title="Hide"><span class="k-icon k-i-close"></span>
	```

**Table 1. Changed Icon CSS Classes**

<!--
stylesheet in _assets/stylesheets/icon-font.css
fonts in fonts/
 -->

<table class="obsolete-classes">
        <thead>
            <tr>
                <th>Icon</th><th>Old CSS Class</th><th>New CSS Class</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-down"></span></td><td class="old-class">.k-i-arrow-s</td><td class="new-class">.k-i-arrow-60-down</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-right"></span></td><td class="old-class">.k-i-arrow-e</td><td class="new-class">.k-i-arrow-60-right</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-up"></span></td><td class="old-class">.k-i-arrow-n</td><td class="new-class">.k-i-arrow-60-up</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-left"></span></td><td class="old-class">.k-i-arrow-w</td><td class="new-class">.k-i-arrow-60-left</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-seek-up"></span></td><td class="old-class">.k-i-seek-n</td><td class="new-class">.k-i-arrow-seek-up</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-end-right"></span></td><td class="old-class">.k-i-seek-e</td><td class="new-class">.k-i-arrow-end-right</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-seek-down"></span></td><td class="old-class">.k-i-seek-s</td><td class="new-class">.k-i-arrow-seek-down</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-end-left"></span></td><td class="old-class">.k-i-seek-w</td><td class="new-class">.k-i-arrow-end-left</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-up"></span></td><td class="old-class">.k-i-sarrow-n</td><td class="new-class">.k-i-arrow-60-up</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-right"></span></td><td class="old-class">.k-i-sarrow-e</td><td class="new-class">.k-i-arrow-60-right</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-down"></span></td><td class="old-class">.k-i-sarrow-s</td><td class="new-class">.k-i-arrow-60-down</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-left"></span></td><td class="old-class">.k-i-sarrow-w</td><td class="new-class">.k-i-arrow-60-left</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-down"></span></td><td class="old-class">.k-i-collapse</td><td class="new-class">.k-i-arrow-60-down</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-right"></span></td><td class="old-class">.k-i-expand</td><td class="new-class">.k-i-arrow-60-right</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-up"></span></td><td class="old-class">.k-i-expand-n</td><td class="new-class">.k-i-arrow-60-up</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-right"></span></td><td class="old-class">.k-i-expand-e</td><td class="new-class">.k-i-arrow-60-right</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-down"></span></td><td class="old-class">.k-i-expand-s</td><td class="new-class">.k-i-arrow-60-down</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-60-left"></span></td><td class="old-class">.k-i-expand-w</td><td class="new-class">.k-i-arrow-60-left</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-45-up-left"></span></td><td class="old-class">.k-i-resize-nw</td><td class="new-class">.k-i-arrow-45-up-left</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-chevron-up"></span></td><td class="old-class">.k-i-arrowhead-n</td><td class="new-class">.k-i-arrow-chevron-up</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-chevron-right"></span></td><td class="old-class">.k-i-arrowhead-e</td><td class="new-class">.k-i-arrow-chevron-right</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-chevron-down"></span></td><td class="old-class">.k-i-arrowhead-s</td><td class="new-class">.k-i-arrow-chevron-down</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrow-chevron-left"></span></td><td class="old-class">.k-i-arrowhead-w</td><td class="new-class">.k-i-arrow-chevron-left</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-cancel-outline"></span></td><td class="old-class">.k-i-deny</td><td class="new-class">.k-i-cancel-outline</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-plus"></span></td><td class="old-class">.k-plus</td><td class="new-class">.k-i-plus</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-plus-sm"></span></td><td class="old-class">.k-i-splus</td><td class="new-class">.k-i-plus-sm</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-minus"></span></td><td class="old-class">.k-minus</td><td class="new-class">.k-i-minus</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-minus-sm"></span></td><td class="old-class">.k-i-sminus</td><td class="new-class">.k-i-minus-sm</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-non-recurrence"></span></td><td class="old-class">.k-i-refresh-clear</td><td class="new-class">.k-i-non-recurrence</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-window-restore"></span></td><td class="old-class">.k-i-restore</td><td class="new-class">.k-i-window-restore</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-window-maximize"></span></td><td class="old-class">.k-i-maximize</td><td class="new-class">.k-i-window-maximize</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-window-minimize"></span></td><td class="old-class">.k-i-minimize</td><td class="new-class">.k-i-window-minimize</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-image-insert"></span></td><td class="old-class">.k-i-insert-image</td><td class="new-class">.k-i-image-insert</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-file-add"></span></td><td class="old-class">.k-i-insert-file</td><td class="new-class">.k-i-file-add</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-pdf"></span></td><td class="old-class">.k-i-pdfa</td><td class="new-class">.k-i-pdf</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-xls"></span></td><td class="old-class">.k-i-xlsa</td><td class="new-class">.k-i-xls</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-menu"></span></td><td class="old-class">.k-i-hamburger</td><td class="new-class">.k-i-menu</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-more-vertical"></span></td><td class="old-class">.k-i-vbars</td><td class="new-class">.k-i-more-vertical</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-more-horizontal"></span></td><td class="old-class">.k-i-hbars</td><td class="new-class">.k-i-more-horizontal</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-arrows-dimensions"></span></td><td class="old-class">.k-i-dimension</td><td class="new-class">.k-i-arrows-dimensions</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-undo"></span></td><td class="old-class">.k-i-undo-large</td><td class="new-class">.k-i-undo</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-redo"></span></td><td class="old-class">.k-i-redo-large</td><td class="new-class">.k-i-redo</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-rotate-left"></span></td><td class="old-class">.k-i-rotate-ccw</td><td class="new-class">.k-i-rotate-left</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-rotate-right"></span></td><td class="old-class">.k-i-rotate-cw</td><td class="new-class">.k-i-rotate-right</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-strikethrough"></span></td><td class="old-class">.k-i-strike-through</td><td class="new-class">.k-i-strikethrough</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-foreground-color"></span></td><td class="old-class">.k-i-text</td><td class="new-class">.k-i-foreground-color</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-formula-fx"></span></td><td class="old-class">.k-i-fx</td><td class="new-class">.k-i-formula-fx</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-sub-script"></span></td><td class="old-class">.k-i-subscript</td><td class="new-class">.k-i-sub-script</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-sup-script"></span></td><td class="old-class">.k-i-superscript</td><td class="new-class">.k-i-sup-script</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-decimal-increase"></span></td><td class="old-class">.k-i-increase-decimal</td><td class="new-class">.k-i-decimal-increase</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-decimal-decrease"></span></td><td class="old-class">.k-i-decrease-decimal</td><td class="new-class">.k-i-decimal-decrease</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-align-left"></span></td><td class="old-class">.k-i-justify-left</td><td class="new-class">.k-i-align-left</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-align-center"></span></td><td class="old-class">.k-i-justify-center</td><td class="new-class">.k-i-align-center</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-align-right"></span></td><td class="old-class">.k-i-justify-right</td><td class="new-class">.k-i-align-right</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-align-justify"></span></td><td class="old-class">.k-i-justify-full</td><td class="new-class">.k-i-align-justify</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-align-remove"></span></td><td class="old-class">.k-i-justify-clear</td><td class="new-class">.k-i-align-remove</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-insert-up"></span></td><td class="old-class">.k-i-insert-n</td><td class="new-class">.k-i-insert-up</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-insert-middle"></span></td><td class="old-class">.k-i-insert-m</td><td class="new-class">.k-i-insert-middle</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-insert-down"></span></td><td class="old-class">.k-i-insert-s</td><td class="new-class">.k-i-insert-down</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-list-unordered"></span></td><td class="old-class">.k-i-insert-unordered-list</td><td class="new-class">.k-i-list-unordered</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-list-ordered"></span></td><td class="old-class">.k-i-insert-ordered-list</td><td class="new-class">.k-i-list-ordered</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-clear-css"></span></td><td class="old-class">.k-i-clearformat</td><td class="new-class">.k-i-clear-css</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-table-light-dialog"></span></td><td class="old-class">.k-i-create-table</td><td class="new-class">.k-i-table-light-dialog</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-table-column-insert-left"></span></td><td class="old-class">.k-i-add-column-left</td><td class="new-class">.k-i-table-column-insert-left</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-table-column-insert-right"></span></td><td class="old-class">.k-i-add-column-right</td><td class="new-class">.k-i-table-column-insert-right</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-close"></span></td><td class="old-class">.k-i-group-delete</td><td class="new-class">.k-i-close</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-table-column-delete"></span></td><td class="old-class">.k-i-delete-column</td><td class="new-class">.k-i-table-column-delete</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-table-row-insert-above"></span></td><td class="old-class">.k-i-add-row-above</td><td class="new-class">.k-i-table-row-insert-above</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-table-row-insert-below"></span></td><td class="old-class">.k-i-add-row-below</td><td class="new-class">.k-i-table-row-insert-below</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-table-row-delete"></span></td><td class="old-class">.k-i-delete-row</td><td class="new-class">.k-i-table-row-delete</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-cells-merge"></span></td><td class="old-class">.k-i-merge-cells</td><td class="new-class">.k-i-cells-merge</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-table-unmerge"></span></td><td class="old-class">.k-i-normal-layout</td><td class="new-class">.k-i-table-unmerge</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-layout-2-by-2"></span></td><td class="old-class">.k-i-page-layout</td><td class="new-class">.k-i-layout-2-by-2</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-borders-all"></span></td><td class="old-class">.k-i-all-borders</td><td class="new-class">.k-i-borders-all</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-borders-inside"></span></td><td class="old-class">.k-i-inside-borders</td><td class="new-class">.k-i-borders-inside</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-borders-inside-horizontal"></span></td><td class="old-class">.k-i-inside-horizontal-borders</td><td class="new-class">.k-i-borders-inside-horizontal</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-borders-inside-vertical"></span></td><td class="old-class">.k-i-inside-vertical-borders</td><td class="new-class">.k-i-borders-inside-vertical</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-borders-outside"></span></td><td class="old-class">.k-i-outside-borders</td><td class="new-class">.k-i-borders-outside</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-border-top"></span></td><td class="old-class">.k-i-top-border</td><td class="new-class">.k-i-border-top</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-border-right"></span></td><td class="old-class">.k-i-right-border</td><td class="new-class">.k-i-border-right</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-border-bottom"></span></td><td class="old-class">.k-i-bottom-border</td><td class="new-class">.k-i-border-bottom</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-border-left"></span></td><td class="old-class">.k-i-left-border</td><td class="new-class">.k-i-border-left</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-border-no"></span></td><td class="old-class">.k-i-no-borders</td><td class="new-class">.k-i-border-no</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-cells-merge-horizontally"></span></td><td class="old-class">.k-i-merge-horizontally</td><td class="new-class">.k-i-cells-merge-horizontally</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-cells-merge-vertically"></span></td><td class="old-class">.k-i-merge-vertically</td><td class="new-class">.k-i-cells-merge-vertically</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-column-freeze"></span></td><td class="old-class">.k-i-freeze-col</td><td class="new-class">.k-i-column-freeze</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-row-freeze"></span></td><td class="old-class">.k-i-freeze-row</td><td class="new-class">.k-i-row-freeze</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-pane-freeze"></span></td><td class="old-class">.k-i-freeze-panes</td><td class="new-class">.k-i-pane-freeze</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-custom-format"></span></td><td class="old-class">.k-i-format-number</td><td class="new-class">.k-i-custom-format</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-full-screen"></span></td><td class="old-class">.k-i-fullscreen-enter</td><td class="new-class">.k-i-full-screen</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-volume-down"></span></td><td class="old-class">.k-i-volume-low</td><td class="new-class">.k-i-volume-down</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-volume-up"></span></td><td class="old-class">.k-i-volume-high</td><td class="new-class">.k-i-volume-up</td></tr>
            <tr><td class="ref-icon"><span class="k-icon k-i-volume-off"></span></td><td class="old-class">.k-i-volume-mute</td><td class="new-class">.k-i-volume-off</td></tr>
        </tbody>
    </table>

## See Also

Other articles on Kendo UI breaking changes and backwards compatibility:

* [2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})
