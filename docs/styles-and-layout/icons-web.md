---
title: Web Font Icons
page_title: Web Font Icons | Kendo UI Styles and Appearance
description: "Check out the full list of the web font icons for the Kendo UI desktop widgets."
previous_url: /web/icons-web
slug: webfonticons_kendoui_desktopwidgets
position: 7
---

# Web Font Icons

As of the R1 2017 release, Kendo UI delivers 400 integrated font icons intended for the [web and data visualization widgets]({% slug bundle_supportfor_kendoui_components %}) of the suite.

These icons can be used directly in a Kendo UI web project by assigning one of the predefined CSS classes provided in the [list of font icons](#list-of-font-icons) below.

The following example demonstrates how to achieve this behavior.

###### Example

```html
    <span class="k-icon k-i-copy"></span>
```

The following example demonstrates how to add a font icon to a Kendo UI Button.

###### Example

```html
    <a class="k-button" href="#">
        <span class="k-icon k-i-copy"></span> Copy
    </a>
```

## List of Font Icons

The font icons are sorted in groups, depending on the function they help you to illustrate.

* [Actions](#actions)
* [Alerts and Notifications](#alerts-and-notifications)
* [Editing](#editing)
* [Files and Folders](#files-and-folders)
* [Images](#images)
* [Layout and Navigation](#layout-and-navigation)
* [Mapping](#mapping)
* [Media](#media)
* [Social Sharing](#social-sharing)
* [Toggle](#toggle)

<!--
stylesheet in _assets/stylesheets/icon-font.css
fonts in fonts/
 -->

### Actions

<ul class="WebComponentsIcons">
   <li><span class="k-icon k-i-undo"></span> .k-i-undo</li>
   <li><span class="k-icon k-i-redo"></span> .k-i-redo</li>
   <li><span class="k-icon k-i-reset"></span> .k-i-reset</li>
   <li><span class="k-icon k-i-reload"></span> .k-i-reload<br /> .k-i-refresh</li>
   <li><span class="k-icon k-i-non-recurrence"></span> .k-i-non-recurrence</li>
   <li><span class="k-icon k-i-reset-sm"></span> .k-i-reset-sm</li>
   <li><span class="k-icon k-i-reload-sm"></span> .k-i-reload-sm<br /> .k-i-refresh-sm</li>
   <li><span class="k-icon k-i-clock"></span> .k-i-clock</li>
   <li><span class="k-icon k-i-calendar"></span> .k-i-calendar</li>
   <li><span class="k-icon k-i-save"></span> .k-i-save<br /> .k-i-floppy</li>
   <li><span class="k-icon k-i-print"></span> .k-i-print<br /> .k-i-printer</li>
   <li><span class="k-icon k-i-edit"></span> .k-i-edit<br /> .k-i-pencil</li>
   <li><span class="k-icon k-i-delete"></span> .k-i-delete<br /> .k-i-trash</li>
   <li><span class="k-icon k-i-attachment"></span> .k-i-attachment<br /> .k-i-clip</li>
   <li><span class="k-icon k-i-attachment-45"></span> .k-i-attachment-45<br /> .k-i-clip-45</li>
   <li><span class="k-icon k-i-link-horizontal"></span> .k-i-link-horizontal<br /> .k-i-hyperlink</li>
   <li><span class="k-icon k-i-unlink-horizontal"></span> .k-i-unlink-horizontal<br /> .k-i-hyperlink-remove</li>
   <li><span class="k-icon k-i-link-vertical"></span> .k-i-link-vertical</li>
   <li><span class="k-icon k-i-unlink-vertical"></span> .k-i-unlink-vertical</li>
   <li><span class="k-icon k-i-lock"></span> .k-i-lock</li>
   <li><span class="k-icon k-i-unlock"></span> .k-i-unlock</li>
   <li><span class="k-icon k-i-cancel"></span> .k-i-cancel</li>
   <li><span class="k-icon k-i-cancel-outline"></span> .k-i-cancel-outline</li>
   <li><span class="k-icon k-i-cancel-circle"></span> .k-i-cancel-circle</li>
   <li><span class="k-icon k-i-check"></span> .k-i-check<br /> .k-i-checkmark</li>
   <li><span class="k-icon k-i-check-outline"></span> .k-i-check-outline<br /> .k-i-checkmark-outline</li>
   <li><span class="k-icon k-i-check-circle"></span> .k-i-check-circle<br /> .k-i-checkmark-circle</li>
   <li><span class="k-icon k-i-close"></span> .k-i-close<br /> .k-i-x</li>
   <li><span class="k-icon k-i-close-outline"></span> .k-i-close-outline<br /> .k-i-x-outline</li>
   <li><span class="k-icon k-i-close-circle"></span> .k-i-close-circle<br /> .k-i-x-circle</li>
   <li><span class="k-icon k-i-plus"></span> .k-i-plus</li>
   <li><span class="k-icon k-i-plus-outline"></span> .k-i-plus-outline</li>
   <li><span class="k-icon k-i-plus-circle"></span> .k-i-plus-circle</li>
   <li><span class="k-icon k-i-minus"></span> .k-i-minus</li>
   <li><span class="k-icon k-i-minus-outline"></span> .k-i-minus-outline</li>
   <li><span class="k-icon k-i-minus-circle"></span> .k-i-minus-circle</li>
   <li><span class="k-icon k-i-sort-asc"></span> .k-i-sort-asc</li>
   <li><span class="k-icon k-i-sort-desc"></span> .k-i-sort-desc</li>
   <li><span class="k-icon k-i-unsort"></span> .k-i-unsort</li>
   <li><span class="k-icon k-i-sort-clear"></span> .k-i-sort-clear</li>
   <li><span class="k-icon k-i-sort-asc-sm"></span> .k-i-sort-asc-sm</li>
   <li><span class="k-icon k-i-sort-desc-sm"></span> .k-i-sort-desc-sm</li>
   <li><span class="k-icon k-i-filter"></span> .k-i-filter</li>
   <li><span class="k-icon k-i-filter-clear"></span> .k-i-filter-clear</li>
   <li><span class="k-icon k-i-filter-sm"></span> .k-i-filter-sm</li>
   <li><span class="k-icon k-i-filter-sort-asc-sm"></span> .k-i-filter-sort-asc-sm</li>
   <li><span class="k-icon k-i-filter-sort-desc-sm"></span> .k-i-filter-sort-desc-sm</li>
   <li><span class="k-icon k-i-filter-add-expression"></span> .k-i-filter-add-expression</li>
   <li><span class="k-icon k-i-filter-add-group"></span> .k-i-filter-add-group</li>
   <li><span class="k-icon k-i-login"></span> .k-i-login</li>
   <li><span class="k-icon k-i-logout"></span> .k-i-logout</li>
   <li><span class="k-icon k-i-download"></span> .k-i-download</li>
   <li><span class="k-icon k-i-upload"></span> .k-i-upload</li>
   <li><span class="k-icon k-i-hyperlink-open"></span> .k-i-hyperlink-open</li>
   <li><span class="k-icon k-i-hyperlink-open-sm"></span> .k-i-hyperlink-open-sm</li>
   <li><span class="k-icon k-i-launch"></span> .k-i-launch</li>
   <li><span class="k-icon k-i-window"></span> .k-i-window<br /> .k-i-window-maximize</li>
   <li><span class="k-icon k-i-windows"></span> .k-i-windows<br /> .k-i-window-restore<br /> .k-i-tiles</li>
   <li><span class="k-icon k-i-window-minimize"></span> .k-i-window-minimize</li>
   <li><span class="k-icon k-i-gear"></span> .k-i-gear<br /> .k-i-cog<br /> .k-i-custom</li>
   <li><span class="k-icon k-i-gears"></span> .k-i-gears<br /> .k-i-cogs</li>
   <li><span class="k-icon k-i-wrench"></span> .k-i-wrench<br /> .k-i-settings</li>
   <li><span class="k-icon k-i-preview"></span> .k-i-preview<br /> .k-i-eye</li>
   <li><span class="k-icon k-i-zoom"></span> .k-i-zoom<br /> .k-i-search</li>
   <li><span class="k-icon k-i-zoom-in"></span> .k-i-zoom-in</li>
   <li><span class="k-icon k-i-zoom-out"></span> .k-i-zoom-out</li>
   <li><span class="k-icon k-i-pan"></span> .k-i-pan<br /> .k-i-move</li>
   <li><span class="k-icon k-i-calculator"></span> .k-i-calculator</li>
   <li><span class="k-icon k-i-cart"></span> .k-i-cart<br /> .k-i-shopping-cart</li>
   <li><span class="k-icon k-i-connector"></span> .k-i-connector</li>
   <li><span class="k-icon k-i-plus-sm"></span> .k-i-plus-sm</li>
   <li><span class="k-icon k-i-minus-sm"></span> .k-i-minus-sm</li>
</ul>

### Alerts and Notifications

<ul class="WebComponentsIcons">
    <li><span class="k-icon k-i-notification"></span> .k-i-notification<br /> .k-i-bell</li>
    <li><span class="k-icon k-i-information"></span> .k-i-information<br /> .k-i-info</li>
    <li><span class="k-icon k-i-question"></span> .k-i-question<br /> .k-i-help</li>
    <li><span class="k-icon k-i-warning"></span> .k-i-warning<br /> .k-i-exception<br /> .k-i-error</li>
</ul>

### Editing

<ul class="WebComponentsIcons">
    <li><span class="k-icon k-i-page-properties"></span> .k-i-page-properties</li>
    <li><span class="k-icon k-i-bold"></span> .k-i-bold</li>
    <li><span class="k-icon k-i-italic"></span> .k-i-italic</li>
    <li><span class="k-icon k-i-underline"></span> .k-i-underline</li>
    <li><span class="k-icon k-i-font-family"></span> .k-i-font-family</li>
    <li><span class="k-icon k-i-foreground-color"></span> .k-i-foreground-color</li>
    <li><span class="k-icon k-i-convert-lowercase"></span> .k-i-convert-lowercase</li>
    <li><span class="k-icon k-i-convert-uppercase"></span> .k-i-convert-uppercase</li>
    <li><span class="k-icon k-i-strikethrough"></span> .k-i-strikethrough</li>
    <li><span class="k-icon k-i-sub-script"></span> .k-i-sub-script</li>
    <li><span class="k-icon k-i-sup-script"></span> .k-i-sup-script</li>
    <li><span class="k-icon k-i-div"></span> .k-i-div</li>
    <li><span class="k-icon k-i-all"></span> .k-i-all</li>
    <li><span class="k-icon k-i-h1"></span> .k-i-h1</li>
    <li><span class="k-icon k-i-h2"></span> .k-i-h2</li>
    <li><span class="k-icon k-i-h3"></span> .k-i-h3</li>
    <li><span class="k-icon k-i-h4"></span> .k-i-h4</li>
    <li><span class="k-icon k-i-h5"></span> .k-i-h5</li>
    <li><span class="k-icon k-i-h6"></span> .k-i-h6</li>
    <li><span class="k-icon k-i-list-ordered"></span> .k-i-list-ordered<br /> .k-i-list-numbered</li>
    <li><span class="k-icon k-i-list-unordered"></span> .k-i-list-unordered<br /> .k-i-list-bulleted</li>
    <li><span class="k-icon k-i-indent-increase"></span> .k-i-indent-increase<br /> .k-i-indent</li>
    <li><span class="k-icon k-i-indent-decrease"></span> .k-i-indent-decrease<br /> .k-i-outdent</li>
    <li><span class="k-icon k-i-insert-up"></span> .k-i-insert-up<br /> .k-i-insert-top</li>
    <li><span class="k-icon k-i-insert-middle"></span> .k-i-insert-middle</li>
    <li><span class="k-icon k-i-insert-down"></span> .k-i-insert-down<br /> .k-i-insert-bottom</li>
    <li><span class="k-icon k-i-align-top"></span> .k-i-align-top</li>
    <li><span class="k-icon k-i-align-middle"></span> .k-i-align-middle</li>
    <li><span class="k-icon k-i-align-bottom"></span> .k-i-align-bottom</li>
    <li><span class="k-icon k-i-align-left"></span> .k-i-align-left</li>
    <li><span class="k-icon k-i-align-center"></span> .k-i-align-center</li>
    <li><span class="k-icon k-i-align-right"></span> .k-i-align-right</li>
    <li><span class="k-icon k-i-align-justify"></span> .k-i-align-justify</li>
    <li><span class="k-icon k-i-align-remove"></span> .k-i-align-remove</li>
    <li><span class="k-icon k-i-text-wrap"></span> .k-i-text-wrap</li>
    <li><span class="k-icon k-i-rule-horizontal"></span> .k-i-rule-horizontal</li>
    <li><span class="k-icon k-i-table-align-top-left"></span> .k-i-table-align-top-left</li>
    <li><span class="k-icon k-i-table-align-top-center"></span> .k-i-table-align-top-center</li>
    <li><span class="k-icon k-i-table-align-top-right"></span> .k-i-table-align-top-right</li>
    <li><span class="k-icon k-i-table-align-middle-left"></span> .k-i-table-align-middle-left</li>
    <li><span class="k-icon k-i-table-align-middle-center"></span> .k-i-table-align-middle-center</li>
    <li><span class="k-icon k-i-table-align-middle-right"></span> .k-i-table-align-middle-right</li>
    <li><span class="k-icon k-i-table-align-bottom-left"></span> .k-i-table-align-bottom-left</li>
    <li><span class="k-icon k-i-table-align-bottom-center"></span> .k-i-table-align-bottom-center</li>
    <li><span class="k-icon k-i-table-align-bottom-right"></span> .k-i-table-align-bottom-right</li>
    <li><span class="k-icon k-i-table-align-remove"></span> .k-i-table-align-remove</li>
    <li><span class="k-icon k-i-borders-all"></span> .k-i-borders-all</li>
    <li><span class="k-icon k-i-borders-outside"></span> .k-i-borders-outside</li>
    <li><span class="k-icon k-i-borders-inside"></span> .k-i-borders-inside</li>
    <li><span class="k-icon k-i-borders-inside-horizontal"></span> .k-i-borders-inside-horizontal</li>
    <li><span class="k-icon k-i-borders-inside-vertical"></span> .k-i-borders-inside-vertical</li>
    <li><span class="k-icon k-i-border-top"></span> .k-i-border-top</li>
    <li><span class="k-icon k-i-border-bottom"></span> .k-i-border-bottom</li>
    <li><span class="k-icon k-i-border-left"></span> .k-i-border-left</li>
    <li><span class="k-icon k-i-border-right"></span> .k-i-border-right</li>
    <li><span class="k-icon k-i-border-no"></span> .k-i-border-no</li>
    <li><span class="k-icon k-i-borders-show-hide"></span> .k-i-borders-show-hide</li>
    <li><span class="k-icon k-i-form"></span> .k-i-form<br /> .k-i-border</li>
    <li><span class="k-icon k-i-form-element"></span> .k-i-form-element</li>
    <li><span class="k-icon k-i-code-snippet"></span> .k-i-code-snippet</li>
    <li><span class="k-icon k-i-select-all"></span> .k-i-select-all</li>
    <li><span class="k-icon k-i-button"></span> .k-i-button</li>
    <li><span class="k-icon k-i-select-box"></span> .k-i-select-box</li>
    <li><span class="k-icon k-i-calendar-date"></span> .k-i-calendar-date</li>
    <li><span class="k-icon k-i-group-box"></span> .k-i-group-box</li>
    <li><span class="k-icon k-i-textarea"></span> .k-i-textarea</li>
    <li><span class="k-icon k-i-textbox"></span> .k-i-textbox</li>
    <li><span class="k-icon k-i-textbox-hidden"></span> .k-i-textbox-hidden</li>
    <li><span class="k-icon k-i-password"></span> .k-i-password</li>
    <li><span class="k-icon k-i-paragraph-add"></span> .k-i-paragraph-add</li>
    <li><span class="k-icon k-i-edit-tools"></span> .k-i-edit-tools</li>
    <li><span class="k-icon k-i-template-manager"></span> .k-i-template-manager</li>
    <li><span class="k-icon k-i-change-manually"></span> .k-i-change-manually</li>
    <li><span class="k-icon k-i-track-changes"></span> .k-i-track-changes</li>
    <li><span class="k-icon k-i-track-changes-enable"></span> .k-i-track-changes-enable</li>
    <li><span class="k-icon k-i-track-changes-accept"></span> .k-i-track-changes-accept</li>
    <li><span class="k-icon k-i-track-changes-accept-all"></span> .k-i-track-changes-accept-all</li>
    <li><span class="k-icon k-i-track-changes-reject"></span> .k-i-track-changes-reject</li>
    <li><span class="k-icon k-i-track-changes-reject-all"></span> .k-i-track-changes-reject-all</li>
    <li><span class="k-icon k-i-document-manager"></span> .k-i-document-manager</li>
    <li><span class="k-icon k-i-custom-icon"></span> .k-i-custom-icon</li>
    <li><span class="k-icon k-i-dictionary-add"></span> .k-i-dictionary-add</li>
    <li><span class="k-icon k-i-image-light-dialog"></span> .k-i-image-light-dialog<br /> .k-i-image-insert</li>
    <li><span class="k-icon k-i-image-edit"></span> .k-i-image-edit</li>
    <li><span class="k-icon k-i-image-map-editor"></span> .k-i-image-map-editor</li>
    <li><span class="k-icon k-i-comment"></span> .k-i-comment</li>
    <li><span class="k-icon k-i-comment-remove"></span> .k-i-comment-remove</li>
    <li><span class="k-icon k-i-comments-remove-all"></span> .k-i-comments-remove-all</li>
    <li><span class="k-icon k-i-silverlight"></span> .k-i-silverlight</li>
    <li><span class="k-icon k-i-media-manager"></span> .k-i-media-manager</li>
    <li><span class="k-icon k-i-video-external"></span> .k-i-video-external</li>
    <li><span class="k-icon k-i-flash-manager"></span> .k-i-flash-manager</li>
    <li><span class="k-icon k-i-find-and-replace"></span> .k-i-find-and-replace<br /> .k-i-find</li>
    <li><span class="k-icon k-i-copy"></span> .k-i-copy<br /> .k-i-files</li>
    <li><span class="k-icon k-i-cut"></span> .k-i-cut</li>
    <li><span class="k-icon k-i-paste"></span> .k-i-paste</li>
    <li><span class="k-icon k-i-paste-as-html"></span> .k-i-paste-as-html</li>
    <li><span class="k-icon k-i-paste-from-word"></span> .k-i-paste-from-word</li>
    <li><span class="k-icon k-i-paste-from-word-strip-file"></span> .k-i-paste-from-word-strip-file</li>
    <li><span class="k-icon k-i-paste-html"></span> .k-i-paste-html</li>
    <li><span class="k-icon k-i-paste-markdown"></span> .k-i-paste-markdown</li>
    <li><span class="k-icon k-i-paste-plain-text"></span> .k-i-paste-plain-text</li>
    <li><span class="k-icon k-i-apply-format"></span> .k-i-apply-format</li>
    <li><span class="k-icon k-i-clear-css"></span> .k-i-clear-css</li>
    <li><span class="k-icon k-i-copy-format"></span> .k-i-copy-format</li>
    <li><span class="k-icon k-i-strip-all-formating"></span> .k-i-strip-all-formating</li>
    <li><span class="k-icon k-i-strip-css-format"></span> .k-i-strip-css-format</li>
    <li><span class="k-icon k-i-strip-font-elements"></span> .k-i-strip-font-elements</li>
    <li><span class="k-icon k-i-strip-span-elements"></span> .k-i-strip-span-elements</li>
    <li><span class="k-icon k-i-strip-word-formatting"></span> .k-i-strip-word-formatting</li>
    <li><span class="k-icon k-i-format-code-block"></span> .k-i-format-code-block</li>
    <li><span class="k-icon k-i-style-builder"></span> .k-i-style-builder</li>
    <li><span class="k-icon k-i-module-manager"></span> .k-i-module-manager</li>
    <li><span class="k-icon k-i-hyperlink-light-dialog"></span> .k-i-hyperlink-light-dialog<br /> .k-i-hyperlink-insert</li>
    <li><span class="k-icon k-i-hyperlink-globe"></span> .k-i-hyperlink-globe</li>
    <li><span class="k-icon k-i-hyperlink-globe-remove"></span> .k-i-hyperlink-globe-remove</li>
    <li><span class="k-icon k-i-hyperlink-email"></span> .k-i-hyperlink-email</li>
    <li><span class="k-icon k-i-anchor"></span> .k-i-anchor</li>
    <li><span class="k-icon k-i-table-light-dialog"></span> .k-i-table-light-dialog<br /> .k-i-table-insert</li>
    <li><span class="k-icon k-i-table"></span> .k-i-table<br /> .k-i-table-unmerge</li>
    <li><span class="k-icon k-i-table-properties"></span> .k-i-table-properties</li>
    <li><span class="k-icon k-i-table-cell"></span> .k-i-table-cell</li>
    <li><span class="k-icon k-i-table-cell-properties"></span> .k-i-table-cell-properties</li>
    <li><span class="k-icon k-i-table-column-insert-left"></span> .k-i-table-column-insert-left</li>
    <li><span class="k-icon k-i-table-column-insert-right"></span> .k-i-table-column-insert-right</li>
    <li><span class="k-icon k-i-table-row-insert-above"></span> .k-i-table-row-insert-above</li>
    <li><span class="k-icon k-i-table-row-insert-below"></span> .k-i-table-row-insert-below</li>
    <li><span class="k-icon k-i-table-column-delete"></span> .k-i-table-column-delete</li>
    <li><span class="k-icon k-i-table-row-delete"></span> .k-i-table-row-delete</li>
    <li><span class="k-icon k-i-table-cell-delete"></span> .k-i-table-cell-delete</li>
    <li><span class="k-icon k-i-table-delete"></span> .k-i-table-delete</li>
    <li><span class="k-icon k-i-cells-merge"></span> .k-i-cells-merge</li>
    <li><span class="k-icon k-i-cells-merge-horizontally"></span> .k-i-cells-merge-horizontally</li>
    <li><span class="k-icon k-i-cells-merge-vertically"></span> .k-i-cells-merge-vertically</li>
    <li><span class="k-icon k-i-cell-split-horizontally"></span> .k-i-cell-split-horizontally</li>
    <li><span class="k-icon k-i-cell-split-vertically"></span> .k-i-cell-split-vertically</li>
    <li><span class="k-icon k-i-pane-freeze"></span> .k-i-pane-freeze</li>
    <li><span class="k-icon k-i-row-freeze"></span> .k-i-row-freeze</li>
    <li><span class="k-icon k-i-column-freeze"></span> .k-i-column-freeze</li>
    <li><span class="k-icon k-i-toolbar-float"></span> .k-i-toolbar-float</li>
    <li><span class="k-icon k-i-spell-checker"></span> .k-i-spell-checker</li>
    <li><span class="k-icon k-i-validation-xhtml"></span> .k-i-validation-xhtml</li>
    <li><span class="k-icon k-i-validation-data"></span> .k-i-validation-data</li>
    <li><span class="k-icon k-i-toggle-full-screen-mode"></span> .k-i-toggle-full-screen-mode</li>
    <li><span class="k-icon k-i-formula-fx"></span> .k-i-formula-fx</li>
    <li><span class="k-icon k-i-sum"></span> .k-i-sum</li>
    <li><span class="k-icon k-i-symbol"></span> .k-i-symbol</li>
    <li><span class="k-icon k-i-dollar"></span> .k-i-dollar<br /> .k-i-currency</li>
    <li><span class="k-icon k-i-percent"></span> .k-i-percent</li>
    <li><span class="k-icon k-i-custom-format"></span> .k-i-custom-format</li>
    <li><span class="k-icon k-i-decimal-increase"></span> .k-i-decimal-increase</li>
    <li><span class="k-icon k-i-decimal-decrease"></span> .k-i-decimal-decrease</li>
    <li><span class="k-icon k-i-font-size"></span> .k-i-font-size</li>
    <li><span class="k-icon k-i-image-absolute-position"></span> .k-i-image-absolute-position</li>
</ul>

### Files and Folders

<ul class="WebComponentsIcons">
    <li><span class="k-icon k-i-folder"></span> .k-i-folder</li>
    <li><span class="k-icon k-i-folder-open"></span> .k-i-folder-open</li>
    <li><span class="k-icon k-i-folder-add"></span> .k-i-folder-add</li>
    <li><span class="k-icon k-i-folder-up"></span> .k-i-folder-up</li>
    <li><span class="k-icon k-i-folder-more"></span> .k-i-folder-more<br /> .k-i-fields-more</li>
    <li><span class="k-icon k-i-aggregate-fields"></span> .k-i-aggregate-fields</li>
    <li><span class="k-icon k-i-file"></span> .k-i-file<br /> .k-i-file-vertical</li>
    <li><span class="k-icon k-i-file-add"></span> .k-i-file-add</li>
    <li><span class="k-icon k-i-file-txt"></span> .k-i-file-txt<br /> .k-i-txt</li>
    <li><span class="k-icon k-i-file-csv"></span> .k-i-file-csv<br /> .k-i-csv</li>
    <li><span class="k-icon k-i-file-excel"></span> .k-i-file-excel<br /> .k-i-file-xls<br /> .k-i-excel<br /> .k-i-xls</li>
    <li><span class="k-icon k-i-file-word"></span> .k-i-file-word<br /> .k-i-file-doc<br /> .k-i-word<br /> .k-i-doc</li>
    <li><span class="k-icon k-i-file-mdb"></span> .k-i-file-mdb<br /> .k-i-mdb</li>
    <li><span class="k-icon k-i-file-ppt"></span> .k-i-file-ppt<br /> .k-i-ppt</li>
    <li><span class="k-icon k-i-file-pdf"></span> .k-i-file-pdf<br /> .k-i-pdf</li>
    <li><span class="k-icon k-i-file-psd"></span> .k-i-file-psd<br /> .k-i-psd</li>
    <li><span class="k-icon k-i-file-flash"></span> .k-i-file-flash<br /> .k-i-flash</li>
    <li><span class="k-icon k-i-file-config"></span> .k-i-file-config<br /> .k-i-config</li>
    <li><span class="k-icon k-i-file-ascx"></span> .k-i-file-ascx<br /> .k-i-ascx</li>
    <li><span class="k-icon k-i-file-bac"></span> .k-i-file-bac<br /> .k-i-bac</li>
    <li><span class="k-icon k-i-file-zip"></span> .k-i-file-zip<br /> .k-i-zip</li>
    <li><span class="k-icon k-i-film"></span> .k-i-film</li>
    <li><span class="k-icon k-i-css3"></span> .k-i-css3</li>
    <li><span class="k-icon k-i-html5"></span> .k-i-html5</li>
    <li><span class="k-icon k-i-html"></span> .k-i-html<br /> .k-i-source-code<br /> .k-i-view-source</li>
    <li><span class="k-icon k-i-css"></span> .k-i-css</li>
    <li><span class="k-icon k-i-js"></span> .k-i-js</li>
    <li><span class="k-icon k-i-exe"></span> .k-i-exe</li>
    <li><span class="k-icon k-i-csproj"></span> .k-i-csproj</li>
    <li><span class="k-icon k-i-vbproj"></span> .k-i-vbproj</li>
    <li><span class="k-icon k-i-cs"></span> .k-i-cs</li>
    <li><span class="k-icon k-i-vb"></span> .k-i-vb</li>
    <li><span class="k-icon k-i-sln"></span> .k-i-sln</li>
    <li><span class="k-icon k-i-cloud"></span> .k-i-cloud</li>
    <li><span class="k-icon k-i-file-horizontal"></span> .k-i-file-horizontal</li>

</ul>

### Images

<ul class="WebComponentsIcons">
    <li><span class="k-icon k-i-photo-camera"></span> .k-i-photo-camera</li>
    <li><span class="k-icon k-i-image"></span> .k-i-image<br /> .k-i-photo</li>
    <li><span class="k-icon k-i-image-export"></span> .k-i-image-export<br /> .k-i-photo-export</li>
    <li><span class="k-icon k-i-zoom-actual-size"></span> .k-i-zoom-actual-size</li>
    <li><span class="k-icon k-i-zoom-best-fit"></span> .k-i-zoom-best-fit</li>
    <li><span class="k-icon k-i-image-resize"></span> .k-i-image-resize</li>
    <li><span class="k-icon k-i-crop"></span> .k-i-crop</li>
    <li><span class="k-icon k-i-mirror"></span> .k-i-mirror</li>
    <li><span class="k-icon k-i-flip-horizontal"></span> .k-i-flip-horizontal</li>
    <li><span class="k-icon k-i-flip-vertical"></span> .k-i-flip-vertical</li>
    <li><span class="k-icon k-i-rotate"></span> .k-i-rotate</li>
    <li><span class="k-icon k-i-rotate-right"></span> .k-i-rotate-right</li>
    <li><span class="k-icon k-i-rotate-left"></span> .k-i-rotate-left</li>
    <li><span class="k-icon k-i-brush"></span> .k-i-brush</li>
    <li><span class="k-icon k-i-palette"></span> .k-i-palette</li>
    <li><span class="k-icon k-i-paint"></span> .k-i-paint<br /> .k-i-droplet<br /> .k-i-background</li>
    <li><span class="k-icon k-i-line"></span> .k-i-line<br /> .k-i-shape-line</li>
    <li><span class="k-icon k-i-brightness-contrast"></span> .k-i-brightness-contrast</li>
    <li><span class="k-icon k-i-saturation"></span> .k-i-saturation</li>
    <li><span class="k-icon k-i-invert-colors"></span> .k-i-invert-colors</li>
    <li><span class="k-icon k-i-transperancy"></span> .k-i-transperancy<br /> .k-i-opacity</li>
    <li><span class="k-icon k-i-greyscale"></span> .k-i-greyscale</li>
    <li><span class="k-icon k-i-blur"></span> .k-i-blur</li>
    <li><span class="k-icon k-i-sharpen"></span> .k-i-sharpen</li>
    <li><span class="k-icon k-i-shape"></span> .k-i-shape</li>
    <li><span class="k-icon k-i-round-corners"></span> .k-i-round-corners</li>
    <li><span class="k-icon k-i-front-element"></span> .k-i-front-element</li>
    <li><span class="k-icon k-i-back-element"></span> .k-i-back-element</li>
    <li><span class="k-icon k-i-forward-element"></span> .k-i-forward-element</li>
    <li><span class="k-icon k-i-backward-element"></span> .k-i-backward-element</li>
    <li><span class="k-icon k-i-align-left-element"></span> .k-i-align-left-element</li>
    <li><span class="k-icon k-i-align-center-element"></span> .k-i-align-center-element</li>
    <li><span class="k-icon k-i-align-right-element"></span> .k-i-align-right-element</li>
    <li><span class="k-icon k-i-align-top-element"></span> .k-i-align-top-element</li>
    <li><span class="k-icon k-i-align-middle-element"></span> .k-i-align-middle-element</li>
    <li><span class="k-icon k-i-align-bottom-element"></span> .k-i-align-bottom-element</li>
    <li><span class="k-icon k-i-thumbnails-up"></span> .k-i-thumbnails-up</li>
    <li><span class="k-icon k-i-thumbnails-right"></span> .k-i-thumbnails-right</li>
    <li><span class="k-icon k-i-thumbnails-down"></span> .k-i-thumbnails-down</li>
    <li><span class="k-icon k-i-thumbnails-left"></span> .k-i-thumbnails-left</li>
    <li><span class="k-icon k-i-full-screen"></span> .k-i-full-screen<br /> .k-i-fullscreen</li>
    <li><span class="k-icon k-i-full-screen-exit"></span> .k-i-full-screen-exit<br /> .k-i-fullscreen-exit</li>
    <li><span class="k-icon k-i-reset-color"></span> .k-i-reset-color<br /> .k-i-paint-remove<br /> .k-i-background-remove</li>
</ul>

### Layout and Navigation

<ul class="WebComponentsIcons">
    <li><span class="k-icon k-i-arrow-45-up-right"></span> .k-i-arrow-45-up-right<br /> .k-i-collapse-ne<br /> .k-i-resize-ne</li>
    <li><span class="k-icon k-i-arrow-45-down-right"></span> .k-i-arrow-45-down-right<br /> .k-i-collapse-se<br /> .k-i-resize-se</li>
    <li><span class="k-icon k-i-arrow-45-down-left"></span> .k-i-arrow-45-down-left<br /> .k-i-collapse-sw<br /> .k-i-resize-sw</li>
    <li><span class="k-icon k-i-arrow-45-up-left"></span> .k-i-arrow-45-up-left<br />  .k-i-collapse-nw<br />  .k-i-resize-new</li>
    <li><span class="k-icon k-i-arrow-60-up"></span> .k-i-arrow-60-up</li>
    <li><span class="k-icon k-i-arrow-60-right"></span> .k-i-arrow-60-right</li>
    <li><span class="k-icon k-i-arrow-60-down"></span> .k-i-arrow-60-down</li>
    <li><span class="k-icon k-i-arrow-60-left"></span> .k-i-arrow-60-left</li>
    <li><span class="k-icon k-i-arrow-end-up"></span> .k-i-arrow-end-up</li>
    <li><span class="k-icon k-i-arrow-end-right"></span> .k-i-arrow-end-right</li>
    <li><span class="k-icon k-i-arrow-end-down"></span> .k-i-arrow-end-down</li>
    <li><span class="k-icon k-i-arrow-end-left"></span> .k-i-arrow-end-left</li>
    <li><span class="k-icon k-i-arrow-double-60-up"></span> .k-i-arrow-double-60-up</li>
    <li><span class="k-icon k-i-arrow-seek-up"></span> .k-i-arrow-seek-up</li>
    <li><span class="k-icon k-i-arrow-double-60-right"></span> .k-i-arrow-double-60-right</li>
    <li><span class="k-icon k-i-arrow-seek-right"></span> .k-i-arrow-seek-right</li>
    <li><span class="k-icon k-i-arrow-double-60-down"></span> .k-i-arrow-double-60-down</li>
    <li><span class="k-icon k-i-arrow-seek-down"></span> .k-i-arrow-seek-down</li>
    <li><span class="k-icon k-i-arrow-double-60-left"></span> .k-i-arrow-double-60-left</li>
    <li><span class="k-icon k-i-arrows-kpi"></span> .k-i-arrows-kpi<br /> .k-i-kpi</li>
    <li><span class="k-icon k-i-arrows-no-change"></span> .k-i-arrows-no-change</li>
    <li><span class="k-icon k-i-arrow-overflow-down"></span> .k-i-arrow-overflow-down</li>
    <li><span class="k-icon k-i-arrow-chevron-up"></span> .k-i-arrow-chevron-up</li>
    <li><span class="k-icon k-i-arrow-chevron-right"></span> .k-i-arrow-chevron-right</li>
    <li><span class="k-icon k-i-arrow-chevron-down"></span> .k-i-arrow-chevron-down</li>
    <li><span class="k-icon k-i-arrow-chevron-left"></span> .k-i-arrow-chevron-left</li>
    <li><span class="k-icon k-i-arrow-up"></span> .k-i-arrow-up</li>
    <li><span class="k-icon k-i-arrow-right"></span> .k-i-arrow-right</li>
    <li><span class="k-icon k-i-arrow-down"></span> .k-i-arrow-down</li>
    <li><span class="k-icon k-i-arrow-left"></span> .k-i-arrow-left</li>
    <li><span class="k-icon k-i-arrow-drill"></span> .k-i-arrow-drill</li>
    <li><span class="k-icon k-i-arrow-parent"></span> .k-i-arrow-parent</li>
    <li><span class="k-icon k-i-arrow-root"></span> .k-i-arrow-root</li>
    <li><span class="k-icon k-i-arrows-resizing"></span> .k-i-arrows-resizing</li>
    <li><span class="k-icon k-i-arrows-dimensions"></span> .k-i-arrows-dimensions</li>
    <li><span class="k-icon k-i-arrows-swap"></span> .k-i-arrows-swap</li>
    <li><span class="k-icon k-i-drag-and-drop"></span> .k-i-drag-and-drop</li>
    <li><span class="k-icon k-i-categorize"></span> .k-i-categorize</li>
    <li><span class="k-icon k-i-grid"></span> .k-i-grid</li>
    <li><span class="k-icon k-i-grid-layout"></span> .k-i-grid-layout</li>
    <li><span class="k-icon k-i-group"></span> .k-i-group</li>
    <li><span class="k-icon k-i-ungroup"></span> .k-i-ungroup</li>
    <li><span class="k-icon k-i-handler-drag"></span> .k-i-handler-drag</li>
    <li><span class="k-icon k-i-layout"></span> .k-i-layout</li>
    <li><span class="k-icon k-i-layout-1-by-4"></span> .k-i-layout-1-by-4</li>
    <li><span class="k-icon k-i-layout-2-by-2"></span> .k-i-layout-2-by-2</li>
    <li><span class="k-icon k-i-layout-side-by-side"></span> .k-i-layout-side-by-side</li>
    <li><span class="k-icon k-i-layout-stacked"></span> .k-i-layout-stacked</li>
    <li><span class="k-icon k-i-columns"></span> .k-i-columns</li>
    <li><span class="k-icon k-i-rows"></span> .k-i-rows</li>
    <li><span class="k-icon k-i-reorder"></span> .k-i-reorder</li>
    <li><span class="k-icon k-i-menu"></span> .k-i-menu</li>
    <li><span class="k-icon k-i-more-vertical"></span> .k-i-more-vertical</li>
    <li><span class="k-icon k-i-more-horizontal"></span> .k-i-more-horizontal</li>
</ul>

### Mapping

<ul class="WebComponentsIcons">
    <li><span class="k-icon k-i-globe-outline"></span> .k-i-globe-outline</li>
    <li><span class="k-icon k-i-globe"></span> .k-i-globe</li>
    <li><span class="k-icon k-i-marker-pin"></span> .k-i-marker-pin</li>
    <li><span class="k-icon k-i-marker-pin-target"></span> .k-i-marker-pin-target</li>
    <li><span class="k-icon k-i-pin"></span> .k-i-pin</li>
    <li><span class="k-icon k-i-unpin"></span> .k-i-unpin</li>
</ul>

### Media

<ul class="WebComponentsIcons">
    <li><span class="k-icon k-i-play"></span> .k-i-play</li>
    <li><span class="k-icon k-i-pause"></span> .k-i-pause</li>
    <li><span class="k-icon k-i-stop"></span> .k-i-stop</li>
    <li><span class="k-icon k-i-rewind"></span> .k-i-rewind</li>
    <li><span class="k-icon k-i-forward"></span> .k-i-forward</li>
    <li><span class="k-icon k-i-volume-down"></span> .k-i-volume-down</li>
    <li><span class="k-icon k-i-volume-up"></span> .k-i-volume-up</li>
    <li><span class="k-icon k-i-volume-off"></span> .k-i-volume-off</li>
    <li><span class="k-icon k-i-hd"></span> .k-i-hd</li>
    <li><span class="k-icon k-i-subtitles"></span> .k-i-subtitles</li>
    <li><span class="k-icon k-i-playlist"></span> .k-i-playlist</li>
    <li><span class="k-icon k-i-audio"></span> .k-i-audio</li>
</ul>

### Social Sharing

<ul class="WebComponentsIcons">
    <li><span class="k-icon k-i-share"></span> .k-i-share</li>
    <li><span class="k-icon k-i-user"></span> .k-i-user</li>
    <li><span class="k-icon k-i-inbox"></span> .k-i-inbox</li>
    <li><span class="k-icon k-i-blogger"></span> .k-i-blogger</li>
    <li><span class="k-icon k-i-blogger-box"></span> .k-i-blogger-box</li>
    <li><span class="k-icon k-i-delicious"></span> .k-i-delicious</li>
    <li><span class="k-icon k-i-delicious-box"></span> .k-i-delicious-box</li>
    <li><span class="k-icon k-i-digg"></span> .k-i-digg</li>
    <li><span class="k-icon k-i-digg-box"></span> .k-i-digg-box</li>
    <li><span class="k-icon k-i-email"></span> .k-i-email<br /> .k-i-envelop<br /> .k-i-letter</li>
    <li><span class="k-icon k-i-email-box"></span> .k-i-email-box<br /> .k-i-envelop-box<br /> .k-i-letter-box</li>
    <li><span class="k-icon k-i-facebook"></span> .k-i-facebook</li>
    <li><span class="k-icon k-i-facebook-box"></span> .k-i-facebook-box</li>
    <li><span class="k-icon k-i-google"></span> .k-i-google</li>
    <li><span class="k-icon k-i-google-box"></span> .k-i-google-box</li>
    <li><span class="k-icon k-i-google-plus"></span> .k-i-google-plus</li>
    <li><span class="k-icon k-i-google-plus-box"></span> .k-i-google-plus-box</li>
    <li><span class="k-icon k-i-linkedin"></span> .k-i-linkedin</li>
    <li><span class="k-icon k-i-linkedin-box"></span> .k-i-linkedin-box</li>
    <li><span class="k-icon k-i-myspace"></span> .k-i-myspace</li>
    <li><span class="k-icon k-i-myspace-box"></span> .k-i-myspace-box</li>
    <li><span class="k-icon k-i-pinterest"></span> .k-i-pinterest</li>
    <li><span class="k-icon k-i-pinterest-box"></span> .k-i-pinterest-box</li>
    <li><span class="k-icon k-i-reddit"></span> .k-i-reddit</li>
    <li><span class="k-icon k-i-reddit-box"></span> .k-i-reddit-box</li>
    <li><span class="k-icon k-i-stumble-upon"></span> .k-i-stumble-upon</li>
    <li><span class="k-icon k-i-stumble-upon-box"></span> .k-i-stumble-upon-box</li>
    <li><span class="k-icon k-i-tell-a-friend"></span> .k-i-tell-a-friend</li>
    <li><span class="k-icon k-i-tell-a-friend-box"></span> .k-i-tell-a-friend-box</li>
    <li><span class="k-icon k-i-tumblr"></span> .k-i-tumblr</li>
    <li><span class="k-icon k-i-tumblr-box"></span> .k-i-tumblr-box</li>
    <li><span class="k-icon k-i-twitter"></span> .k-i-twitter</li>
    <li><span class="k-icon k-i-twitter-box"></span> .k-i-twitter-box</li>
    <li><span class="k-icon k-i-yammer"></span> .k-i-yammer</li>
    <li><span class="k-icon k-i-yammer-box"></span> .k-i-yammer-box</li>
    <li><span class="k-icon k-i-behance"></span> .k-i-behance</li>
    <li><span class="k-icon k-i-behance-box"></span> .k-i-behance-box</li>
    <li><span class="k-icon k-i-dribbble"></span> .k-i-dribbble</li>
    <li><span class="k-icon k-i-dribbble-box"></span> .k-i-dribbble-box</li>
    <li><span class="k-icon k-i-rss"></span> .k-i-rss</li>
    <li><span class="k-icon k-i-rss-box"></span> .k-i-rss-box</li>
    <li><span class="k-icon k-i-vimeo"></span> .k-i-vimeo</li>
    <li><span class="k-icon k-i-vimeo-box"></span> .k-i-vimeo-box</li>
    <li><span class="k-icon k-i-youtube"></span> .k-i-youtube</li>
    <li><span class="k-icon k-i-youtube-box"></span> .k-i-youtube-box</li>
</ul>

### Toggle

<ul class="WebComponentsIcons">
    <li><span class="k-icon k-i-heart-outline"></span> .k-i-heart-outline<br /> .k-i-fav-outline<br /> .k-i-favorite-outline</li>
    <li><span class="k-icon k-i-heart"></span> .k-i-heart<br /> .k-i-fav<br /> .k-i-favorite</li>
    <li><span class="k-icon k-i-star-outline"></span> .k-i-star-outline<br /> .k-i-bookmark-outline</li>
    <li><span class="k-icon k-i-star"></span> .k-i-star<br /> .k-i-bookmark</li>
    <li><span class="k-icon k-i-checkbox"></span> .k-i-checkbox<br /> .k-i-shape-rect</li>
    <li><span class="k-icon k-i-checkbox-checked"></span> .k-i-checkbox-checked</li>
    <li><span class="k-icon k-i-tri-state-indeterminate"></span> .k-i-tri-state-indeterminate</li>
    <li><span class="k-icon k-i-tri-state-null"></span> .k-i-tri-state-null</li>
    <li><span class="k-icon k-i-circle"></span> .k-i-circle</li>
    <li><span class="k-icon k-i-radiobutton"></span> .k-i-radiobutton<br /> .k-i-shape-circle</li>
    <li><span class="k-icon k-i-radiobutton-checked"></span> .k-i-radiobutton-checked</li>
</ul>

## See Also

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [How to Change Themes on the Client]({% slug howto_changethemes_ontheclient_styleskendoui %})
* [ThemeBuilder Overview]({% slug themebuilder_overview_kendouistyling %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Troubleshooting]({% slug commonissues_troubleshooting_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets](/controls/hybrid/styling)
