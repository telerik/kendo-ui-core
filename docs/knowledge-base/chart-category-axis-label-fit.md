---
title: Configure the CategoryAxis Labels of the Chart to Fit
page_title: Prevent CategoryAxis Label Overlap | Kendo UI Chart for jQuery
description: An example on how to display the CategoryAxis labels of the Kendo UI Chart without any overlapping.
type: how-to
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

How can I prevent the `categoryAxis` of the Kendo UI Chart from having clustered labels?   

## Solution

Due to the width of the Chart and depending on the size of its labels, the labels can overlap.

To work around this issue, use any of the following approaches:
* [Rotating the labels](#rotating-the-labels)
* [Using a label template](#using-lable-templates)
* [Reducing the number of the rendered labels](#reducing-the-number-of-displayed-labels)

### Rotating the Labels

By changing the angle using [categoryAxis.labels.rotation.angle](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.rotation.angle), each category name can fit on the same line while not overlapping each other.

You can fit the name of each category on the same line and avoid the overlap by changing the angle through the [`categoryAxis.labels.rotation.angle`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.rotation.angle) setting.

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

The following example demonstrates how to rotate the labels of the Kendo UI Column Chart.

```dojo
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

### Using Label Templates

You can configure the template to display the label in a specific position or to entirely change its formatting.

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

The following example demonstrates how to render each label into a new line by using the [`categoryAxis.labels.template`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.template) property.

```dojo
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

### Reducing the Number of Displayed Labels

You can decrease the number of labels that are shown by using the [`step`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.step) and [`skip`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.skip) properties.

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

The following example demonstrates how to skip the first five labels and render every other label in a Kendo UI Column Chart.

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

* [Methods Demo of the Kendo UI Chart](https://demos.telerik.com/kendo-ui/chart-api/index)
* [API Reference of categoryAxis.labels.rotation.angle](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.rotation.angle)
* [API Reference of categoryAxis.labels.template](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.template)
* [API Reference categoryAxis.labels.step](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.step)
* [API Reference of categoryAxis.labels.skip](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryAxis.labels.skip)
