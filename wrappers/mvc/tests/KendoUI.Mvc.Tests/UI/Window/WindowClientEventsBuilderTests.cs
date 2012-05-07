namespace KendoUI.Mvc.UI.Tests
{
    using System;
    using System.Web.Mvc;
    using Xunit;
    using KendoUI.Mvc.UI.Fluent;

    public class WindowClientEventsBuilderTests
    {
        private WindowClientEventsBuilder builder;
        private WindowClientEvents clientEvents;
        private ViewContext viewContext;


        public WindowClientEventsBuilderTests()
        {
            clientEvents = new WindowClientEvents();
            viewContext = new ViewContext();
            builder = new WindowClientEventsBuilder(clientEvents, viewContext);
        }

        [Fact]
        public void Loaded_Action_param_should_set_Loaded_property()
        {
            builder.OnLoad(() => { });

            clientEvents.OnLoad.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void Loaded_String_param_should_set_Loaded_property()
        {
            builder.OnLoad("my_method()");

            clientEvents.OnLoad.HandlerName.ShouldNotBeNull();
        }

        [Fact]
        public void Loaded_Action_should_return_builder()
        {
            builder.OnLoad(() => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Loaded_String_should_return_builder()
        {
            builder.OnLoad("my_method()").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Open_Action_param_should_set_Open_property()
        {
            builder.OnOpen(() => { });

            clientEvents.OnOpen.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnOpen_String_param_should_set_Open_property()
        {
            builder.OnOpen("my_method()");

            clientEvents.OnOpen.HandlerName.ShouldNotBeNull();
        }

        [Fact]
        public void OnOpen_Action_should_return_builder()
        {
            builder.OnOpen(() => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void OnOpen_String_should_return_builder()
        {
            builder.OnOpen("my_method()").ShouldBeSameAs(builder);
        }

        [Fact]
        public void OnClose_Action_param_should_set_Close_property()
        {
            builder.OnClose(() => { });

            clientEvents.OnClose.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnClose_String_param_should_set_Close_property()
        {
            builder.OnClose("my_method()");

            clientEvents.OnClose.HandlerName.ShouldNotBeNull();
        }

        [Fact]
        public void OnClose_Action_should_return_builder()
        {
            builder.OnClose(() => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void OnClose_String_should_return_builder()
        {
            builder.OnClose("my_method()").ShouldBeSameAs(builder);
        }

        [Fact]
        public void OnResize_Action_param_should_set_Resize_property()
        {
            builder.OnResize(() => { });

            clientEvents.OnResize.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnResize_String_param_should_set_Resize_property()
        {
            builder.OnResize("my_method()");

            clientEvents.OnResize.HandlerName.ShouldNotBeNull();
        }

        [Fact]
        public void OnResize_Action_should_return_builder()
        {
            builder.OnResize(() => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void OnResize_String_should_return_builder()
        {
            builder.OnResize("my_method()").ShouldBeSameAs(builder);
        }

        [Fact]
        public void OnRefresh_Action_param_should_set_Refresh_property()
        {
            builder.OnRefresh(() => { });

            clientEvents.OnRefresh.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnRefresh_String_param_should_set_Refresh_property()
        {
            builder.OnRefresh("my_method()");

            clientEvents.OnRefresh.HandlerName.ShouldNotBeNull();
        }

        [Fact]
        public void OnRefresh_Action_should_return_builder()
        {
            builder.OnRefresh(() => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void OnRefresh_String_should_return_builder()
        {
            builder.OnRefresh("my_method()").ShouldBeSameAs(builder);
        }

        [Fact]
        public void OnError_Action_param_should_set_Error_property()
        {
            builder.OnError(() => { });

            clientEvents.OnError.CodeBlock.ShouldNotBeNull();
        }

        [Fact]
        public void OnError_String_param_should_set_Loaded_property()
        {
            builder.OnError("my_method()");

            clientEvents.OnError.HandlerName.ShouldNotBeNull();
        }

        [Fact]
        public void OnError_Action_should_return_builder()
        {
            builder.OnError(() => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void OnError_String_should_return_builder()
        {
            builder.OnError("my_method()").ShouldBeSameAs(builder);
        }
    }
}
