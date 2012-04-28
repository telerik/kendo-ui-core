namespace KendoUI.Mvc.UI.Html.Tests
{
    using System;
    using KendoUI.Mvc.Infrastructure;
    using Xunit;
    
    public class GridActionCellBuilderTests
    {
        private GridActionCellBuilder builder;

        [Fact]
        public void Should_create_td()
        {
            builder = new GridActionCellBuilder(new Func<object, IHtmlNode>[0]);
            builder.Callback = delegate { };
            
            var result = builder.CreateCell(null);

            result.TagName.ShouldEqual("td");
        }

        [Fact]
        public void Should_append_command_builders()
        {
            var button = new HtmlElement("button");

            builder = new GridActionCellBuilder(new Func<object, IHtmlNode>[] { (o) => button });
            builder.Callback = delegate { };

            var result = builder.CreateCell(null);

            result.Children[0].ShouldBeSameAs(button);
        }
    }
}
