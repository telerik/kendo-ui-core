namespace Telerik.Web.Mvc.UI.Tests
{

    using Xunit;

    public class CurrencyTextBoxBuilderTests
    {
        private readonly CurrencyTextBox input;
        private readonly CurrencyTextBoxBuilder builder;

        public CurrencyTextBoxBuilderTests()
        {
            input = TextBoxBaseTestHelper.CreateCurrencyTextBox(null);
            builder = new CurrencyTextBoxBuilder(input);
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

            Assert.IsType(typeof(CurrencyTextBoxBuilder), returnedBuilder);
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

            Assert.IsType(typeof(CurrencyTextBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void PositivePatternIndex_should_set_PositivePatternIndex_property_of_CurrencyTextBox()
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

            Assert.IsType(typeof(CurrencyTextBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void CurrencySymbol_should_set_CurrencySymbol_property_of_CurrencyTextBox()
        {
            const string currencySymbol = "$";
            builder.CurrencySymbol(currencySymbol);

            Assert.Equal(currencySymbol, input.CurrencySymbol);
        }

        [Fact]
        public void CurrencySymbol_should_return_builder()
        {
            const string currencySymbol = "$";
            var returnedBuilder = builder.CurrencySymbol(currencySymbol);

            Assert.IsType(typeof(CurrencyTextBoxBuilder), returnedBuilder);
        }
     }
}
