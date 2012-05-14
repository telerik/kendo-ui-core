namespace Kendo.Mvc.UI.Html.Tests
{
    using System.Web.Mvc;
    using Kendo.Mvc.UI.Tests.Upload;
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
        public void CreateUpload_should_render_input()
        {
            var tag = builder.CreateUpload();
            tag.TagName.ShouldEqual("input");
        }

        [Fact]
        public void CreateUpload_should_render_self_closing_input()
        {
            var tag = builder.CreateUpload();
            tag.RenderMode.ShouldEqual(TagRenderMode.SelfClosing);
        }

        [Fact]
        public void CreateUpload_should_render_id()
        {
            const string id = "upload";
            upload.Name = id;

            IHtmlNode tag = builder.CreateUpload();

            tag.Attributes().ContainsKey("id").ShouldBeTrue();
        }

        [Fact]
        public void CreateUpload_should_render_name()
        {
            const string name = "upload";
            upload.Name = name;

            IHtmlNode tag = builder.CreateUpload();

            tag.Attribute("name").ShouldEqual(name);
        }

        [Fact]
        public void CreateUpload_should_render_html_attributes()
        {
            upload.HtmlAttributes.Add("title", "genericUpload");

            IHtmlNode tag = builder.CreateUpload();

            tag.Attribute("title").ShouldEqual("genericUpload");
        }

        [Fact]
        public void CreateUpload_should_set_type()
        {
            IHtmlNode tag = builder.CreateUpload();

            tag.Attribute("type").ShouldEqual("file");
        }

        [Fact]
        public void CreateUpload_should_not_set_multiple()
        {
            IHtmlNode tag = builder.CreateUpload();

            tag.Attributes().ContainsKey("multiple").ShouldBeFalse();
        }
    }
}
