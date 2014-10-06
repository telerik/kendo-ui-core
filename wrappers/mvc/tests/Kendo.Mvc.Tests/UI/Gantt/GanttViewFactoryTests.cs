namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web.UI;
    using Xunit;

    public class GanttViewFactoryTests
    {
        private readonly Gantt<GanttTask, GanttDependency> gantt;
        private readonly GanttViewFactory viewFactory;

        public GanttViewFactoryTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            gantt = GanttTestHelper.CreateGantt<GanttTask, GanttDependency>(writer.Object);
            viewFactory = new GanttViewFactory(gantt.Views);
        }

        [Fact]
        public void DayView_adds_day_type_view()
        {
            viewFactory.DayView();

            Assert.Equal(GanttViewType.Day, gantt.Views.First().Type);
        }

        [Fact]
        public void WeekView_adds_week_type_view()
        {
            viewFactory.WeekView();

            Assert.Equal(GanttViewType.Week, gantt.Views.First().Type);
        }

        [Fact]
        public void MonthView_adds_day_type_view()
        {
            viewFactory.MonthView();

            Assert.Equal(GanttViewType.Month, gantt.Views.First().Type);
        }

        [Fact]
        public void YearView_adds_week_type_view()
        {
            viewFactory.YearView();

            Assert.Equal(GanttViewType.Year, gantt.Views.First().Type);
        }

    }
}
