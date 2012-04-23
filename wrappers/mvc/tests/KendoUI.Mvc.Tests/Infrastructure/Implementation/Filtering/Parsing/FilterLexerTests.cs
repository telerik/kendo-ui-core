namespace Telerik.Web.Mvc.Infrastructure.Tests
{
    using System;
    using System.Collections.Generic;
	
    using System.Globalization;
    using Implementation;
	
    using Xunit;
	
    public class FilterLexerTests: IDisposable
    {
        private CultureInfo currentCulture;

        public FilterLexerTests()
        {
            currentCulture = System.Threading.Thread.CurrentThread.CurrentCulture;
        }
        
        public void Dispose()
        {
             System.Threading.Thread.CurrentThread.CurrentCulture = currentCulture;
        }

        [Fact]
        public void Tokenize_returns_empty_list_in_case_of_empty_input()
        {
            IList<FilterToken> tokens = Tokenize("");

            Assert.Equal(0, tokens.Count);
        }

        [Fact]
        public void Tokenize_returns_empty_list_in_case_of_null_input()
        {
            IList<FilterToken> tokens = Tokenize(null);

            Assert.Equal(0, tokens.Count);
        }

        [Fact]
        public void Tokenize_returns_property_expression()
        {
            IList<FilterToken> tokens = Tokenize("prop");
            Assert.Equal(FilterTokenType.Property, tokens[0].TokenType);
            Assert.Equal("prop", tokens[0].Value);
        }

        [Fact]
        public void Should_parse_identifier_containing_underscore()
        {
            IList<FilterToken> tokens = Tokenize("_underscore");
            Assert.Equal(FilterTokenType.Property, tokens[0].TokenType);
            Assert.Equal("_underscore", tokens[0].Value);
        }

        [Fact]
        public void Should_parse_identifier_containing_dollar()
        {
            var tokens = Tokenize("$dollar");

            Assert.Equal(FilterTokenType.Property, tokens[0].TokenType);
            Assert.Equal("$dollar", tokens[0].Value);
        }

        [Fact]
        public void Should_parse_identifier_starting_with_at()
        {
            var tokens = Tokenize("@at");

            Assert.Equal(FilterTokenType.Property, tokens[0].TokenType);
            Assert.Equal("@at", tokens[0].Value);
        }

        [Fact]
        public void Should_parse_identifier_containing_digits()
        {
            var tokens = Tokenize("property1");
            Assert.Equal(FilterTokenType.Property, tokens[0].TokenType);
            Assert.Equal("property1", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_boolean_false()
        {
            IList<FilterToken> tokens = Tokenize("false");
            Assert.Equal(FilterTokenType.Boolean, tokens[0].TokenType);
            Assert.Equal("false", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_boolean_true()
        {
            IList<FilterToken> tokens = Tokenize("true");
            Assert.Equal(FilterTokenType.Boolean, tokens[0].TokenType);
            Assert.Equal("true", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_composite_property_expression()
        {
            IList<FilterToken> tokens = Tokenize("prop.member");
            Assert.Equal(FilterTokenType.Property, tokens[0].TokenType);
            Assert.Equal("prop.member", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_property_expression_and_comparison()
        {
            IList<FilterToken> tokens = Tokenize("prop~eq");
            
            Assert.Equal(FilterTokenType.Property, tokens[0].TokenType);
            Assert.Equal("prop", tokens[0].Value);
            
            Assert.Equal(FilterTokenType.ComparisonOperator, tokens[1].TokenType);
            Assert.Equal("eq", tokens[1].Value);
        }

        [Fact]
        public void Tokenize_returns_logical_operators()
        {
            IList<FilterToken> tokens = Tokenize("and~or");

            Assert.Equal(FilterTokenType.And, tokens[0].TokenType);
            Assert.Equal("and", tokens[0].Value);

            Assert.Equal(FilterTokenType.Or, tokens[1].TokenType);
            Assert.Equal("or", tokens[1].Value);
        }

        [Fact]
        public void Tokenize_skips_separators()
        {
            IList<FilterToken> tokens = Tokenize("~~~~and~~~~or~~~~");

            Assert.Equal(2, tokens.Count);
        }

        [Fact]
        public void Tokenize_returns_functions()
        {
            IList<FilterToken> tokens = Tokenize("startswith");
            Assert.Equal(FilterTokenType.Function, tokens[0].TokenType);
            Assert.Equal("startswith", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_whole_numbers()
        {
            IList<FilterToken> tokens = Tokenize("199");
            Assert.Equal(FilterTokenType.Number, tokens[0].TokenType);
            Assert.Equal("199", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_negative_whole_numbers()
        {
            IList<FilterToken> tokens = Tokenize("-199");
            Assert.Equal(FilterTokenType.Number, tokens[0].TokenType);
            Assert.Equal("-199", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_positive_signed_whole_numbers()
        {
            IList<FilterToken> tokens = Tokenize("+199");
            Assert.Equal(FilterTokenType.Number, tokens[0].TokenType);
            Assert.Equal("+199", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_numbers_starting_with_decimal_symbol()
        {
            IList<FilterToken> tokens = Tokenize(".1");
            Assert.Equal(FilterTokenType.Number, tokens[0].TokenType);
            Assert.Equal(".1", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_numbers_containing_decimal_symbol()
        {
            IList<FilterToken> tokens = Tokenize("3.14");
            Assert.Equal(FilterTokenType.Number, tokens[0].TokenType);
            Assert.Equal("3.14", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_throws_in_case_of_two_decimal_symbol()
        {
            Assert.Throws<FilterParserException>(() => Tokenize(".1."));
        }

        [Fact]
        public void Tokenize_returns_string_literal()
        {
            IList<FilterToken> tokens = Tokenize("'string'");
            Assert.Equal(FilterTokenType.String, tokens[0].TokenType);
            Assert.Equal("string", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_escaped_quotes()
        {
            IList<FilterToken> tokens = Tokenize("''''");
            Assert.Equal(FilterTokenType.String, tokens[0].TokenType);
            Assert.Equal("'", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_throws_in_case_of_unterminated_string()
        {
            Assert.Throws<FilterParserException>(() => Tokenize("'string"));
        }

        [Fact]
        public void Tokenize_returns_datetime()
        {
            IList<FilterToken> tokens = Tokenize("datetime'2000-10-11T10:10:10'");
            Assert.Equal(FilterTokenType.DateTime, tokens[0].TokenType);
            Assert.Equal("2000-10-11T10:10:10", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_left_parenthesis()
        {
            IList<FilterToken> tokens = Tokenize("(");
            Assert.Equal(FilterTokenType.LeftParenthesis, tokens[0].TokenType);
            Assert.Equal("(", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_right_parenthesis()
        {
            IList<FilterToken> tokens = Tokenize(")");
            Assert.Equal(FilterTokenType.RightParenthesis, tokens[0].TokenType);
            Assert.Equal(")", tokens[0].Value);
        }

        [Fact]
        public void Tokenize_returns_not_token()
        {
            IList<FilterToken> tokens = Tokenize("not");
            Assert.Equal(FilterTokenType.Not, tokens[0].TokenType);
        }

        [Fact]
        public void Tokenize_returns_comma()
        {
            IList<FilterToken> tokens = Tokenize(",");
            Assert.Equal(FilterTokenType.Comma, tokens[0].TokenType);
            Assert.Equal(",", tokens[0].Value);
        }

        [Fact]
        public void Should_throw_on_invalid_token()
        {
            Assert.Throws<FilterParserException>(()=>Tokenize("^"));
        }

        [Fact]
        public void Tokenize_should_return_correct_tokens_for_complex_expression()
        {
            IList<FilterToken> tokens = Tokenize("(BirthDate~eq~datetime'2000-10-11T10:10:10')~and~(startswith(Name,'John'))");
            Assert.Equal(FilterTokenType.LeftParenthesis, tokens[0].TokenType);
            Assert.Equal(FilterTokenType.Property, tokens[1].TokenType);
            Assert.Equal(FilterTokenType.ComparisonOperator, tokens[2].TokenType);
            Assert.Equal(FilterTokenType.DateTime, tokens[3].TokenType);
            Assert.Equal(FilterTokenType.RightParenthesis, tokens[4].TokenType);
            Assert.Equal(FilterTokenType.And, tokens[5].TokenType);
            Assert.Equal(FilterTokenType.LeftParenthesis, tokens[6].TokenType);
            Assert.Equal(FilterTokenType.Function, tokens[7].TokenType);
            Assert.Equal(FilterTokenType.LeftParenthesis, tokens[8].TokenType);
            Assert.Equal(FilterTokenType.Property, tokens[9].TokenType);
            Assert.Equal(FilterTokenType.Comma, tokens[10].TokenType);
            Assert.Equal(FilterTokenType.String, tokens[11].TokenType);
            Assert.Equal(FilterTokenType.RightParenthesis, tokens[12].TokenType);
            Assert.Equal(FilterTokenType.RightParenthesis, tokens[13].TokenType);
        }

        [Fact]
        public void Tokenize_should_return_function_when_decimal_separator_is_comma()
        {
            System.Threading.Thread.CurrentThread.CurrentCulture = new CultureInfo("bg-BG");
            
            IList<FilterToken> tokens = Tokenize("startswith(Name,'John')");
            Assert.Equal(FilterTokenType.Function, tokens[0].TokenType);
            Assert.Equal(FilterTokenType.LeftParenthesis, tokens[1].TokenType);
            Assert.Equal(FilterTokenType.Property, tokens[2].TokenType);
            Assert.Equal(FilterTokenType.Comma, tokens[3].TokenType);
            Assert.Equal(FilterTokenType.String, tokens[4].TokenType);
            Assert.Equal(FilterTokenType.RightParenthesis, tokens[5].TokenType);
        }
        private IList<FilterToken> Tokenize(string value)
        {
            FilterLexer tokenizer = new FilterLexer(value);

            IList<FilterToken> tokens = tokenizer.Tokenize();
            return tokens;
        }

    }
}
