namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI.Fluent;
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web.UI;
    using Xunit;

    public class GanttAssignmentsTests
    {
        private readonly GanttBuilder<GanttTask, GanttDependency> builder;
        private readonly Gantt<GanttTask, GanttDependency> gantt;

        public GanttAssignmentsTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);

            gantt = GanttTestHelper.CreateGantt<GanttTask, GanttDependency>(writer.Object);
            builder = new GanttBuilder<GanttTask, GanttDependency>(gantt);
        }

        [Fact]
        public void Assignments_are_initialized()
        {
            Assert.NotNull(gantt.Assignments);
            Assert.IsType<GanttAssignmentsSettings>(gantt.Assignments);
        }

        [Fact]
        public void GanttAssignmentsSettings_initialize_dataSource()
        {
            Assert.NotNull(gantt.Assignments.DataSource);
            Assert.IsType<DataSource>(gantt.Assignments.DataSource);
        }

        [Fact]
        public void DataTaskIdField_sets_the_corresponding_property()
        {
            var dataTaskId = "ID";
            builder.Assignments(a => a.DataTaskIdField(dataTaskId));

            Assert.Equal(dataTaskId, gantt.Assignments.DataTaskIdField);
        }

        [Fact]
        public void DataResourceIdField_sets_the_corresponding_property()
        {
            var dataResourceId = "RID";
            builder.Assignments(a => a.DataResourceIdField(dataResourceId));

            Assert.Equal(dataResourceId, gantt.Assignments.DataResourceIdField);
        }

        [Fact]
        public void DataValueField_sets_the_corresponding_property()
        {
            var dataValueField = "Value";
            builder.Assignments(a => a.DataValueField(dataValueField));

            Assert.Equal(dataValueField, gantt.Assignments.DataValueField);
        }

        [Fact]
        public void BindTo_serialize_data()
        {
            var data = new[] { 
                new { Text = "Alex", id = 1, Color = "#f8a398" } ,
                new { Text = "Bob", id = 2, Color = "#51a0ed" } ,
                new { Text = "Charlie", id = 3, Color = "#56ca85" } 
            };

            builder.Assignments(r => r.BindTo(data));

            var json = gantt.Assignments.ToJson();

            Assert.Equal(data, json["dataSource"]);
        }

        [Fact]
        public void Gantt_does_not_serialize_empty_assignments()
        {
            var json = gantt.Assignments.ToJson();

            Assert.False(json.Any());
        }

    }
}
