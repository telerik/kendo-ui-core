namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Web.Mvc;
    using Xunit;
    
    public class CalendarClientEventsBuilderTests
    {

        private CalendarClientEventsBuilder builder;
        private CalendarClientEvents clientEvents;
        private ViewContext viewContext;

        public CalendarClientEventsBuilderTests()
        {
            clientEvents = new CalendarClientEvents();
            viewContext = new ViewContext();
            builder = new CalendarClientEventsBuilder(clientEvents, viewContext);
        }

        [Fact]
        public void OnDateChanged_method_with_Action_param_should_set_OnDateSelect_property()
        {
            Action param = () => { };

            builder.OnChange(param);

            Assert.NotNull(clientEvents.OnChange.CodeBlock);
        }

        [Fact]
        public void OnDateChanged_method_with_string_param_should_set_OnDateSelect_property()
        {
            const string param = "my_method()";

            builder.OnChange(param);

            Assert.NotNull(clientEvents.OnChange.HandlerName);
        }

        [Fact]
        public void OnDateChanged_method_with_Action_param_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnChange(param);

            Assert.IsType(typeof(CalendarClientEventsBuilder), returned);
        }

        [Fact]
        public void OnDateChanged_method_with_string_param_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnChange(param);

            Assert.IsType(typeof(CalendarClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_with_Action_param_should_set_Loaded_property()
        {
            Action param = () => { };

            builder.OnLoad(param);

            Assert.NotNull(clientEvents.OnLoad.CodeBlock);
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

            Assert.IsType(typeof(CalendarClientEventsBuilder), returned);
        }

        [Fact]
        public void Loaded_with_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(CalendarClientEventsBuilder), returned);
        }

    }
}