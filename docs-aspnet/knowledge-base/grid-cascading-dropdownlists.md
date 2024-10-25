---
title: Editing Grid with Cascading DropDownLists
description: A reference on how to implement cascading DropDownLists for editing records in Telerik UI for {{ site.framework }} Grid component.
type: how-to
page_title: Grid Editing with Cascading DropDownLists
slug: grid-cascading-dropdownlists
tags: grid, edit, mvc, cascading, dropdownlist
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
</table>

## Description

How can I implement cascading DropDownLists for editing rows in Telerik UI for {{ site.framework }} Grid component? 

## Solution

The Grid provides 3 editing modes - InCell, InLine and PopUp. Usually, in order for the cascading widgets to work, they both (or more) have to be rendered at the same time.

Therefore, for Inline and PopUp editing modes you can check the following sample:

https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/grid-editing-cascading-dropdownlist 

However, for InCell editing mode, the only viable approach is demonstrated in this sample:

https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/grid-incell-editing-with-cascading-dropdownlist

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

