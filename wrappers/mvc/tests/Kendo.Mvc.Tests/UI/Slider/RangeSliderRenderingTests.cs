namespace Kendo.Mvc.UI.Tests.UI.Slider
{
    using Xunit;
    using System;
    using Moq;
    using System.IO;
    using Kendo.Mvc.UI.Html;

    public class RangeSliderRenderingTests
    {
        private readonly RangeSlider<decimal> component;
        Mock<TextWriter> textWriter;
        Mock<IRangeSliderHtmlBuilder> builder;

        public RangeSliderRenderingTests()
        {
            builder = new Mock<IRangeSliderHtmlBuilder>();

            builder.Setup(b => b.Build()).Returns(new HtmlElement("div"));

            textWriter = new Mock<TextWriter>();
            component = SliderTestHelper.CreateRangeSlider<decimal>(builder.Object, null);

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
        public void Should_throw_exception_if_smallStep_is_smaller_or_equal_to_zero()
        {
            component.SmallStep = 0;
            Assert.Throws<ArgumentException>(() => component.Render());
            component.SmallStep = -1;
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
        public void Should_not_throw_exception_if_value_is_bigger_than_minValue_or_equal_to_minValue_and_bigger_than_maxValue_or_equal_to_maxValue()
        {
            component.Min = 0;
            component.Max = 2;
            component.SelectionStart = component.SelectionEnd = 1;
            Assert.DoesNotThrow(() => component.Render());

            component.Min = 1;
            component.Max = 2;
            
            Assert.DoesNotThrow(() => component.Render());

            component.Min = -2;
            component.Max = 2;
            Assert.DoesNotThrow(() => component.Render());

            component.Min = 0;
            component.Max = 1;
            Assert.DoesNotThrow(() => component.Render());

            component.SelectionStart = component.SelectionEnd = 0;
            component.Min = 0;
            component.Max = 1;
            Assert.DoesNotThrow(() => component.Render());

            component.Min = -1;
            component.Max = 0;
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
        public void Should_not_throw_exception_if_selectionStart_is_bigger_then_maxValue_or_smaller_then_minValue()
        {
            component.SelectionStart = 11;
            component.SelectionEnd = 11;
            Assert.DoesNotThrow(() => component.Render());
            component.SelectionStart = -1;
            component.SelectionEnd = -1;
            Assert.DoesNotThrow(() => component.Render());
        }

        [Fact]
        public void Should_not_throw_exception_if_selectionEnd_is_bigger_then_maxValue_or_smaller_then_minValue()
        {
            component.SelectionEnd = 11;
            Assert.DoesNotThrow(() => component.Render());
            component.SelectionStart = -1;
            component.SelectionEnd = -1;
            Assert.DoesNotThrow(() => component.Render());
        }
    }
}