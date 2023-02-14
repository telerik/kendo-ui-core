---
title: Kendo UI Documentation Repo
publish: false
---

# Kendo UI Public Documentation

Welcome to the GitHub documentation repo for [Telerik<sup>®</sup> Kendo UI<sup>®</sup> by Progress](https://www.telerik.com/kendo-ui). This repository contains the source content&mdash;written in Markdown&mdash;that we use to power the Kendo UI Documentation at [docs.telerik.com/kendo-ui](https://docs.telerik.com/kendo-ui/). If you have arrived here wanting to search and peruse our docs, you'd be better served heading over to [docs.telerik.com/kendo-ui](https://docs.telerik.com/kendo-ui) where our content is prettified and searchable.

We believe that the documentation for a product is at its best when the content is a collaboration between the builders and consumers of that product. As such, this documentation is both public, and open-sourced under a MIT license (see below). This means you can clone this repository, read the docs offline, or even load the entire thing to an Apple Newton, if that's your thing.

It also means that you can play a role in making our docs better for everyone, and if helping us make the Kendo UI docs better sounds interesting to you, read on.

## Contribution

There are two ways you can contribute to the public Kendo UI documentation: either create an issue in this repository, or fork the repo, make the change and send us a pull request.

* **Create an issue** - If you find an issue with our docs that needs to be addressed, the best way to let us know about it is by [creating an issue in this repository](https://github.com/telerik/kendo-ui-core/issues?state=open). When creating an issue, provide a descriptive title, be as specific as possible and link to the document in question (If you can provide a link to the closest anchor to the issue, all the better). Here's an example:

        Title: api/DataViz/chart.md is missing an image
        Description: Example 3 is missing an image right after the code sample. https://github.com/telerik/kendo-ui-core/issues?state=open

> When creating issues, do not modify the assignee or milestone fields. Also, create one issue per fix or change. "Bundled" entries will be deleted.

* **Send us a pull request** - Creating an issue is great&mdash;and we certainly appreciate them&mdash;but what we really love are pull requests. So, if you find an issue in the docs, or even feel like creating new content, we'd be happy to have your contributions! If you're just getting started with open source, Git and GitHub, we suggest you first read up on [forking repositories](https://help.github.com/articles/fork-a-repo) and [sending pull requests](https://help.github.com/articles/using-pull-requests), both great articles from the GitHub bootcamp.

    Once you've read these — or you've already memorized them — you're ready to contribute to the Kendo docs. Start by creating a local clone of our repo either using [GitHub Desktop](https://desktop.github.com/) or your friendly command-line:

        git clone git@github.com:telerik/kendo-ui-core.git

    Then, open up the kendo-docs folder in your favorite text editor and contribute away! Of course, as you work with the docs, we do ask that you follow a couple of ground rules:

    - The [documentation Wiki](https://github.com/telerik/kendo-ui-core/wiki) contains the latest authoring guidelines.
    - Fixing grammar, punctuation and other general errors is always appreciated. So are changes that expand on key ideas or correct errors in logic phrasing or otherwise. If your ambitions are greater, however, and you want to add completely new content to the site — like a new tutorial on using Kendo UI with an Atari 2600, for instance — we suggest you contact a member of the team first (or enter an issue!) to vet your idea. [Burke Holland](https://twitter.com/burkeholland), [Todd Anglin](https://twitter.com/toddanglin) and [Brandon Satrom](https://twitter.com/brandonsatrom) would all be happy to hear your idea and offer advice.
    - Each document in this repo contains a section of YAML Front Matter at the very top. This content, which looks like the text below, is used by our auto-import tool when content is processed for the live documentation site. Please don't edit the content in this section of a document.

        ```yaml
        ---
        title: Grid
        page_title: Configuration, methods and events of Kendo UI Grid
        description: Code examples for Grid UI widget configuration, learn how to use methods and which events to set once the grid UI widget detail is initialized and expanded.
        ---
        ```

    - When adding content or making changes, please use only standard Markdown syntax, and make to preview your additions or changes before sending us a pull request. You can use an online tool like [Dillinger.io](https://dillinger.io/) or [Marked 2](https://marked2app.com/) on OSX to view what your changes will look like when ported to HTML.


    Once you've made your changes, commit, pull, merge, push and [send us a pull request](https://help.github.com/articles/using-pull-requests)! We — and Kendo UI users everywhere — thank you for making our docs the best front-end library documentation on the web!

## Local Generation

You can generate a static website from the Kendo UI the documentation and browse it locally. You can check the prerequisites and steps to build here: https://github.com/telerik/docs-seed/#local-setup. 

## License

The Kendo UI Documentation is licensed under an MIT license. This license applies to the markdown (.md) files in this site **ONLY**, and does not convey, override or modify any existing licenses covering the runtime source and components of Kendo UI. For information about available licensed for the Kendo UI Library, visit our [license page](https://www.telerik.com/purchase/license-agreement/kendo-ui-complete).

### MIT License

*Copyright © 2012-2021 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.*

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
