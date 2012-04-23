// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;

    public class AnimationDurationConverterTests
    {
        [Fact]
        public void ToString_should_return_text_value_when_matched()
        {
            Assert.Equal("'slow'", AnimationDurationConverter.ToString(600));
        }

        [Fact]
        public void ToString_should_return_numeric_value_when_not_matched()
        {
            Assert.Equal("700", AnimationDurationConverter.ToString(700));
        }
    }
}