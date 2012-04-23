

namespace KendoUI.Mvc.UI.Tests
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