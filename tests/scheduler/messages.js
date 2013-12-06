(function() {
    var div;

    function getTextFromElement(element){
        return element.clone()
            .children()
            .remove()
            .end()
            .text();
    }

    module("scheduler messages", {
        setup: function() {
            kendo.effects.disable();
            div = $('<div style="width:500px;height:1000px">');
        },
        teardown: function() {
            kendo.destroy(div);
            kendo.effects.enable();
        }
    });

    test("allDay message is changed correctly in day view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            messages: {
                allDay: "custom"
            },
            views: ["day"]
        });

        var allDayText= scheduler.element.find(".k-scheduler-times-all-day").text();
        equal(allDayText, "custom");
    });

    test("allDay message is changed correctly in week view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            messages: {
                allDay: "custom"
            },
            views: ["week"]
        });
        var allDayText= scheduler.element.find(".k-scheduler-times-all-day").text();

        equal(allDayText, "custom");
    });

    test("cancel message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                cancel: "custom"
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var cancelText = $(".k-scheduler-edit-form").find(".k-scheduler-cancel").text();

        equal(cancelText, "custom");
    });

    test("date message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            messages: {
                date: "custom"
            },
            views: ["agenda"]
        });
        var dateText = scheduler.element.find(".k-scheduler-header-wrap th.k-scheduler-datecolumn").text();

        equal(dateText, "custom");
    });

    test("deleteWindowTitle message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                deleteWindowTitle: "custom"
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event .k-si-close").click();
        var deleteWindowTitleText = $(".k-window-title").text();
        $(".k-window .k-i-close").click();

        equal(deleteWindowTitleText, "custom");
    });

    test("destroy message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                destroy: "custom"
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event .k-si-close").click();
        var destroyText = $(".k-window .k-scheduler-delete").text();
        $(".k-window .k-i-close").click();

        equal(destroyText, "custom");
    });

    test("event message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                event: "custom"
            },
            views: ["agenda"]
        });

        var eventText = scheduler.element.find(".k-scheduler-header th:last").text();

        equal(eventText, "custom");
    });

    test("save message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                save: "custom"
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var saveText = $(".k-window").find(".k-scheduler-update").text();

        equal(saveText, "custom");
    });

    test("showWorkDay message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            messages: {
                showWorkDay: "custom"
            },
            views: ["day"]
        });

        var showWorkDayText = scheduler.element.find(".k-scheduler-fullday a").text();

        equal(showWorkDayText, "custom");
    });

    test("showFullDay message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            messages: {
                showFullDay: "custom"
            },
            views: ["day"]
        });
        scheduler.element.find(".k-scheduler-fullday a").click();

        var showFullDayText = scheduler.element.find(".k-scheduler-fullday a").text();

        equal(showFullDayText, "custom");
    });

    test("time message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            messages: {
                time: "custom"
            },
            views: ["agenda"]
        });

        var timeText =  scheduler.element.find(".k-scheduler-timecolumn").text();

        equal(timeText, "custom");
    });

    test("today message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            messages: {
                today: "custom"
            },
            views: ["agenda"]
        });

        var todayText =  scheduler.element.find(".k-nav-today a").text();

        equal(todayText, "custom");
    });

    //scheduler editor messages
    test("editor.allDayEvent message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    allDayEvent: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var allDayEventText = $("label[for=isAllDay]").text();

        equal(allDayEventText, "custom");
    });

    test("editor.description message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    description: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var descriptionText = $("label[for=description]").text();

        equal(descriptionText, "custom");
    });

    test("editor.editorTitle message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    editorTitle: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var editorTitleText = $(".k-window .k-window-title").text();

        equal(editorTitleText, "custom");
    });

    test("editor.end message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    end: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var endText = $("label[for=end]").text();

        equal(endText, "custom");
    });

    test("editor.endTimezone message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    endTimezone: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var endTimezoneText = $("label[for=endTimezone]").text();

        equal(endTimezoneText, "custom");
    });

    test("editor.repeat message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    repeat: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var repeatText = $("label[for=recurrenceRule]").text();

        equal(repeatText, "custom");
    });

    test("editor.separateTimezones message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    separateTimezones: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var separateTimezonesText = $(".k-timezone-toggle").parent().text();

        equal(separateTimezonesText, "custom");
    });

    test("editor.start message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    start: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var startText = $("label[for=start]").text();

        equal(startText, "custom");
    });

    test("editor.startTimezone message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    startTimezone: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var startTimezoneText = $("label[for=startTimezone]").text();

        equal(startTimezoneText, "custom");
    });

    test("editor.timezone message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    timezone: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var timezoneText = $("label[for=timezone]").text();

        equal(timezoneText, "custom");
    });

    test("editor.timezoneEditorButton message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    timezoneEditorButton: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var timezoneEditorButtonText = $("div[data-container-for=timezone] a").text();

        equal(timezoneEditorButtonText, "custom");
    });

    test("editor.timezoneEditorTitle message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    timezoneEditorTitle: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        $("div[data-container-for=timezone] a").click();
        var timezoneEditorTitleText = $(".k-scheduler-timezones").prev().find(".k-window-title").text();

        equal(timezoneEditorTitleText, "custom");
    });

    test("editor.title message is changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                editor: {
                    title: "custom"
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();
        var titleText = $("label[for=title]").text();

        equal(titleText, "custom");
    });

    //scheduler recurrence editor DAILY messages
    test("recurrenceEditor.daily messages are changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                recurrenceEditor: {
                    daily: {
                        repeatEvery: "custom",
                        interval: "custom"
                    }
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();

        var dropDownList = $("[name=recurrenceRule] [data-role=dropdownlist]").data("kendoDropDownList");
        dropDownList.value("daily");
        dropDownList.trigger("change");

        //repeatEvery
        var repeatParentElement = $("span.k-recur-interval").parent();
        var repeatEveryText = repeatParentElement.prev().children("label").text();
        //days
        var daysText = getTextFromElement(repeatParentElement);

        equal(repeatEveryText, "custom", "repeatEvery message is not correctly changed");
        equal(daysText, "custom", "days message is not correctly changed");
    });

    //scheduler recurrence editor END messages
    test("recurrenceEditor.end messages are changed correctly", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: ""}
            ],
            messages: {
                recurrenceEditor: {
                    end: {
                        after: "custom",
                        occurrence: "custom",
                        label: "custom",
                        never: "custom",
                        on: "custom"
                    }
                }
            },
            views: ["day"]
        });
        scheduler.element.find(".k-event").dblclick();

        var dropDownList = $("[name=recurrenceRule] [data-role=dropdownlist]").data("kendoDropDownList");
        dropDownList.value("daily");
        dropDownList.trigger("change");

        var endCountAfterText = getTextFromElement($(".k-recur-end-count").parent());

        var endCountOccurrenceText = getTextFromElement($(".k-recur-count").parent());

        var endLabelText = $(".k-recur-count").closest(".k-edit-field").prev().text();

        var endNeverText = $(".k-recur-end-never").parent().text();

        var endUntilOnText = $(".k-recur-end-until").parent().text();

        equal(endCountAfterText, "custom", "endCountAfter message is not correctly changed");
        equal(endCountOccurrenceText, "custom", "endCountOccurrenceText message is not correctly changed");
        equal(endLabelText, "custom", "endLabel message is not correctly changed");
        equal(endNeverText, "custom", "endNever message is not correctly changed");
        equal(endUntilOnText, "custom", "endUntilOn message is not correctly changed");
    });

})();
