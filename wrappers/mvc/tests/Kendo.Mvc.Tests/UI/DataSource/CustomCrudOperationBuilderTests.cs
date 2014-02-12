namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using Xunit;

    public class CustomCrudOperationBuilderTests
    {
        private readonly CrudOperation operation;
        private readonly CustomCrudOperationBuilder builder;

        public CustomCrudOperationBuilderTests()
        {
            operation = new CrudOperation();
            builder = new CustomCrudOperationBuilder(operation, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void DataType_should_set_corresponding_property()
        {
            var type = "json";
            builder.DataType(type);
            operation.DataType.ShouldEqual(type);
        }

        [Fact]
        public void DataType_returns_correct_builder()
        {
            var returnedBuilder = builder.DataType("json");

            returnedBuilder.ShouldBeType(builder.GetType());
        }

        [Fact]
        public void Cache_should_set_corresponding_property()
        {
            var enableCache = true;
            builder.Cache(enableCache);
            operation.Cache.ShouldEqual(enableCache);
        }

        [Fact]
        public void Cache_returns_correct_builder()
        {
            var returnedBuilder = builder.Cache(true);

            returnedBuilder.ShouldBeType(builder.GetType());
        }

        [Fact]
        public void ContentType_should_set_corresponding_property()
        {
            var type = "application/x-www-form-urlencoded; charset=UTF-8";
            builder.ContentType(type);
            operation.ContentType.ShouldEqual(type);
        }

        [Fact]
        public void ContentType_returns_correct_builder()
        {
            var returnedBuilder = builder.ContentType("application/x-www-form-urlencoded; charset=UTF-8");

            returnedBuilder.ShouldBeType(builder.GetType());
        }

        [Fact]
        public void Data_returns_correct_builder()
        {
            var returnedBuilder = builder.Data("handler");

            returnedBuilder.ShouldBeType(builder.GetType());
        }

        [Fact]
        public void Url_returns_correct_builder()
        {
            var returnedBuilder = builder.Url("handler");

            returnedBuilder.ShouldBeType(builder.GetType());
        }
    }
}
