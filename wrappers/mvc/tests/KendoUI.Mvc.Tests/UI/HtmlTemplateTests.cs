namespace Telerik.Web.Mvc.UI.Tests
{
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;
    
    public class HtmlTemplateTests
    {
        [Fact]
        public void Setting_html_clears_other_properties()
        {
            var template = new HtmlTemplate<string>();
            template.InlineTemplate = delegate { return null; };
            template.CodeBlockTemplate = delegate { };

            template.Html = "foo";

            Assert.Null(template.CodeBlockTemplate);
            Assert.Null(template.InlineTemplate);
        }

        [Fact]
        public void Setting_code_block_clears_other_properties()
        {
            var template = new HtmlTemplate<string>();
            template.InlineTemplate = delegate { return null; };
            template.Html = "foo";

            template.CodeBlockTemplate = delegate { };

            Assert.Null(template.Html);
            Assert.Null(template.InlineTemplate);
        }
        
        [Fact]
        public void Setting_inline_template_clears_other_properties()
        {
            var template = new HtmlTemplate<string>();
            
            template.Html = "foo";
            template.CodeBlockTemplate = delegate { };
            
            template.InlineTemplate = delegate { return null; };

            Assert.Null(template.Html); 
            Assert.Null(template.CodeBlockTemplate);
        }

        [Fact]
        public void Applying_when_html_is_set_sets_html_of_the_node()
        {
            var template = new HtmlTemplate<object>();
            template.Html = "<strong>foo</strong>";
            var node = new HtmlElement("div");
            template.Apply(null, node);
            Assert.Equal(template.Html, node.InnerHtml);
        }

        [Fact]
        public void Applying_when_code_block_is_set_sets_template_of_the_node()
        {
            var template = new HtmlTemplate<object>();
            template.CodeBlockTemplate = delegate { };
            var node = new HtmlElement("div");
            template.Apply(null, node);
            Assert.NotNull(node.Template());
        }
        
        [Fact]
        public void Applying_when_inline_template_sets_html_of_the_node()
        {
            var template = new HtmlTemplate<object>();
            template.InlineTemplate = (value) => value;
            var node = new HtmlElement("div");
            template.Apply("foo", node);
            
            Assert.Equal("<div>foo</div>", node.ToString());
        }

        [Fact]
        public void HasValue_returns_false_by_default()
        {
            Assert.False(new HtmlTemplate<object>().HasValue());
        }
        
        [Fact]
        public void HasValue_returns_true_if_html_is_set()
        {
            Assert.True(new HtmlTemplate<object>{ Html = "foo" }.HasValue());
        }

        [Fact]
        public void HasValue_returns_true_if_inline_template_is_set()
        {
            Assert.True(new HtmlTemplate<object> { InlineTemplate = delegate { return "foo"; } }.HasValue());
        }

        [Fact]
        public void HasValue_returns_true_if_code_block_template_is_set()
        {
            Assert.True(new HtmlTemplate<object> { CodeBlockTemplate = delegate { } }.HasValue());
        }
    }
}
