namespace Kendo.Mvc.UI.Tests
{
    using System.Web.Mvc;
    using Xunit;

    public class ViewComponentFactoryTests
    {
        private readonly ViewComponentFactory _factory;
        private readonly HtmlHelper htmlHelper;

        public ViewComponentFactoryTests()
        {
            ViewContext viewContext = new ViewContext
                                          {
                                              HttpContext = TestHelper.CreateMockedHttpContext().Object,
                                              ViewData = new ViewDataDictionary()
                                          };

            htmlHelper = TestHelper.CreateHtmlHelper();
            _factory = new ViewComponentFactory(htmlHelper);
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
    }
}