---
title: Frequently Asked Questions
page_title: Kendo UI Mobile Frequently Asked Questions
description: Answers to Frequently Asked Questions about how Kendo UI mobile works and behaves
position: 4
---

# Frequently Asked Questions

This is a collection of frequently asked questions about how Kendo UI mobile framework works and behaves.

## BlackBerry

### Q: I have webkit mask icons in my application and they are rendered as squares in BlackBerry OS 7.0?

A: WebKit masks are completely broken in BlackBerry OS 7.0, though they work fine in 6.x and 7.1. Either use font icons or normal images.

### Q: My trackball doesn't seem to work properly, how should I scroll?

A: Kendo UI Mobile supports only touchscreen BlackBerry devices. The trackball/pad that can be found on the older phone models fires mouse events (which are handled), but
doesn't support content dragging. This limitation is listed in Kendo UI Mobile requirements.
