namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using System;
    using Xunit;

    public class ReadOnlyCustomDataSourceTransportBuilderTests
    {
        private ReadOnlyCustomDataSourceTransportBuilder builder;
        private Transport transport;
        private readonly Func<object, object> nullFunc;
        private readonly ClientHandlerDescriptor customHandler;

        public ReadOnlyCustomDataSourceTransportBuilderTests()
        {
            transport = new Transport();
            nullFunc = (o) => null;
            customHandler = new ClientHandlerDescriptor();
            builder = new ReadOnlyCustomDataSourceTransportBuilder(transport, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void ParameterMap_sets_handler_name_correctly()
        {
            builder.ParameterMap("handlerName");
            transport.ParameterMap.HasValue().ShouldBeTrue();
        }

        [Fact]
        public void ParameterMap_sets_handler_function_correctly()
        {
            builder.ParameterMap(nullFunc);
            transport.ParameterMap.HasValue().ShouldBeTrue();
        }

        [Fact]
        public void ParameterMap_should_return_same_builder()
        {
            var returnedBuilder = builder.ParameterMap("handlerName");
            returnedBuilder.ShouldBeType(builder.GetType());
        }

        [Fact]
        public void Read_string_overload_sets_handler_name_correctly()
        {
            builder.Read("handlerName");
            transport.FunctionRead.HasValue().ShouldBeTrue();
        }

        [Fact]
        public void Read_object_overload_sets_settings_correctly()
        {
            builder.Read(new {url= "new Url" });
            transport.CustomRead.Count.ShouldEqual(1);
        }

        [Fact]
        public void Read_should_return_same_builder()
        {
            var returnedBuilder = builder.Read("Product", "Home");
            returnedBuilder.ShouldBeType(builder.GetType());
        }
    }
}
