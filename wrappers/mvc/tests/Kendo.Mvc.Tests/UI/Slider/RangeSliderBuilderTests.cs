namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Kendo.Mvc.UI.Fluent;

    using Xunit;

    public class RangeSliderBuilderTests
    {
        private readonly RangeSlider<int> component;
        private readonly RangeSliderBuilder<int> builder;

        public RangeSliderBuilderTests()
        {
            component = SliderTestHelper.CreateRangeSlider<int>(null, null);
            component.Name = "Test";
            builder = new RangeSliderBuilder<int>(component);
        }

        [Fact]
        public void Should_set_selectionStart_and_selectionEnd_property_of_the_slider()
        {
            const int selectionStart = 1;
            const int selectionEnd = 10;
            builder.Values(selectionStart, selectionEnd);

            component.SelectionStart.ShouldEqual(selectionStart);
            component.SelectionEnd.ShouldEqual(selectionEnd);
        }

        [Fact]
        public void Should_return_builder_when_values_set()
        {
            const int selectionStart = 1;
            const int selectionEnd = 10;
            builder.Values(selectionStart, selectionEnd).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_selectionStart_and_selectionEnd_property_of_the_slider_when_array_passed()
        {
            const int selectionStart = 1;
            const int selectionEnd = 10;
            builder.Values(new int[] { selectionStart, selectionEnd });

            component.SelectionStart.ShouldEqual(selectionStart);
            component.SelectionStart.ShouldEqual(selectionStart);
        }

        [Fact]
        public void Should_return_builder_when_array_passed()
        {
            const int selectionStart = 1;
            const int selectionEnd = 10;
            builder.Values(new int[] { selectionStart, selectionEnd }).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_minValue_property_of_the_slider()
        {
            const int value = 1;
            builder.Min(value);
            component.Min.ShouldEqual(value);
        }

        [Fact]
        public void Min_should_return_builder()
        {
            const int value = 1;
            builder.Min(value).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_maxValue_property_of_the_slider()
        {
            const int value = 20;
            builder.Max(value);

            component.Max.ShouldEqual(value);
        }

        [Fact]
        public void Max_should_return_builder()
        {
            const int value = 20;
            builder.Max(value).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_orientation_property_of_the_slider()
        {
            const SliderOrientation orientation = SliderOrientation.Horizontal;
            builder.Orientation(orientation);

            component.Orientation.ShouldEqual(orientation);
        }

        [Fact]
        public void Orientation_should_return_builder()
        {
            const SliderOrientation orientation = SliderOrientation.Horizontal;
            builder.Orientation(orientation).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_TickPlacement_property_of_the_slider()
        {
            const SliderTickPlacement tickPlacement = SliderTickPlacement.BottomRight;
            builder.TickPlacement(tickPlacement);

            component.TickPlacement.ShouldEqual(tickPlacement);
        }

        [Fact]
        public void TickPlacement_should_return_builder()
        {
            const SliderTickPlacement tickPlacement = SliderTickPlacement.BottomRight;
            builder.TickPlacement(tickPlacement).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_smallStep_property_of_the_slider()
        {
            const int smallStep = 2;
            builder.SmallStep(smallStep);
         
            component.SmallStep.ShouldEqual(smallStep);
        }

        [Fact]
        public void SmallStep_should_return_builder()
        {
            const int smallStep = 2;
            builder.SmallStep(smallStep).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_largeStep_property_of_the_slider()
        {
            const int largeStep = 4;
            builder.LargeStep(largeStep);

            component.LargeStep.ShouldEqual(component.LargeStep);
        }

        [Fact]
        public void LargeStep_should_return_builder()
        {
            const int largeStep = 4;
            builder.LargeStep(largeStep).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void LeftDragHandleTitle_should_return_builder()
        {
            const string leftTitle = "foo";
            builder.LeftDragHandleTitle(leftTitle).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void RightDragHandleTitle_should_return_builder()
        {
            const string rightTitle = "foo";
            builder.RightDragHandleTitle(rightTitle).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_LeftDragHandleTitle_property_of_the_slider()
        {
            const string leftTitle = "foo";
            builder.LeftDragHandleTitle(leftTitle);

            component.LeftDragHandleTitle.ShouldEqual(leftTitle);
        }

        [Fact]
        public void Should_set_RightDragHandleTitle_property_of_the_slider()
        {
            const string rightTitle = "foo";
            builder.RightDragHandleTitle(rightTitle);

            component.RightDragHandleTitle.ShouldEqual(rightTitle);
        }
    }
}