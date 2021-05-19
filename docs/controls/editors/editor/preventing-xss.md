---
title: Preventing Cross-Site Scripting
page_title: jQuery Editor Documentation | Preventing Cross-Site Scripting
description: "Get started with the jQuery Editor by Kendo UI and learn about the security implications of allowing an HTML editing in your pages and how to secure them."
slug: prevent_xss_editor_widget
position: 11
---

# Preventing Cross-Site Scripting

Allowing users to enter the HTML of your site imposes security risks that you need to address.

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

The Editor itself cannot protect you from XSS attacks because malicious users can manually edit form fields and post forged requests to the server. To protect your users from these attacks, clean the posted content on the server through an HTML parsing and a whitelist of allowed tags.

## Script Tags

By design, the Editor does not allow the execution of scripts inside its content area. This is achieved by transforming all `script` tags in the content to `k:script` tags.

When the Editor content is submitted, the `k:script` tags are either completely removed, or transformed back to `script` tags. This depends on the [`serialization.scripts`](/api/javascript/ui/editor/configuration/serialization.scripts) property.

To allow the execution of scripts inside the Editor content:

* Enable the script serialization.
* Obtain the value of the Editor through its [`value()`](/api/javascript/ui/editor/methods/value) method.
* Extract the `script` tags.
* Place the `script` tags elsewhere on the page where they can be evaluated by the browser.

## Serialization and Deserialization

Script tags and DOM event attributes stripping, as well as value encoding, are built-in functionalities of the Editor. In addition, you can use the [`serialization.custom`](/api/javascript/ui/editor/configuration/serialization.custom) and [`deserialization.custom`](/api/javascript/ui/editor/configuration/deserialization.custom) options of the Editor.

The following example demonstrates how to use the serialization and deserialization custom otpions, to sanitize the value of the Editor by using [DOMPurify](https://github.com/cure53/DOMPurify) library.

```dojo
<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.0.12/purify.min.js"></script>
 
<textarea id="editor"></textarea>
<script>
    function sanitizeHtml(html) {
		var temp = $("<div></div>").html(window.DOMPurify.sanitize(html));
		return temp.html() || "\ufeff";
    }

    $("#editor").kendoEditor({
		tools: [
			"viewHtml"
		],
		deserialization: {
			custom: function(html) {
				return sanitizeHtml(html);
			}
		},
		serialization: {
			custom: function(html) {
				return sanitizeHtml(html);
			}
		}
    });

  var editor = $("#editor").getKendoEditor();

  editor.value('<object data="data:text/html;base64,PHNjcmlwdD5hbGVydCgic2VjdGVzdCIpPC9zY3JpcHQ+"></object>');
  console.log(editor.value());
</script>
```

## Whitelist Tags

The following list provides information on the libraries that allow processing HTML with a whitelist depending on your server-side platform:

- `ASP.NET`&mdash;[Html Agility Pack](http://htmlagilitypack.codeplex.com/).
- `PHP`&mdash;[Html Purifier](http://htmlpurifier.org/).
- `Java`&mdash;[jsoup](https://jsoup.org/).
- `Node.js`&mdash;[sanitize-html](https://www.npmjs.com/package/sanitize-html).

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
