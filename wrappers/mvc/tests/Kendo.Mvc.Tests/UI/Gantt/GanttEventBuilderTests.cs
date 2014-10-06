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
    using System.Reflection;

    public class GanttEventBuilderTests
    {
        private readonly Gantt<GanttTask, GanttDependency> gantt;
        private readonly GanttEventBuilder builder;

        public GanttEventBuilderTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            gantt = GanttTestHelper.CreateGantt<GanttTask, GanttDependency>(writer.Object);
            builder = new GanttEventBuilder(gantt.Events);
        }

        [Fact]
        public void Events_are_corretly_set()
        {
            Type builderType = builder.GetType();

            foreach (MethodInfo m in builderType.GetMethods(BindingFlags.Public|BindingFlags.DeclaredOnly|BindingFlags.Instance))
            {
                var key = Char.ToLowerInvariant(m.Name[0]).ToString() + m.Name.Substring(1);
                var handler = string.Format("{0}Handler", m.Name);

                builderType.InvokeMember(m.Name, BindingFlags.InvokeMethod, null, builder, new object[] { handler });

                Assert.True(gantt.Events.ContainsKey(key) && (gantt.Events[key] as ClientHandlerDescriptor).HandlerName.Equals(handler));
            }
        }
    }
}
