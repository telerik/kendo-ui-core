---
title: Use nested chart
page_title: Use nested chart
description: Use nested chart
---

# Use nested Kendo UI chart

The example below demonstrates how nest a Kendo UI Chart inside the grid template

#### Example:

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
