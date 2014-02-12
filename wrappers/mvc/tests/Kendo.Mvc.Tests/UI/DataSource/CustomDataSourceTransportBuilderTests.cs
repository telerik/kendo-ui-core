namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using Xunit;

    public class CustomDataSourceTransportBuilderTests
    {
        private CustomDataSourceTransportBuilder builder;
        private Transport transport;
        private readonly ClientHandlerDescriptor customHandler;

        public CustomDataSourceTransportBuilderTests()
        {
            transport = new Transport();
            customHandler = new ClientHandlerDescriptor();
            builder = new CustomDataSourceTransportBuilder(transport, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Update_string_overload_sets_handler_name_correctly()
        {
            builder.Update("handlerName");
            transport.FunctionUpdate.HasValue().ShouldBeTrue();
        }

        [Fact]
        public void Update_object_overload_sets_settings_correctly()
        {
            builder.Update(new { url = "new Url" });
            transport.CustomUpdate.Count.ShouldEqual(1);
        }

        [Fact]
        public void Update_should_return_same_builder()
        {
            var returnedBuilder = builder.Update("Product", "Home");
            returnedBuilder.ShouldBeType(builder.GetType());
        }

        [Fact]
        public void Create_string_overload_sets_handler_name_correctly()
        {
            builder.Create("handlerName");
            transport.FunctionCreate.HasValue().ShouldBeTrue();
        }

        [Fact]
        public void Create_object_overload_sets_settings_correctly()
        {
            builder.Create(new { url = "new Url" });
            transport.CustomCreate.Count.ShouldEqual(1);
        }

        [Fact]
        public void Create_should_return_same_builder()
        {
            var returnedBuilder = builder.Create("Product", "Home");
            returnedBuilder.ShouldBeType(builder.GetType());
        }

        [Fact]
        public void Destroy_string_overload_sets_handler_name_correctly()
        {
            builder.Destroy("handlerName");
            transport.FunctionDestroy.HasValue().ShouldBeTrue();
        }

        [Fact]
        public void Destroy_object_overload_sets_settings_correctly()
        {
            builder.Destroy(new { url = "new Url" });
            transport.CustomDestroy.Count.ShouldEqual(1);
        }

        [Fact]
        public void Destroy_should_return_same_builder()
        {
            var returnedBuilder = builder.Destroy("Product", "Home");
            returnedBuilder.ShouldBeType(builder.GetType());
        }
    }
}
