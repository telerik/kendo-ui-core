namespace Telerik.Web.Mvc.UI.Tests.Upload
{
    using System;
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class UploadClientEventsBuilderTests
    {
        private readonly UploadClientEventsBuilder builder;
        private readonly UploadClientEvents clientEvents;
        private readonly Action emptyAction;
        private readonly Func<object, object> nullFunc;
        private readonly string handlerName;

        public UploadClientEventsBuilderTests()
        {
            clientEvents = new UploadClientEvents();
            builder = new UploadClientEventsBuilder(clientEvents);

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
            builder.OnLoad(emptyAction).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.OnLoad(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.OnLoad(handlerName).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnSelect_with_Action_should_set_CodeBlock()
        {
            builder.OnSelect(emptyAction);
            clientEvents.OnSelect.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnSelect_with_Action_should_return_builder()
        {
            builder.OnSelect(emptyAction).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnSelect_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnSelect(nullFunc);
            clientEvents.OnSelect.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnSelect_with_Func_should_return_builder()
        {
            builder.OnSelect(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnSelect_with_string_should_set_HandlerName()
        {
            builder.OnSelect(handlerName);
            clientEvents.OnSelect.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnSelect_with_string_should_return_builder()
        {
            builder.OnSelect(handlerName).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnUpload_with_Action_should_set_CodeBlock()
        {
            builder.OnUpload(emptyAction);
            clientEvents.OnUpload.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnUpload_with_Action_should_return_builder()
        {
            builder.OnUpload(emptyAction).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnUpload_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnUpload(nullFunc);
            clientEvents.OnUpload.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnUpload_with_Func_should_return_builder()
        {
            builder.OnUpload(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnUpload_with_string_should_set_HandlerName()
        {
            builder.OnUpload(handlerName);
            clientEvents.OnUpload.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnUpload_with_string_should_return_builder()
        {
            builder.OnUpload(handlerName).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnSuccess_with_Action_should_set_CodeBlock()
        {
            builder.OnSuccess(emptyAction);
            clientEvents.OnSuccess.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnSuccess_with_Action_should_return_builder()
        {
            builder.OnSuccess(emptyAction).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnSuccess_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnSuccess(nullFunc);
            clientEvents.OnSuccess.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnSuccess_with_Func_should_return_builder()
        {
            builder.OnSuccess(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnSuccess_with_string_should_set_HandlerName()
        {
            builder.OnSuccess(handlerName);
            clientEvents.OnSuccess.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnSuccess_with_string_should_return_builder()
        {
            builder.OnSuccess(handlerName).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.OnError(emptyAction).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.OnError(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
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
            builder.OnError(handlerName).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnComplete_with_Action_should_set_CodeBlock()
        {
            builder.OnComplete(emptyAction);
            clientEvents.OnComplete.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnComplete_with_Action_should_return_builder()
        {
            builder.OnComplete(emptyAction).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnComplete_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnComplete(nullFunc);
            clientEvents.OnComplete.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnComplete_with_Func_should_return_builder()
        {
            builder.OnComplete(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnComplete_with_string_should_set_HandlerName()
        {
            builder.OnComplete(handlerName);
            clientEvents.OnComplete.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnComplete_with_string_should_return_builder()
        {
            builder.OnComplete(handlerName).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnCancel_with_Action_should_set_CodeBlock()
        {
            builder.OnCancel(emptyAction);
            clientEvents.OnCancel.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnCancel_with_Action_should_return_builder()
        {
            builder.OnCancel(emptyAction).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnCancel_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnCancel(nullFunc);
            clientEvents.OnCancel.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnCancel_with_Func_should_return_builder()
        {
            builder.OnCancel(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnCancel_with_string_should_set_HandlerName()
        {
            builder.OnCancel(handlerName);
            clientEvents.OnCancel.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnCancel_with_string_should_return_builder()
        {
            builder.OnCancel(handlerName).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnRemove_with_Action_should_set_CodeBlock()
        {
            builder.OnRemove(emptyAction);
            clientEvents.OnRemove.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnRemove_with_Action_should_return_builder()
        {
            builder.OnRemove(emptyAction).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnRemove_with_Func_should_set_InlineCodeBlock()
        {
            builder.OnRemove(nullFunc);
            clientEvents.OnRemove.InlineCodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnRemove_with_Func_should_return_builder()
        {
            builder.OnRemove(nullFunc).ShouldBeType<UploadClientEventsBuilder>();
        }

        [Fact]
        public void OnRemove_with_string_should_set_HandlerName()
        {
            builder.OnRemove(handlerName);
            clientEvents.OnRemove.HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void OnRemove_with_string_should_return_builder()
        {
            builder.OnRemove(handlerName).ShouldBeType<UploadClientEventsBuilder>();
        }
    }
}
