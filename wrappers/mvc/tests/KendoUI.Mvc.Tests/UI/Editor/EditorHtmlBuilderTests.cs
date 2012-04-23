// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Telerik.Web.Mvc.UI.Tests;
    using Xunit;

    public class EditorHtmlBuilderTests
    {

        private Editor editor;
        private EditorHtmlBuilder renderer;

        public EditorHtmlBuilderTests()
        {
            editor = EditorTestHelper.CreateEditor();
            renderer = new EditorHtmlBuilder(editor);
        }

        [Fact]
        public void EditorTag_should_output_start_tag()
        {
            renderer.CreateEditor().TagName.ShouldEqual("table");
        }

        [Fact]
        public void EditorTag_should_output_render_id()
        {
            const string id = "testName";
            
            editor.Name = id;

            renderer.CreateEditor().Attribute("id").ShouldEqual(id);
        }

        [Fact]
        public void EditorTag_should_output_render_css_classes()
        {
            renderer.CreateEditor().Attribute("class").ShouldEqual("t-widget t-editor t-header");
        }

        [Fact]
        public void EditorTag_should_render_html_attributes()
        {
            editor.HtmlAttributes.Add("title", "genericEditor");

            renderer.CreateEditor().Attribute("title").ShouldEqual("genericEditor");
        }

        [Fact]
        public void TextareaTag_should_output_start_tag()
        {
            renderer.CreateTextArea().TagName.ShouldEqual("textarea");
        }

        [Fact]
        public void TextareaTag_should_set_the_name()
        {
            editor.Name = "Foo.bar";

            renderer.CreateTextArea().Attribute("name").ShouldEqual("Foo.bar");
        }

    }
}
