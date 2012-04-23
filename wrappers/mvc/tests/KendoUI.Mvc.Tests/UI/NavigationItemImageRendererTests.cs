namespace Telerik.Web.Mvc.UI.Tests
{
    using System.IO;
    using System.Web.Mvc;
    using System.Web.UI;
    using Moq;
    using Xunit;

    public class NavigationItemImageRendererTests
    {
        private NavigationItemImageRendererDouble imageRenderer;
        private Mock<HtmlTextWriter> writer;
        private Mock<ViewContext> viewContext;
        private NavigationItemTestDouble item;

        public NavigationItemImageRendererTests()
        {
            item = new NavigationItemTestDouble();
            writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            viewContext = new Mock<ViewContext>();

            imageRenderer = new NavigationItemImageRendererDouble(writer.Object, viewContext.Object);
        }

        [Fact]
        public void WriteImage_should_render_start_img_tag_if_ImageUrl_is_set()
        {
            item.ImageUrl = "imageUrl";

            writer.Setup(w => w.RenderBeginTag(HtmlTextWriterTag.Img)).Verifiable();

            imageRenderer.WriteImage(item);

            writer.Verify(w => w.RenderBeginTag(HtmlTextWriterTag.Img));
        }

        [Fact]
        public void If_ImageUrl_is_not_set_should_not_not_render_start_img_tag()
        {
            writer.Setup(w => w.RenderBeginTag(HtmlTextWriterTag.Img)).Verifiable();

            imageRenderer.WriteImage(item);

            writer.Verify(w => w.RenderBeginTag(HtmlTextWriterTag.Img), Times.Never());
        }

        [Fact]
        public void WriteImage_should_render_end_img_tag_if_ImageUrl_is_set()
        {
            item.ImageUrl = "imageUrl";

            writer.Setup(w => w.RenderEndTag()).Verifiable();

            imageRenderer.WriteImage(item);

            writer.Verify(w => w.RenderEndTag());
        }

        [Fact]
        public void WriteImage_should__render_src_tag_if_ImageUrl_is_set()
        {
            item.ImageUrl = "imageUrl";

            writer.Setup(w => w.AddAttribute(HtmlTextWriterAttribute.Src, item.GetImageUrl(viewContext.Object), true)).Verifiable();

            imageRenderer.WriteImage(item);

            writer.Verify(w => w.AddAttribute(HtmlTextWriterAttribute.Src, item.GetImageUrl(viewContext.Object), true));
        }

        [Fact]
        public void WriteImage_should_render_alt_default()
        {
            item.ImageUrl = "imageUrl";
            item.ImageHtmlAttributes.Clear();

            imageRenderer.WriteImage(item);

            Assert.Equal(string.Empty, item.ImageHtmlAttributes["alt"]);
        }

        [Fact]
        public void WriteImage_should_render_image_class()
        {
            item.ImageUrl = "imageUrl";
            item.ImageHtmlAttributes.Clear();

            imageRenderer.WriteImage(item);

            Assert.Contains(UIPrimitives.Image.ToString(), item.ImageHtmlAttributes["class"].ToString());
        }

        [Fact]
        public void WriteImage_should_render_alt_with_text_if_ImageHtmlAttr_are_set()
        {
            const string alt = "alt";
            const string altText = "test";

            item.ImageUrl = "imageUrl";
            item.ImageHtmlAttributes.Add(alt, altText);

            writer.Setup(w => w.AddAttribute(alt, altText, true)).Verifiable();

            imageRenderer.WriteImage(item);

            writer.Verify(w => w.AddAttribute(alt, altText, true));
        }

        [Fact]
        public void If_SpriteCssClasses_is_not_set_should_not_not_render_start_span_tag()
        {
            item.SpriteCssClasses = string.Empty;

            writer.Setup(w => w.RenderBeginTag(HtmlTextWriterTag.Span)).Verifiable();

            imageRenderer.WriteSprite(item);

            writer.Verify(w => w.RenderBeginTag(HtmlTextWriterTag.Span), Times.Never());
        }

        [Fact]
        public void WriteSprite_should_render_start_span_tag()
        {
            item.SpriteCssClasses = "first";

            writer.Setup(w => w.RenderBeginTag(HtmlTextWriterTag.Span)).Verifiable();

            imageRenderer.WriteSprite(item);

            writer.Verify(w => w.RenderBeginTag(HtmlTextWriterTag.Span));
        }

        [Fact]
        public void WriteSprite_should_render_end_span_tag()
        {
            item.SpriteCssClasses = "first";

            writer.Setup(w => w.RenderEndTag()).Verifiable();

            imageRenderer.WriteSprite(item);

            writer.Verify(w => w.RenderEndTag());
        }

        [Fact]
        public void WriteSprite_should_append_sprite_class_ans_SpriteCssClasses()
        {
            string spriteClasses = UIPrimitives.Sprite;
            item.SpriteCssClasses = "first second third";

            spriteClasses = string.Format("{0} {1}", spriteClasses, item.SpriteCssClasses);

            writer.Setup(w => w.AddAttribute(HtmlTextWriterAttribute.Class, spriteClasses, false)).Verifiable();

            imageRenderer.WriteSprite(item);

            writer.Verify(w => w.AddAttribute(HtmlTextWriterAttribute.Class, spriteClasses, false));

        }
    }

    public class NavigationItemImageRendererDouble : NavigationItemImageRenderer<NavigationItemTestDouble>
    {
        public NavigationItemImageRendererDouble(HtmlTextWriter writer, ViewContext viewContext)
            : base(writer, viewContext)
        {
        }
    }
}
