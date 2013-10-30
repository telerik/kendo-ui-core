namespace Kendo.Mvc.UI.Html.Tests
{
    using System.Linq;
    using Xunit;

    public class GridEmptyRowBuilderTests
    {
        private const int Colspan = 2;
        private readonly GridEmptyRowBuilder builder;
        private readonly HtmlTemplate emptyTemplate;

        public GridEmptyRowBuilderTests()
        {
            emptyTemplate = new HtmlTemplate();
            builder = new GridEmptyRowBuilder(Colspan, emptyTemplate);
        }

        [Fact]
        public void Should_render_tr()
        {
            builder.CreateRow().TagName.ShouldEqual("tr");
        }

        [Fact]
        public void Should_create_single_td()
        {
            GetCell(builder.CreateRow()).TagName.ShouldEqual("td");
        }

        [Fact]
        public void Should_set_colspan_to_cell()
        {
            GetCell(builder.CreateRow())
                .Attribute("colspan").ShouldEqual(Colspan.ToString());
        }

        [Fact]
        public void Should_set_css_class_to_row()
        {
            builder.CreateRow().Attribute("class").ShouldContain("k-no-data");
        }

        [Fact]
        public void Should_render_message_in_the_cell()
        {
            const string emptyMessage = "this a Empty message";
            emptyTemplate.Html = emptyMessage;
            GetCell(builder.CreateRow()).InnerHtml.ShouldEqual(emptyMessage);
        }

        private IHtmlNode GetCell(IHtmlNode row)
        {
            return row.Children.First();
        }
    }
}