// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Infrastructure;
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

            StyleSheetRegistrar styleSheetRegistrar = new StyleSheetRegistrar(new WebAssetCollection(WebAssetDefaultSettings.StyleSheetFilesPath), viewContext, new Mock<IWebAssetCollectionResolver>().Object);
            StyleSheetRegistrarBuilder styleSheetRegistrarBuilder = new StyleSheetRegistrarBuilder(styleSheetRegistrar);

            ScriptRegistrar scriptRegistrar = new ScriptRegistrar(new WebAssetCollection(WebAssetDefaultSettings.ScriptFilesPath), new List<IScriptableComponent>(), viewContext, new Mock<IWebAssetCollectionResolver>().Object, new Mock<ScriptWrapperBase>().Object);
            ScriptRegistrarBuilder scriptRegistrarBuilder = new ScriptRegistrarBuilder(scriptRegistrar);
            htmlHelper = TestHelper.CreateHtmlHelper();
            _factory = new ViewComponentFactory(htmlHelper, new Mock<IClientSideObjectWriterFactory>().Object, styleSheetRegistrarBuilder, scriptRegistrarBuilder);
        }

        [Fact]
        public void StyleSheetManager_should_return_the_same_instace()
        {
            StyleSheetRegistrarBuilder sm1 = _factory.StyleSheetRegistrar();
            StyleSheetRegistrarBuilder sm2 = _factory.StyleSheetRegistrar();

            Assert.Same(sm1, sm2);
        }

        [Fact]
        public void ScriptManager_should_return_the_same_instace()
        {
            ScriptRegistrarBuilder sm1 = _factory.ScriptRegistrar();
            ScriptRegistrarBuilder sm2 = _factory.ScriptRegistrar();

            Assert.Same(sm1, sm2);
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
        public void IntegerTextBox_should_return_new_instance()
        {
            Assert.NotNull(_factory.IntegerTextBox());
        }

        [Fact]
        public void NumericTextBox_should_return_new_instance()
        {
            Assert.NotNull(_factory.NumericTextBox<double>());
        }

        [Fact]
        public void NumericTextBox_should_return_new_instance_with_type_double()
        {
            var builder = _factory.NumericTextBox<double>();
            Assert.IsType<double>(builder.ToComponent().MinValue);
        }

        [Fact]
        public void NumericTextBox_should_return_new_instance_with_type_float()
        {
            var builder = _factory.NumericTextBox<float>();
            Assert.IsType<float>(builder.ToComponent().MinValue);
        }

        [Fact]
        public void NumericTextBox_should_return_new_instance_with_type_short()
        {
            var builder = _factory.NumericTextBox<short>();
            Assert.IsType<short>(builder.ToComponent().MinValue);
        }

        [Fact]
        public void CurrencyTextBox_should_return_new_instance()
        {
            Assert.NotNull(_factory.CurrencyTextBox());
        }

        [Fact]
        public void PercentTextBox_should_return_new_instance()
        {
            Assert.NotNull(_factory.PercentTextBox());
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