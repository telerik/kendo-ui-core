namespace Telerik.Web.Mvc.UI.Tests
{
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class SplitterClientEventsBuilderTests
    {
        private SplitterClientEventsBuilder builder;
        private SplitterClientEvents clientEvents;

        public SplitterClientEventsBuilderTests()
        {
            clientEvents = new SplitterClientEvents();
            builder = new SplitterClientEventsBuilder(clientEvents);
        }

        [Fact]
        public void OnLoad_with_Action_param_should_set_OnLoad_property()
        {
            builder.OnLoad(() => { });

            Assert.NotNull(clientEvents.OnLoad.CodeBlock);
        }

        [Fact]
        public void OnLoad_with_String_param_should_set_OnLoad_property()
        {
            builder.OnLoad("my_method()");

            Assert.NotNull(clientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void OnLoad_with_Action_should_return_builder()
        {
            Assert.IsType<SplitterClientEventsBuilder>(builder.OnLoad(() => { }));
        }

        [Fact]
        public void OnLoad_with_String_should_return_builder()
        {
            Assert.IsType<SplitterClientEventsBuilder>(builder.OnLoad("my_method()"));
        }

        [Fact]
        public void OnResize_with_Action_param_should_set_OnResize_property()
        {
            builder.OnResize(() => { });

            Assert.NotNull(clientEvents.OnResize.CodeBlock);
        }

        [Fact]
        public void OnResize_with_String_param_should_set_OnResize_property()
        {
            builder.OnResize("my_method()");

            Assert.NotNull(clientEvents.OnResize.HandlerName);
        }

        [Fact]
        public void OnResize_with_Action_should_return_builder()
        {
            Assert.IsType<SplitterClientEventsBuilder>(builder.OnResize(() => { }));
        }

        [Fact]
        public void OnResize_with_String_should_return_builder()
        {
            Assert.IsType<SplitterClientEventsBuilder>(builder.OnResize("my_method()"));
        }

        [Fact]
        public void OnExpand_with_Action_param_should_set_OnExpand_property()
        {
            builder.OnExpand(() => { });

            Assert.NotNull(clientEvents.OnExpand.CodeBlock);
        }

        [Fact]
        public void OnExpand_with_String_param_should_set_OnExpand_property()
        {
            builder.OnExpand("my_method()");

            Assert.NotNull(clientEvents.OnExpand.HandlerName);
        }

        [Fact]
        public void OnExpand_with_Action_should_return_builder()
        {
            Assert.IsType<SplitterClientEventsBuilder>(builder.OnExpand(() => { }));
        }

        [Fact]
        public void OnExpand_with_String_should_return_builder()
        {
            Assert.IsType<SplitterClientEventsBuilder>(builder.OnExpand("my_method()"));
        }

        [Fact]
        public void OnCollapse_with_Action_param_should_set_OnCollapse_property()
        {
            builder.OnCollapse(() => { });

            Assert.NotNull(clientEvents.OnCollapse.CodeBlock);
        }

        [Fact]
        public void OnCollapse_with_String_param_should_set_OnCollapse_property()
        {
            builder.OnCollapse("my_method()");

            Assert.NotNull(clientEvents.OnCollapse.HandlerName);
        }

        [Fact]
        public void OnCollapse_with_Action_should_return_builder()
        {
            Assert.IsType<SplitterClientEventsBuilder>(builder.OnCollapse(() => { }));
        }

        [Fact]
        public void OnCollapse_with_String_should_return_builder()
        {
            Assert.IsType<SplitterClientEventsBuilder>(builder.OnCollapse("my_method()"));
        }

        [Fact]
        public void OnContentLoad_with_Action_param_should_set_OnContentLoad_property()
        {
            builder.OnContentLoad(() => { });

            Assert.NotNull(clientEvents.OnContentLoad.CodeBlock);
        }

        [Fact]
        public void OnContentLoad_with_String_param_should_set_OnContentLoad_property()
        {
            builder.OnContentLoad("my_method()");

            Assert.NotNull(clientEvents.OnContentLoad.HandlerName);
        }

        [Fact]
        public void OnContentLoad_with_Action_should_return_builder()
        {
            Assert.IsType<SplitterClientEventsBuilder>(builder.OnContentLoad(() => { }));
        }

        [Fact]
        public void OnContentLoad_with_String_should_return_builder()
        {
            Assert.IsType<SplitterClientEventsBuilder>(builder.OnContentLoad("my_method()"));
        }
    }
}
