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
            Action param = () => { };

            builder.OnLoad(param);

            Assert.NotNull(clientEvents.OnLoad.CodeBlock);
        }

        [Fact]
        public void Loaded_String_param_should_set_Loaded_property()
        {
            const string param = "my_method()";

            builder.OnLoad(param);

            Assert.NotNull(clientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void Loaded_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void Open_Action_param_should_set_Open_property()
        {
            Action param = () => { };

            builder.OnOpen(param);

            Assert.NotNull(clientEvents.OnOpen.CodeBlock);
        }

        [Fact]
        public void OnOpen_String_param_should_set_Open_property()
        {
            const string param = "my_method()";

            builder.OnOpen(param);

            Assert.NotNull(clientEvents.OnOpen.HandlerName);
        }

        [Fact]
        public void OnOpen_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnOpen(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void OnOpen_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnOpen(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void OnClose_Action_param_should_set_Close_property()
        {
            Action param = () => { };

            builder.OnClose(param);

            Assert.NotNull(clientEvents.OnClose.CodeBlock);
        }

        [Fact]
        public void OnClose_String_param_should_set_Close_property()
        {
            const string param = "my_method()";

            builder.OnClose(param);

            Assert.NotNull(clientEvents.OnClose.HandlerName);
        }

        [Fact]
        public void OnClose_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnClose(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void OnClose_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnClose(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void OnResize_Action_param_should_set_Resize_property()
        {
            Action param = () => { };

            builder.OnResize(param);

            Assert.NotNull(clientEvents.OnResize.CodeBlock);
        }

        [Fact]
        public void OnResize_String_param_should_set_Resize_property()
        {
            const string param = "my_method()";

            builder.OnResize(param);

            Assert.NotNull(clientEvents.OnResize.HandlerName);
        }

        [Fact]
        public void OnResize_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnResize(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void OnResize_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnResize(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void OnRefresh_Action_param_should_set_Refresh_property()
        {
            Action param = () => { };

            builder.OnRefresh(param);

            Assert.NotNull(clientEvents.OnRefresh.CodeBlock);
        }

        [Fact]
        public void OnRefresh_String_param_should_set_Refresh_property()
        {
            const string param = "my_method()";

            builder.OnRefresh(param);

            Assert.NotNull(clientEvents.OnRefresh.HandlerName);
        }

        [Fact]
        public void OnRefresh_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnRefresh(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void OnRefresh_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnRefresh(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void OnError_Action_param_should_set_Error_property()
        {
            Action param = () => { };

            builder.OnError(param);

            Assert.NotNull(clientEvents.OnError.CodeBlock);
        }

        [Fact]
        public void OnError_String_param_should_set_Loaded_property()
        {
            const string param = "my_method()";

            builder.OnError(param);

            Assert.NotNull(clientEvents.OnError.HandlerName);
        }

        [Fact]
        public void OnError_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnError(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }

        [Fact]
        public void OnError_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnError(param);

            Assert.IsType(typeof(WindowClientEventsBuilder), returned);
        }
    }
}
