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
