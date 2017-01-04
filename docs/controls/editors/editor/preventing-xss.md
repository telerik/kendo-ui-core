---
title: Preventing Cross-Site Scripting
page_title: Preventing Cross-Site Scripting | Kendo UI Editor
description: "Learn the security implications of allowing an HTML editing in your pages and how to secure them in the Kendo UI Editor widget."
slug: prevent_xss_editor_widget
position: 5
---

# Preventing Cross-Site Scripting

Allowing users to enter the HTML of your site imposes security risks that you need to address.

This article demonstrates how a hypothetical attack proceeds and what to do to prevent it.

## XSS Attacks

The following steps demonstrate the way a typical XSS attack proceeds.

1. A malicious user visits a page that uses the Editor widget. Let us assume that there is a `<textarea id="editor">` element on the page.

        $("#editor").kendoEditor();

2. The attacker sets the Editor value of the `<textarea>` to a malicious script without using the editing interface and then submits the form.

        $("#editor").val("<script>alert('Script that gathers user info and posts it to another site');</script>");
        $("form").submit();

   Note that the attacker can gather any data that is available on the page or in JavaScript-accessible cookies.

3. The unprocessed content is stored on the server.
4. A victim visits the compromised page that outputs the above HTML.

## XSS Protection

The Editor itself can do little to protect you from XSS attacks because malicious users can manually edit form fields and post forged requests to the server, as shown in **Step 2**. To protect your users from these attacks, clean the posted content on the server through an HTML parsing and a whitelist of allowed tags.

## Script Tags

By design, the Editor does not allow the execution of scripts inside its content area. This is achieved by transforming all `script` tags in the content to `k:script` tags.

When the Editor content is submitted, the `k:script` tags are either completely removed, or transformed back to `script` tags. This depends on the [`serialization.scripts`](/api/javascript/ui/editor#configuration-serialization.scripts) property.

To allow the execution of scripts inside the Editor content:

* Enable the script serialization.
* Obtain the value of the Editor through its [`value()`](/api/javascript/ui/editor#methods-value) method.
* Extract the `script` tags.
* Place the `script` tags elsewhere on the page where they can be evaluated by the browser.

## Whitelist Tags

The following list provides information on the libraries that allow processing HTML with a whitelist depending on your server-side platform:

- `ASP.NET`&mdash;[Html Agility Pack](http://htmlagilitypack.codeplex.com/).
- `PHP`&mdash;[Html Purifier](http://htmlpurifier.org/).
- `Java`&mdash;[jsoup](https://jsoup.org/).
- `Node.js`&mdash;[sanitize-html](https://www.npmjs.com/package/sanitize-html).

## See Also

Other articles on the Kendo UI Editor:

* [Overview of the Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Image Browser]({% slug image_browser_editor_widget %})
* [Post-Process Content]({% slug post_process_content_editor_widget %})
* [Pasting]({% slug pasting_editor_widget %})
* [Set Selections]({% slug set_selections_editor_widget %})
* [Troubleshooting]({% slug troubleshooting_editor_widget %})
* [Editor JavaScript API Reference](/api/javascript/ui/editor)

For how-to examples on the Kendo UI Editor widget, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
