namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Moq;
    using System.Web.UI;
    using System.IO;
    using Xunit;

    public class GanttBuilderTests
    {
        private readonly Gantt<GanttTask, GanttDependency> gantt;
        private readonly GanttBuilder<GanttTask, GanttDependency> builder;

        public GanttBuilderTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            gantt = GanttTestHelper.CreateGantt<GanttTask, GanttDependency>(writer.Object);
            builder = new GanttBuilder<GanttTask, GanttDependency>(gantt);
        }

        [Fact]
        public void AutoBind_sets_the_corresponding_property()
        {
            var autobind = false;
            builder.AutoBind(autobind);

            Assert.Equal(autobind, gantt.AutoBind);
        }

        [Fact]
        public void Editable_sets_the_corresponding_property()
        {
            var enablEditable = false;
            builder.Editable(enablEditable);

            Assert.Equal(enablEditable, gantt.Editable.Enabled);
        }

        [Fact]
        public void Navigatable_sets_the_corresponding_property()
        {
            var navigatable = false;
            builder.Navigatable(navigatable);

            Assert.Equal(navigatable, gantt.Navigatable);
        }

        [Fact]
        public void WorkDayStart_sets_the_corresponding_property()
        {
            var today = DateTime.Now;
            var hours = 1;
            var minutes = 1;
            var seconds = 1;
            var start = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            builder.WorkDayStart(start);

            Assert.Equal(new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds), gantt.WorkDayStart);
        }

        [Fact]
        public void WorkDayEnd_sets_the_corresponding_property()
        {
            var today = DateTime.Now;
            var hours = 1;
            var minutes = 1;
            var seconds = 1;
            var end = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            builder.WorkDayEnd(end);

            Assert.Equal(new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds), gantt.WorkDayEnd);
        }

        [Fact]
        public void WorkWeekStart_sets_the_corresponding_property()
        {
            var weekStart = 3;

            builder.WorkWeekStart(weekStart);

            Assert.Equal(weekStart, gantt.WorkWeekStart);
        }

        [Fact]
        public void WorkWeekEnd_sets_the_corresponding_property()
        {
            var weekEnd = 4;

            builder.WorkWeekEnd(weekEnd);

            Assert.Equal(weekEnd, gantt.WorkWeekEnd);
        }

        [Fact]
        public void HourSpan_sets_the_corresponding_property()
        {
            var span = 4;

            builder.HourSpan(span);

            Assert.Equal(span, gantt.HourSpan);
        }

        [Fact]
        public void Snap_sets_the_corresponding_property()
        {
            var snap = true;

            builder.Snap(snap);

            Assert.Equal(snap, gantt.Snap);
        }

        [Fact]
        public void Height_sets_the_corresponding_property()
        {
            var height = 100;
            builder.Height(height);

            Assert.Equal(height, gantt.Height);
        }

        [Fact]
        public void ListWidth_sets_the_corresponding_property()
        {
            var listWidth = "50%";
            builder.ListWidth(listWidth);

            Assert.Equal(listWidth, gantt.ListWidth);
        }

        [Fact]
        public void Selectable_sets_the_corresponding_property()
        {
            var selectable = true;
            builder.Selectable(selectable);

            Assert.Equal(selectable, gantt.Selectable);
        }

        [Fact]
        public void ShowWorkDays_sets_the_corresponding_property()
        {
            var showWorkDays = true;
            builder.ShowWorkDays(showWorkDays);

            Assert.Equal(showWorkDays, gantt.ShowWorkDays);
        }

        [Fact]
        public void ShowWorkHours_sets_the_corresponding_property()
        {
            var showWorkHours = true;
            builder.ShowWorkHours(showWorkHours);

            Assert.Equal(showWorkHours, gantt.ShowWorkHours);
        }

    }
}
