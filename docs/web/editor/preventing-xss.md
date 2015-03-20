---
title: Preventing XSS
page_title: Preventing Cross-site scripting (XSS) attacks with Editor UI widget | Kendo UI Documentation
description: This help topic explains the security implications of allowing HTML editing in your pages and provide guidelines on how to secure them.
position: 5
---

# Overview

Allowing users to enter HTML on your site imposes security risks that need to be addressed. This article shows how a hypothetical attack proceeds, and what to do to prevent it.

## A typical XSS attack

1. A malicious user visits a page that uses the Editor widget. Let us assume that there is a `<textarea id="editor">` element on the page.

        $("#editor").kendoEditor();

2. The attacker sets the value of the Editor's textarea to a malicious script, without using the editing interface, and submits the form.

        $("#editor").val("<script>alert('Script that gathers user info and posts it to another site');</script>");
        $("form").submit();

   Note that the attacker can gather any data that is available on the page, or in JavaScript-accessible cookies.

3. The unprocessed content is stored on the server
4. A victim visits the compromised page that outputs the above HTML.

## How does the editor widget protect me from cross-site scripting (XSS)?

The widget itself can do little in order to protect you from XSS attacks, because malicious users can edit form fields manually and post forged requests to the server, as shown in step #2 above.
In order to protect your users from these attacks, it is necessary to clean the posted content on the server, through HTML parsing and a whitelist of allowed tags.

## White-listing allowed tags

Depending on your server-side platform, here are some libraries that allow processing HTML with a white-list:

- **ASP.NET** - [Html Agility Pack](http://htmlagilitypack.codeplex.com/)
- **PHP** - [Html Purifier](http://htmlpurifier.org/)
- **Java** - [jsoup](http://jsoup.org/)
