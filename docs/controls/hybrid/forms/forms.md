---
title: Forms
page_title: User guide to supported and styled Kendo UI Mobile forms
description: Detailed steps how to use Kendo UI Mobile Forms in mobile app development.
position: 6
---

# Mobile forms support

Kendo UI Mobile provides automatic platform dependent styling of form elements when they are added to a mobile View. Currently the following form elements are supported and styled:

*   Inputs of types **text**, **password**, **search**, **url**, **email**, **number**, **tel**, **file**(not in iOS), **date**, **time** **month** and **datetime**;
*   Single **select** elements or Kendo DropDownList replacements.

> **Important:** To make use of native-like forms layout and to properly align widgets without additional styling, it is advisable to build and organize your mobile forms using [Kendo UI Mobile ListView](/mobile/listview/overview).

The input elements with a picker use the native one from the current platform if it is supported.
HTML5 form elements are fully functional only on the following platforms: iOS 5.x+, Android 4.x+, BlackBerry 6.x+, BlackBerry Playbook 1.x+.
The styling will still work on older platforms, but the functionality will be limited to text input only.

Select elements are also automatically styled for each platform and will use the native select dialog or popup.

## Known browser issues and possible workarounds:

> **Important:** To avoid many Android and WP8 form issues, please use native scroller in all Views that require text entry! Check the example below.

> **Native scrolling is only enabled on platforms that support it**: iOS > 5+, Android > 3+, WP8. BlackBerry devices do support it, but the native scroller is flaky.

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

*   Select element touch target in Android 2.x remains in the same place when a transformation is applied on a parent.
Select element text can't be right-aligned in WebKit, which is needed for iOS styling.
A work around for both is to use the Kendo DropDownList widget.
It receives platform specific styling when initialized in a Kendo UI Mobile application.
To do so, include **kendo.dropdownlist.js** and its requirements
**kendo.list.js** and **kendo.popup.js** in the application.

*   Select element drop down arrow can't be removed in Firefox.

*   Input with type search shows **reset icon** in Chrome and Safari, which is not present on a mobile device.

*   All input elements in Android 4.x default browser render a fake input when focused.
This focused input can't be styled and is not part of the page flow so it won't scroll
resulting in 2 identical but differently styled input elements at some point.
**There is a workaround for this issue integrated in Kendo UI Mobile since Q2 2012, which unfortunately has the following negative effects:**
    * Cyrillic characters can't be entered in Android 2.x
    * Some keyboards can't enter long-click characters in Android 2.x (HTC Desire default keyboard for instance)
    * Swype keyboard doesn't enter characters at all in Android 3.x (maybe in other versions too)
    * Newer input types fall back to text

Since a number of keyboard features in Android are dependent on the fact that the fake native input rendered on top is visible and on the screen,
if you encounter such issues and want to work around them, you can disable the integrated workaround by adding this CSS after the Kendo UI Mobile one (or do it for specific input only):

    .km-android input
    {
        -webkit-user-modify: inherit;
    }

As of Q3 2012, the rules needed should have more specificity and different selectors:

    .km-root .km-on-android input
    {
        -webkit-user-modify: inherit;
    }

> **Important:** As of Q2 2013, the Android 2 fake input workaround has been removed from the common CSS as it causes multiple issues with phone keyboards. Add this rule to your CSS in order to return it:

    .km-on-android.km-2 .km-list > li,
    .km-on-android.km-3 .km-list > li
    {
        bottom: 10000px;
        -webkit-transform: translatey(10000px);
        transform: translatey(10000px);
    }

Older releases than Q2 2013, will require the following rule to disable the Android 2 workaround:

    .km-root .km-on-android .km-list > li
    {
        bottom: auto;
        -webkit-transform: none;
        -moz-transform: none;
    }

and if older than Q3 2012, this rule instead:

    .km-android .km-list > li
    {
        bottom: auto;
        -webkit-transform: none;
        -moz-transform: none;
    }

## Nova theme features

### Required indicator

To activate this feature set `km-required` class to the label. This class renders asterisk symbol right after the label content.

#### Required indicator example

	<label class="km-required km-label-above">First Name
        <input value="Eduardo" type="text" />
    </label>

### Inline fields

![Inline fields](/controls/hybrid/forms/inline.png)

There could be more than one input in a row. This outcome resuires **explicit width** and `km-inline-field` class set to the label.

#### Inline fields example

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

![Button as Legend](/controls/hybrid/forms/button-as-legend.png)

Legend tags can have buttons inside. To achieve this outcome set `km-legend-button` class.

#### Button as Legend example

	<fieldset>
        <legend><a href="#" class="km-legend-button">+ Email</a></legend>
        <input type="text" value="barista@telerik.com" />
    </fieldset>

### Fieldset + Legend

![Fieldset + Legend](/controls/hybrid/forms/fieldset-legend.png)

Legend can also be used as a first level Label.

#### Fieldset + Legend example

	<fieldset>
        <legend>Volume</legend>
        <input data-role="slider" id="slider" max="100" class="km-full-width-slider" />
    </fieldset>

### Label icons

![Label icons](/controls/hybrid/forms/label-icons.png)

Labels can be icons only. To get this outcome set `km-icon-label` and **.km- + data-icon name** classes to the label.

#### Label icon example

	<label class="km-icon-label k-i-calendar">
        <input value="Meeting" type="text" />
    </label>

### Labels above fields

![Labels above fields](/controls/hybrid/forms/labels-above.png)

Labels can be positioned above the fields. To achieve this outcome set `km-label-above` class to the label.

#### Labels above fields example

    <label class="km-label-above">First Name
    	<input value="Eduardo" type="text" />
	</label>

### Standalone Checkboxes and RadioButtons

![Standalone Checkboxes and RadioButtons](/controls/hybrid/forms/standalone-checksandradios.png)

Nova theme provides customized presentation for standalone Checkboxes / RadioButtons with `km-checkbox` / `km-radio` classes. At this time these two types of input cannot be styled with CSS only - therefore the standalone Checkboxes / RadioButtons appearance relies that the `<input>` element is immediately followed by a `<label>` element with respectively `km-checkbox-label` / `km-radio-label` classes.

#### Standalone Checkboxes example

    <input type="checkbox" class="km-checkbox" id="chocolate" />
    <label class="km-checkbox-label" for="chocolate">Chocolate</label>
    <input type="checkbox" class="km-checkbox" id="ice-cream" checked="checked" />
    <label class="km-checkbox-label" for="ice-cream">Ice cream</label>

#### Standalone RadioButtons example

    <input type="radio" class="km-radio" name="sex" id="sex1" checked="checked"/>
    <label class="km-radio-label" class="km-label" for="sex1" >Male</label>
    <input type="radio" class="km-radio" name="sex" id="sex2"/>
    <label class="km-radio-label" class="km-label" for="sex2">Female</label>
