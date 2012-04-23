namespace Telerik.Web.Mvc.UI.Tests
{
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class WindowButtonsBuilderTests
    {
        private readonly WindowButtonsBuilder builder;
        private IWindowButtonsContainer buttons;

        public WindowButtonsBuilderTests()
        {
            buttons = new WindowButtons();
            builder = new WindowButtonsBuilder(buttons);
        }

        [Fact]
        public void Close_method_should_add_close_button()
        {
            builder.Close();

            buttons.Container[0].CssClass.ShouldEqual(UIPrimitives.Icons.Close);
        }

        [Fact]
        public void Close_method_should_return_builder()
        {
            builder.Close().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Close_with_url_method_should_return_builder()
        {
            builder.Close("foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Close_with_url_should_set_button_url()
        {
            const string url = "foo";

            builder.Close(url);

            buttons.Container[0].Url.ShouldEqual(url);
        }

        [Fact]
        public void Close_without_url_should_set_button_url_to_hash()
        {
            builder.Close();

            buttons.Container[0].Url.ShouldEqual("#");
        }

        [Fact]
        public void Maximize_method_should_add_maximize_button()
        {
            builder.Maximize();

            buttons.Container[0].CssClass.ShouldEqual(UIPrimitives.Icons.Maximize);
        }

        [Fact]
        public void Maximize_method_should_return_builder()
        {
            builder.Maximize().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Maximize_with_url_method_should_return_builder()
        {
            builder.Maximize("foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Maximize_with_url_should_set_button_url()
        {
            const string url = "foo";

            builder.Maximize(url);

            buttons.Container[0].Url.ShouldEqual(url);
        }

        [Fact]
        public void Maximize_without_url_should_set_button_url_to_hash()
        {
            builder.Maximize();

            buttons.Container[0].Url.ShouldEqual("#");
        }

        [Fact]
        public void Refresh_method_should_add_refresh_button()
        {
            builder.Refresh();

            buttons.Container[0].CssClass.ShouldEqual(UIPrimitives.Icons.Refresh);
        }

        [Fact]
        public void Refresh_method_should_return_builder()
        {
            builder.Refresh().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Refresh_with_url_method_should_return_builder()
        {
            builder.Refresh("foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Refresh_with_url_should_set_button_url()
        {
            const string url = "foo";

            builder.Refresh(url);

            buttons.Container[0].Url.ShouldEqual(url);
        }

        [Fact]
        public void Refresh_without_url_should_set_button_url_to_hash()
        {
            builder.Refresh();

            buttons.Container[0].Url.ShouldEqual("#");
        }

        [Fact]
        public void Clear_method_should_remove_all_buttons()
        {
            builder.Close();
            builder.Clear();

            buttons.Container.Count.ShouldEqual(0);
        }

        [Fact]
        public void Clear_method_should_return_builder()
        {
            builder.Clear().ShouldBeSameAs(builder);
        }
    }
}
