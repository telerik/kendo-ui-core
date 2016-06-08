---
title: Prevent Cross-Site Scripting
page_title: Prevent Cross-Site Scripting | Kendo UI Editor
description: "Learn the security implications of allowing an HTML editing in your pages and how to secure them in the Kendo UI Editor widget."
slug: prevent_xss_editor_widget
position: 5
---

# Prevent Cross-Site Scripting

Allowing users to enter the HTML of your site imposes security risks that you need to address. This article shows how a hypothetical attack proceeds and what to do to prevent it.

## XSS Attacks

Below is demonstrated how a typical XSS attack is done.

1. A malicious user visits a page that uses the Editor widget. Let us assume that there is a `<textarea id="editor">` element on the page.

        $("#editor").kendoEditor();

2. The attacker sets the value of the Editor's `<textarea>` to a malicious script without using the editing interface and submits the form.

        $("#editor").val("<script>alert('Script that gathers user info and posts it to another site');</script>");
        $("form").submit();

   Note that the attacker can gather any data that is available on the page or in JavaScript-accessible cookies.

3. The unprocessed content is stored on the server.
4. A victim visits the compromised page that outputs the above HTML.

## XSS Protection

The Editor widget itself can do little in order to protect you from XSS attacks, because malicious users can edit form fields manually and post forged requests to the server, as shown in step #2 above. To protect your users from these attacks, clean the posted content on the server through an HTML parsing and a whitelist of allowed tags.

## Script tags

By design, the Editor does not allow execution of scripts inside its content area. This is achieved by transforming all `script` tags in the content to `k:script` tags.

When the Editor content is submitted, then the `k:script` tags are either completely removed, or transformed back to `script` tags. This depends on the [`serialization.scripts`](/api/javascript/ui/editor#configuration-serialization.scripts) property.

If execution of scripts inside the Editor's content is desired, a possible workaround is to enable script serialization, obtain the Editor's value via the widget's [`value()`](/api/javascript/ui/editor#methods-value) method, extract the `script` tags and place them somewhere else on the page where they can be evaluated by the browser.

## Whitelist Tags

Depending on your server-side platform, here are some libraries that allow processing HTML with a whitelist:

- `ASP.NET` - [Html Agility Pack](http://htmlagilitypack.codeplex.com/)
- `PHP` - [Html Purifier](http://htmlpurifier.org/)
- `Java` - [jsoup](http://jsoup.org/)
- `Node.js` - [sanitize-html](https://www.npmjs.com/package/sanitize-html)

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
