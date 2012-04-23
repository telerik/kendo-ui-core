namespace Telerik.Web.Mvc.UI.Tests.UI.Slider
{
    using Xunit;
    using System;
    using Moq;
    using System.IO;
using Telerik.Web.Mvc.UI.Html;

    public class SliderRenderingTests
    {
        private readonly Slider<decimal> component;
        Mock<TextWriter> textWriter;
        Mock<ISliderHtmlBuilder> builder;

        public SliderRenderingTests()
        {
            builder = new Mock<ISliderHtmlBuilder>();

            builder.Setup(b => b.Build()).Returns(new HtmlElement("div"));

            textWriter = new Mock<TextWriter>();
            component = SliderTestHelper.CreateSlider<decimal>(builder.Object, null);

            component.Name = "Slider";
        }

        [Fact]
        public void Should_throw_exception_if_smallStep_is_bigger_then_largeStep()
        {
            component.SmallStep = 2;
            component.LargeStep = 1;
            Assert.Throws<ArgumentException>(() => component.Render());
        }

        [Fact]
        public void Should_not_throw_exception_if_smallStep_is_smaller_then_largeStep_or_is_equal_to_largeStep()
        {
            component.SmallStep = 1;
            component.LargeStep = 2;
            Assert.DoesNotThrow(() => component.Render());
            component.SmallStep = 2;
            component.LargeStep = 2;
            Assert.DoesNotThrow(() => component.Render());
        }

        [Fact]
        public void Should_not_throw_exception_if_smallStep_is_bigger_than_zero()
        {
            component.SmallStep = 0.1m;
            Assert.DoesNotThrow(() => component.Render());
        }

        [Fact]
        public void Should_throw_exception_if_smallStep_is_smaller_or_equal_to_zero()
        {
            component.SmallStep = 0;
            Assert.Throws<ArgumentException>(() => component.Render());
            component.SmallStep = -1;
            Assert.Throws<ArgumentException>(() => component.Render());
        }

        [Fact]
        public void Should_not_throw_exception_if_value_is_bigger_than_minValue_or_equal_to_minValue_and_bigger_than_maxValue_or_equal_to_maxValue()
        {
            component.MinValue = 0;
            component.MaxValue = 2;
            component.Value = 1;
            Assert.DoesNotThrow(() => component.Render());

            component.MinValue = 1;
            component.MaxValue = 2;
            component.Value = 1;
            Assert.DoesNotThrow(() => component.Render());

            component.MinValue = -2;
            component.MaxValue = 2;
            component.Value = 1;
            Assert.DoesNotThrow(() => component.Render());

            component.MinValue = 0;
            component.MaxValue = 1;
            component.Value = 1;
            Assert.DoesNotThrow(() => component.Render());
        }

        [Fact]
        public void Should_not_throw_exception_if_minValue_is_smaller_then_maxValue_or_equal_to_maxValue()
        {
            component.MinValue = 1;
            component.MaxValue = 2;
            Assert.DoesNotThrow(() => component.Render());
        }

        [Fact]
        public void Should_throw_exception_if_minValue_is_equal_or_bigger_then_maxValue()
        {
            component.MinValue = 2;
            component.MaxValue = 2;
            Assert.Throws<ArgumentException>(() => component.Render());
            component.MinValue = 3;
            component.MaxValue = 2;
            Assert.Throws<ArgumentException>(() => component.Render());
        }

        [Fact]
        public void Should_not_throw_exception_if_value_is_big_then_zero()
        {
            component.Value = 11;
            component.MinValue = 0;
            component.MaxValue = 10;
            Assert.DoesNotThrow(() => component.Render());
        }
    }
}