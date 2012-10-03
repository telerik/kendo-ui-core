namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Kendo.Mvc.UI.Fluent;

    using Xunit;

    public class SliderBuilderTests
    {
        private readonly Slider<int> component;
        private readonly SliderBuilder<int> builder;

        public SliderBuilderTests()
        {
            component = SliderTestHelper.CreateSlider<int>(null, null);
            builder = new SliderBuilder<int>(component);
        }

        [Fact]
        public void Should_set_value_property_of_the_slider()
        {
            const int value = 10;
            builder.Value(value);

            component.Value.ShouldEqual(value);
        }

        [Fact]
        public void Value_should_return_builder()
        {
            const int value = 10;
            builder.Value(value).ShouldBeType<SliderBuilder<int>>();
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
            builder.Min(value).ShouldBeType<SliderBuilder<int>>();
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
            builder.Max(value).ShouldBeType<SliderBuilder<int>>();
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
            builder.Orientation(orientation).ShouldBeType<SliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_tickPlacement_property_of_the_slider()
        {
            const SliderTickPlacement tickPlacement = SliderTickPlacement.BottomRight;
            builder.TickPlacement(tickPlacement);

            component.TickPlacement.ShouldEqual(tickPlacement);
        }

        [Fact]
        public void TickPlacement_should_return_builder()
        {
            const SliderTickPlacement tickPlacement = SliderTickPlacement.BottomRight;
            builder.TickPlacement(tickPlacement).ShouldBeType<SliderBuilder<int>>();
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
            builder.SmallStep(smallStep).ShouldBeType<SliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_largeStep_property_of_the_slider()
        {
            const int largeStep = 4;
            builder.LargeStep(largeStep);

            component.LargeStep.ShouldEqual(largeStep);
        }

        [Fact]
        public void LargeStep_should_return_builder()
        {
            const int largeStep = 4;
            builder.LargeStep(largeStep).ShouldBeType<SliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_increaseButtonTitle_property_of_the_slider()
        {
            const string increaseButtonTitle = "foo";
            builder.IncreaseButtonTitle(increaseButtonTitle);

            component.IncreaseButtonTitle.ShouldEqual(increaseButtonTitle);
        }

        [Fact]
        public void IncreaseButtonTitle_should_return_builder()
        {
            const string increaseButtonTitle = "foo";
            builder.IncreaseButtonTitle(increaseButtonTitle).ShouldBeType<SliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_decreaseButtonTitle_property_of_the_slider()
        {
            const string decreaseButtonTitle = "foo";
            builder.DecreaseButtonTitle(decreaseButtonTitle);

            component.DecreaseButtonTitle.ShouldEqual(decreaseButtonTitle);
        }

        [Fact]
        public void DecreaseButtonTitle_should_return_builder()
        {
            const string decreaseButtonTitle = "foo";
            builder.DecreaseButtonTitle(decreaseButtonTitle).ShouldBeType<SliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_ShowButtons_property_of_the_slider()
        {
            const bool showButtons = true;
            builder.ShowButtons(showButtons);

            component.ShowButtons.ShouldEqual(showButtons);
        }

        [Fact]
        public void ShowButtons_should_return_builder()
        {
            const bool showButtons = true;
            builder.ShowButtons(showButtons).ShouldBeType<SliderBuilder<int>>();
        }

        [Fact]
        public void DragHandleTitle_should_return_builder()
        {
            const string title = "my title";
            builder.DragHandleTitle(title).ShouldBeType<SliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_DragHandleTitle_property_of_the_slider()
        {
            const string title = "my title";
            builder.DragHandleTitle(title);

            component.DragHandleTitle.ShouldEqual(title);
        }

    }
}