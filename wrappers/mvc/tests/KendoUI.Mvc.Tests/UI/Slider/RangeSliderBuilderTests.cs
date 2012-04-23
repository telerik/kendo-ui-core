// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using Telerik.Web.Mvc.UI.Fluent;

    using Xunit;

    public class RangeSliderBuilderTests
    {
        private readonly RangeSlider<int> component;
        private readonly RangeSliderBuilder<int> builder;

        public RangeSliderBuilderTests()
        {
            component = SliderTestHelper.CreateRangeSlider<int>(null, null);
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
            component.MinValue.ShouldEqual(value);
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

            component.MaxValue.ShouldEqual(value);
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
        public void Should_set_Enabled_property_of_the_slider()
        {
            const bool enabled = true;
            builder.Enable(enabled);
         
            component.Enabled.ShouldEqual(enabled);
        }

        [Fact]
        public void Enable_should_return_builder()
        {
            const bool enabled = true;
            builder.Enable(enabled).ShouldBeType<RangeSliderBuilder<int>>();
        }

        [Fact]
        public void Should_set_events_of_the_slider()
        {
            Action<RangeSliderClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            builder.ClientEvents(clientEventsAction);

            Assert.NotNull(component.ClientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            Action<RangeSliderClientEventsBuilder> clientEventsAction = delegate { };

            var returnedBuilder = builder.ClientEvents(clientEventsAction).ShouldBeType<RangeSliderBuilder<int>>();

            Assert.IsType(typeof(RangeSliderBuilder<int>), returnedBuilder);
        }
    }
}