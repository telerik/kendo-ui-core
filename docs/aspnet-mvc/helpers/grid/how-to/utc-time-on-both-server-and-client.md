---
title: Using UTC time on both client and server sides.
description: Using UTC time on both client and server sides.
---

# Using UTC time on both server and client sides.

This project shows how to keep a `DateTime` property in `UTC` format on both server and client sides when using a Grid with Ajax binding and editing.
Every time a date is being retrieved from the database or received from the client, on the server side the DateTime Kind property is left unspecified. The .NET framework implicitly converts such dates to local format.

Similar thing happens on the client side. Browsers convert all dates according to local time when the Date is parsed from Number to Date object.

For examle when you create a JavaScript date like this `new Date(1353397262112)` browsers on the different machinves which use different TimeZone system settings will show different string representations.

In order to keep time in UTC, explicit transformation should be applied to the dates on both client and server sides.

Hence there are two steps to be covered:

1. Use a ViewModel with setter and getter that explicitly set the DateTime Kind to UTC.

```
    private DateTime birthDate;
    public DateTime BirthDate
    {
        get { return this.birthDate; }
        set {
            this.birthDate = new DateTime(value.Ticks, DateTimeKind.Utc);
        }
    }
```

2. Use [requestEnd](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#requestend) event of the DataSource to intercept and replace the incoming Date field with the time difference.

```
    window.onRequestEnd = function(e) {
        if (e.response.Data && e.response.Data.length) {
            var data = e.response.Data;
            if (this.group().length && e.type == "read") {
                handleGroups(data);
            } else {
                loopRecords(data);
            }
        }
    }

    function handleGroups(groups) {
        for (var i = 0; i < groups.length; i++) {
            var gr = groups[i];
            offsetDateFields(gr); //handle the Key variable as well
            if (gr.HasSubgroups) {
                handleGroups(gr.Items)
            } else {
                loopRecords(gr.Items);
            }
        }
    }

    function loopRecords(persons) {
        for (var i = 0; i < persons.length; i++) {
            var person = persons[i];
            offsetDateFields(person);
        }
    }

    function offsetDateFields(obj) {
        for (var name in obj) {
            var prop = obj[name];
            if (typeof (prop) === "string" && prop.indexOf("/Date(") == 0) {
                obj[name] = prop.replace(/\d+/, function (n) {
                    var offsetMiliseconds = new Date(parseInt(n)).getTimezoneOffset() * 60000;
                    return parseInt(n) + offsetMiliseconds
                });
            }
        }
    }
```

[Project - UTC on both client and server sides](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/)
