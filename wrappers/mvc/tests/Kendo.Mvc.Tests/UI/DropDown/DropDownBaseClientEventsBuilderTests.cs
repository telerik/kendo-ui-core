namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc;
    using Kendo.Mvc.UI.Fluent;
    using System;
    using System.Collections.Generic;
    using Xunit;

    public class DropDownBaseClientEventsBuilderTests
    {
        private DropDownListEventBuilder builder;
        private IDictionary<string, object> clientEvents;


        public DropDownBaseClientEventsBuilderTests()
        {
            clientEvents = new Dictionary<string, object>();
            builder = new DropDownListEventBuilder(clientEvents);
        }

        [Fact]
        public void Change_Func_param_should_set_Change_InlineCodeBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.Change(param);

            Assert.NotNull((clientEvents["change"] as ClientHandlerDescriptor).TemplateDelegate);
        }

        [Fact]
        public void Change_String_param_should_set_Change_property()
        {
            const string param = "my_method()";

            builder.Change(param);

            Assert.NotNull((clientEvents["change"] as ClientHandlerDescriptor).HandlerName);
        }

        [Fact]
        public void Change_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.Change(param);

            Assert.IsType(typeof(DropDownListEventBuilder), returned);
        }

        [Fact]
        public void Change_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.Change(param);

            Assert.IsType(typeof(DropDownListEventBuilder), returned);
        }

        [Fact]
        public void Open_String_param_should_set_Open_property()
        {
            const string param = "my_method()";

            builder.Open(param);

            Assert.NotNull((clientEvents["open"] as ClientHandlerDescriptor).HandlerName);
        }

        [Fact]
        public void Open_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.Open(param);

            Assert.IsType(typeof(DropDownListEventBuilder), returned);
        }

        [Fact]
        public void Open_Func_param_should_set_Open_InlineClientBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.Open(param);

            Assert.NotNull((clientEvents["open"] as ClientHandlerDescriptor).TemplateDelegate);
        }

        [Fact]
        public void Close_Func_param_should_set_Close_InlineClientBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.Close(param);

            Assert.NotNull((clientEvents["close"] as ClientHandlerDescriptor).TemplateDelegate);
        }

        [Fact]
        public void Close_String_param_should_set_Close_property()
        {
            const string param = "my_method()";

            builder.Close(param);

            Assert.NotNull((clientEvents["close"] as ClientHandlerDescriptor).HandlerName);
        }

        [Fact]
        public void Close_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.Close(param);

            Assert.IsType(typeof(DropDownListEventBuilder), returned);
        }

        [Fact]
        public void Close_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.Close(param);

            Assert.IsType(typeof(DropDownListEventBuilder), returned);
        }

        [Fact]
        public void Select_Func_param_should_set_Select_InlineCodeBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.Select(param);

            Assert.NotNull((clientEvents["select"] as ClientHandlerDescriptor).TemplateDelegate);
        }

        [Fact]
        public void Select_String_param_should_set_Select_property()
        {
            const string param = "my_method()";

            builder.Select(param);

            Assert.NotNull((clientEvents["select"] as ClientHandlerDescriptor).HandlerName);
        }

        [Fact]
        public void Select_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.Select(param);

            Assert.IsType(typeof(DropDownListEventBuilder), returned);
        }

        [Fact]
        public void Select_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.Select(param);

            Assert.IsType(typeof(DropDownListEventBuilder), returned);
        }

    }
}
