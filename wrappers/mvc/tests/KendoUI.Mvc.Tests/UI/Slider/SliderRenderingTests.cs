namespace KendoUI.Mvc.UI.Tests.UI.Slider
{
    using Xunit;
    using System;
    using Moq;
    using System.IO;
using KendoUI.Mvc.UI.Html;

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
            component.Min = 0;
            component.Max = 2;
            component.Value = 1;
            Assert.DoesNotThrow(() => component.Render());

            component.Min = 1;
            component.Max = 2;
            component.Value = 1;
            Assert.DoesNotThrow(() => component.Render());

            component.Min = -2;
            component.Max = 2;
            component.Value = 1;
            Assert.DoesNotThrow(() => component.Render());

            component.Min = 0;
            component.Max = 1;
            component.Value = 1;
            Assert.DoesNotThrow(() => component.Render());
        }

        [Fact]
        public void Should_not_throw_exception_if_minValue_is_smaller_then_maxValue_or_equal_to_maxValue()
        {
            component.Min = 1;
            component.Max = 2;
            Assert.DoesNotThrow(() => component.Render());
        }

        [Fact]
        public void Should_throw_exception_if_minValue_is_equal_or_bigger_then_maxValue()
        {
            component.Min = 2;
            component.Max = 2;
            Assert.Throws<ArgumentException>(() => component.Render());
            component.Min = 3;
            component.Max = 2;
            Assert.Throws<ArgumentException>(() => component.Render());
        }

        [Fact]
        public void Should_not_throw_exception_if_value_is_big_then_zero()
        {
            component.Value = 11;
            component.Min = 0;
            component.Max = 10;
            Assert.DoesNotThrow(() => component.Render());
        }
    }
}