---
title: Update Field in All Child Nodes
page_title: Update Field in All Child Nodes | Kendo UI TreeList
description: "Learn how to update all child nodes recursively, propagating the state of a row in a Kendo UI TreeList widget."
slug: howto_updatefieldinallchildnodes_treelist
---

# Update Field in All Child Nodes

The example below demonstrates how to update all child nodes recursively, propagating the state of a row in a Kendo UI TreeList widget.

###### Example

```html
  <div id="treelist"></div>

  <script>
    var dataSource = new kendo.data.TreeListDataSource({
      data: [
        { id:  1, Name: "Daryl Sweeney", Position: "CEO", Phone: "(555) 924-9726", parentId: null },
        { id:  2, Name: "Guy Wooten", Position: "Chief Technical Officer", Phone: "(438) 738-4935", parentId: null },
        { id:  3, Name: "Priscilla Frank", Position: "Chief Product Officer", Phone: "(217) 280-5300", parentId: 1 },
        { id:  4, Name: "Ursula Holmes", Position: "EVP, Product Strategy", Phone: "(370) 983-8796", parentId: 3 },
        { id: 11, Name: "Hyacinth Hood", Position: "Team Lead", Phone: "(889) 345-2438", parentId: 32 },
        { id: 24, Name: "Melvin Carrillo", Position: "Director, Developer Relations", Phone: "(344) 496-9555", parentId: 3 },
        { id: 29, Name: "Martha Chavez", Position: "Developer Advocate", Phone: "(140) 772-7509", parentId: 24 },
        { id: 30, Name: "Oren Fox", Position: "Developer Advocate", Phone: "(714) 284-2408", parentId: 24 },
        { id: 32, Name: "Buffy Weber", Position: "VP, Engineering", Phone: "(699) 838-6121", parentId: 2 },
        { id: 41, Name: "Amos Barr", Position: "Developer Advocate", Phone: "(996) 587-8405", parentId: 24 },
        { id: 42, Name: "Gage Daniels", Position: "Software Architect", Phone: "(107) 290-6260", parentId: 32 },
        { id: 43, Name: "Constance Vazquez", Position: "Director, Engineering", Phone: "(800) 301-1978", parentId: 32 },
        { id: 46, Name: "Darrel Solis", Position: "Team Lead", Phone: "(327) 977-0216", parentId: 43 },
        { id: 47, Name: "Brian Yang", Position: "Senior Software Developer", Phone: "(565) 146-5435", parentId: 46 },
        { id: 50, Name: "Lillian Bradshaw", Position: "Software Developer", Phone: "(323) 509-3479", parentId: 46 },
        { id: 60, Name: "Akeem Carr", Position: "Junior Software Developer", Phone: "(738) 136-2814", parentId: 11 },
        { id: 78, Name: "Rinah Simon", Position: "Software Developer", Phone: "(285) 912-5271", parentId: 11 }
      ],
      change: function propagate(e) {
        var node = e.items && e.items[0];
        var propagatedField = "checked";

        // only propagate changes to the desired field
        if (!node || e.field != propagatedField) {
          return;
        }

        this.unbind("change", propagate);

        function update(dataSource, nodes, field, state) {
          for (var i = 0; i < nodes.length; i++) {
            nodes[i].set(field, state);

            update(dataSource, dataSource.childNodes(nodes[i]), field, state);
          }
        }

        update(this, this.childNodes(node), propagatedField, node[propagatedField]);

        this.bind("change", propagate);
      }
    });

    $("#treelist").kendoTreeList({
      dataSource: dataSource,
      height: 540,
      columns: [
        { template: "<input type='checkbox' data-bind='checked: checked' />", width: 32 },
        { field: "Position", expandable: true },
        { field: "Name" },
        { field: "Phone" }
      ],
      dataBound: function() {
        var view = this.dataSource.view();
        this.items().each(function(index, row) {
          kendo.bind(row, view[index]);
        });
      }
    });
  </script>
```

## See Also

Other articles on Kendo UI TreeList:

* [JavaScript API Reference](/api/javascript/ui/treelist)
* [How to Hide Edit Fields on Different Levels]({% slug howto_hideeditfieldsondifferentlevels_treelist %})
* [How to Show Checkbox Column]({% slug howto_showcheckboxcolumn_treelist %})
* [How to Show Context Menu]({% slug howto_showcontextmenu_treelist %})
* [How to Update Field in All Child Nodes in AgularJS]({% slug howto_updatefieldinallchildnodes_angularjs_treelist %})
