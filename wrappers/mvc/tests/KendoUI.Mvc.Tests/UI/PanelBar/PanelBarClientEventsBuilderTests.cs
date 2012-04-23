namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Web.Mvc;
    using Xunit;

    public class PanelBarClientEventsBuilderTests
    {
        private PanelBarClientEventsBuilder builder;
        private PanelBarClientEvents clientEvents;
        private ViewContext viewContext;


        public PanelBarClientEventsBuilderTests()
        {
            clientEvents = new PanelBarClientEvents();
            viewContext = new ViewContext();
            builder = new PanelBarClientEventsBuilder(clientEvents, viewContext);
        }

        [Fact]
        public void Expand_Action_param_should_set_Expand_property() 
        {
            Action param = () => { };

            builder.OnExpand(param);

            Assert.NotNull(clientEvents.OnExpand.CodeBlock);
        }

        [Fact]
        public void Expand_String_param_should_set_Expand_property()
        {
            const string param = "my_method()";

            builder.OnExpand(param);

            Assert.NotNull(clientEvents.OnExpand.HandlerName);
        }

        [Fact]
        public void Expand_Action_should_return_builder() 
        {
            Action param = () => { };

            var returned = builder.OnExpand(param);

            Assert.IsType(typeof(PanelBarClientEventsBuilder), returned);
        }

        [Fact]
        public void Expand_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnExpand(param);

            Assert.IsType(typeof(PanelBarClientEventsBuilder), returned);
        }

        [Fact]
        public void Collapse_Action_param_should_set_Collapse_property()
        {
            Action param = () => { };

            builder.OnCollapse(param);

            Assert.NotNull(clientEvents.OnCollapse.CodeBlock);
        }

        [Fact]
        public void Collapse_String_param_should_set_Collapse_property()
        {
            const string param = "my_method()";

            builder.OnCollapse(param);

            Assert.NotNull(clientEvents.OnCollapse.HandlerName);
        }

        [Fact]
        public void Collapse_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnCollapse(param);

            Assert.IsType(typeof(PanelBarClientEventsBuilder), returned);
        }

        [Fact]
        public void Collapse_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnCollapse(param);

            Assert.IsType(typeof(PanelBarClientEventsBuilder), returned);
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

            Assert.IsType(typeof(PanelBarClientEventsBuilder), returned);
        }

        [Fact]
        public void SelectedItem_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnSelect(param);

            Assert.IsType(typeof(PanelBarClientEventsBuilder), returned);
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

            Assert.IsType(typeof(PanelBarClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(PanelBarClientEventsBuilder), returned);
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

            Assert.IsType(typeof(PanelBarClientEventsBuilder), returned);
        }

        [Fact]
        public void OnError_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnError(param);

            Assert.IsType(typeof(PanelBarClientEventsBuilder), returned);
        }
    }
}
