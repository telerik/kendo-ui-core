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

    public class SchedulerEditableBuilderTests
    {
        private readonly SchedulerEditableSettings<SchedulerEvent> editable;
        private readonly SchedulerEditableSettingsBuilder<SchedulerEvent> builder;

        public SchedulerEditableBuilderTests() 
        {
            editable = new SchedulerEditableSettings<SchedulerEvent>();
            builder = new SchedulerEditableSettingsBuilder<SchedulerEvent>(editable);
        }

        [Fact]
        public void Create_sets_the_corresponding_property()
        {
            var create = false;
            builder.Create(create);

            Assert.Equal(create, editable.Create);
        }

        [Fact]
        public void Destroy_sets_the_corresponding_property()
        {
            var destroy = false;
            builder.Destroy(destroy);

            Assert.Equal(destroy, editable.Destroy);
        }

        [Fact]
        public void Update_sets_the_corresponding_property()
        {
            var update = false;
            builder.Update(update);

            Assert.Equal(update, editable.Update);
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
            var confirmation = "message";
            builder.Confirmation(confirmation);

            Assert.Equal(confirmation, editable.Confirmation);
        }

        [Fact]
        public void Resize_sets_the_corresponding_property()
        {
            var resize = false;
            builder.Resize(resize);

            Assert.Equal(resize, editable.Resize);
        }

        [Fact]
        public void DisplayDeleteConfirmation_sets_the_corresponding_property()
        {
            var displaydeleteconfirmation = false;
            builder.Confirmation(displaydeleteconfirmation);

            Assert.Equal(displaydeleteconfirmation, editable.DisplayDeleteConfirmation);
        }

        [Fact]
        public void TemplateName_sets_the_corresponding_property()
        {
            var templatename = "template";
            builder.TemplateName(templatename);

            Assert.Equal(templatename, editable.TemplateName);
        }
    }
}
