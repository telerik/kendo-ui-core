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
        public void AllDayEventTemplate_sets_template()
        {
            builder.AllDayEventTemplate("template");

            Assert.NotNull(scheduler.AllDayEventTemplate);
        }

        [Fact]
        public void AllDayEventTemplateId_sets_template()
        {
            builder.AllDayEventTemplateId("templateId");

            Assert.NotNull(scheduler.AllDayEventTemplate);
        }




    }
}
