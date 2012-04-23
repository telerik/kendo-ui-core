namespace Telerik.Web.Mvc.Infrastructure.Tests
{
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    using Moq;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class HtmlTagTests
    {
        [Fact]
        public void Should_render_tag_name()
        {
            Assert.Equal("<div></div>", new HtmlElement("div").ToString());
        }

        [Fact]
        public void Should_render_self_closed()
        {
            Assert.Equal("<input />", new HtmlElement("input", TagRenderMode.SelfClosing).ToString());
        }

        [Fact]
        public void Should_set_attributes_as_dictionary()
        {
            IHtmlNode tag = new HtmlElement("div");
            tag.Attributes(new Dictionary<string, string> { { "class", "t-widget" } });

            Assert.Equal("t-widget", tag.Attribute("class"));
        }

        [Fact]
        public void Should_replace_existing_attributes()
        {
            IHtmlNode tag = new HtmlElement("div");
            tag.Attributes(new Dictionary<string, string> { { "class", "t-widget" } });
            tag.Attributes(new Dictionary<string, string> { { "class", "t-other" } });

            Assert.Equal("t-other", tag.Attribute("class"));
        }
        
        [Fact]
        public void Should_not_replace_existing_attributes()
        {
            IHtmlNode tag = new HtmlElement("div");
            tag.Attributes(new Dictionary<string, string> { { "class", "t-widget" } });
            tag.Attributes(new Dictionary<string, string> { { "class", "t-other" } }, false);

            Assert.Equal("t-widget", tag.Attribute("class"));
        }

        [Fact]
        public void Should_set_attributes_as_object()
        {
            IHtmlNode tag = new HtmlElement("div");
            tag.Attributes(new { @class = "t-widget" });

            Assert.Equal("t-widget", tag.Attribute("class"));
        }

        [Fact]
        public void Should_output_attributes()
        {
            Assert.Equal("<div class=\"t-widget\"></div>", new HtmlElement("div").Attributes(new { @class = "t-widget" }).ToString());
        }

        [Fact]
        public void Should_add_class()
        {
            IHtmlNode tag = new HtmlElement("div");
            tag.AddClass("t-widget");
            Assert.Equal("t-widget", tag.Attribute("class"));
        }

        [Fact]
        public void Should_output_children()
        {
            IHtmlNode tag = new HtmlElement("div");
            tag.Children.Add(new HtmlElement("div"));

            Assert.Equal("<div><div></div></div>", tag.ToString());
        }

        [Fact]
        public void Should_respect_render_mode()
        {
            IHtmlNode tag = new HtmlElement("input", TagRenderMode.SelfClosing);

            Assert.Equal("<input />", tag.ToString());
        }

        [Fact]
        public void Should_set_html()
        {
            Assert.Equal("<div><span>test</span></div>", new HtmlElement("div").Html("<span>test</span>").ToString());
        }

        [Fact]
        public void Should_set_text()
        {
            Assert.Equal("<div>&lt;span&gt;</div>", new HtmlElement("div").Text("<span>").ToString());
        }

        [Fact]
        public void Should_clear_children_when_setting_text()
        {
            IHtmlNode tag = new HtmlElement("div");
            tag.Children.Add(new HtmlElement("div"));

            tag.Text("test");

            Assert.Equal(0, tag.Children.Count);
        }

        [Fact]
        public void Should_append_to_parent()
        {
            IHtmlNode parent = new HtmlElement("div");
            IHtmlNode child = new HtmlElement("div");
            child.AppendTo(parent);

            Assert.Contains(child, parent.Children);
        }

        [Fact]
        public void Should_set_attribute()
        {
            IHtmlNode tag = new HtmlElement("div");

            tag.Attribute("class", "t-widget");

            Assert.Equal("t-widget", tag.Attribute("class"));
        }

        [Fact]
        public void Should_attribute_replaces_by_default()
        {
            IHtmlNode tag = new HtmlElement("div");

            tag.Attribute("class", "t-widget");
            tag.Attribute("class", "t-other");

            Assert.Equal("t-other", tag.Attribute("class"));
        }

        [Fact]
        public void Should_write_to_text_writer()
        {
            Mock<TextWriter> output = new Mock<TextWriter>();
            output.Setup(w => w.Write("<div>")).Verifiable();
            output.Setup(w => w.Write("</div>")).Verifiable();

            IHtmlNode tag = new HtmlElement("div");
            tag.WriteTo(output.Object);

            output.VerifyAll();
        }

        [Fact]
        public void Should_write_child_tags_to_text_writer()
        {
            Mock<TextWriter> output = new Mock<TextWriter>();
            output.Setup(w => w.Write("<div>")).Verifiable();
            output.Setup(w => w.Write("<span>")).Verifiable();
            output.Setup(w => w.Write("</span>")).Verifiable();
            output.Setup(w => w.Write("</div>")).Verifiable();

            IHtmlNode tag = new HtmlElement("div");
            new HtmlElement("span").AppendTo(tag);

            tag.WriteTo(output.Object);

            output.VerifyAll();
        }

        [Fact]
        public void Should_write_self_closing_tags_to_text_writer()
        {
            Mock<TextWriter> output = new Mock<TextWriter>();
            output.Setup(w => w.Write("<input />")).Verifiable();

            IHtmlNode tag = new HtmlElement("input", TagRenderMode.SelfClosing);

            tag.WriteTo(output.Object);

            output.VerifyAll();
        }

        [Fact]
        public void Should_output_template()
        {
            Mock<TextWriter> output = new Mock<TextWriter>();
            output.Setup(w => w.Write("Template")).Verifiable();

            IHtmlNode tag = new HtmlElement("div");
            tag.Template((writer) => output.Object.Write("Template"));

            tag.WriteTo(output.Object);

            output.VerifyAll();
        }

        [Fact]
        public void Should_prepend_css_classes()
        {
            IHtmlNode tag = new HtmlElement("div").AddClass("test").PrependClass("first second");

            Assert.Equal("first second test", tag.Attribute("class"));
        }

        [Fact]
        public void TextNode_should_encode_its_value()
        {
            IHtmlNode node = new TextNode("<span>");

            Assert.Equal("&lt;span&gt;", node.ToString());
        }
    }
}
