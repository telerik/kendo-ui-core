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
        public void AllDayEventTemplate_sets_the_corresponding_property()
        {
            builder.AllDayEventTemplate("template");

            Assert.NotNull(scheduler.AllDayEventTemplate);
        }

        [Fact]
        public void AllDayEventTemplateId_sets_the_corresponding_property()
        {
            builder.AllDayEventTemplateId("templateId");

            Assert.NotNull(scheduler.AllDayEventTemplateId);
        }

        [Fact]
        public void AllDaySlot_sets_the_corresponding_property()
        {
            builder.AllDaySlot(true);

            Assert.True(scheduler.AllDaySlot);
        }

        [Fact]
        public void Height_sets_the_corresponding_property()
        {
            builder.Height(100);

            Assert.Equal(scheduler.Height, 100);
        }

        [Fact]
        public void Timezone_sets_the_corresponding_property()
        {
            builder.Timezone("Etc/UTC");

            Assert.Equal(scheduler.Timezone, "Etc/UTC");
        }

        [Fact]
        public void BindTo_sets_the_data_source()
        {
            IEnumerable<SchedulerEvent> events = new[] { new SchedulerEvent() };
            builder.BindTo(events);

            Assert.Same(events, scheduler.DataSource.Data);
        }
    }
}
