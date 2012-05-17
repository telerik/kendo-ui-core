namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class WindowActionsBuilderTests
    {
        private readonly WindowActionsBuilder builder;
        private IWindowButtonsContainer buttons;

        public WindowActionsBuilderTests()
        {
            buttons = new WindowButtons();
            builder = new WindowActionsBuilder(buttons);
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
