namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using Xunit;
    using Telerik.Web.Mvc.UI.Fluent;

    public class SliderClientEventsBuilderTests
    {
        private SliderClientEventsBuilder builder;
        private SliderBaseClientEvents clientEvents;

        public SliderClientEventsBuilderTests()
        {
            clientEvents = new SliderBaseClientEvents();
            builder = new SliderClientEventsBuilder(clientEvents);
        }

        [Fact]
        public void OnChange_method_with_Action_param_should_set_OnChange_property()
        {
            Action param = () => { };

            builder.OnChange(param);

            Assert.NotNull(clientEvents.OnChange.CodeBlock);
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

            Assert.IsType(typeof(SliderClientEventsBuilder), returned);
        }

        [Fact]
        public void OnChange_method_with_string_param_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnChange(param);

            Assert.IsType(typeof(SliderClientEventsBuilder), returned);
        }

        [Fact]
        public void OnLoad_with_Action_param_should_set_OnLoad_property()
        {
            Action param = () => { };

            builder.OnLoad(param);

            Assert.NotNull(clientEvents.OnLoad.CodeBlock);
        }

        [Fact]
        public void OnLoad_with_String_param_should_set_OnLoad_property()
        {
            const string param = "my_method()";

            builder.OnLoad(param);

            Assert.NotNull(clientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void OnLoad_with_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(SliderClientEventsBuilder), returned);
        }

        [Fact]
        public void OnLoad_with_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnLoad(param);

            Assert.IsType(typeof(SliderClientEventsBuilder), returned);
        }

        [Fact]
        public void OnSlide_with_Action_param_should_set_OnSlide_property()
        {
            Action param = () => { };

            builder.OnSlide(param);

            Assert.NotNull(clientEvents.OnSlide.CodeBlock);
        }

        [Fact]
        public void OnSlide_with_String_param_should_set_OnSlide_property()
        {
            const string param = "my_method()";

            builder.OnSlide(param);

            Assert.NotNull(clientEvents.OnSlide.HandlerName);
        }

        [Fact]
        public void OnSlide_with_Action_should_return_builder()
        {
            Action param = () => { };

            var returned = builder.OnSlide(param);

            Assert.IsType(typeof(SliderClientEventsBuilder), returned);
        }

        [Fact]
        public void OnSlide_with_String_should_return_builder()
        {
            const string param = "my_method()";

            var returned = builder.OnSlide(param);

            Assert.IsType(typeof(SliderClientEventsBuilder), returned);
        }
    }
}