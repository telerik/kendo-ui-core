namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class GanttEditableBuilderTests
    {
        private readonly GanttEditableSettings editable;
        private readonly GanttEditableSettingsBuilder builder;

        public GanttEditableBuilderTests()
        {
            editable = new GanttEditableSettings();
            builder = new GanttEditableSettingsBuilder(editable);
        }

        [Fact]
        public void Template_sets_the_corresponding_property()
        {
            var template = "template";
            builder.Template(template);

            Assert.Equal(template, editable.Template);
        }

        [Fact]
        public void TemplateId_sets_the_corresponding_property()
        {
            var templateid = "template";
            builder.TemplateId(templateid);

            Assert.Equal(templateid, editable.TemplateId);
        }

        [Fact]
        public void Confirmation_sets_the_corresponding_property()
        {
            var confirmation = false;
            builder.Confirmation(confirmation);

            Assert.Equal(confirmation, editable.Confirmation);
        }

    }
}
