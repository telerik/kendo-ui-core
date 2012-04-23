namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Web.Mvc;
    using Xunit;

    public class TabStripClientEventsBuilderTests
    {
        private TabStripClientEventsBuilder builder;
        private TabStripClientEvents clientEvents;
        private ViewContext viewContext;


        public TabStripClientEventsBuilderTests()
        {
            clientEvents = new TabStripClientEvents();
            viewContext = new ViewContext();
            builder = new TabStripClientEventsBuilder(clientEvents, viewContext);
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

            Assert.IsType(typeof(TabStripClientEventsBuilder), returned);
        }

        [Fact]
        public void SelectedItem_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnSelect(param);

            Assert.IsType(typeof(TabStripClientEventsBuilder), returned);
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

            Assert.IsType(typeof(TabStripClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(TabStripClientEventsBuilder), returned);
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

            Assert.IsType(typeof(TabStripClientEventsBuilder), returned);
        }

        [Fact]
        public void OnError_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnError(param);

            Assert.IsType(typeof(TabStripClientEventsBuilder), returned);
        }
    }
}
