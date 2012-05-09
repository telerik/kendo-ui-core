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
        public void OnLoad_with_Action_should_set_CodeBlock()
        {
            builder.OnLoad(emptyAction);
            clientEvents.OnLoad.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnLoad_with_Action_should_return_builder()
        {
            builder.OnLoad(emptyAction).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnLoad_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnLoad(nullFunc);
            clientEvents.OnLoad.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnLoad_with_Func_should_return_builder()
        {
            builder.OnLoad(nullFunc).ShouldBeType<ChartClientEventsBuilder>();
        }

        [Fact]
        public void OnLoad_with_string_should_set_HandlerName()
        {
            builder.OnLoad(handlerName);
            clientEvents.OnLoad.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnLoad_with_string_should_return_builder()
        {
            builder.OnLoad(handlerName).ShouldBeType<ChartClientEventsBuilder>();
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
    }
}
