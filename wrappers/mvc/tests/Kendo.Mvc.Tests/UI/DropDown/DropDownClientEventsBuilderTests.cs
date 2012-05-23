namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI.Fluent;
    using System;
    using Xunit;

    public class DropDownClientEventsBuilderTests
    {
        private DropDownClientEventsBuilder builder;
        private DropDownClientEvents clientEvents;


        public DropDownClientEventsBuilderTests()
        {
            clientEvents = new DropDownClientEvents();
            builder = new DropDownClientEventsBuilder(clientEvents);
        }

        [Fact]
        public void Change_Func_param_should_set_Change_InlineCodeBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.Change(param);

            Assert.NotNull(clientEvents.Change.InlineCodeBlock);
        }

        [Fact]
        public void Change_String_param_should_set_Change_property()
        {
            const string param = "my_method()";

            builder.Change(param);

            Assert.NotNull(clientEvents.Change.HandlerName);
        }

        [Fact]
        public void Change_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.Change(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void Change_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.Change(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void Open_String_param_should_set_Open_property()
        {
            const string param = "my_method()";

            builder.Open(param);

            Assert.NotNull(clientEvents.Open.HandlerName);
        }

        [Fact]
        public void Open_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.Open(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void Open_Func_param_should_set_Open_InlineClientBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.Open(param);

            Assert.NotNull(clientEvents.Open.InlineCodeBlock);
        }

        [Fact]
        public void Close_Func_param_should_set_Close_InlineClientBlock()
        {
            Func<object, object> param = (o) => { return null; };

            builder.Close(param);

            Assert.NotNull(clientEvents.Close.InlineCodeBlock);
        }

        [Fact]
        public void Close_String_param_should_set_Close_property()
        {
            const string param = "my_method()";

            builder.Close(param);

            Assert.NotNull(clientEvents.Close.HandlerName);
        }

        [Fact]
        public void Close_Func_should_return_builder()
        {
            Func<object, object> param = (o) => { return null; };

            var returned = builder.Close(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }

        [Fact]
        public void Close_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.Close(param);

            Assert.IsType(typeof(DropDownClientEventsBuilder), returned);
        }
    }
}
