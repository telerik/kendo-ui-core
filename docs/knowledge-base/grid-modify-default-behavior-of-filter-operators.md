---
title: Modify Default Behavior of Filter Operators
description: How to Modify Default Behavior of Filter Operators
type: how-to
page_title: ow to Modify Default Behavior of Filter Operators | Kendo UI Grid for jQuery
slug: grid-modify-default-behavior-of-filter-operators
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how to change the default functionality of the filtering operators. In this specific case, the **doesnotcontain** and **lessthan** operators are modified to return only values which are not null.

## Solution

```dojo
  

    <div id="grid"></div>
    <script>
      kendo.data.Query.filterExpr = function (e) {

        var expression = e;
        var expressions = [],
            logic = { and: " && ", or: " || " },
            idx,
            length,
            filter,
            expr,
            fieldFunctions = [],
            operatorFunctions = [],
            field,
            operator,
            filters = expression.filters,
            dateRegExp = /^\/Date\((.*?)\)\/$/;

        var operators = (function () {

          function quote(str) {
            if (typeof str == "string") {
              str = str.replace(/[\r\n]+/g, "");
            }
            return JSON.stringify(str);
          }

          function textOp(impl) {
            return function (a, b, ignore, accentFoldingFiltering) {
              var aOrg = a;
              b += "";
              if (ignore) {
                a = "(" + a + " + '').toString()" + ((accentFoldingFiltering) ? ".toLocaleLowerCase('" + accentFoldingFiltering + "')" : ".toLowerCase()");
                b = ((accentFoldingFiltering) ? b.toLocaleLowerCase(accentFoldingFiltering) : b.toLowerCase());
              }
              return impl(a, quote(b), ignore, aOrg);
            };
          }

          function operator(op, a, b, ignore, accentFoldingFiltering) {
            if (b != null) {
              if (typeof b === "string") {
                var date = dateRegExp.exec(b);
                if (date) {
                  b = new Date(+date[1]);
                } else if (ignore) {
                  b = quote(((accentFoldingFiltering) ? b.toLocaleLowerCase(accentFoldingFiltering) : b.toLowerCase()));
                  a = "((" + a + " || '')+'')" + ((accentFoldingFiltering) ? ".toLocaleLowerCase('" + accentFoldingFiltering + "')" : ".toLowerCase()");
                } else {
                  b = quote(b);
                }
              }

              if (b.getTime) {
                //b looks like a Date
                a = "(" + a + "&&" + a + ".getTime?" + a + ".getTime():" + a + ")";
                b = b.getTime();
              }
            }

            return a + " " + op + " " + b;
          }

          function getMatchRegexp(pattern) {
            // take a pattern, as supported by Excel match filter, and
            // convert it to the equivalent JS regular expression.
            // Excel patterns support:
            //
            //   * - match any sequence of characters
            //   ? - match a single character
            //
            // to match a literal * or ?, they must be prefixed by a tilde (~)
            for (var rx = "/^", esc = false, i = 0; i < pattern.length; ++i) {
              var ch = pattern.charAt(i);
              if (esc) {
                rx += "\\" + ch;
              } else if (ch == "~") {
                esc = true;
                continue;
              } else if (ch == "*") {
                rx += ".*";
              } else if (ch == "?") {
                rx += ".";
              } else if (".+^$()[]{}|\\/\n\r\u2028\u2029\xA0".indexOf(ch) >= 0) {
                rx += "\\" + ch;
              } else {
                rx += ch;
              }
              esc = false;
            }
            return rx + "$/";
          }

          return {
            quote: function (value) {
              if (value && value.getTime) {
                return "new Date(" + value.getTime() + ")";
              }
              return quote(value);
            },
            eq: function (a, b, ignore, accentFoldingFiltering) {
              return operator("==", a, b, ignore, accentFoldingFiltering);
            },
            neq: function (a, b, ignore, accentFoldingFiltering) {
              return operator("!=", a, b, ignore, accentFoldingFiltering) + " && (" + a + " != null)";
            },
            gt: function (a, b, ignore) {
              return operator(">", a, b, ignore);
            },
            gte: function (a, b, ignore) {
              return operator(">=", a, b, ignore);
            },
            lt: function (a, b, ignore) {
              //return operator("<", a, b, ignore);
              return operator("<", a, b, ignore) + " && (" + a + " != null)";
            },
            lte: function (a, b, ignore) {
              return operator("<=", a, b, ignore) + " && (" + a + " != null)";
            },
            startswith: textOp(function (a, b) {
              return a + ".lastIndexOf(" + b + ", 0) == 0";
            }),
            doesnotstartwith: textOp(function (a, b) {
              return a + ".lastIndexOf(" + b + ", 0) == -1";
            }),
            endswith: textOp(function (a, b) {
              var n = b ? b.length - 2 : 0;
              return a + ".indexOf(" + b + ", " + a + ".length - " + n + ") >= 0";
            }),
            doesnotendwith: textOp(function (a, b) {
              var n = b ? b.length - 2 : 0;
              return a + ".indexOf(" + b + ", " + a + ".length - " + n + ") < 0";
            }),
            contains: textOp(function (a, b) {
              return a + ".indexOf(" + b + ") >= 0";
            }),
            doesnotcontain: textOp(function (a, b, ignore, aOrg) {
              //return a + ".indexOf(" + b + ") == -1";
              return "((" + a + ".indexOf(" + b + ") == -1) && (" + aOrg + " != null))";
            }),
            matches: textOp(function (a, b) {
              b = b.substring(1, b.length - 1);
              return getMatchRegexp(b) + ".test(" + a + ")";
            }),
            doesnotmatch: textOp(function (a, b) {
              b = b.substring(1, b.length - 1);
              return "!" + getMatchRegexp(b) + ".test(" + a + ")";
            }),
            isempty: function (a) {
              return a + " === ''";
            },
            isnotempty: function (a) {
              return a + " !== ''";
            },
            isnull: function (a) {
              return "(" + a + " == null)";
            },
            isnotnull: function (a) {
              return "(" + a + " != null)";
            },
            isnullorempty: function (a) {
              return "(" + a + " === null) || (" + a + " === '')";
            },
            isnotnullorempty: function (a) {
              return "(" + a + " !== null) && (" + a + " !== '')";
            }
          };
        })();

        for (idx = 0, length = filters.length; idx < length; idx++) {
          filter = filters[idx];
          field = filter.field;
          operator = filter.operator;

          if (filter.filters) {

            expr = kendo.data.Query.filterExpr(filter);
            //Nested function fields or operators - update their index e.g. __o[0] -> __o[1]
            filter = expr.expression
              .replace(/__o\[(\d+)\]/g, function (match, index) {
              index = +index;
              return "__o[" + (operatorFunctions.length + index) + "]";
            })
              .replace(/__f\[(\d+)\]/g, function (match, index) {
              index = +index;
              return "__f[" + (fieldFunctions.length + index) + "]";
            });

            operatorFunctions.push.apply(operatorFunctions, expr.operators);
            fieldFunctions.push.apply(fieldFunctions, expr.fields);
          } else {
            if (typeof field === "function") {
              expr = "__f[" + fieldFunctions.length + "](d)";
              fieldFunctions.push(field);
            } else {
              expr = kendo.expr(field);
            }

            if (typeof operator === "function") {
              filter = "__o[" + operatorFunctions.length + "](" + expr + ", " + operators.quote(filter.value) + ")";
              operatorFunctions.push(operator);
            } else {
              filter = operators[(operator || "eq").toLowerCase()](expr, filter.value, filter.ignoreCase !== undefined ? filter.ignoreCase : true, expression.accentFoldingFiltering);
            }
          }

          expressions.push(filter);
        }

        return { expression: "(" + expressions.join(logic[expression.logic]) + ")", fields: fieldFunctions, operators: operatorFunctions };
      };

      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age", filterable: {multi:true}},
          { field: "joindate", filterable : {
            extra: true, //provides 2 inputs (useful for filering within a range of dates)
            ui: function(element) {
              element.kendoDatePicker({
                format: "MM/dd/yyyy" //format within filter menu
              })
            },
            operators: {
              date: {
                eq: "Equal To",
                neq: "Not Equal To",
                gte: "After Or Equal To",
                gt: "After",
                lte: "Before Or Equal To",
                lt: "Before",
                isnull: "Blank",
                isnotnull: "Not Blank"
              }, 
              string: {
                eq: "Equal To",
                neq: "Not Equal To",
                gte: "After Or Equal To",
                gt: "After",
                lte: "Before Or Equal To",
                lt: "Before",
                isnull: "Blank",
                isnotnull: "Not Blank"
              }
            }
          }, format : "{0:MM/dd/yyyy}"
          },
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30, joindate: '10/01/2020' },
            { id: 2, name: "John Doe", age: 33, joindate: '10/05/2020' },
            { id: 3, name: "Mark Stoinis", age: 33, joindate: '10/10/2020' },
            { id: 4, name: null, age: 35, joindate: '10/15/2020' },
            { id: 5, name: "Sama", age: null, joindate: '' }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                name: { type: "string" },
                age: { type: "number" },
                joindate: {type: "date"}
              }
            }
          }
        },
        filterable: {
          extra: false
        },
      });
    </script>  

``` 
