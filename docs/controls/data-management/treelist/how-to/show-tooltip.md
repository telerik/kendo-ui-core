---
title: Show Extra Information in Tooltip
page_title: Show Extra Information in Tooltip | Kendo UI TreeList
description: "Learn how to show additional information about a Kendo UI TreeList entry by using the Kendo UI Tooltip widget."
slug: howto_showtooltip_treelist
---

# Show Extra Information in Tooltip

Sometimes you might need to show additional information about an entry in a Kendo UI TreeList.

A possible way to achieve this behavior is to use a Kendo UI Tooltip that displays the information when the user hovers with the mouse over the TreeList node.

The example below demonstrates how to customize the information displayed in the Tooltip depending on the respective data item fields.

###### Example

```html
  <div id="treelist"></div>
  <script>
    $(document).ready(function () {
      var dataSource = new kendo.data.TreeListDataSource({
        data: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", Phone: "(555) 924-9726", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", Phone: "(438) 738-4935", parentId: 1 },
          { id: 32, Name: "Buffy Weber", Position: "VP, Engineering", Phone: "(699) 838-6121", parentId: 2 },
          { id: 11, Name: "Hyacinth Hood", Position: "Team Lead", Phone: "(889) 345-2438", parentId: 32 },
          { id: 60, Name: "Akeem Carr", Position: "Junior Software Developer", Phone: "(738) 136-2814", parentId: 11 },
          { id: 78, Name: "Rinah Simon", Position: "Software Developer", Phone: "(285) 912-5271", parentId: 11 },
          { id: 42, Name: "Gage Daniels", Position: "Software Architect", Phone: "(107) 290-6260", parentId: 32 },
          { id: 43, Name: "Constance Vazquez", Position: "Director, Engineering", Phone: "(800) 301-1978", parentId: 32 },
          { id: 46, Name: "Darrel Solis", Position: "Team Lead", Phone: "(327) 977-0216", parentId: 43 },
          { id: 47, Name: "Brian Yang", Position: "Senior Software Developer", Phone: "(565) 146-5435", parentId: 46 },
          { id: 50, Name: "Lillian Bradshaw", Position: "Software Developer", Phone: "(323) 509-3479", parentId: 46 },
          { id: 51, Name: "Christian Palmer", Position: "Technical Lead", Phone: "(490) 421-8718", parentId: 46 },
          { id: 55, Name: "Summer Mosley", Position: "QA Engineer", Phone: "(784) 962-2301", parentId: 46 },
          { id: 56, Name: "Barry Ayers", Position: "Software Developer", Phone: "(452) 373-9227", parentId: 46 },
          { id: 59, Name: "Keiko Espinoza", Position: "Junior QA Engineer", Phone: "(226) 600-5305", parentId: 46 },
          { id: 61, Name: "Candace Pickett", Position: "Support Officer", Phone: "(120) 117-7475", parentId: 46 },
          { id: 63, Name: "Mia Caldwell", Position: "Team Lead", Phone: "(848) 636-6470", parentId: 43 },
          { id: 65, Name: "Thomas Terry", Position: "Senior Enterprise Support Officer", Phone: "(764) 831-4248", parentId: 63 },
          { id: 67, Name: "Ruth Downs", Position: "Senior Software Developer", Phone: "(138) 991-1440", parentId: 63 },
          { id: 70, Name: "Yasir Wilder", Position: "Senior QA Enginner", Phone: "(759) 701-8665", parentId: 63 },
          { id: 71, Name: "Flavia Short", Position: "Support Officer", Phone: "(370) 133-9238", parentId: 63 },
          { id: 74, Name: "Aaron Roach", Position: "Junior Software Developer", Phone: "(958) 717-9230", parentId: 63 },
          { id: 75, Name: "Eric Russell", Position: "Software Developer", Phone: "(516) 575-8505", parentId: 63 },
          { id: 76, Name: "Cheyenne Olson", Position: "Software Developer", Phone: "(241) 645-0257", parentId: 63 },
          { id: 77, Name: "Shaine Avila", Position: "UI Designer", Phone: "(844) 435-1360", parentId: 63 },
          { id: 81, Name: "Chantale Long", Position: "Senior QA Enginner", Phone: "(252) 419-6891", parentId: 63 },
          { id: 83, Name: "Dane Cruz", Position: "Junior Software Developer", Phone: "(946) 701-6165", parentId: 63 },
          { id: 84, Name: "Regan Patterson", Position: "Technical Writer", Phone: "(265) 946-1765", parentId: 63 },
          { id: 85, Name: "Drew Mckay", Position: "Senior Software Developer", Phone: "(327) 293-0162", parentId: 63 },
          { id: 88, Name: "Bevis Miller", Position: "Senior Software Developer", Phone: "(525) 557-0169", parentId: 63 },
          { id: 89, Name: "Bruce Mccarty", Position: "Support Officer", Phone: "(936) 777-8730", parentId: 63 },
          { id: 90, Name: "Ocean Blair", Position: "Team Lead", Phone: "(343) 586-6614", parentId: 43 },
          { id: 91, Name: "Guinevere Osborn", Position: "Software Developer", Phone: "(424) 741-0006", parentId: 90 },
          { id: 92, Name: "Olga Strong", Position: "Graphic Designer", Phone: "(949) 417-1168", parentId: 90 },
          { id: 93, Name: "Robert Orr", Position: "Support Officer", Phone: "(977) 341-3721", parentId: 90 },
          { id: 95, Name: "Odette Sears", Position: "Senior Software Developer", Phone: "(264) 818-6576", parentId: 90 },
          { id: 45, Name: "Zelda Medina", Position: "QA Architect", Phone: "(563) 359-6023", parentId: 32 },
          { id: 3, Name: "Priscilla Frank", Position: "Chief Product Officer", Phone: "(217) 280-5300", parentId: 1 },
          { id: 4, Name: "Ursula Holmes", Position: "EVP, Product Strategy", Phone: "(370) 983-8796", parentId: 3 },
          { id: 24, Name: "Melvin Carrillo", Position: "Director, Developer Relations", Phone: "(344) 496-9555", parentId: 3 },
          { id: 29, Name: "Martha Chavez", Position: "Developer Advocate", Phone: "(140) 772-7509", parentId: 24 },
          { id: 30, Name: "Oren Fox", Position: "Developer Advocate", Phone: "(714) 284-2408", parentId: 24 },
          { id: 41, Name: "Amos Barr", Position: "Developer Advocate", Phone: "(996) 587-8405", parentId: 24 }
        ],

        schema: {
          model: {
            id: "id",
            expanded: true
          }
        }
      });

      var treelist = $("#treelist").kendoTreeList({
        dataSource: dataSource,
        height: 540,
        columns: [
          { field: "Position" },
          { field: "Name" },
          { field: "Phone" }
        ]
      }).data('kendoTreeList');

      $("#treelist").kendoTooltip({
        filter: 'td',
        content: function(e) {
          var targetRow = $(e.target).closest('tr');
          var dataItem = treelist.dataItem(targetRow);
          return dataItem.Name + ', Position: ' + dataItem.Position;
        }
      });
    });
  </script>
```

## See Also

Other articles on the Kendo UI TreeList:

* [JavaScript API Reference](/api/javascript/ui/treelist)
* [How to Update Field in All Child Nodes]({% slug howto_updatefieldinallchildnodes_treelist %})

For more runnable examples on the Kendo UI TreeList, browse the [**How To** documentation folder]({% slug howto_updatefieldinallchildnodes_angularjs_treelist %}).
