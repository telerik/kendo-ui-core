namespace Telerik.Web.Mvc.UI.Tests
{
    using Telerik.Web.Mvc.UI.Tests.Extensions;
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
        public void WindowTag_should_render_classes()
        {
            renderer.WindowTag().ShouldHaveClasses(UIPrimitives.Widget, "t-window");
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

        [Fact]
        public void HeaderTag_should_render_div_tag()
        {
            renderer.HeaderTag().TagName.ShouldEqual("div");
        }

        [Fact]
        public void HeaderTag_should_render_classes()
        {
            renderer.HeaderTag().ShouldHaveClasses(UIPrimitives.Header, UIPrimitives.Window.TitleBar);
        }

        [Fact]
        public void IconTag_should_render_span_wrapper()
        {
            const string iconPath = "/Content/Icon.png";
            window.IconUrl = iconPath;

            IHtmlNode tag = renderer.IconTag();

            tag.TagName.ShouldEqual("img");
            tag.Attribute("src").ShouldEqual(iconPath);
            tag.ShouldHaveClass(UIPrimitives.Image);
        }

        [Fact]
        public void IconTag_should_render_defoult_alternative_text()
        {
            const string iconPath = "/Content/Icon.png";

            window.IconUrl = iconPath;
            window.IconAlternativeText = "";

            renderer.IconTag().Attribute("alt").ShouldEqual("icon");
        }

        [Fact]
        public void TitleTag_should_render_span_with_proper_className()
        {
            renderer.TitleTag().ShouldHaveClass("t-window-title");
        }

        [Fact]
        public void TitleTag_should_render_span_with_title_text()
        {
            const string title = "WindowTitle";

            window.Title = title;

            IHtmlNode tag = renderer.TitleTag();

            tag.TagName.ShouldEqual("span");
            tag.Children[0].InnerHtml.ShouldContain(title);
        }

        [Fact]
        public void TitleTag_should_render_component_name_if_Title_is_empty()
        {
            window.Name = "Window";

            IHtmlNode tag = renderer.TitleTag();

            tag.TagName.ShouldEqual("span");
            tag.Children[0].InnerHtml.ShouldContain("Window");
        }

        [Fact]
        public void ButtonTag_should_render_link_with_span_in_it()
        {
            HeaderButton button = new HeaderButton { Name = "foo", CssClass = "bar", Url = "baz" };

            IHtmlNode linkTag = renderer.ButtonTag(button);

            linkTag.Children.ShouldNotBeEmpty();
            linkTag.TagName.ShouldEqual("a");
            linkTag.ShouldHaveClasses(UIPrimitives.Link);
            linkTag.Children[0].TagName.ShouldEqual("span");
        }

        [Fact]
        public void ButtonTag_honors_button_properties()
        {
            const string name = "foo", cssClass = "bar", url = "baz";

            HeaderButton button = new HeaderButton { Name = name, CssClass = cssClass, Url = url };

            IHtmlNode linkTag = renderer.ButtonTag(button);
            linkTag.Attribute("href").ShouldEqual(url);

            IHtmlNode spanTag = linkTag.Children[0];
            spanTag.InnerHtml.ShouldEqual(name);
            spanTag.ShouldHaveClasses(UIPrimitives.Icon, cssClass);
        }

        [Fact]
        public void ContentTag_should_render_div_and_class()
        {
            renderer.ContentTag()
                .ShouldHaveClasses(UIPrimitives.Window.Content, UIPrimitives.Content)
                .TagName.ShouldEqual("div");
        }

        [Fact]
        public void ContentTag_should_render_div_tag_with_style()
        {
            window.Height = 300;
            window.Width = 300;

            renderer.ContentTag()
                .Attribute("style").ShouldEqual("overflow:auto;width:300px;height:300px");
        }

        [Fact]
        public void ContentTag_should_render_div_tag_with_overflow_hidden_when_scrollable_is_false()
        {
            window.Height = 300;
            window.Width = 300;
            window.Scrollable = false;

            renderer.ContentTag()
                .Attribute("style").ShouldEqual("overflow:hidden;width:300px;height:300px");
        }

        [Fact]
        public void ContentTag_should_render_IFrame_if_ContentUrl_is_remote() 
        {
            window.ContentUrl = "http://www.abv.bg";

            renderer.ContentTag()
                .Children[0].TagName.ShouldEqual("iframe");
        }

        [Fact]
        public void ContentTag_should_render_IFrame_with_url_if_ContentUrl_is_remote()
        {
            window.ContentUrl = "http://www.abv.bg";

            renderer.ContentTag()
                .Children[0].Attribute("src").ShouldEqual(window.ContentUrl);
        }

        [Fact]
        public void ContentTag_should_not_render_IFrame_if_ContentUrl_is_null()
        {
            IHtmlNode content = renderer.ContentTag();

            content.Children.ShouldBeEmpty();
        }

        [Fact]
        public void ContentTag_should_not_render_IFrame_if_ContentUrl_is_local()
        {
            window.ContentUrl = "/aspnet-mvc-beta/Window/Content";

            IHtmlNode content = renderer.ContentTag();

            content.Children.ShouldBeEmpty();
        }

        [Fact]
        public void ContentTag_should_not_render_IFrame_if_ContentUrl_is_relative()
        {
            window.ContentUrl = "httpfoosa";

            IHtmlNode content = renderer.ContentTag();

            content.Children.ShouldBeEmpty();
        }

        [Fact]
        public void ContentTag_should_render_IFrame_if_ContentUrl_is_protocolless()
        {
            window.ContentUrl = "//ajax.google.com/";

            renderer.ContentTag()
                .Children[0].Attribute("src").ShouldEqual(window.ContentUrl);
        }

        [Fact]
        public void ContentTag_should_render_content_within_iframe_tag_for_browsers_that_do_not_support_frames()
        {
            window.ContentUrl = "http://www.abv.bg";

            IHtmlNode content = renderer.ContentTag();

            content.Children[0].InnerHtml.ShouldNotEqual(string.Empty);
        }
    }
}