---
title: Configure the CategoryAxis Labels to Fit
description: An example demonstrating how to display the CategoryAxis labels without any overlapping
type: how-to
page_title: Preventing CategoryAxis Label Overlap | Kendo UI Chart
slug: chart-category-axis-label-fit
tags: chart, category, axis, label, fit
ticketid: 1179489
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.620</td>
 </tr>
</table>

## Description

How can I prevent the Kendo UI Chart's categoryAxis from having clustered labels?   

## Solution

Due to the width of the chart, the labels can overlap based on their size.  However, there are a few ways you can get a preferred appearance.

**1.  Rotate the Label**

By changing the angle using [categoryAxis.labels.rotation.angle](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.rotation.angle), each category name can fit on the same line while not overlapping each other.
```
$("#chart").kendoChart({
  ...
  categoryAxis: {
    field: "cat",
    labels: {
      rotation: {
        angle: 45
      }
   }
  }
});
```
The following demonstrates a Kendo UI Column Chart with rotated labels:
```html
    <div id="example">
      <div class="demo-section k-content">
        <div id="chart"></div>
      </div>
      <script>
        var blogComments = [ {
          "blog": "My blog",
          "cat": "Jul 1",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 2",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 3",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 4",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 5",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 6",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 7",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 8",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 9",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 10",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 11",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 12",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 13",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 14",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 15",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 16",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 17",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 18",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 19",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 20",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 21",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 22",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 23",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 24",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 25",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 26",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 27",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 28",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 29",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 30",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 31",
          "value": 15
        }];

        $("#chart").kendoChart({
          dataSource: {
            data: blogComments
          },
          title: {
            align: "left",
            text: "Comments per day"
          },
          legend: {
            visible: false
          },
          seriesDefaults: {
            type: "column",
            labels: {
              visible: true,
              background: "transparent"
            }
          },
          series: [{
            field: "value",

          }],
          valueAxis: {
            max: 28,

          },
          categoryAxis: {
            field: "cat",
            labels: {
              rotation: {
              	angle: 45
              }
           }
          }
        });

      </script>
    </div>
```

**2.  Use a Label Template** 

The label template can be configured to display the label in a specific placement, or to change its formatting entirely.  
```
$("#chart").kendoChart({
  ...
  categoryAxis: {
    field: "cat",
    labels: {
      template: labelsTemplate
    }
  }
});
 
function labelsTemplate(e) {
  //sets every other label on a new line based on the DataItem's index
  var ds = $("#chart").data("kendoChart").dataSource;
  var index = ds.indexOf(e.dataItem);
  var label = index % 2 !== 0 ? " \n" : "";
  label += e.value
 
  return label;
}
```
This example shows another Kendo UI Column Chart utilizing the [categoryAxis.labels.template property](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.template) to separate each label onto a new line:
```html
    <div id="example">
      <div class="demo-section k-content">
        <div id="chart"></div>
      </div>
      <script>
        var blogComments = [ {
          "blog": "My blog",
          "cat": "Jul 1",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 2",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 3",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 4",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 5",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 6",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 7",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 8",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 9",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 10",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 11",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 12",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 13",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 14",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 15",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 16",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 17",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 18",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 19",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 20",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 21",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 22",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 23",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 24",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 25",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 26",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 27",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 28",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 29",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 30",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 31",
          "value": 15
        }];

        $("#chart").kendoChart({
          dataSource: {
            data: blogComments
          },
          title: {
            align: "left",
            text: "Comments per day"
          },
          legend: {
            visible: false
          },
          seriesDefaults: {
            type: "column",
            labels: {
              visible: true,
              background: "transparent"
            }
          },
          series: [{
            field: "value",

          }],
          valueAxis: {
            max: 28,

          },
          categoryAxis: {
            field: "cat",
            labels: {
              template: labelsTemplate
            }
          }
        });

        function labelsTemplate(e) {
          //sets every other label on a new line based on the DataItem's index
          var ds = $("#chart").data("kendoChart").dataSource;
          var index = ds.indexOf(e.dataItem);
          var label = index % 2 !== 0 ? "&nbsp;\n" : ""; 
          label += e.value

          return label;
        }

      </script>
    </div>
```

**3. Reduce the Amount of Rendered Labels**

The number of labels shown can be minimized with the [step](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.step) and [skip](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.skip) properties.
```
$("#chart").kendoChart({
  ...
  categoryAxis: {
    field: "cat",
    labels: {
      step: 2,
      skip: 5
   }
  }
});
```
This demonstration shows a Kendo UI Column Chart skipping the first five labels and rendering every other one:
```
    <div id="example">
      <div class="demo-section k-content">
        <div id="chart"></div>
      </div>
      <script>
        var blogComments = [ {
          "blog": "My blog",
          "cat": "Jul 1",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 2",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 3",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 4",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 5",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 6",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 7",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 8",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 9",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 10",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 11",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 12",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 13",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 14",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 15",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 16",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 17",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 18",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 19",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 20",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 21",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 22",
          "value": 3
        }, {
          "blog": "My blog",
          "cat": "Jul 23",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 24",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 25",
          "value": 15
        }, {
          "blog": "My blog",
          "cat": "Jul 26",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 27",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 28",
          "value": 15
        },{
          "blog": "My blog",
          "cat": "Jul 29",
          "value": 7
        }, {
          "blog": "My blog",
          "cat": "Jul 30",
          "value": 12
        }, {
          "blog": "My blog",
          "cat": "Jul 31",
          "value": 15
        }];

        $("#chart").kendoChart({
          dataSource: {
            data: blogComments
          },
          title: {
            align: "left",
            text: "Comments per day"
          },
          legend: {
            visible: false
          },
          seriesDefaults: {
            type: "column",
            labels: {
              visible: true,
              background: "transparent"
            }
          },
          series: [{
            field: "value",

          }],
          valueAxis: {
            max: 28,

          },
          categoryAxis: {
            field: "cat",
            labels: {
              step: 2,
              skip: 5
            }
          }
        });

      </script>
    </div>
```

## See Also

* [Kendo UI Chart API - Methods Demo](https://demos.telerik.com/kendo-ui/chart-api/index)
* [categoryAxis.labels.rotation.angle - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.rotation.angle)
* [categoryAxis.labels.template - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.template)
* [categoryAxis.labels.step - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.step)
* [categoryAxis.labels.skip - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.skip)
