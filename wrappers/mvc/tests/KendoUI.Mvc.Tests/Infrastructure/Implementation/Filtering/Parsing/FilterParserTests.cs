namespace Telerik.Web.Mvc.Infrastructure.Tests
{
    using System;
    using System.Globalization;
    using Implementation;
    using Xunit;

    public class FilterParserTests : IDisposable
    {
        private CultureInfo currentCulture;

        public FilterParserTests()
        {
            currentCulture = System.Threading.Thread.CurrentThread.CurrentCulture;
        }

        public void Dispose()
        {
            System.Threading.Thread.CurrentThread.CurrentCulture = currentCulture;
        }
        [Fact]
        public void Should_parse_comparison_expression_and_number()
        {
            ComparisonNode result = (ComparisonNode)Parse("age~eq~10");

            Assert.Equal(FilterOperator.IsEqualTo, result.FilterOperator);

            PropertyNode property = (PropertyNode)result.First;

            Assert.Equal("age", property.Name);

            NumberNode number = (NumberNode)result.Second;

            Assert.Equal(10, Convert.ToInt32(number.Value));
        }

        [Fact]
        public void Should_parse_property()
        {
            PropertyNode result = (PropertyNode)Parse("age");
            Assert.Equal("age", result.Name);
        }

        [Fact]
        public void Should_parse_boolean()
        {
            BooleanNode result = (BooleanNode)Parse("true");
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public void Should_parse_number()
        {
            NumberNode result = (NumberNode)Parse("10");
            Assert.Equal(10, Convert.ToInt32(result.Value));
        }

        [Fact]
        public void Should_parse_number_when_decimal_separator_is_of_the_current_culture_is_comma()
        {
            System.Threading.Thread.CurrentThread.CurrentCulture = new CultureInfo("bg-BG");
            NumberNode result = (NumberNode)Parse("10.5");
            Assert.Equal(10.5, result.Value);
        }

        [Fact]
        public void Should_parse_string()
        {
            StringNode result = (StringNode)Parse("'10'");
            Assert.Equal("10", result.Value);
        }

        [Fact]
        public void Should_parse_datetime()
        {
            DateTimeNode result = (DateTimeNode)Parse("datetime'2000-10-11T10-10-10'");
            Assert.Equal(DateTime.ParseExact("2000-10-11T10-10-10", "yyyy-MM-ddThh-mm-ss", null), result.Value);
        }

        [Fact]
        public void Should_parse_parenthesis()
        {
            NumberNode result = (NumberNode)Parse("(10)");
            Assert.Equal(10, Convert.ToInt32(result.Value));
        }

        [Fact]
        public void Should_parse_nested_parenthesis()
        {
            NumberNode result = (NumberNode)Parse("(((10)))");
            Assert.Equal(10, Convert.ToInt32(result.Value));
        }
        [Fact]
        public void Should_throw_in_case_of_improperly_nested_parenthesis()
        {
            Assert.Throws<FilterParserException>(() => Parse("(((10))"));
        }

        [Fact]
        public void Should_parse_function_with_single_argument()
        {
            FunctionNode function = (FunctionNode)Parse("startswith(1)");

            Assert.Equal(FilterOperator.StartsWith, function.FilterOperator);
            Assert.Equal(1, Convert.ToInt32(((NumberNode)function.Arguments[0]).Value));
        }

        [Fact]
        public void Should_parse_function_with_two_arguments()
        {
            FunctionNode function = (FunctionNode)Parse("startswith(name,1)");

            Assert.Equal(FilterOperator.StartsWith, function.FilterOperator);
            Assert.Equal("name", ((PropertyNode)function.Arguments[0]).Name);
            Assert.Equal(1, Convert.ToInt32(((NumberNode)function.Arguments[1]).Value));
        }

        [Fact]
        public void Should_parse_function_as_infix_expression()
        {
            FunctionNode function = (FunctionNode)Parse("name~startswith~1");

            Assert.Equal(FilterOperator.StartsWith, function.FilterOperator);
            Assert.Equal("name", ((PropertyNode)function.Arguments[0]).Name);
            Assert.Equal(1, Convert.ToInt32(((NumberNode)function.Arguments[1]).Value));
        }

        [Fact]
        public void Should_parse_and_expression()
        {
            AndNode or = (AndNode)Parse("1~and~2");

            Assert.Equal(1, Convert.ToInt32(((NumberNode)or.First).Value));
            Assert.Equal(2, Convert.ToInt32(((NumberNode)or.Second).Value));
        }

        [Fact]
        public void Should_parse_three_and_nested_expressions()
        {
            var result = Parse(@"OrderID~gt~10255~and~startswith(Customer.ContactName,'Paula')~and~startswith(ShipAddress,'2817')");

            var firstExpression = (ComparisonNode)((AndNode)((AndNode)result).First).First;
            var secondExpression = (FunctionNode)((AndNode)((AndNode)result).First).Second;
            var thirdExpression = (FunctionNode)((AndNode)result).Second;

            Assert.Equal(FilterOperator.IsGreaterThan, firstExpression.FilterOperator);
            Assert.Equal("OrderID", ((PropertyNode)firstExpression.First).Name);
            Assert.Equal(10255, Convert.ToInt32(((NumberNode)firstExpression.Second).Value));

            Assert.Equal(FilterOperator.StartsWith, secondExpression.FilterOperator);
            Assert.Equal("Customer.ContactName", ((PropertyNode)secondExpression.Arguments[0]).Name);
            Assert.Equal("Paula", ((StringNode)secondExpression.Arguments[1]).Value);

            Assert.Equal(FilterOperator.StartsWith, thirdExpression.FilterOperator);
            Assert.Equal("ShipAddress", ((PropertyNode)thirdExpression.Arguments[0]).Name);
            Assert.Equal("2817", ((StringNode)thirdExpression.Arguments[1]).Value);
        }

        [Fact]
        public void Should_parse_or_expression()
        {
            OrNode or = (OrNode)Parse("1~or~2");

            Assert.Equal(1, Convert.ToInt32(((NumberNode)or.First).Value));
            Assert.Equal(2, Convert.ToInt32(((NumberNode)or.Second).Value));
        }

        [Fact]
        public void Should_parse_complex_nested_expression()
        {
            OrNode or = (OrNode)Parse("(age~lt~20~and~startswith(name,'j'))~or~(endswith(name,'s')~and~number~gt~20)");

            Assert.IsType(typeof(AndNode), or.First);
            Assert.IsType(typeof(AndNode), or.Second);
        }

        [Fact]
        public void Should_throw_if_or_is_missing_second_argument()
        {
            Assert.Throws<FilterParserException>(() => Parse("1~or"));
        }

        [Fact]
        public void Should_throw_if_and_is_missing_second_argument()
        {
            Assert.Throws<FilterParserException>(() => Parse("1~and"));
        }

        [Fact]
        public void Should_throw_if_comparison_is_missing_second_argument()
        {
            Assert.Throws<FilterParserException>(() => Parse("1~eq"));
        }

        [Fact]
        public void Should_throw_if_no_primary_expression()
        {
            Assert.Throws<FilterParserException>(() => Parse("#"));
        }

        [Fact]
        public void Should_return_null_on_empty_input()
        {
            Assert.Null(Parse(""));
        }
        
        [Fact]
        public void Should_parse_does_not_contain_function()
        {
            FunctionNode function = (FunctionNode)Parse("name~notsubstringof~'a'");

            Assert.Equal(FilterOperator.DoesNotContain, function.FilterOperator);
            Assert.Equal("name", ((PropertyNode)function.Arguments[0]).Name);
            Assert.Equal("a", ((StringNode)function.Arguments[1]).Value);
        }
        
        private IFilterNode Parse(string input)
        {
            FilterParser parser = new FilterParser(input);
            return parser.Parse();
        }
    }
}