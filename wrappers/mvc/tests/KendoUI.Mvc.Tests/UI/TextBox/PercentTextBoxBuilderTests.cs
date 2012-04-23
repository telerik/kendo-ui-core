namespace Telerik.Web.Mvc.UI.Tests
{

    using Xunit;

    public class PercentTextBoxBuilderTests
    {
        private readonly PercentTextBox input;
        private readonly PercentTextBoxBuilder builder;

        public PercentTextBoxBuilderTests()
        {
            input = TextBoxBaseTestHelper.CreatePercentTextBox(null);
            builder = new PercentTextBoxBuilder(input);
        }

        [Fact]
        public void DecimalDigits_should_set_DecimalDigits_property_of_NumericTextBox()
        {
            const int decimalDigits = 10;
            builder.DecimalDigits(decimalDigits);

            Assert.Equal(decimalDigits, input.DecimalDigits);
        }

        [Fact]
        public void DecimalDigits_should_return_builder()
        {
            const int decimalDigits = 1;
            var returnedBuilder = builder.DecimalDigits(decimalDigits);

            Assert.IsType(typeof(PercentTextBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void DecimalSeparator_should_set_DecimalSeparator_property_of_NumericTextBox()
        {
            const string decimalSeparator = ".";
            builder.DecimalSeparator(decimalSeparator);

            Assert.Equal(decimalSeparator, input.DecimalSeparator);
        }

        [Fact]
        public void DecimalSeparator_should_return_builder()
        {
            const string decimalSeparator = ".";
            var returnedBuilder = builder.DecimalSeparator(decimalSeparator);

            Assert.IsType(typeof(PercentTextBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void PositivePatternIndex_should_set_PositivePatternIndex_property_of_PercentTextBox()
        {
            const int positivePattern = 1;
            builder.PositivePatternIndex(positivePattern);

            Assert.Equal(positivePattern, input.PositivePatternIndex);
        }

        [Fact]
        public void PositivePatternIndex_should_return_builder()
        {
            const int positivePattern = 1;
            var returnedBuilder = builder.PositivePatternIndex(positivePattern);

            Assert.IsType(typeof(PercentTextBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void PercentSymbol_should_set_PercentSymbol_property_of_PercentTextBox()
        {
            const string percentSymbol = "%";
            builder.PercentSymbol(percentSymbol);

            Assert.Equal(percentSymbol, input.PercentSymbol);
        }

        [Fact]
        public void CurrencySymbol_should_return_builder()
        {
            const string percentSymbol = "%";
            var returnedBuilder = builder.PercentSymbol(percentSymbol);

            Assert.IsType(typeof(PercentTextBoxBuilder), returnedBuilder);
        }
     }
}
