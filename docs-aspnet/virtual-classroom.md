---
title: Online Technical Training
page_title: Online Technical Training
description: "Get started with {{ site.product_short }} and learn about the Online Technical Training free on-demand training program exclusive to active  license holders."
slug: virtualclass_uiforcore
position: 20
---
{% if site.core %}
  
# Online Technical Training

Telerik UI for ASP.NET Core includes a technical online training available to both active trial users and active license holders.

The training format and syllabus allow learning at your own pace and referring to topics of interest when needed. It provides a great way to onboard new team members and boosts developer productivity with hands-on experience for building a real-world application, along with multiple how-to topics and code examples.

The Telerik UI for ASP.NET Core technical online training has an approximate duration of 2,5 hours, split into seven modules with the following learning path:

* **Module 1: Introduction** (Resources, Prerequisites, Tour of Demo Application for Telerik UI for ASP.NET Core)
* **Module 2: Installing Telerik UI for ASP.NET Core** (Installation and Creating First Telerik UI for ASP.NET Core application, Solution structure)
* **Module 3: UI for ASP.NET Core Project Fundamentals** (Server-side setup, Tag and HTML helpers, Script rendering, Scripts and Styles)
* **Module 4: Basic UI ASP.NET Core Components**
* **Module 5: Charts in ASP.NET Core Applications**
* **Module 6: Grid in ASP.NET Core Applications**
* **Module 7: Styling and Theming in ASP.NET Core Applications** (Built-In Themes, Creating Custom Theme, Styling and Icons)

To get started with the Telerik UI for ASP.NET Core online training, visit our learning portal with all [All-Progress Products Virtual Classroom Courses](https://learn.telerik.com/learn) or jump directly to [Telerik UI for ASP.NET Core Online Training](https://learn.telerik.com/learn/course/external/view/elearning/8/telerik-ui-for-aspnet-core).

{% else %}
    {% assign VirtualClassroom = "https://learn.telerik.com/learn/course/external/view/elearning/3/telerik-ui-for-aspnet-mvc" %}


# Online Technical Training

The Progress<sup>®</sup> Virtual Classroom contains product-focused training courses and represent a free on-demand technical training program exclusive to active license holders.

Each session provides practical knowledge combined with helpful approaches to application development which are suitable for both junior and senior developers.

The Online Technical Training program aims at:
* Empowering your developer productivity.
* Helping you gain new skills.
* Growing your product know-how.
* Improving your getting started experience.
* Letting you learn at your own pace.
* Letting you choose your own learning path.
* Exploring common development practices, code examples, and sample applications.

To get started with the trainings, refer to:
* [{{ site.product_short }} Technical Online Training]({{ VirtualClassroom }})
* [All-Progress Products Online Technical Trainings](https://learn.telerik.com/learn)
{% endif %}
