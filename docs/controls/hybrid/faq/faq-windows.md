---
title: Frequently Asked Questions
page_title: Kendo UI Mobile Frequently Asked Questions
description: Answers to Frequently Asked Questions about how Kendo UI mobile works and behaves
position: 5
---

# Frequently Asked Questions

This is a collection of frequently asked questions about how Kendo UI mobile framework works and behaves.

## Windows Phone 8

### Q: My icons do not render in WP8 PhoneGap or HTML5 apps, can I do something about it?

A: Local web fonts are not loaded in WP8 HTML5/PhoneGap apps or fonts loaded from local CSS. According to some sources,
external CSS should load web fonts, but we were not able to confirm this. As a workaround, use normal images for icons in WP8 HTML5/PhoneGap applications.

### Q: I get a gray background when I click on a link or label in Kendo UI Mobile under Windows Phone 8, why?

A: By default Windows Phone 8 highlights all links when they are active (hold down). Stopping this behaviour requires manually adding a meta tag to your application/site -
adding the tag through Javascript is ignored:

#### Q: I want to Stop link highlighting in WP8?

A: Add the following meta tag:

    <meta name="msapplication-tap-highlight" content="no" />

### Q: When I change the Windows Phone 8 theme, my application starts to look different. Why?

A: Kendo UI Mobile adapts to the current theme in Windows Phone 8 and changes the background and highlight colors of your application. In the browser this is
semi-automatic when you click inside the application to focus it, but in PhoneGap it happens automatically on app resume after you change the theme.
