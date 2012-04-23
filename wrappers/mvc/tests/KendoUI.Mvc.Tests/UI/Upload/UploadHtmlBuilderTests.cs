namespace KendoUI.Mvc.UI.Html.Tests
{
    using System.Web.Mvc;
    using KendoUI.Mvc.UI.Tests.Upload;
    using Xunit;

    public class UploadHtmlBuilderTests
    {
        private readonly Upload upload;
        private readonly UploadHtmlBuilder builder;

        public UploadHtmlBuilderTests()
        {
            upload = UploadTestHelper.CreateUpload();
            builder = new UploadHtmlBuilder(upload);
        }

        [Fact]
        public void CreateUpload_should_output_wrapper_div()
        {
            var tag = builder.CreateUpload();
            tag.TagName.ShouldEqual("div");
        }

        [Fact]
        public void CreateUpload_should_not_render_id()
        {
            const string id = "upload";
            upload.Name = id;

            IHtmlNode tag = builder.CreateUpload();

            tag.Attributes().ContainsKey("id").ShouldBeFalse();
        }

        [Fact]
        public void CreateUpload_should_set_CSS_classes()
        {
            const string css = "t-widget t-upload";

            IHtmlNode tag = builder.CreateUpload();

            tag.Attribute("class").ShouldEqual(css);
        }

        [Fact]
        public void CreateUpload_should_render_html_attributes()
        {
            upload.HtmlAttributes.Add("title", "genericUpload");

            IHtmlNode tag = builder.CreateUpload();

            tag.Attribute("title").ShouldEqual("genericUpload");
        }

        [Fact]
        public void CreateUpload_should_not_render_accept_attribute()
        {
            upload.HtmlAttributes.Add("accept", "FOO");

            IHtmlNode tag = builder.CreateUpload();

            Assert.Throws<System.Collections.Generic.KeyNotFoundException>(() => tag.Attribute("accept"));
        }

        [Fact]
        public void CreateButtonText_should_render_span()
        {
            var tag = builder.CreateButtonText();
            tag.TagName.ShouldEqual("span");
        }

        [Fact]
        public void CreateButtonText_should_render_button_text()
        {
            var tag = builder.CreateButtonText();
            tag.InnerHtml.ShouldEqual(upload.Localization.Select);
        }

        [Fact]
        public void CreateFileInput_should_render_input()
        {
            var tag = builder.CreateFileInput();
            tag.TagName.ShouldEqual("input");
        }

        [Fact]
        public void CreateFileInput_should_render_self_closing_input()
        {
            var tag = builder.CreateFileInput();
            tag.RenderMode.ShouldEqual(TagRenderMode.SelfClosing);
        }

        [Fact]
        public void CreateFileInput_should_set_name()
        {
            const string name = "upload";
            upload.Name = name;

            IHtmlNode tag = builder.CreateFileInput();

            tag.Attribute("name").ShouldEqual(name);
        }

        [Fact]
        public void CreateFileInput_should_set_id()
        {
            const string name = "upload";
            upload.Name = name;

            IHtmlNode tag = builder.CreateFileInput();

            tag.Attribute("id").ShouldEqual(name);
        }

        [Fact]
        public void CreateFileInput_should_set_type()
        {
            IHtmlNode tag = builder.CreateFileInput();

            tag.Attribute("type").ShouldEqual("file");
        }

        [Fact]
        public void CreateFileInput_should_not_set_multiple()
        {
            IHtmlNode tag = builder.CreateFileInput();

            tag.Attributes().ContainsKey("multiple").ShouldBeFalse();
        }

        [Fact]
        public void CreateFileInput_should_render_accept_attribute()
        {
            upload.HtmlAttributes.Add("accept", "FOO");

            var tag = builder.CreateFileInput();
            
            Assert.DoesNotThrow(() => tag.Attribute("accept"));
            tag.Attribute("accept").ShouldEqual("foo");
        }

        [Fact]
        public void CreateUploadButton_should_render_div()
        {
            IHtmlNode tag = builder.CreateUploadButton();

            tag.TagName.ShouldEqual("div");
        }

        [Fact]
        public void CreateUploadButton_should_set_CSS_class()
        {
            IHtmlNode tag = builder.CreateUploadButton();

            tag.Attribute("class").ShouldEqual("t-button t-upload-button");
        }
    }
}
