namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Moq;
    using System.Linq;
    using Telerik.Web.Mvc.UI.Tests;
    using Xunit;

    public class GridToolBarCustomCommandTests
    {
        private readonly GridToolBarCustomCommand<Customer> command;
        private readonly Mock<IGridLocalization> localization;
        private readonly Mock<IGridUrlBuilder> urlBuilder;
        private readonly Mock<IGridHtmlHelper> htmlHelper;

        public GridToolBarCustomCommandTests()
        {
            localization = new Mock<IGridLocalization>();
            urlBuilder = new Mock<IGridUrlBuilder>();
            htmlHelper = new Mock<IGridHtmlHelper>();
            command = new GridToolBarCustomCommand<Customer>();
        }

        [Fact]
        public void Should_create_one_button()
        {
            var buttons = command.CreateDisplayButtons(localization.Object, urlBuilder.Object, htmlHelper.Object);
            buttons.Count().ShouldEqual(1);
        }
        
        [Fact]
        public void Should_set_text()
        {
            command.Text = "foo";
            
            var button = command.CreateDisplayButtons(localization.Object, urlBuilder.Object, htmlHelper.Object).First();

            button.Text.ShouldEqual(command.Text);
        }

        [Fact]
        public void Should_set_html_attributes()
        {
            var button = command.CreateDisplayButtons(localization.Object, urlBuilder.Object, htmlHelper.Object).First();

            button.HtmlAttributes.ShouldBeSameAs(command.HtmlAttributes);
        }
 
        [Fact]
        public void Should_set_image_html_attributes()
        {
            var button = command.CreateDisplayButtons(localization.Object, urlBuilder.Object, htmlHelper.Object).First();

            button.ImageHtmlAttributes.ShouldBeSameAs(command.ImageHtmlAttributes);
        }
    }
}
