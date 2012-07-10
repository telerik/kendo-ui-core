namespace Kendo.Mvc.UI.Tests.Upload
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;
    using System.Collections.Generic;

    public class UploadClientEventsBuilderTests
    {
        private readonly UploadEventBuilder builder;
        private readonly IDictionary<string, object> clientEvents;
        private readonly Action emptyAction;
        private readonly Func<object, object> nullFunc;
        private readonly string handlerName;

        public UploadClientEventsBuilderTests()
        {
            clientEvents = new Dictionary<string, object>();
            builder = new UploadEventBuilder(clientEvents);

            emptyAction = () => { };
            nullFunc = (o) => null;
            handlerName = "myHandler";
        }

        [Fact]
        public void Select_with_Func_should_set_InlineCodeBlock()
        {
            builder.Select(nullFunc);
            clientEvents["select"].ShouldNotBeNull();
        }

        [Fact]
        public void Select_with_Func_should_return_builder()
        {
            builder.Select(nullFunc).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Select_with_string_should_set_HandlerName()
        {
            builder.Select(handlerName);
            ((ClientHandlerDescriptor) clientEvents["select"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Select_with_string_should_return_builder()
        {
            builder.Select(handlerName).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Upload_with_Func_should_set_InlineCodeBlock()
        {
            builder.Upload(nullFunc);
            clientEvents["upload"].ShouldNotBeNull();
        }

        [Fact]
        public void Upload_with_Func_should_return_builder()
        {
            builder.Upload(nullFunc).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Upload_with_string_should_set_HandlerName()
        {
            builder.Upload(handlerName);
            ((ClientHandlerDescriptor)clientEvents["upload"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Upload_with_string_should_return_builder()
        {
            builder.Upload(handlerName).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Success_with_Func_should_set_InlineCodeBlock()
        {
            builder.Success(nullFunc);
            clientEvents["success"].ShouldNotBeNull();
        }

        [Fact]
        public void Success_with_Func_should_return_builder()
        {
            builder.Success(nullFunc).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Success_with_string_should_set_HandlerName()
        {
            builder.Success(handlerName);
            ((ClientHandlerDescriptor)clientEvents["success"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Success_with_string_should_return_builder()
        {
            builder.Success(handlerName).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Error_with_Func_should_set_InlineCodeBlock()
        {
            builder.Error(nullFunc);
            clientEvents["error"].ShouldNotBeNull();
        }

        [Fact]
        public void Error_with_Func_should_return_builder()
        {
            builder.Error(nullFunc).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Error_with_string_should_set_HandlerName()
        {
            builder.Error(handlerName);
            ((ClientHandlerDescriptor)clientEvents["error"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Error_with_string_should_return_builder()
        {
            builder.Error(handlerName).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Complete_with_Func_should_set_InlineCodeBlock()
        {
            builder.Complete(nullFunc);
            clientEvents["complete"].ShouldNotBeNull();
        }

        [Fact]
        public void Complete_with_Func_should_return_builder()
        {
            builder.Complete(nullFunc).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Complete_with_string_should_set_HandlerName()
        {
            builder.Complete(handlerName);
            ((ClientHandlerDescriptor)clientEvents["complete"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Complete_with_string_should_return_builder()
        {
            builder.Complete(handlerName).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Cancel_with_Func_should_set_InlineCodeBlock()
        {
            builder.Cancel(nullFunc);
            clientEvents["cancel"].ShouldNotBeNull();
        }

        [Fact]
        public void Cancel_with_Func_should_return_builder()
        {
            builder.Cancel(nullFunc).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Cancel_with_string_should_set_HandlerName()
        {
            builder.Cancel(handlerName);
            ((ClientHandlerDescriptor)clientEvents["cancel"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Cancel_with_string_should_return_builder()
        {
            builder.Cancel(handlerName).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Remove_with_Func_should_set_InlineCodeBlock()
        {
            builder.Remove(nullFunc);
            clientEvents["remove"].ShouldNotBeNull();
        }

        [Fact]
        public void Remove_with_Func_should_return_builder()
        {
            builder.Remove(nullFunc).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Remove_with_string_should_set_HandlerName()
        {
            builder.Remove(handlerName);
            ((ClientHandlerDescriptor)clientEvents["remove"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Remove_with_string_should_return_builder()
        {
            builder.Remove(handlerName).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Progress_with_Func_should_set_InlineCodeBlock()
        {
            builder.Progress(nullFunc);
            clientEvents["progress"].ShouldNotBeNull();
        }

        [Fact]
        public void Progress_with_Func_should_return_builder()
        {
            builder.Progress(nullFunc).ShouldBeType<UploadEventBuilder>();
        }

        [Fact]
        public void Progress_with_string_should_set_HandlerName()
        {
            builder.Progress(handlerName);
            ((ClientHandlerDescriptor)clientEvents["progress"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Progress_with_string_should_return_builder()
        {
            builder.Progress(handlerName).ShouldBeType<UploadEventBuilder>();
        }
    }
}
