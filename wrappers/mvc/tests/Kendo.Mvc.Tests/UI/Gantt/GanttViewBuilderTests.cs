namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Xunit;

    public class GanttViewBuilderTests
    {
        private readonly GanttView view;
        private readonly GanttViewBuilder builder;

        public GanttViewBuilderTests()
        {
            view = new GanttView();
            builder = new GanttViewBuilder(view);
        }

        [Fact]
        public void Selected_sets_the_corresponding_view_property()
        {
            var selected = true;
            builder.Selected(selected);

            Assert.Equal(selected, view.Selected);
        }

        [Fact]
        public void SlotSize_sets_the_corresponding_view_property()
        {
            var slotSize = 10;
            builder.SlotSize(slotSize);

            Assert.Equal(slotSize, view.SlotSize);
        }

        [Fact]
        public void TimeHeaderTemplate_sets_the_corresponding_view_property()
        {
            var timeHeaderTemplate = "template";
            builder.TimeHeaderTemplate(timeHeaderTemplate);

            Assert.Equal(timeHeaderTemplate, view.TimeHeaderTemplate);
        }

        [Fact]
        public void TimeHeaderTemplateId_sets_the_corresponding_view_property()
        {
            var timeHeaderTemplateId = "templateId";
            builder.TimeHeaderTemplateId(timeHeaderTemplateId);

            Assert.Equal(timeHeaderTemplateId, view.TimeHeaderTemplateId);
        }

        [Fact]
        public void DayHeaderTemplate_sets_the_corresponding_view_property()
        {
            var dayHeaderTemplate = "template";
            builder.DayHeaderTemplate(dayHeaderTemplate);

            Assert.Equal(dayHeaderTemplate, view.DayHeaderTemplate);
        }

        [Fact]
        public void DayHeaderTemplateId_sets_the_corresponding_view_property()
        {
            var dayHeaderTemplateId = "templateId";
            builder.DayHeaderTemplateId(dayHeaderTemplateId);

            Assert.Equal(dayHeaderTemplateId, view.DayHeaderTemplateId);
        }

        [Fact]
        public void WeekHeaderTemplate_sets_the_corresponding_view_property()
        {
            var weekHeaderTemplate = "template";
            builder.WeekHeaderTemplate(weekHeaderTemplate);

            Assert.Equal(weekHeaderTemplate, view.WeekHeaderTemplate);
        }

        [Fact]
        public void WeekHeaderTemplateId_sets_the_corresponding_view_property()
        {
            var weekHeaderTemplateId = "templateId";
            builder.WeekHeaderTemplateId(weekHeaderTemplateId);

            Assert.Equal(weekHeaderTemplateId, view.WeekHeaderTemplateId);
        }

        [Fact]
        public void MonthHeaderTemplate_sets_the_corresponding_view_property()
        {
            var monthHeaderTemplate = "template";
            builder.MonthHeaderTemplate(monthHeaderTemplate);

            Assert.Equal(monthHeaderTemplate, view.MonthHeaderTemplate);
        }

        [Fact]
        public void MonthHeaderTemplateId_sets_the_corresponding_view_property()
        {
            var monthHeaderTemplateId = "templateId";
            builder.MonthHeaderTemplateId(monthHeaderTemplateId);

            Assert.Equal(monthHeaderTemplateId, view.MonthHeaderTemplateId);
        }

        [Fact]
        public void YearHeaderTemplate_sets_the_corresponding_view_property()
        {
            var yearHeaderTemplate = "template";
            builder.YearHeaderTemplate(yearHeaderTemplate);

            Assert.Equal(yearHeaderTemplate, view.YearHeaderTemplate);
        }

        [Fact]
        public void YearHeaderTemplateId_sets_the_corresponding_view_property()
        {
            var yearHeaderTemplateId = "templateId";
            builder.YearHeaderTemplateId(yearHeaderTemplateId);

            Assert.Equal(yearHeaderTemplateId, view.YearHeaderTemplateId);
        }

        [Fact]
        public void Type_sets_the_corresponding_view_property()
        {
            var type = GanttViewType.Month;
            builder.Type(type);

            Assert.Equal(type, view.Type);
        }

    }
}
