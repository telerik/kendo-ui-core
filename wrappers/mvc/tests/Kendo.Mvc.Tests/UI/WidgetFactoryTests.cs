namespace Kendo.Mvc.UI.Tests
{
    using System.Web.Mvc;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class WidgetFactoryTests
    {
        private readonly WidgetFactory _factory;
        private readonly HtmlHelper htmlHelper;

        public WidgetFactoryTests()
        {
            ViewContext viewContext = new ViewContext
                                          {
                                              HttpContext = TestHelper.CreateMockedHttpContext().Object,
                                              ViewData = new ViewDataDictionary()
                                          };

            htmlHelper = TestHelper.CreateHtmlHelper();
            _factory = new WidgetFactory(htmlHelper);
        }

        [Fact]
        public void DatePicker_should_return_new_instance()
        {
            Assert.NotNull(_factory.DatePicker());
        }

        [Fact]
        public void TimePicker_should_return_new_instance()
        {
            Assert.NotNull(_factory.TimePicker());
        }

        [Fact]
        public void Calendar_should_return_new_instance()
        {
            Assert.NotNull(_factory.Calendar());
        }

        [Fact]
        public void NumericTextBox_should_return_new_instance()
        {
            Assert.NotNull(_factory.NumericTextBox<double>());
        }

        [Fact]
        public void Window_should_return_new_instance()
        {
            Assert.NotNull(_factory.Window());
        }

        [Fact]
        public void DropDownList_should_return_new_instance()
        {
            Assert.NotNull(_factory.DropDownList());
        }

        [Fact]
        public void ComboBox_should_return_new_instance()
        {
            Assert.NotNull(_factory.ComboBox());
        }

        [Fact]
        public void Autocomplete_should_return_new_instance()
        {
            Assert.NotNull(_factory.AutoComplete());
        }

        [Fact]
        public void Slider_should_return_new_instance()
        {
            Assert.NotNull(_factory.Slider<float>());
        }

        [Fact]
        public void RangeSlider_should_return_new_instance()
        {
            Assert.NotNull(_factory.RangeSlider<float>());
        }

        [Fact]
        public void RenderDeferredScripts_returns_deferred_scripts()
        {
            _factory.RangeSlider<float>()
                .Deferred().Name("foo").Render();

            _factory.DeferredScripts().ToHtmlString().ShouldContain("<script>");
        }

        [Fact]
        public void RenderDeferredScripts_does_not_return_non_deferred_scripts()
        {
            _factory.RangeSlider<float>()
                .Name("foo").Render();

            _factory.DeferredScripts().ToHtmlString().ShouldNotContain("<script>");
        }
    }
}