---
title: Forms
page_title: Forms | Kendo UI Hybrid Components
description: "Use Kendo UI hybrid forms in mobile application development"
previous_url: /controls/hybrid/forms/forms
slug: forms_hybridkendoui
position: 1
---

# Forms

The Kendo UI Hybrid framework provides automatic platform-dependent styling of `form` elements when they are added to a mobile View. Currently, the following `form` elements are supported and styled:

* Inputs of types `text`, `password`, `search`, `url`, `email`, `number`, `tel`, `file` (not in iOS), `date`, `time`, `month` and `datetime`.
* Single `select` elements or Kendo UI DropDownList replacements.

> **Important**
>
> To make use of native-like forms layout and to properly align widgets without additional styling, it is advisable to build and organize your mobile forms using [Kendo UI ListView for mobile](/controls/hybrid/listview/overview).

The `input` elements with a picker use the native one from the current platform if it is supported. HTML5 `form` elements are fully functional only on the following platforms: iOS 5.x+, Android 4.x+, BlackBerry 6.x+, BlackBerry Playbook 1.x+. The styling still works on older platforms, but the functionality is limited to text input only. The `select` elements are also automatically styled for each platform and use the native select dialog or popup.

## Known Limitations and Workarounds

> **Important**
> * To avoid many Android and Windows Phone 8 form issues, use native scroller in all Views that require text entry, as shown in the example below.
> * Native scrolling is only enabled on platforms that support it, such as iOS5 or later, Android 3 or later, Windowd Phone 8. BlackBerry devices do support it, but the native scroller is flaky.

The example below demonstrates how to use the native scroller in all Views that require a text entry.

###### Example

    <div data-role="view" data-use-native-scrolling="true">
        <form action="./index.html">
            <ul data-role="listview" data-style="inset">
                <li>
                    <label>Type text
                        <input type="text" value="Text" />
                    </label>
                </li>
            </ul>
        </form>
    </div>

**Issue 1** The `select` element touch target in Android 2.x remains in the same place when a transformation is applied on a parent. The `select` element text cannot be right-aligned in WebKit, which is needed for iOS styling.
* **Workaround** The workaround that can be applied to both issues is to use the Kendo UI DropDownList widget. It receives a platform-specific styling when initialized in a Kendo UI Application fro mobile. To do so, include `kendo.dropdownlist.js` and its requirements `kendo.list.js` and `kendo.popup.js` in the application.

**Issue 2** The `select` element dropdown arrow cannot be removed in Firefox.

**Issue 3** Input of type `search` shows `reset icon` in Chrome and Safari, which is not present on a mobile device.

**Issue 4** All `input` elements in Android 4.x default browser render a fake input when focused. This focused input cannot be styled and is not part of the page flow so it is not going to scroll, resulting in 2 identical but differently styled `input` elements at some point.
* **Workaround** The workaround for this issue is integrated in the Kendo UI framework for mobile as of Kendo UI Q2 2012, which, unfortunately, has the following negative effects.
  * Cyrillic characters cannot be entered in Android 2.x.
  * Some keyboards cannot enter long-click characters in Android 2.x, such as HTC Desire default keyboard.
  * Swipe keyboard does not enter characters at all in Android 3.x and, possibly, in other versions too.
  * Newer `input` types fall back to text.

Since a number of keyboard features in Android are dependent on the fact that the fake native input rendered on top is visible and on the screen, if you encounter such issues and want to work around them, disable the integrated workaround by adding this CSS after the Kendo UI one, or do it for a specific input only.

###### Example

    .km-android input
    {
        -webkit-user-modify: inherit;
    }

As of Kendo UI Q3 2012, the needed rules should have more specificity and different selectors, as shown below.

###### Example

    .km-root .km-on-android input
    {
        -webkit-user-modify: inherit;
    }

> **Important**
>
> As of Kendo UI Q2 2013, the Android 2 fake input workaround has been removed from the common CSS as it causes multiple issues with phone keyboards. Add the rule shown in the example below to your CSS to return it.

###### Example

    .km-on-android.km-2 .km-list > li,
    .km-on-android.km-3 .km-list > li
    {
        bottom: 10000px;
        -webkit-transform: translatey(10000px);
        transform: translatey(10000px);
    }

Releases before Kendo UI Q2 2013 require the following rule to disable the Android 2 workaround.

###### Example

    .km-root .km-on-android .km-list > li
    {
        bottom: auto;
        -webkit-transform: none;
        -moz-transform: none;
    }

Releases before Kendo UI Q3 2012 require the following rule to disable the Android 2 workaround instead.

###### Example

    .km-android .km-list > li
    {
        bottom: auto;
        -webkit-transform: none;
        -moz-transform: none;
    }

## Forms Styling Features

### Required Indicator

To activate this feature, set the `km-required` class to the `label`. This class renders asterisk (`*`) symbol right after the `label` content.

###### Example

	<label class="km-required km-label-above">First Name
        <input value="Eduardo" type="text" />
    </label>

### Inline Fields

**Figure 1. Inline fields in the Nova theme**

![Inline fields](/controls/hybrid/styles/inline.png)

There could be more than one input in a row. This outcome requires explicit width and the `km-inline-field` class set to the label.

###### Example

    <label class="km-inline-field km-label-above" style="width: 200px;">
    	Phone Number
    	<input type="text" value="+359 555 5555" />
    </label>
    <label class="km-inline-field km-label-above" style="width: 200px;">
        Type
        <select id="phone-type">
            <option value="First Option">Mobile</option>
            <option value="Second Option">Stationary</option>
		</select>
    </label>

### Button as Legend

**Figure 2. Nova theme showing a button as a legend**

![Button as Legend](/controls/hybrid/styles/button-as-legend.png)

Legend tags can have buttons inside. To achieve this outcome set the `km-legend-button` class.

###### Example

	<fieldset>
        <legend><a href="#" class="km-legend-button">+ Email</a></legend>
        <input type="text" value="barista@telerik.com" />
    </fieldset>

### Fieldset and Legend

**Figure 3. Nova theme showing a fieldset with a legend**

![Fieldset + Legend](/controls/hybrid/styles/fieldset-legend.png)

Legend can also be used as a first level Label.

###### Example

	<fieldset>
        <legend>Volume</legend>
        <input data-role="slider" id="slider" max="100" class="km-full-width-slider" />
    </fieldset>

### Label Icons

**Figure 4. Nova theme showing label icons**

![Label icons](/controls/hybrid/styles/label-icons.png)

Labels can only be icons. To get this outcome set the `km-icon-label` and `.km- + data-icon name` classes to the label.

###### Example

	<label class="km-icon-label k-i-calendar">
        <input value="Meeting" type="text" />
    </label>

### Labels above fields

**Figure 5. Nova theme showing labels above fields**

![Labels above fields](/controls/hybrid/styles/labels-above.png)

Labels can be positioned above the fields. To achieve this outcome set the `km-label-above` class to the label.

###### Example

    <label class="km-label-above">First Name
    	<input value="Eduardo" type="text" />
	</label>

### Standalone Checkboxes and Radio Buttons

**Figure 6. Nova theme showing standalone checkboxes and radio buttons**

![Standalone Checkboxes and RadioButtons](/controls/hybrid/styles/standalone-checksandradios.png)

The Nova theme provides customized presentation for standalone checkboxes and radio buttons via the `km-checkbox` and `km-radio` classes. Currently, these two types of input cannot be styled with CSS only. Therefore, the appearance of the standalone checkboxes and radio buttons relies on whether the `<input>` element is immediately followed by a `<label>` element with the respective `km-checkbox-label` and `km-radio-label` classes.

The example below demonstrates how to show a standalone checkbox in the Nova theme.

###### Example

    <input type="checkbox" class="km-checkbox" id="chocolate" />
    <label class="km-checkbox-label" for="chocolate">Chocolate</label>
    <input type="checkbox" class="km-checkbox" id="ice-cream" checked="checked" />
    <label class="km-checkbox-label" for="ice-cream">Ice cream</label>

The example below demonstrates how to show a standalone radio button in the Nova theme.

###### Example

    <input type="radio" class="km-radio" name="sex" id="sex1" checked="checked"/>
    <label class="km-radio-label" class="km-label" for="sex1" >Male</label>
    <input type="radio" class="km-radio" name="sex" id="sex2"/>
    <label class="km-radio-label" class="km-label" for="sex2">Female</label>

## See Also

Other articles related to the appearance and styling of Kendo UI hybrid distribution:

* [Apply CSS]({% slug styling_hybridkendoui %})
* [Define the Layout]({% slug layout_hybridkendoui %})
* [Touch Events]({% slug touchevents_hybridkendoui %})
* [Hybrid UI Font Icons]({% slug hybridiconfonts_hybridkendoui %})
