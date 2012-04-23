

namespace KendoUI.Mvc.UI.Html
{
    using Moq;
    using KendoUI.Mvc.Infrastructure;
    using Xunit;
    
    public class GridButtonTextDecoratorTests
    {
        private readonly GridButtonTextDecorator decorator;
        private readonly Mock<IGridButtonBuilder> button;
        private readonly IHtmlNode html;

        public GridButtonTextDecoratorTests()
        {
            button = new Mock<IGridButtonBuilder>();
            html = new HtmlElement("button");
            
            decorator = new GridButtonTextDecorator(button.Object);
        }

        [Fact]
        public void Should_create_literal_node()
        {
            button.Setup(b => b.Text).Returns("foo");

            decorator.Apply(html);

            html.Children[0].InnerHtml.ShouldEqual("foo");
        }
    }
}
