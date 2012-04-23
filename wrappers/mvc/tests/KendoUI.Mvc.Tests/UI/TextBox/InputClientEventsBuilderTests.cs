namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Web.Mvc;
    using Xunit;

    public class InputClientEventsBuilderTests
    {
        private TextBoxBaseClientEventsBuilder builder;
        private TextBoxBaseClientEvents clientEvents;
        private ViewContext viewContext;


        public InputClientEventsBuilderTests()
        {
            clientEvents = new TextBoxBaseClientEvents();
            viewContext = new ViewContext();
            builder = new TextBoxBaseClientEventsBuilder(clientEvents, viewContext);
        }

        [Fact]
        public void OnChange_method_with_Action_param_should_set_OnChange_property()
        {
            Action param = () => { };

            builder.OnChange(param);

            Assert.NotNull(clientEvents.OnChange.CodeBlock);
        }

        [Fact]
        public void OnChange_method_with_Func_param_should_set_OnChange_InlineCodeBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.OnChange(param);

            Assert.NotNull(clientEvents.OnChange.InlineCodeBlock);
        }

        [Fact]
        public void OnChange_method_with_string_param_should_set_OnChange_property()
        {
            const string param = "my_method()";

            builder.OnChange(param);

            Assert.NotNull(clientEvents.OnChange.HandlerName);
        }

        [Fact]
        public void OnChange_method_with_Action_param_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnChange(param);

            Assert.IsType(typeof(TextBoxBaseClientEventsBuilder), returned);
        }

        [Fact]
        public void OnChange_method_with_Func_param_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.OnChange(param);

            Assert.IsType(typeof(TextBoxBaseClientEventsBuilder), returned);
        }

        [Fact]
        public void OnChange_method_with_string_param_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnChange(param);

            Assert.IsType(typeof(TextBoxBaseClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_with_Action_param_should_set_Loaded_property()
        {
            Action param = () => { };

            builder.OnLoad(param);

            Assert.NotNull(clientEvents.OnLoad.CodeBlock);
        }

        [Fact]
        public void Loaded_with_Func_param_should_set_OnLoad_InlineCodeBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.OnLoad(param);

            Assert.NotNull(clientEvents.OnLoad.InlineCodeBlock);
        }

        [Fact]
        public void Loaded_with_String_param_should_set_Loaded_property()
        {
            const string param = "my_method()";

            builder.OnLoad(param);

            Assert.NotNull(clientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void Loaded_with_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(TextBoxBaseClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_with_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(TextBoxBaseClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_with_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(TextBoxBaseClientEventsBuilder), returned);
        }
    }
}
