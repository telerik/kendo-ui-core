---
title: Cascade Based on Parent DataField
description: An example on how to filter a child collection of Kendo UI DropDownLists based on a parent property that is not the dataValueField.
type: how-to
page_title: Filtering on Specific Parent Property | Kendo UI DropDownList
slug: dropdownlist-filter-child-collection-cascading
tags: dropdownlist, filter, child, collection, cascading, datavaluefield, parent, datafield
ticketid: 1412636
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>DropDownList for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I filter my child collection based on a property that is not the parent `dataValueField` in my cascading Kendo UI DropDownLists?

## Solution

You can filter a child collection by another `datafield` by using the [`cascadeFromParentField` property](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/configuration/cascadefromparentfield).  

```javascript
      $("#parent").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
          { name: "Parent1", id: 1, parentTest: 92 },
          { name: "Parent2", id: 2, parentTest: 91 }
        ]
      });

      $("#child").kendoDropDownList({
        cascadeFrom: "parent",
        cascadeFromField: "childTest",
        cascadeFromParentField: "parentTest",
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
          { name: "Child1", id: 1, parentId: 1, childTest: 91 },
          { name: "Child2", id: 2, parentId: 2, childTest: 91 },
          { name: "Child3", id: 3, parentId: 1, childTest: 92 },
          { name: "Child4", id: 4, parentId: 2, childTest: 93 },
        ]
      });
```

```dojo
    <input id="parent" />
    <input id="child" />

    <script>
      $("#parent").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
          { name: "Parent1", id: 1, parentTest: 92 },
          { name: "Parent2", id: 2, parentTest: 91 }
        ]
      });

      $("#child").kendoDropDownList({
        cascadeFrom: "parent",
        cascadeFromField: "childTest",
        cascadeFromParentField: "parentTest",
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
          { name: "Child1", id: 1, parentId: 1, childTest: 91 },
          { name: "Child2", id: 2, parentId: 2, childTest: 91 },
          { name: "Child3", id: 3, parentId: 1, childTest: 92 },
          { name: "Child4", id: 4, parentId: 2, childTest: 93 },
        ]
      });
    </script>
```

## See Also

* [API Reference of cascadeFromParentField](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/configuration/cascadefromparentfield)
