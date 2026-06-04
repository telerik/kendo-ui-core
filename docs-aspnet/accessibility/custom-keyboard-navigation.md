---
title: Custom Key Handling
page_title: Custom Key Handling
description: "Learn how to customize keyboard shortcuts in {{ site.product }} wrapper components."
components: ["general"]
slug: custom_keyboard_navigation_aspnet_wrappers
position: 4
---
# Custom Key Handling

Some of the {{ site.product }} wrappers expose the `KendoKeydown` event. You can use this event to:

* **Override** a built-in key or key combination by blocking the default behavior and replacing it with your own logic.
* **Add** new key combinations that the component does not handle out of the box.

## How the KendoKeydown Event Works

The event argument exposes the following relevant properties:

| Property | Type | Description |
| --- | --- | --- |
| `e.sender` | Object | The client-side component instance. |
| `e.keyCode` | Number | The code of the pressed key. Use `kendo.keys` constants for readable comparisons. |
| `e.ctrlKey` | Boolean | `true` when `Ctrl` is held. |
| `e.shiftKey` | Boolean | `true` when `Shift` is held. |
| `e.altKey` | Boolean | `true` when `Alt` is held. |
| `e.preventKendoKeydown` | Boolean | Set to `true` to prevent the component from running its default keydown handler for this key press. |

## Supported Components

The following wrappers support the `KendoKeydown` event:

| Component | Key Handling Article |
| --- | --- |
| [ActionSheet]({% slug htmlhelpers_actionsheet_accessibility %}) | [Custom Key Handling in ActionSheet]({% slug custom_keyboard_navigation_actionsheet_htmlhelper %}) |
| [AIPrompt]({% slug htmlhelpers_aiprompt_accessibility %}) | [Custom Key Handling in AIPrompt]({% slug custom_keyboard_navigation_aiprompt_htmlhelper %}) |
| [AutoComplete]({% slug htmlhelpers_autocomplete_accessibility %}) | [Custom Key Handling in AutoComplete]({% slug custom_keyboard_navigation_autocomplete_htmlhelper %}) |
| [BottomNavigation]({% slug htmlhelpers_bottomnavigation_accessibility %}) | [Custom Key Handling in BottomNavigation]({% slug custom_keyboard_navigation_bottomnavigation_htmlhelper %}) |
| [Button]({% slug htmlhelpers_button_accessibility %}) | [Custom Key Handling in Button]({% slug custom_keyboard_navigation_button_htmlhelper %}) |
| [ButtonGroup]({% slug htmlhelpers_buttongroup_accessibility %}) | [Custom Key Handling in ButtonGroup]({% slug custom_keyboard_navigation_buttongroup_htmlhelper %}) |
| [Calendar]({% slug htmlhelpers_calendar_accessibility %}) | [Custom Key Handling in Calendar]({% slug custom_keyboard_navigation_calendar_htmlhelper %}) |
| [Chart Wizard]({% slug htmlhelpers_chartwizard_accessibility %}) | [Custom Key Handling in Chart Wizard]({% slug custom_keyboard_navigation_chartwizard_htmlhelper %}) |
| [Chip]({% slug htmlhelpers_chip_accessibility %}) | [Custom Key Handling in Chip]({% slug custom_keyboard_navigation_chip_htmlhelper %}) |
| [ChipList]({% slug htmlhelpers_chiplist_accessibility %}) | [Custom Key Handling in ChipList]({% slug custom_keyboard_navigation_chiplist_htmlhelper %}) |
| [ColorPicker]({% slug htmlhelpers_colorpicker_accessibility %}) | [Custom Key Handling in ColorPicker]({% slug custom_keyboard_navigation_colorpicker_htmlhelper %}) |
| [ComboBox]({% slug htmlhelpers_combobox_accessibility %}) | [Custom Key Handling in ComboBox]({% slug custom_keyboard_navigation_combobox_htmlhelper %}) |
| [DateInput]({% slug htmlhelpers_dateinput_accessibility %}) | [Custom Key Handling in DateInput]({% slug custom_keyboard_navigation_dateinput_htmlhelper %}) |
| [Dialog]({% slug htmlhelpers_dialog_accessibility %}) | [Custom Key Handling in Dialog]({% slug custom_keyboard_navigation_dialog_htmlhelper %}) |
| [Drawer]({% slug htmlhelpers_drawer_accessibility %}) | [Custom Key Handling in Drawer]({% slug custom_keyboard_navigation_drawer_htmlhelper %}) |
| [DropDownList]({% slug htmlhelpers_dropdownlist_accessibility %}) | [Custom Key Handling in DropDownList]({% slug custom_keyboard_navigation_dropdownlist_htmlhelper %}) |
| [DropDownTree]({% slug htmlhelpers_dropdowntree_accessibility %}) | [Custom Key Handling in DropDownTree]({% slug custom_keyboard_navigation_dropdowntree_htmlhelper %}) |
| [ExpansionPanel]({% slug htmlhelpers_expansionpanel_accessibility %}) | [Custom Key Handling in ExpansionPanel]({% slug custom_keyboard_navigation_expansionpanel_htmlhelper %}) |
| [Filter]({% slug htmlhelpers_filter_accessibility %}) | [Custom Key Handling in Filter]({% slug custom_keyboard_navigation_filter_htmlhelper %}) |
| [FloatingActionButton]({% slug htmlhelpers_floatingactionbutton_accessibility %}) | [Custom Key Handling in FloatingActionButton]({% slug custom_keyboard_navigation_floatingactionbutton_htmlhelper %}) |
| [Gantt]({% slug htmlhelpers_gantt_accessibility %}) | [Custom Key Handling in Gantt]({% slug custom_keyboard_navigation_gantt_htmlhelper %}) |
| [Grid]({% slug htmlhelpers_grid_accessibility %}) | [Custom Key Handling in Grid]({% slug custom_keyboard_navigation_grid_htmlhelper %}) |
| [ImageEditor]({% slug htmlhelpers_imageeditor_accessibility %}) | [Custom Key Handling in ImageEditor]({% slug custom_keyboard_navigation_imageeditor_htmlhelper %}) |
| [InlineAIPrompt]({% slug htmlhelpers_inline_aiprompt_accessibility %}) | [Custom Key Handling in InlineAIPrompt]({% slug custom_keyboard_navigation_inlineaiprompt_htmlhelper %}) |
| [ListBox]({% slug htmlhelpers_listbox_accessibility %}) | [Custom Key Handling in ListBox]({% slug custom_keyboard_navigation_listbox_htmlhelper %}) |
| [ListView]({% slug htmlhelpers_listview_accessibility %}) | [Custom Key Handling in ListView]({% slug custom_keyboard_navigation_listview_htmlhelper %}) |
| [MediaPlayer]({% slug htmlhelpers_mediaplayer_accessibility %}) | [Custom Key Handling in MediaPlayer]({% slug custom_keyboard_navigation_mediaplayer_htmlhelper %}) |
| [Menu]({% slug htmlhelpers_menu_accessibility %}) | [Custom Key Handling in Menu]({% slug custom_keyboard_navigation_menu_htmlhelper %}) |
| [MultiSelect]({% slug htmlhelpers_multiselect_accessibility %}) | [Custom Key Handling in MultiSelect]({% slug custom_keyboard_navigation_multiselect_htmlhelper %}) |
| [MultiViewCalendar]({% slug htmlhelpers_multiviewcalendar_accessibility %}) | [Custom Key Handling in MultiViewCalendar]({% slug custom_keyboard_navigation_multiviewcalendar_htmlhelper %}) |
| [NumericTextBox]({% slug htmlhelpers_numerictextbox_accessibility %}) | [Custom Key Handling in NumericTextBox]({% slug custom_keyboard_navigation_numerictextbox_htmlhelper %}) |
| [OrgChart]({% slug htmlhelpers_orgchart_accessibility %}) | [Custom Key Handling in OrgChart]({% slug custom_keyboard_navigation_orgchart_htmlhelper %}) |
| [OTPInput]({% slug htmlhelpers_otpinput_accessibility %}) | [Custom Key Handling in OTPInput]({% slug custom_keyboard_navigation_otpinput_htmlhelper %}) |
| [Pager]({% slug htmlhelpers_pager_accessibility %}) | [Custom Key Handling in Pager]({% slug custom_keyboard_navigation_pager_htmlhelper %}) |
| [PanelBar]({% slug htmlhelpers_panelbar_accessibility %}) | [Custom Key Handling in PanelBar]({% slug custom_keyboard_navigation_panelbar_htmlhelper %}) |
| [PDFViewer]({% slug htmlhelpers_pdfviewer_accessibility %}) | [Custom Key Handling in PDFViewer]({% slug custom_keyboard_navigation_pdfviewer_htmlhelper %}) |
| [PropertyGrid]({% slug htmlhelpers_propertygrid_accessibility %}) | [Custom Key Handling in PropertyGrid]({% slug custom_keyboard_navigation_propertygrid_htmlhelper %}) |
| [Rating]({% slug htmlhelpers_rating_accessibility %}) | [Custom Key Handling in Rating]({% slug custom_keyboard_navigation_rating_htmlhelper %}) |
| [Scheduler]({% slug htmlhelpers_scheduler_accessibility %}) | [Custom Key Handling in Scheduler]({% slug custom_keyboard_navigation_scheduler_htmlhelper %}) |
| [Slider]({% slug htmlhelpers_slider_accessibility %}) | [Custom Key Handling in Slider]({% slug custom_keyboard_navigation_slider_htmlhelper %}) |
| [SpeechToTextButton]({% slug htmlhelpers_speechtotextbutton_accessibility %}) | [Custom Key Handling in SpeechToTextButton]({% slug custom_keyboard_navigation_speechtotextbutton_htmlhelper %}) |
| [Splitter]({% slug htmlhelpers_splitter_accessibility %}) | [Custom Key Handling in Splitter]({% slug custom_keyboard_navigation_splitter_htmlhelper %}) |
| [Spreadsheet]({% slug htmlhelpers_spreadsheet_accessibility %}) | [Custom Key Handling in Spreadsheet]({% slug custom_keyboard_navigation_spreadsheet_htmlhelper %}) |
| [Stepper]({% slug htmlhelpers_stepper_accessibility %}) | [Custom Key Handling in Stepper]({% slug custom_keyboard_navigation_stepper_htmlhelper %}) |
| [Switch]({% slug htmlhelpers_switch_accessibility %}) | [Custom Key Handling in Switch]({% slug custom_keyboard_navigation_switch_htmlhelper %}) |
| [TileLayout]({% slug htmlhelpers_tilelayout_accessibility %}) | [Custom Key Handling in TileLayout]({% slug custom_keyboard_navigation_tilelayout_htmlhelper %}) |
| [TimeDurationPicker]({% slug htmlhelpers_timedurationpicker_accessibility %}) | [Custom Key Handling in TimeDurationPicker]({% slug custom_keyboard_navigation_timedurationpicker_htmlhelper %}) |
| [Timeline]({% slug htmlhelpers_timeline_accessibility %}) | [Custom Key Handling in Timeline]({% slug custom_keyboard_navigation_timeline_htmlhelper %}) |
| [ToggleButton]({% slug htmlhelpers_togglebutton_accessibility %}) | [Custom Key Handling in ToggleButton]({% slug custom_keyboard_navigation_togglebutton_htmlhelper %}) |
| [ToolBar]({% slug htmlhelpers_toolbar_accessibility %}) | [Custom Key Handling in ToolBar]({% slug custom_keyboard_navigation_toolbar_htmlhelper %}) |
| [TreeList]({% slug htmlhelpers_treelist_accessibility %}) | [Custom Key Handling in TreeList]({% slug custom_keyboard_navigation_treelist_htmlhelper %}) |
| [TreeView]({% slug htmlhelpers_treeview_accessibility %}) | [Custom Key Handling in TreeView]({% slug custom_keyboard_navigation_treeview_htmlhelper %}) |
| [Window]({% slug htmlhelpers_window_accessibility %}) | [Custom Key Handling in Window]({% slug custom_keyboard_navigation_window_htmlhelper %}) |
| [Wizard]({% slug htmlhelpers_wizard_accessibility %}) | [Custom Key Handling in Wizard]({% slug custom_keyboard_navigation_wizard_htmlhelper %}) |

## Basic Usage Pattern

The example below shows the structure of a `KendoKeydown` handler. The same pattern applies to all supported wrappers.

```HtmlHelper
	@(Html.Kendo().Grid()
		.Name("grid")
		.Navigatable()
		.Events(events => events.KendoKeydown("onGridKendoKeydown"))
	)
```
{% if site.core %}
```TagHelper
	@addTagHelper *, Kendo.Mvc

	<kendo-grid name="grid" navigatable="true" on-kendo-keydown="onGridKendoKeydown">
	</kendo-grid>
```
{% endif %}
```javascript
	function onGridKendoKeydown(e) {
		var component = e.sender;
		var keys = kendo.keys;

		if (e.keyCode === keys.DOWN) {
			e.preventKendoKeydown = true;
		}

		if (e.keyCode === 68) {
			e.preventKendoKeydown = true;
			console.log(component.element.attr("id"), "handled a custom key.");
		}

		if (e.ctrlKey && e.keyCode === 88) {
			e.preventKendoKeydown = true;
			console.log(component.element.attr("id"), "handled Ctrl+X.");
		}
	}
```

### Blocking the Default Behavior

To prevent a wrapper from reacting to a specific key, set `e.preventKendoKeydown` to `true` for that key in the handler. You do not need to call `e.preventDefault()` in most cases because setting the flag is sufficient to stop the component from handling the key.

If you also want to prevent the browser's default behavior for that key, call `e.preventDefault()` in addition to setting the flag:

```javascript
	function onGridKendoKeydown(e) {
		if (e.ctrlKey && e.keyCode === 82) {
			e.preventDefault();
			e.preventKendoKeydown = true;
		}
	}
```

### Adding a Custom Key Combination

You can add a key combination that the wrapper does not use. You do not need to set `e.preventKendoKeydown = true` in this case because there is nothing to block. Set the flag only when you want to take over a key that the component already handles.

```javascript
	function onGridKendoKeydown(e) {
		if (e.keyCode === 73) {
			console.log("Custom shortcut activated.");
		}
	}
```

## See Also

* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
