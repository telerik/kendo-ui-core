// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;

    public class ViewComponentModelFactoryTests
    {
#if MVC2 || MVC3
        private readonly ViewComponentFactory<TestModel> factory;
        private readonly HtmlHelper<TestModel> htmlHelper;

        public ViewComponentModelFactoryTests()
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

            htmlHelper = TestHelper.CreateHtmlHelper<TestModel>();

            htmlHelper.ViewData.Model = new TestModel { ID = 1, DoubleProperty = 1.0, DecimalProperty = 1.0m, DateTimeProperty = DateTime.Today, TimeProperty = DateTime.Now.TimeOfDay, ComplexModel = new TestModel() };

            factory = new ViewComponentFactory<TestModel>(htmlHelper, new Mock<IClientSideObjectWriterFactory>().Object, styleSheetRegistrarBuilder, scriptRegistrarBuilder);
        }

        [Fact]
        public void NumericTextBoxFor_should_return_new_instance()
        {
            Assert.NotNull(factory.NumericTextBoxFor(m => m.ID));
        }

        [Fact]
        public void NumericTextBoxFor_should_return_new_instance_with_set_name()
        {
            var builder = factory.NumericTextBoxFor(m => m.ID);

            Assert.Equal("ID", builder.ToComponent().Name);
        }

        [Fact]
        public void NumericTextBoxFor_should_return_new_instance_with_set_value()
        {
            var builder = factory.NumericTextBoxFor(m => m.ID);

            Assert.Equal(1, builder.ToComponent().Value.Value);
        }

        [Fact]
        public void NumericTextBoxFor_should_return_new_instance_with_set_name_even_type_is_null()
        {
            htmlHelper.ViewContext.ViewData.TemplateInfo.HtmlFieldPrefix = "innerView";
            var builder = factory.NumericTextBoxFor(m => m.NullableInt);

            Assert.Equal("innerView.NullableInt", builder.ToComponent().Name);
        }

        [Fact]
        public void NumericTextBoxFor_should_return_new_instance_and_value_should_be_null()
        {
            var builder = factory.NumericTextBoxFor(m => m.NullableInt);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void NumericTextBoxFor_should_return_new_instance_and_value_should_be_null_when_model_is_null()
        {
            htmlHelper.ViewData.Model = null;

            var builder = factory.NumericTextBoxFor(m => m.NullableInt);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void NumericTextBoxFor_should_return_new_instance_and_value_should_be_default_property_value_when_model_is_null()
        {
            htmlHelper.ViewData.Model = null;

            var builder = factory.NumericTextBoxFor(m => m.ID);

            Assert.Equal(0, builder.ToComponent().Value);
        }

        [Fact]
        public void NumericTextBoxFor_should_return_new_instance_with_set_min_and_max()
        {
            var builder = factory.NumericTextBoxFor(m => m.DoubleProperty);

            Assert.Equal(1, builder.ToComponent().MinValue);
            Assert.Equal(30, builder.ToComponent().MaxValue);
        }

        [Fact]
        public void IntegerTextBoxFor_should_return_new_instance()
        {
            Assert.NotNull(factory.IntegerTextBoxFor(m => m.ID));
        }

        [Fact]
        public void IntegerTextBoxFor_should_return_new_instance_with_set_name()
        {
            var builder = factory.IntegerTextBoxFor(m => m.ID);

            Assert.Equal("ID", builder.ToComponent().Name);
        }

        [Fact]
        public void IntegerTextBoxFor_should_return_new_instance_with_set_value()
        {
            var builder = factory.IntegerTextBoxFor(m => m.ID);

            Assert.Equal(1, builder.ToComponent().Value.Value);
        }

        [Fact]
        public void IntegerTextBoxFor_should_return_new_instance_and_value_should_be_null_when_model_is_null()
        {
            htmlHelper.ViewData.Model = null;

            var builder = factory.IntegerTextBoxFor(m => m.NullableInt);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void IntegerTextBoxFor_should_return_new_instance_and_value_should_be_default_property_value_when_model_is_null()
        {
            htmlHelper.ViewData.Model = null;

            var builder = factory.IntegerTextBoxFor(m => m.ID);

            Assert.Equal(0, builder.ToComponent().Value);
        }

        [Fact]
        public void IntegerTextBoxFor_should_return_new_instance_with_set_name_even_type_is_null()
        {
            var builder = factory.IntegerTextBoxFor(m => m.NullableInt);

            Assert.Equal("NullableInt", builder.ToComponent().Name);
        }

        [Fact]
        public void IntegerTextBoxFor_should_return_new_instance_and_value_should_be_null()
        {
            var builder = factory.IntegerTextBoxFor(m => m.NullableInt);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void PercentTextBoxFor_should_return_new_instance()
        {
            Assert.NotNull(factory.PercentTextBoxFor(m => m.DoubleProperty));
        }

        [Fact]
        public void PercentTextBoxFor_should_return_new_instance_with_set_name()
        {
            var builder = factory.PercentTextBoxFor(m => m.DoubleProperty);

            Assert.Equal("DoubleProperty", builder.ToComponent().Name);
        }

        [Fact]
        public void PercentTextBoxFor_should_return_new_instance_with_set_value()
        {
            var builder = factory.PercentTextBoxFor(m => m.DoubleProperty);

            Assert.Equal(1.0, builder.ToComponent().Value.Value);
        }

        [Fact]
        public void PercentTextBoxFor_should_return_new_instance_with_set_name_even_type_is_null()
        {
            var builder = factory.PercentTextBoxFor(m => m.NullableDouble);

            Assert.Equal("NullableDouble", builder.ToComponent().Name);
        }

        [Fact]
        public void PercentTextBoxFor_should_return_new_instance_and_value_should_be_null()
        {
            var builder = factory.PercentTextBoxFor(m => m.NullableDouble);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void PercentTextBoxFor_should_return_new_instance_and_value_should_be_null_when_model_is_null()
        {
            htmlHelper.ViewData.Model = null;

            var builder = factory.PercentTextBoxFor(m => m.DoubleProperty);

            Assert.Equal(0, builder.ToComponent().Value);
        }

        [Fact]
        public void PercentTextBoxFor_should_return_new_instance_and_value_should_be_default_property_value_when_model_is_null()
        {
            htmlHelper.ViewData.Model = null;

            var builder = factory.PercentTextBoxFor(m => m.NullableDouble);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void CurrencyTextBoxFor_should_return_new_instance()
        {
            Assert.NotNull(factory.CurrencyTextBoxFor(m => m.DecimalProperty));
        }

        [Fact]
        public void CurrencyTextBoxFor_should_return_new_instance_with_set_name()
        {
            var builder = factory.CurrencyTextBoxFor(m => m.DecimalProperty);

            Assert.Equal("DecimalProperty", builder.ToComponent().Name);
        }

        [Fact]
        public void CurrencyTextBoxFor_should_return_new_instance_with_set_value()
        {
            var builder = factory.CurrencyTextBoxFor(m => m.DecimalProperty);

            Assert.Equal(1.0m, builder.ToComponent().Value.Value);
        }

        [Fact]
        public void CurrencyTextBoxFor_should_return_new_instance_with_set_name_even_type_is_null()
        {
            var builder = factory.CurrencyTextBoxFor(m => m.NullableDecimal);

            Assert.Equal("NullableDecimal", builder.ToComponent().Name);
        }

        [Fact]
        public void CurrencyTextBoxFor_should_return_new_instance_and_value_should_be_null()
        {
            var builder = factory.CurrencyTextBoxFor(m => m.NullableDecimal);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void CurrencyTextBoxFor_should_return_new_instance_and_value_should_be_null_when_model_is_null()
        {
            htmlHelper.ViewData.Model = null;

            var builder = factory.CurrencyTextBoxFor(m => m.NullableDecimal);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void CurrencyTextBoxFor_should_return_new_instance_and_value_should_be_default_property_value_when_model_is_null()
        {
            htmlHelper.ViewData.Model = null;

            var builder = factory.CurrencyTextBoxFor(m => m.DecimalProperty);

            Assert.Equal(0, builder.ToComponent().Value);
        }
        
        [Fact]
        public void DatePickerFor_should_return_new_instance()
        {
            Assert.NotNull(factory.DatePickerFor(m => m.DateTimeProperty));
        }

        [Fact]
        public void DatePickerFor_should_return_new_instance_with_set_name()
        {
            var builder = factory.DatePickerFor(m => m.DateTimeProperty);

            Assert.Equal("DateTimeProperty", builder.ToComponent().Name);
        }

        [Fact]
        public void DatePickerFor_should_return_new_instance_with_set_value()
        {
            var builder = factory.DatePickerFor(m => m.DateTimeProperty);

            Assert.Equal(DateTime.Today, builder.ToComponent().Value.Value);
        }

        [Fact]
        public void DatePickerFor_should_return_new_instance_with_set_name_even_type_is_null()
        {
            var builder = factory.DatePickerFor(m => m.NullableDateTime);

            Assert.Equal("NullableDateTime", builder.ToComponent().Name);
        }

        [Fact]
        public void DatePickerFor_should_return_new_instance_and_value_should_be_null()
        {
            var builder = factory.DatePickerFor(m => m.NullableDateTime);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void DatePickerFor_should_return_new_instance_and_value_should_be_null_when_model_is_null()
        {
            htmlHelper.ViewData.Model = null;

            var builder = factory.DatePickerFor(m => m.NullableDateTime);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void DatePickerFor_should_return_new_instance_with_set_min_and_max()
        {
            var builder = factory.DatePickerFor(m => m.DateTimeProperty);

            Assert.Equal(new DateTime(2000, 10, 10), builder.ToComponent().MinValue);
            Assert.Equal(new DateTime(2020, 10, 10), builder.ToComponent().MaxValue);
        }

        [Fact]
        public void TimePickerFor_with_TimeSpan_expression_should_return_new_instance()
        {
            Assert.NotNull(factory.TimePickerFor(m => m.TimeProperty));
        }

        [Fact]
        public void TimePickerFor_with_TimeSpan_expression_should_return_new_instance_with_set_name()
        {
            var builder = factory.TimePickerFor(m => m.TimeProperty);

            Assert.Equal("TimeProperty", builder.ToComponent().Name);
        }

        [Fact]
        public void TimePickerFor_with_TimeSpan_expression_should_return_new_instance_with_set_value()
        {
            var builder = factory.TimePickerFor(m => m.TimeProperty);

            Assert.Equal(new DateTime((htmlHelper.ViewData.Model as TestModel).TimeProperty.Ticks), builder.ToComponent().Value.Value);
        }

        [Fact]
        public void TimePickerFor_with_TimeSpan_expression_should_return_new_instance_with_set_name_even_type_is_null()
        {
            var builder = factory.TimePickerFor(m => m.NullableTime);

            Assert.Equal("NullableTime", builder.ToComponent().Name);
        }

        [Fact]
        public void TimePickerFor_with_TimeSpan_expression_should_return_new_instance_and_value_should_be_null()
        {
            var builder = factory.TimePickerFor(m => m.NullableTime);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void TimePickerFor_with_DateTime_expression_should_return_new_instance()
        {
            Assert.NotNull(factory.TimePickerFor(m => m.DateTimeProperty));
        }

        [Fact]
        public void TimePickerFor_with_DateTime_expression_should_return_new_instance_with_set_name()
        {
            var builder = factory.TimePickerFor(m => m.DateTimeProperty);

            Assert.Equal("DateTimeProperty", builder.ToComponent().Name);
        }

        [Fact]
        public void TimePickerFor_with_DateTime_expression_should_return_new_instance_with_set_value()
        {
            var builder = factory.TimePickerFor(m => m.DateTimeProperty);

            Assert.Equal((htmlHelper.ViewData.Model as TestModel).DateTimeProperty, builder.ToComponent().Value.Value);
        }

        [Fact]
        public void TimePickerFor_with_DateTime_expression_should_return_new_instance_with_set_name_even_type_is_null()
        {
            var builder = factory.TimePickerFor(m => m.NullableDateTime);

            Assert.Equal("NullableDateTime", builder.ToComponent().Name);
        }

        [Fact]
        public void TimePickerFor_with_DateTime_expression_should_return_new_instance_and_value_should_be_null()
        {
            var builder = factory.TimePickerFor(m => m.NullableDateTime);

            Assert.Equal(null, builder.ToComponent().Value);
        }

        [Fact]
        public void TimePickerFor_with_DateTime_expression_should_return_new_instance_with_set_min_and_max()
        {
            var builder = factory.TimePickerFor(m => m.DateTimeProperty);

            Assert.Equal(new DateTime(2000, 10, 10), builder.ToComponent().MinValue);
            Assert.Equal(new DateTime(2020, 10, 10), builder.ToComponent().MaxValue);
        }

        [Fact]
        public void DropDownListFor_should_return_new_instance()
        {
            Assert.NotNull(factory.DropDownListFor(m => m.ID));
        }

        [Fact]
        public void DropDownListFor_should_return_new_instance_with_set_name()
        {
            var builder = factory.DropDownListFor(m => m.ID);

            Assert.Equal("ID", builder.ToComponent().Name);
        }

        [Fact]
        public void DropDownListFor_should_return_new_instance_with_set_value()
        {
            var builder = factory.DropDownListFor(m => m.ID);

            Assert.Equal(htmlHelper.ViewData.Model.ID.ToString(), builder.ToComponent().Value);
        }

        [Fact]
        public void DropDownListFor_should_not_set_value_if_Model_is_not_predifined_type()
        {
            var builder = factory.DropDownListFor(m => m.ComplexModel);

            builder.ToComponent().Value.ShouldBeEmpty();
        }

        [Fact]
        public void ComboBoxFor_should_return_new_instance()
        {
            Assert.NotNull(factory.ComboBoxFor(m => m.ID));
        }

        [Fact]
        public void ComboBoxFor_should_return_new_instance_with_set_name()
        {
            var builder = factory.ComboBoxFor(m => m.ID);

            Assert.Equal("ID", builder.ToComponent().Name);
        }

        [Fact]
        public void ComboBoxFor_should_return_new_instance_with_set_value()
        {
            var builder = factory.ComboBoxFor(m => m.ID);

            Assert.Equal(htmlHelper.ViewData.Model.ID.ToString(), builder.ToComponent().Value);
        }

        [Fact]
        public void ComboBoxFor_should_not_set_value_if_Model_is_not_predifined_type()
        {
            var builder = factory.ComboBoxFor(m => m.ComplexModel);

            builder.ToComponent().Value.ShouldBeEmpty();
        }

        [Fact]
        public void AutoCompleteFor_should_return_new_instance()
        {
            Assert.NotNull(factory.AutoCompleteFor(m => m.ID));
        }

        [Fact]
        public void AutoCompleteFor_should_return_new_instance_with_set_name()
        {
            var builder = factory.AutoCompleteFor(m => m.ID);

            Assert.Equal("ID", builder.ToComponent().Name);
        }

        [Fact]
        public void AutoCompleteFor_should_return_new_instance_with_value_from_expression_null()
        {
            var builder = factory.AutoCompleteFor(m => m.NullableInt);

            Assert.Equal(string.Empty, builder.ToComponent().Value);
        }

        [Fact]
        public void AutoCompleteFor_should_return_new_instance_with_set_value()
        {
            var builder = factory.AutoCompleteFor(m => m.ID);

            Assert.Equal(htmlHelper.ViewData.Model.ID.ToString(), builder.ToComponent().Value);
        }

        [Fact]
        public void AutoCompleteFor_should_not_set_value_if_Model_is_not_predifined_type()
        {
            var builder = factory.AutoCompleteFor(m => m.ComplexModel);

            builder.ToComponent().Value.ShouldBeEmpty();
        }

        public class TestModel
        {
            public int ID { get; set; }

            [Range(1, 30)]
            public double DoubleProperty { get; set; }

            public int? NullableInt { get; set; }
            public double? NullableDouble { get; set; }
            public decimal DecimalProperty { get; set; }
            public decimal? NullableDecimal { get; set; }

            [Range(typeof(DateTime), "10/10/2000", "10/10/2020")]
            public DateTime DateTimeProperty { get; set; }
            public DateTime? NullableDateTime { get; set; }

            [Range(typeof(TimeSpan), "00:00:00", "22:22:22")]
            public TimeSpan TimeProperty { get; set; }
            public TimeSpan? NullableTime { get; set; }

            public TestModel ComplexModel { get; set; }
        }
#endif
    }
}
