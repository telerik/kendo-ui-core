---
title: Filtering array column using Multiselect
page_title: Filtering array column using Multiselect
description: Filtering array column using Multiselect
---

# Filtering array column using Multiselect

The following runnable sample demonstrates how to enable filtering on column which is bind to array field using the Multiselect widget.

#### Example:

```html

    <h3>Filter array field using custom filter operator:</h3>
    <div id="grid"></div>
    
    <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              transport: {
                read: function(request) {
                  request.success([{
                    Country: "BG",
                    ContactTitle: "title 2",
                    id: 1,
                    Ids: [1, 2]
                  }, {
                    Country: "DE",
                    ContactTitle: "title 1",
                    id: 1,
                    Ids: [3, 4]
                  },{
                    Country: "UK",
                    ContactTitle: "title 3",
                    id: 1,
                    Ids: [2, 3]
                  }]);
                }
              },
              pageSize: 20
            },
            height: 550,
            groupable: true,
            sortable: true,
            filterable: true,
            //use the FilterMenuInit event of the Grid:
            filterMenuInit: onFilterMenuInit,
            pageable: {
              refresh: true,
              pageSizes: true,
              buttonCount: 5
            },
            columns: [{
              field: "ContactTitle",
              title: "Contact Title"
            }, {
              field: "Country",
              width: 150
            }, {
              field: "Ids",
               template: "#= Ids.join('</br>')#"
            }]
          });
        });
        
        function onFilterMenuInit(e) {
          if (e.field == "Ids") {
            initMultiSelectFilter.call(this, e);
          }
        }
        
        function initMultiSelectFilter(e) {
          var popup = e.container.data("kendoPopup");
          var dataSource = this.dataSource;
          var field = e.field;
          
          var helpTextElement = e.container.children(":first").children(":first");
          helpTextElement.nextUntil(":has(.k-button)").remove();
          
           var element = $("<select></select>").insertAfter(helpTextElement).kendoMultiSelect({
              dataSource: [{
                value: 1,
                text: "id 1"
              }, {
                value: 2,
                text: "id 2"
              }, {
                value: 3,
                text: "id 3"
              }, {
                value: 4,
                text: "id 4"
              }],
              dataTextField: "text",
              dataValueField: "value"
            });
          
          e.container.find("[type='submit']").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            
            var editorValue = element.getKendoMultiSelect().value();
                var operator = function(item, value) {
                  var found = true;
                  for (var i = 0; i < editorValue.length; i++) {
                    if (item.indexOf(editorValue[i]) < 0) {
                      found = false;
                    }
                  }
                  return found;
                };
        
                dataSource.filter({
                  operator: operator,
                  field: "Ids"
                });
            
            
            popup.close();
          })
        }
    </script>
```