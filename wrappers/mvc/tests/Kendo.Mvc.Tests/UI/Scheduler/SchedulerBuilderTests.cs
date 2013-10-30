namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using UI.Tests;
    using Moq;
    using System.Web.UI;
    using System.IO;
    using Xunit;

    public class SchedulerBuilderTests
    {
        private readonly Scheduler<SchedulerEvent> scheduler;
        private readonly SchedulerBuilder<SchedulerEvent> builder;

        public SchedulerBuilderTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            scheduler = SchedulerTestHelper.CreateScheduler<SchedulerEvent>(writer.Object);
            builder = new SchedulerBuilder<SchedulerEvent>(scheduler);
        }

        [Fact]
        public void BindTo_sets_the_data_source()
        {
            IEnumerable<SchedulerEvent> events = new[] { new SchedulerEvent() };
            builder.BindTo(events);

            Assert.Same(events, scheduler.DataSource.Data);
        }

        [Fact]
        public void Date_sets_the_corresponding_property()
        {
            var date = new DateTime();
            builder.Date(date);

            Assert.Equal(date, scheduler.Date);
        }

        [Fact]
        public void StartTime_sets_the_corresponding_property()
        {
            var starttime = new DateTime();
            builder.StartTime(starttime);

            Assert.Equal(starttime, scheduler.StartTime);
        }

        [Fact]
        public void StartTime_int_overload_sets_the_corresponding_property()
        {
            var hours = 1;
            var min = 1;
            var sec = 1;
            builder.StartTime(hours, min, sec);

            var today = DateTime.Today;

            Assert.Equal(new DateTime(today.Year, today.Month, today.Day, hours, min, sec), scheduler.StartTime);
        }

        [Fact]
        public void EndTime_sets_the_corresponding_property()
        {
            var endtime = new DateTime();
            builder.EndTime(endtime);

            Assert.Equal(endtime, scheduler.EndTime);
        }

        [Fact]
        public void EndTime_int_overload_sets_the_corresponding_property()
        {
            var hours = 1;
            var min = 1;
            var sec = 1;
            builder.EndTime(hours, min, sec);

            var today = DateTime.Today;

            Assert.Equal(new DateTime(today.Year, today.Month, today.Day, hours, min, sec), scheduler.EndTime);
        }

        [Fact]
        public void WorkDayStart_sets_the_corresponding_property()
        {
            var workdaystart = new DateTime();
            builder.WorkDayStart(workdaystart);

            Assert.Equal(workdaystart, scheduler.WorkDayStart);
        }

        [Fact]
        public void WorkDayStart_int_overload_sets_the_corresponding_property()
        {
            var hours = 1;
            var min = 1;
            var sec = 1;
            builder.WorkDayStart(hours, min, sec);

            var today = DateTime.Today;

            Assert.Equal(new DateTime(today.Year, today.Month, today.Day, hours, min, sec), scheduler.WorkDayStart);
        }

        [Fact]
        public void WorkDayEnd_sets_the_corresponding_property()
        {
            var workdayend = new DateTime();
            builder.WorkDayEnd(workdayend);

            Assert.Equal(workdayend, scheduler.WorkDayEnd);
        }

        [Fact]
        public void WorkDayEnd_int_overload_sets_the_corresponding_property()
        {
            var hours = 1;
            var min = 1;
            var sec = 1;
            builder.WorkDayEnd(hours, min, sec);

            var today = DateTime.Today;

            Assert.Equal(new DateTime(today.Year, today.Month, today.Day, hours, min, sec), scheduler.WorkDayEnd);
        }

        [Fact]
        public void Height_sets_the_corresponding_property()
        {
            var height = 100;
            builder.Height(height);

            Assert.Equal(height, scheduler.Height);
        }

        [Fact]
        public void EventTemplate_sets_the_corresponding_property()
        {
            var eventtemplate = "template";
            builder.EventTemplate(eventtemplate);

            Assert.Equal(eventtemplate, scheduler.EventTemplate);
        }

        [Fact]
        public void EventTemplateId_sets_the_corresponding_property()
        {
            var eventtemplateid = "template";
            builder.EventTemplateId(eventtemplateid);

            Assert.Equal(eventtemplateid, scheduler.EventTemplateId);
        }

        [Fact]
        public void AllDayEventTemplate_sets_the_corresponding_property()
        {
            var alldayeventtemplate = "template";
            builder.AllDayEventTemplate(alldayeventtemplate);

            Assert.Equal(alldayeventtemplate, scheduler.AllDayEventTemplate);
        }

        [Fact]
        public void AllDayEventTemplateId_sets_the_corresponding_property()
        {
            var alldayeventtemplateid = "template";
            builder.AllDayEventTemplateId(alldayeventtemplateid);

            Assert.Equal(alldayeventtemplateid, scheduler.AllDayEventTemplateId);
        }

        [Fact]
        public void AllDaySlot_sets_the_corresponding_property()
        {
            var alldayslot = false;
            builder.AllDaySlot(alldayslot);

            Assert.Equal(alldayslot, scheduler.AllDaySlot);
        }

        [Fact]
        public void Selectable_sets_the_corresponding_property()
        {
            var selectable = true;
            builder.Selectable(selectable);

            Assert.Equal(selectable, scheduler.Selectable);
        }

        [Fact]
        public void DateHeaderTemplate_sets_the_corresponding_property()
        {
            var dateheadertemplate = "template";
            builder.DateHeaderTemplate(dateheadertemplate);

            Assert.Equal(dateheadertemplate, scheduler.DateHeaderTemplate);
        }

        [Fact]
        public void DateHeaderTemplateId_sets_the_corresponding_property()
        {
            var dateheadertemplateid = "template";
            builder.DateHeaderTemplateId(dateheadertemplateid);

            Assert.Equal(dateheadertemplateid, scheduler.DateHeaderTemplateId);
        }

        [Fact]
        public void MajorTick_sets_the_corresponding_property()
        {
            var majortick = 100;
            builder.MajorTick(majortick);

            Assert.Equal(majortick, scheduler.MajorTick);
        }

        [Fact]
        public void MajorTimeHeaderTemplate_sets_the_corresponding_property()
        {
            var majortimeheadertemplate = "template";
            builder.MajorTimeHeaderTemplate(majortimeheadertemplate);

            Assert.Equal(majortimeheadertemplate, scheduler.MajorTimeHeaderTemplate);
        }

        [Fact]
        public void MajorTimeHeaderTemplateId_sets_the_corresponding_property()
        {
            var majortimeheadertemplateid = "template";
            builder.MajorTimeHeaderTemplateId(majortimeheadertemplateid);

            Assert.Equal(majortimeheadertemplateid, scheduler.MajorTimeHeaderTemplateId);
        }

        [Fact]
        public void MinorTickCount_sets_the_corresponding_property()
        {
            var minortickcount = 100;
            builder.MinorTickCount(minortickcount);

            Assert.Equal(minortickcount, scheduler.MinorTickCount);
        }

        [Fact]
        public void MinorTimeHeaderTemplate_sets_the_corresponding_property()
        {
            var minortimeheadertemplate = "template";
            builder.MinorTimeHeaderTemplate(minortimeheadertemplate);

            Assert.Equal(minortimeheadertemplate, scheduler.MinorTimeHeaderTemplate);
        }

        [Fact]
        public void MinorTimeHeaderTemplateId_sets_the_corresponding_property()
        {
            var minortimeheadertemplateid = "template";
            builder.MinorTimeHeaderTemplateId(minortimeheadertemplateid);

            Assert.Equal(minortimeheadertemplateid, scheduler.MinorTimeHeaderTemplateId);
        }

        [Fact]
        public void Timezone_sets_the_corresponding_property()
        {
            var timezone = "Etc/UTC";
            builder.Timezone(timezone);

            Assert.Equal(timezone, scheduler.Timezone);
        }

        [Fact]
        public void Width_sets_the_corresponding_property()
        {
            var width = 100;
            builder.Width(width);

            Assert.Equal(width, scheduler.Width);
        }

        [Fact]
        public void Snap_sets_the_corresponding_property()
        {
            var snap = false;
            builder.Snap(snap);

            Assert.Equal(snap, scheduler.Snap);
        }

        [Fact]
        public void AutoBind_sets_the_corresponding_property()
        {
            var autobind = false;
            builder.AutoBind(autobind);

            Assert.Equal(autobind, scheduler.AutoBind);
        }

        [Fact]
        public void WorkWeekStart_sets_the_corresponding_property()
        {
            var workweekstart = 3;
            builder.WorkWeekStart(workweekstart);

            Assert.Equal(workweekstart, scheduler.WorkWeekStart);
        }

        [Fact]
        public void WorkWeekEnd_sets_the_corresponding_property()
        {
            var workweekend = 6;
            builder.WorkWeekEnd(workweekend);

            Assert.Equal(workweekend, scheduler.WorkWeekEnd);
        }

        [Fact]
        public void ShowWorkHours_sets_the_corresponding_property()
        {
            var showworkhours = true;
            builder.ShowWorkHours(showworkhours);

            Assert.Equal(showworkhours, scheduler.ShowWorkHours);
        }

        [Fact]
        public void ShowWorkHours_no_argument_overload_sets_the_corresponding_property()
        {
            builder.ShowWorkHours();

            Assert.Equal(true, scheduler.ShowWorkHours);
        }

        [Fact]
        public void Mobile_sets_the_corresponding_property()
        {
            var mobile = MobileMode.Tablet;
            builder.Mobile(mobile);

            Assert.Equal(mobile, scheduler.Mobile);
        }
    }
}
