namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Web.Mvc;

    using Xunit;
    using Telerik.Web.Mvc.UI.Fluent;

    public class DropDownClientEventsBuilderTests
    {
        private DropDownClientEventsBuilder builder;
        private DropDownClientEvents clientEvents;
        private ViewContext viewContext;


        public DropDownClientEventsBuilderTests()
        {
            clientEvents = new DropDownClientEvents();
            viewContext = new ViewContext();
            builder = new DropDownClientEventsBuilder(clientEvents, viewContext);
        }

        [Fact]
        public void Loaded_Action_param_should_set_Loaded_property()
        {
            Action param = () => { };

            builder.OnLoad(param);

            Assert.NotNull(clientEvents.OnLoad.CodeBlock);
        }

        [Fact]
        public void Loaded_Func_param_should_set_OnLoad_InlineCodeBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.OnLoad(param);

            Assert.NotNull(clientEvents.OnLoad.InlineCodeBlock);
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

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void Change_Action_param_should_set_Change_property()
        {
            Action param = () => { };

            builder.OnChange(param);

            Assert.NotNull(clientEvents.OnChange.CodeBlock);
        }

        [Fact]
        public void Change_Func_param_should_set_OnChange_InlineCodeBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.OnChange(param);

            Assert.NotNull(clientEvents.OnChange.InlineCodeBlock);
        }

        [Fact]
        public void Change_String_param_should_set_Change_property()
        {
            const string param = "my_method()";

            builder.OnChange(param);

            Assert.NotNull(clientEvents.OnChange.HandlerName);
        }

        [Fact]
        public void Change_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnChange(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void Change_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.OnChange(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void Change_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnChange(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void Open_Action_param_should_set_Open_property()
        {
            Action param = () => { };

            builder.OnOpen(param);

            Assert.NotNull(clientEvents.OnOpen.CodeBlock);
        }

        [Fact]
        public void OnOpen_String_param_should_set_OnOpen_property()
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

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnOpen_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnOpen(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnClose_Action_param_should_set_OnClose_property()
        {
            Action param = () => { };

            builder.OnClose(param);

            Assert.NotNull(clientEvents.OnClose.CodeBlock);
        }

        [Fact]
        public void OnClose_Func_param_should_set_OnClose_InlineClientBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.OnClose(param);

            Assert.NotNull(clientEvents.OnClose.InlineCodeBlock);
        }

        [Fact]
        public void OnClose_String_param_should_set_OnClose_property()
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

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnClose_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.OnClose(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnClose_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnClose(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnDataBinding_Action_param_should_set_OnDataBinding_property()
        {
            Action param = () => { };

            builder.OnDataBinding(param);

            Assert.NotNull(clientEvents.OnDataBinding.CodeBlock);
        }

        [Fact]
        public void OnDataBinding_Func_param_should_set_OnDataBinding_InlineCodeBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.OnDataBinding(param);

            Assert.NotNull(clientEvents.OnDataBinding.InlineCodeBlock);
        }

        [Fact]
        public void OnDataBinding_String_param_should_set_OnDataBinding_property()
        {
            const string param = "my_method()";

            builder.OnDataBinding(param);

            Assert.NotNull(clientEvents.OnDataBinding.HandlerName);
        }

        [Fact]
        public void OnDataBinding_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnDataBinding(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnDataBinding_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.OnDataBinding(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnDataBinding_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnDataBinding(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnDataBound_Action_param_should_set_OnDataBound_property()
        {
            Action param = () => { };

            builder.OnDataBound(param);

            Assert.NotNull(clientEvents.OnDataBound.CodeBlock);
        }

        [Fact]
        public void OnDataBound_Func_param_should_set_OnDataBound_InlineCodeBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.OnDataBound(param);

            Assert.NotNull(clientEvents.OnDataBound.InlineCodeBlock);
        }

        [Fact]
        public void OnDataBound_String_param_should_set_OnDataBound_property()
        {
            const string param = "my_method()";

            builder.OnDataBound(param);

            Assert.NotNull(clientEvents.OnDataBound.HandlerName);
        }

        [Fact]
        public void OnDataBound_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnDataBound(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnDataBound_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.OnDataBound(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnDataBound_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnDataBound(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnError_Action_param_should_set_OnDataBound_property()
        {
            Action param = () => { };

            builder.OnError(param);

            Assert.NotNull(clientEvents.OnError.CodeBlock);
        }

        [Fact]
        public void OnError_Func_param_should_set_OnDataBound_InlineCodeBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.OnError(param);

            Assert.NotNull(clientEvents.OnError.InlineCodeBlock);
        }

        [Fact]
        public void OnError_String_param_should_set_OnDataBound_property()
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

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnError_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.OnError(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void OnError_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnError(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }
    }
}
