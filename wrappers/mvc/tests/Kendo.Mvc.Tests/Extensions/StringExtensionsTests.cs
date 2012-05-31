namespace Kendo.Mvc.Extensions.Tests
{
    using System;
    using Kendo.Mvc.UI.Tests;
    using Xunit;

    public class StringExtensionsTests
    {
        [Fact]
        public void FormatWith_should_replace_place_holder_tokens_with_provided_value()
        {
            Assert.Equal("A-B-C-D", "{0}-{1}-{2}-{3}".FormatWith("A", "B", "C", "D"));
        }

        [Fact]
        public void IsCaseSensitiveEqual_should_return_true_when_both_string_are_same()
        {
            Assert.True("foo".IsCaseSensitiveEqual("foo"));
        }

        [Fact]
        public void IsCaseSensitiveEqual_should_return_false_when_casing_differs()
        {
            Assert.False("foO".IsCaseSensitiveEqual("fOo"));
        }

        [Fact]
        public void IsCaseInsensitiveEqual_should_return_true_when_casing_differs()
        {
            Assert.True("foO".IsCaseInsensitiveEqual("fOo"));
        }

        [Fact]
        public void AsTitle_should_return_empty_string_when_null()
        {
            Assert.Equal("", ((string)null).AsTitle());
        }

        [Fact]
        public void AsTitle_takes_last_member_name()
        {
            Assert.Equal("Contact Name", "Customer.ContactName".AsTitle());
        }

        [Fact]
        public void AsTitle_splits_pascal_case()
        {
            Assert.Equal("Contact Name", "ContactName".AsTitle());
        }

        [Fact]
        public void ToEnum_parses_enum()
        {
            "Male".ToEnum<Gender>(Gender.Female).ShouldEqual(Gender.Male);
        }        
        
        [Fact]
        public void ToEnum_parses_values_ignoring_their_case()
        {
            "male".ToEnum<Gender>(Gender.Female).ShouldEqual(Gender.Male);
        }
    }
}
