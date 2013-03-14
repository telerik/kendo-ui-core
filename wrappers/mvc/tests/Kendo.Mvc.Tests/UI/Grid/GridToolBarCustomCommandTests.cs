namespace Kendo.Mvc.UI.Html.Tests
{
    using Moq;
    using System.Linq;
    using Kendo.Mvc.UI.Tests;
    using Xunit;

    public class GridToolBarCustomCommandTests
    {
        private readonly GridToolBarCustomCommand<Customer> command;
        private readonly Mock<IGridUrlBuilder> urlBuilder;
        private readonly Mock<IGridHtmlHelper> htmlHelper;

        public GridToolBarCustomCommandTests()
        {
            urlBuilder = new Mock<IGridUrlBuilder>();
            htmlHelper = new Mock<IGridHtmlHelper>();
            command = new GridToolBarCustomCommand<Customer>();
        }

        [Fact]
        public void Should_create_one_button()
        {
            var buttons = command.CreateDisplayButtons(urlBuilder.Object, htmlHelper.Object);
            buttons.Count().ShouldEqual(1);
        }
        
        [Fact]
        public void Should_set_text()
        {
            command.Text = "foo";
            
            var button = command.CreateDisplayButtons(urlBuilder.Object, htmlHelper.Object).First();

            button.Text.ShouldEqual(command.Text);
        }
        
        [Fact]
        public void Should_set_html_attributes()
        {
            var button = command.CreateDisplayButtons(urlBuilder.Object, htmlHelper.Object).First();

            button.HtmlAttributes.ShouldBeSameAs(command.HtmlAttributes);
        }

        [Fact]
        public void Should_set_url()
        {
            command.Action("foo", "bar", new { id = 1 });
            urlBuilder.Setup(u => u.Url(It.IsAny<INavigatable>())).Returns("bar/foo/1");

            var button = command.CreateDisplayButtons(urlBuilder.Object, htmlHelper.Object).First();

            button.Url(null).ShouldEqual("bar/foo/1");
        }

        [Fact]
        public void Should_set_url_with_template_code_expression()
        {
            command.Action("foo", "bar", new { id = "#=foo#" });

            urlBuilder.Setup(u => u.Url(It.IsAny<INavigatable>())).Returns("bar/foo/%23%3Dfoo%23");
            var button = command.CreateDisplayButtons(urlBuilder.Object, htmlHelper.Object).First();

            button.Url(null).ShouldEqual("bar/foo/#=foo#");
        }

        //TODO: Implement command button image html attributes
        //[Fact]
        //public void Should_set_image_html_attributes()
        //{
        //    var button = command.CreateDisplayButtons(localization.Object, urlBuilder.Object, htmlHelper.Object).First();

        //    button.ImageHtmlAttributes.ShouldBeSameAs(command.ImageHtmlAttributes);
        //}
    }
}
