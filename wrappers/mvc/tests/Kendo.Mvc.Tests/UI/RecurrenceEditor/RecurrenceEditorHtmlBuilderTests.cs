namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc;
    using Kendo.Mvc.UI.Fluent;
    using System;
    using System.Collections.Generic;
    using Xunit;

    public class RecurrenceEditorHtmlBuilderTests
    {
        private RecurrenceEditor recurrenceEditor;
        private RecurrenceEditorHtmlBuilder renderer;

        public RecurrenceEditorHtmlBuilderTests()
        {
            recurrenceEditor = RecurrenceEditorTestHelper.CreateRecurrenceEditor();
            renderer = new RecurrenceEditorHtmlBuilder(recurrenceEditor);
            recurrenceEditor.Name = "RecurrenceEditor1";
        }

        [Fact]
        public void Build_should_output_start_tag()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("div", tag.TagName);
        }

        [Fact]

        public void Build_should_render_html_attributes()
        {
            recurrenceEditor.HtmlAttributes.Add("title", "genericInput");

            IHtmlNode tag = renderer.Build();

            Assert.Equal("genericInput", tag.Attribute("title"));
        }
    }
}
