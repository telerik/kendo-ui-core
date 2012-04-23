namespace Telerik.Web.Mvc.UI.Tests
{

    using Xunit;

    public class NumericTextBoxBuilderTests
    {
        private readonly NumericTextBox<double> input;
        private readonly NumericTextBoxBuilder<double> builder;

        public NumericTextBoxBuilderTests()
        {
            input = TextBoxBaseTestHelper.CreateNumericTextBox<double>(null);
            builder = new NumericTextBoxBuilder<double>(input);
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

            Assert.IsType(typeof(NumericTextBoxBuilder<double>), returnedBuilder);
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

            Assert.IsType(typeof(NumericTextBoxBuilder<double>), returnedBuilder);
        }
     }
}
