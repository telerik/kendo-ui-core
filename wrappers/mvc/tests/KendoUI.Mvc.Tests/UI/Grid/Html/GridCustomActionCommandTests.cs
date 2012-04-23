namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Moq;
    using Telerik.Web.Mvc.UI.Html;
    using Telerik.Web.Mvc.UI.Tests;
    using Xunit;

    public class GridCustomActionCommandTests
    {
        private GridCustomActionCommand<Customer> command;
        private readonly Mock<IGridLocalization> localization;
        private readonly Mock<IGridUrlBuilder> urlBuilder;
        private readonly Mock<IGridHtmlHelper> htmlHelper;

        public GridCustomActionCommandTests()
        {
            command = new GridCustomActionCommand<Customer>();
            command.ControllerName = "Home";
            command.ActionName = "Index";

            localization = new Mock<IGridLocalization>();
            urlBuilder = new Mock<IGridUrlBuilder>();
            urlBuilder.Setup(u => u.GetDataKeys()).Returns(new IGridDataKey[0]).Verifiable();
            htmlHelper = new Mock<IGridHtmlHelper>();
        }

        [Fact]
        public void Should_use_the_text_property_as_button_text()
        {
            command.Text = "Custom";

            var button = Button();

            button.Text.ShouldEqual(command.Text);
        }

        [Fact]
        public void Should_set_use_url_of_the_button_builder()
        {
            command.Text = "Custom";

            var button = Button();

            button.Url.ShouldNotBeNull();
        }

        [Fact]
        public void Should_use_navigatable_and_url_builder_to_build_url()
        {
            urlBuilder.Setup(u => u.Url(It.IsAny<INavigatable>(), true)).Verifiable();
 
            var button = Button();

            button.Create(null);

            urlBuilder.Verify();
        }

        [Fact]
        public void Should_not_copy_route_values_if_send_state_is_false()
        {
            command.SendState = false;

            urlBuilder.Setup(u => u.Url(It.IsAny<INavigatable>(), false)).Verifiable();
 
            var button = Button();

            button.Create(null);

            urlBuilder.Verify();
        }
        [Fact]
        public void Should_use_route_keys_to_build_the_url()
        {
            var key = new Mock<IGridDataKey<Customer>>();

            key.Setup(k => k.GetValue(It.IsAny<object>())).Verifiable();
            key.SetupGet(k => k.RouteKey).Returns("foo");

            command.DataRouteValues.Add(key.Object);

            var button = Button();

            button.Create(null);

            key.Verify();
        }

        [Fact]
        public void Should_use_data_keys_to_build_the_url()
        {
            var button = Button();

            button.Create(null);

            urlBuilder.Verify();
        }

        [Fact]
        public void Should_not_use_data_keys_to_build_the_url_if_send_data_keys_is_false()
        {
            command.SendDataKeys = false;

            var button = Button();

            button.Create(null);

            urlBuilder.Verify(u => u.GetDataKeys(), Times.Never());
        }

        private IDictionary<string, object> Serialize()
        {
            return command.Serialize(urlBuilder.Object);
        }

        private IGridButtonBuilder Button()
        {
            return command.CreateDisplayButtons(localization.Object, urlBuilder.Object, htmlHelper.Object).First();
        }
    }
}
