namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc;
    using Kendo.Mvc.UI.Fluent;
    using System;
    using System.Collections.Generic;
    using Xunit;

    public class TimezoneEditorHtmlBuilderTests
    {
        private TimezoneEditor timezoneEditor;
        private TimezoneEditorHtmlBuilder renderer;

        public TimezoneEditorHtmlBuilderTests()
        {
            timezoneEditor = TimezoneEditorTestHelper.CreateTimezoneEditor();
            renderer = new TimezoneEditorHtmlBuilder(timezoneEditor);
            timezoneEditor.Name = "TimezoneEditor1";
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
            timezoneEditor.HtmlAttributes.Add("title", "genericInput");

            IHtmlNode tag = renderer.Build();

            Assert.Equal("genericInput", tag.Attribute("title"));
        }
    }
}
