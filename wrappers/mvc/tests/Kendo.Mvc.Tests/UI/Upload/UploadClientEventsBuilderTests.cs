namespace Kendo.Mvc.UI.Tests.Upload
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;
    using System.Collections.Generic;

    public class UploadClientEventsBuilderTests
    {
        private readonly UploadClientEventsBuilder builder;
        private readonly IDictionary<string, object> clientEvents;
        private readonly Action emptyAction;
        private readonly Func<object, object> nullFunc;
        private readonly string handlerName;

        public UploadClientEventsBuilderTests()
        {
            clientEvents = new Dictionary<string, object>();
            builder = new UploadClientEventsBuilder(clientEvents);

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
            builder.Select(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void Select_with_string_should_set_HandlerName()
        {
            builder.Select(handlerName);
            ((ClientEvent) clientEvents["select"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Select_with_string_should_return_builder()
        {
            builder.Select(handlerName).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.Upload(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void Upload_with_string_should_set_HandlerName()
        {
            builder.Upload(handlerName);
            ((ClientEvent)clientEvents["upload"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Upload_with_string_should_return_builder()
        {
            builder.Upload(handlerName).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.Success(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void Success_with_string_should_set_HandlerName()
        {
            builder.Success(handlerName);
            ((ClientEvent)clientEvents["success"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Success_with_string_should_return_builder()
        {
            builder.Success(handlerName).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.Error(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void Error_with_string_should_set_HandlerName()
        {
            builder.Error(handlerName);
            ((ClientEvent)clientEvents["error"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Error_with_string_should_return_builder()
        {
            builder.Error(handlerName).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.Complete(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void Complete_with_string_should_set_HandlerName()
        {
            builder.Complete(handlerName);
            ((ClientEvent)clientEvents["complete"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Complete_with_string_should_return_builder()
        {
            builder.Complete(handlerName).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.Cancel(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void Cancel_with_string_should_set_HandlerName()
        {
            builder.Cancel(handlerName);
            ((ClientEvent)clientEvents["cancel"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Cancel_with_string_should_return_builder()
        {
            builder.Cancel(handlerName).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.Remove(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void Remove_with_string_should_set_HandlerName()
        {
            builder.Remove(handlerName);
            ((ClientEvent)clientEvents["remove"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void Remove_with_string_should_return_builder()
        {
            builder.Remove(handlerName).ShouldBeType<UploadClientEventsBuilder>();
        }
    }
}
