namespace Kendo.Mvc.UI.Tests.Chart
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartClientEventsBuilderTests
    {
        private readonly ChartClientEventsBuilder builder;
        private readonly ChartClientEvents clientEvents;
        private readonly Action emptyAction;
        private readonly Func<object, object> nullFunc;
        private readonly string handlerName;

        public ChartClientEventsBuilderTests()
        {
            clientEvents = new ChartClientEvents();
            builder = new ChartClientEventsBuilder(clientEvents);

            emptyAction = () => { };
            nullFunc = (o) => null;
            handlerName = "myHandler";
        }

        [Fact]
        public void OnDataBound_with_Action_should_set_CodeBlock()
        {
            builder.OnDataBound(emptyAction);
            clientEvents.OnDataBound.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnDataBound_with_Action_should_return_builder()
        {
            builder.OnDataBound(emptyAction).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnDataBound_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnDataBound(nullFunc);
            clientEvents.OnDataBound.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnDataBound_with_Func_should_return_builder()
        {
            builder.OnDataBound(nullFunc).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnDataBound_with_string_should_set_HandlerName()
        {
            builder.OnDataBound(handlerName);
            clientEvents.OnDataBound.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnDataBound_with_string_should_return_builder()
        {
            builder.OnDataBound(handlerName).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnSeriesClick_with_Action_should_set_CodeBlock()
        {
            builder.OnSeriesClick(emptyAction);
            clientEvents.OnSeriesClick.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnSeriesClick_with_Action_should_return_builder()
        {
            builder.OnSeriesClick(emptyAction).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnSeriesClick_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnSeriesClick(nullFunc);
            clientEvents.OnSeriesClick.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnSeriesClick_with_Func_should_return_builder()
        {
            builder.OnSeriesClick(nullFunc).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnSeriesClick_with_string_should_set_HandlerName()
        {
            builder.OnSeriesClick(handlerName);
            clientEvents.OnSeriesClick.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnSeriesClick_with_string_should_return_builder()
        {
            builder.OnSeriesClick(handlerName).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnSeriesHover_with_Action_should_set_CodeBlock()
        {
            builder.OnSeriesHover(emptyAction);
            clientEvents.OnSeriesHover.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnSeriesHover_with_Action_should_return_builder()
        {
            builder.OnSeriesHover(emptyAction).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnSeriesHover_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnSeriesHover(nullFunc);
            clientEvents.OnSeriesHover.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnSeriesHover_with_Func_should_return_builder()
        {
            builder.OnSeriesHover(nullFunc).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnSeriesHover_with_string_should_set_HandlerName()
        {
            builder.OnSeriesHover(handlerName);
            clientEvents.OnSeriesHover.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnSeriesHover_with_string_should_return_builder()
        {
            builder.OnSeriesHover(handlerName).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnError_with_Action_should_set_CodeBlock()
        {
            builder.OnError(emptyAction);
            clientEvents.OnError.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnError_with_Action_should_return_builder()
        {
            builder.OnError(emptyAction).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnError_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnError(nullFunc);
            clientEvents.OnError.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnError_with_Func_should_return_builder()
        {
            builder.OnError(nullFunc).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnError_with_string_should_set_HandlerName()
        {
            builder.OnError(handlerName);
            clientEvents.OnError.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnError_with_string_should_return_builder()
        {
            builder.OnError(handlerName).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnAxisLabelClick_with_Action_should_set_CodeBlock()
        {
            builder.OnAxisLabelClick(emptyAction);
            clientEvents.OnAxisLabelClick.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnAxisLabelClick_with_Action_should_return_builder()
        {
            builder.OnAxisLabelClick(emptyAction).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnAxisLabelClick_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnAxisLabelClick(nullFunc);
            clientEvents.OnAxisLabelClick.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnAxisLabelClick_with_Func_should_return_builder()
        {
            builder.OnAxisLabelClick(nullFunc).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnAxisLabelClick_with_string_should_set_HandlerName()
        {
            builder.OnAxisLabelClick(handlerName);
            clientEvents.OnAxisLabelClick.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnAxisLabelClick_with_string_should_return_builder()
        {
            builder.OnAxisLabelClick(handlerName).ShouldBeType<ChartClientEventsBuilder>();
        }
    }
}
