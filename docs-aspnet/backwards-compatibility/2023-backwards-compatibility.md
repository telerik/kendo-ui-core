---
title: 2023 Releases
page_title: 2023 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2023."
slug: breakingchanges_2023
position: 1
---

# 2023 Releases

This article lists the breaking or important changes in the 2023 releases of {{ site.product }}.

## {{ site.product }} R1 2023

As of the R1 2023 release, the `Load` method of the `Telerik.Web.PDF` assembly is obsolete. The method was used to read from the file system. For security reasons, loading options should be limited to `byte[]` and `Stream`. As of R1 2023, the developers are responsible for reading from the file system and passing a stream to the loaded document.
