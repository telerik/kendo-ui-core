namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Web.Mvc;
    using Xunit;
    using System.Collections.Generic;

    public class PanelBarClientEventsBuilderTests
    {
        private PanelBarClientEventsBuilder builder;
        private IDictionary<string, object> clientEvents;

        public PanelBarClientEventsBuilderTests()
        {
            clientEvents = new Dictionary<string, object>();
            builder = new PanelBarClientEventsBuilder(clientEvents);
        }

        [Fact]
        public void Expand_String_param_should_set_Expand_property()
        {
            const string param = "my_method()";

            builder.OnExpand(param);

            Assert.NotNull(((ClientEvent)clientEvents["expand"]).HandlerName);
        }

        [Fact]
        public void Expand_String_should_return_builder()
        {
            builder.OnExpand("my_method()").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Collapse_String_param_should_set_Collapse_property()
        {
            const string param = "my_method()";

            builder.OnCollapse(param);

            Assert.NotNull(((ClientEvent)clientEvents["collapse"]).HandlerName);
        }

        [Fact]
        public void Collapse_String_should_return_builder()
        {
            builder.OnCollapse("my_method()").ShouldBeSameAs(builder);
        }

        [Fact]
        public void SelectedItem_String_param_should_set_SelectedItem_property()
        {
            const string param = "my_method()";

            builder.OnSelect(param);

            Assert.NotNull(((ClientEvent)clientEvents["select"]).HandlerName);
        }

        [Fact]
        public void SelectedItem_String_should_return_builder()
        {
            builder.OnSelect("my_method()").ShouldBeSameAs(builder);
        }
        
        [Fact]
        public void OnError_String_param_should_set_Loaded_property()
        {
            const string param = "my_method()";

            builder.OnError(param);

            Assert.NotNull(((ClientEvent)clientEvents["error"]).HandlerName);
        }

        [Fact]
        public void OnError_String_should_return_builder()
        {
            builder.OnError("my_method()").ShouldBeSameAs(builder);
        }
    }
}
