---
title: Use Nested Chart
page_title: Use Nested Chart | Kendo UI Grid
description: "Learn how to nest a Kendo UI Chart inside the Grid template."
slug: howto_use_nested_charts_grid
---

# Use Nested Chart

The example below demonstrates how to nest a Kendo UI Chart inside the Grid template.

###### Example

```html
    <script>
      var firstNames = ["Nancy", "Andrew", "Janet", "Margaret", "Steven", "Michael", "Robert", "Laura", "Anne", "Nige"],
          lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan", "Suyama", "King", "Callahan", "Dodsworth", "White"],
          cities = ["Seattle", "Tacoma", "Kirkland", "Redmond", "London", "Philadelphia", "New York", "Seattle", "London", "Boston"],
          titles = ["Accountant", "Vice President, Sales", "Sales Representative", "Technical Support", "Sales Manager", "Web Designer",
                    "Software Developer", "Inside Sales Coordinator", "Chief Techical Officer", "Chief Execute Officer"],
          birthDates = [new Date("1948/12/08"), new Date("1952/02/19"), new Date("1963/08/30"), new Date("1937/09/19"), new Date("1955/03/04"), new Date("1963/07/02"), new Date("1960/05/29"), new Date("1958/01/09"), new Date("1966/01/27"), new Date("1966/03/27")];

      function createRandomData(count) {
        var data = [],
            now = new Date();
        for (var i = 0; i < count; i++) {
          var firstName = firstNames[Math.floor(Math.random() * firstNames.length)],
              lastName = lastNames[Math.floor(Math.random() * lastNames.length)],
              city = cities[Math.floor(Math.random() * cities.length)],
              title = titles[Math.floor(Math.random() * titles.length)],
              birthDate = birthDates[Math.floor(Math.random() * birthDates.length)],
              age = now.getFullYear() - birthDate.getFullYear(),
              tableValues = [];

          var projLength = Math.floor(Math.random()*10);
          for(var t=0;t<projLength;t++){
            tableValues.push({year:2005+t,value:Math.floor(Math.random()*1000)})
          }

          data.push({
            Id: i + 1,
            FirstName: firstName,
            LastName: lastName,
            City: city,
            Title: title,
            BirthDate: birthDate,
            Age: age,
            tableValues:tableValues
          });
        }
        return data;
      }
    </script>
    <div id="grid"></div>
    <script>
      $(document).ready(function() {
        $("#grid").kendoGrid({
          dataSource: {
            data: createRandomData(50),
            pageSize: 10
          },
          groupable: true,
          sortable: true,
          pageable: {
            refresh: true,
            pageSizes: true
          },
          dataBound:function(){
            var grid = this;
            $(".chart").each(function(){
              var chart = $(this);
              var tr = chart.closest('tr');
              var model = grid.dataItem(tr);
              chart.kendoChart({
                legend:{
                  visible:false
                },
                dataSource: {
                  data: model.tableValues
                },
                series: [{
                  field: "value",
                  name: "United States"
                }],
                valueAxis: {
                  labels: {
                    format: "{0}$"
                  }
                },
                categoryAxis: {
                  field: "year"
                },

                tooltip: {
                  visible: true,
                  format: "{0}$"
                }
              });
            })
          },
          columns: [ {
            field: "FirstName",
            width: 90,
            title: "First Name"
          } , {
            field: "LastName",
            width: 90,
            title: "Last Name"
          } , {
            width: 100,
            field: "City"
          } , {
            field: "Title"
          } , {
            template:'<div class="chart" style="height:200px"></div>'   ,
            width:350
          },{
            field: "BirthDate",
            title: "Birth Date",
            template: '#= kendo.toString(BirthDate,"dd MMMM yyyy") #'
          } , {
            width: 50,
            field: "Age"
          }]
        });
      });
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Filter Array Columns Using MultiSelect]({% slug howto_filetr_array_columns_using_multiselect_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
