namespace Kendo.Mvc.UI.Tests
{

    using System;
    using System.Linq;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class NumericTextBoxBuilderTests
    {
        private readonly NumericTextBox<double> input;
        private readonly NumericTextBoxBuilder<double> builder;

        public NumericTextBoxBuilderTests()
        {
            input = NumericTextBoxTestHelper.CreateInput<double>();
            builder = new NumericTextBoxBuilder<double>(input);
        }

        [Fact]
        public void Value_method_sets_value_property()
        {
            double value = 10;
            builder.Value(value);

            input.Value.ShouldEqual(value);
        }

        [Fact]
        public void Step_method_sets_step_property()
        {
            double step = 2;
            builder.Step(step);

            input.Step.ShouldEqual(step);
        }

        [Fact]
        public void Min_method_sets_min_property()
        {
            double min = 2;
            builder.Min(min);

            input.Min.ShouldEqual(min);
        }

        [Fact]
        public void Max_method_sets_max_property()
        {
            double max = 2;
            builder.Max(max);

            input.Max.ShouldEqual(max);
        }

        [Fact]
        public void Decimals_method_sets_decimals_property()
        {
            int decimals = 2;
            builder.Decimals(decimals);

            input.Decimals.ShouldEqual(decimals);
        }

        [Fact]
        public void Decimals_method_throws_exception_when_value_is_negative()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => builder.Decimals(-1));
        }

        [Fact]
        public void Format_method_sets_format_property()
        {
            string format = "n";
            builder.Format(format);

            input.Format.ShouldEqual(format);
        }

        [Fact]
        public void Format_method_does_not_allow_empty_string()
        {
            string format = "";
            Assert.Throws<ArgumentException>(() => builder.Format(format));
        }

        [Fact]
        public void Culture_method_sets_culture_property()
        {
            string culture = "en-US";
            builder.Culture(culture);

            input.Culture.ShouldEqual(culture);
        }

        [Fact]
        public void Placeholder_method_sets_placeholder_property()
        {
            string placeholder = "Enter value";
            builder.Placeholder(placeholder);

            input.Placeholder.ShouldEqual(placeholder);
        }

        [Fact]
        public void Spinners_method_sets_Spinners_property()
        {
            bool spinners = false;
            builder.Spinners(spinners);

            input.Spinners.ShouldEqual(spinners);
        }
        
        [Fact]
        public void Enable_method_sets_enable_property()
        {
            bool enable = false;
            builder.Enable(enable);

            input.Enabled.ShouldEqual(enable);
        }
     }
}
