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

    public class GanttResourcesTests
    {
        private readonly GanttBuilder<GanttTask, GanttDependency> builder;
        private readonly Gantt<GanttTask, GanttDependency> gantt;

        public GanttResourcesTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);

            gantt = GanttTestHelper.CreateGantt<GanttTask, GanttDependency>(writer.Object);
            builder = new GanttBuilder<GanttTask, GanttDependency>(gantt);
        }

        [Fact]
        public void Resources_are_initialized()
        {
            Assert.NotNull(gantt.Resources);
            Assert.IsType<GanttResourcesSettings>(gantt.Resources);
        }

        [Fact]
        public void GanttResourceSettings_initialize_dataSource()
        {
            Assert.NotNull(gantt.Resources.DataSource);
            Assert.IsType<DataSource>(gantt.Resources.DataSource);
        }

        [Fact]
        public void DataColorField_sets_the_corresponding_property()
        {
            var dataColorField = "Color";
            builder.Resources(r => r.DataColorField(dataColorField));

            Assert.Equal(dataColorField, gantt.Resources.DataColorField);
        }

        [Fact]
        public void DataTextField_sets_the_corresponding_property()
        {
            var dataTextField = "Text";
            builder.Resources(r => r.DataTextField(dataTextField));

            Assert.Equal(dataTextField, gantt.Resources.DataTextField);
        }

        [Fact]
        public void Field_sets_the_corresponding_property()
        {
            var field = "Resources";
            builder.Resources(r => r.Field(field));

            Assert.Equal(field, gantt.Resources.Field);
        }

        [Fact]
        public void BindTo_serialize_data()
        {
             var data = new[] { 
                new { Text = "Alex", id = 1, Color = "#f8a398" } ,
                new { Text = "Bob", id = 2, Color = "#51a0ed" } ,
                new { Text = "Charlie", id = 3, Color = "#56ca85" } 
            };

             builder.Resources(r => r.BindTo(data));

             var json = gantt.Resources.ToJson();

             Assert.Equal(data, json["dataSource"]);
        }

        [Fact]
        public void Gantt_does_not_serialize_empty_resources()
        {
            var json = gantt.Resources.ToJson();

            Assert.False(json.Any());
        }

    }
}
