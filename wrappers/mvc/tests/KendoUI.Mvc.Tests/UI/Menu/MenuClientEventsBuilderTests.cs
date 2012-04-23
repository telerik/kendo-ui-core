namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Web.Mvc;
    using Xunit;

    public class MenuClientEventsBuilderTests
    {
        private MenuClientEventsBuilder builder;
        private MenuClientEvents clientEvents;
        private ViewContext viewContext;


        public MenuClientEventsBuilderTests()
        {
            clientEvents = new MenuClientEvents();
            viewContext = new ViewContext();
            builder = new MenuClientEventsBuilder(clientEvents, viewContext);
        }

        [Fact]
        public void OnOpen_Action_param_should_set_Expand_property()
        {
            Action param = () => { };

            builder.OnOpen(param);

            Assert.NotNull(clientEvents.OnOpen.CodeBlock);
        }

        [Fact]
        public void OnOpen_String_param_should_set_Expand_property()
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

            Assert.IsType(typeof(MenuClientEventsBuilder), returned);
        }

        [Fact]
        public void OnOpen_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnOpen(param);

            Assert.IsType(typeof(MenuClientEventsBuilder), returned);
        }

        [Fact]
        public void OnClose_Action_param_should_set_Collapse_property()
        {
            Action param = () => { };

            builder.OnClose(param);

            Assert.NotNull(clientEvents.OnClose.CodeBlock);
        }

        [Fact]
        public void OnClose_String_param_should_set_Collapse_property()
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

            Assert.IsType(typeof(MenuClientEventsBuilder), returned);
        }

        [Fact]
        public void OnClose_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnClose(param);

            Assert.IsType(typeof(MenuClientEventsBuilder), returned);
        }

        [Fact]
        public void SelectedItem_Action_param_should_set_SelectedItem_property()
        {
            Action param = () => { };

            builder.OnSelect(param);

            Assert.NotNull(clientEvents.OnSelect.CodeBlock);
        }

        [Fact]
        public void SelectedItem_String_param_should_set_SelectedItem_property()
        {
            const string param = "my_method()";

            builder.OnSelect(param);

            Assert.NotNull(clientEvents.OnSelect.HandlerName);
        }

        [Fact]
        public void SelectedItem_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnSelect(param);

            Assert.IsType(typeof(MenuClientEventsBuilder), returned);
        }

        [Fact]
        public void SelectedItem_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnSelect(param);

            Assert.IsType(typeof(MenuClientEventsBuilder), returned);
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

            Assert.IsType(typeof(MenuClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(MenuClientEventsBuilder), returned);
        }
    }
}
