namespace Kendo.Mvc.UI.Tests
{
    using Extensions;
    using Xunit;

    public class WindowHtmlBuilderTests
    {
        private IWindowHtmlBuilder renderer;
        private Window window;

        public WindowHtmlBuilderTests()
        {
            window = WindowTestHelper.CreateWindow(null);
            renderer = new WindowHtmlBuilder(window);
            window.Name = "Window";
        }

        [Fact]
        public void WindowTag_should_render_div_tag()
        {
            renderer.WindowTag().TagName.ShouldEqual("div");
        }

        [Fact]
        public void WindowTag_should_render_html_attributes()
        {
            window.HtmlAttributes.Add("title", "genericInput");

            renderer.WindowTag().Attribute("title").ShouldEqual("genericInput");
        }

        [Fact]
        public void WindowTag_should_render_id()
        {
            window.Name = "TestName";

            renderer.WindowTag().Attribute("id").ShouldEqual("TestName");
        }

        [Fact]
        public void WindowTag_should_render_style_display_none_if_visible_false() 
        {
            window.Visible = false;

            renderer.WindowTag().Attribute("style").ShouldContain("display:none");
        }
    }
}