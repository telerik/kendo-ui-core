namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using System;
    using Xunit;

    public class CustomDataSourceModelFieldDescriptorBuilderTests
    {
        private readonly CustomDataSourceModelFieldDescriptorBuilder<Customer> builder;
        private readonly ModelFieldDescriptor descriptor;
        private readonly Func<object, object> nullFunc;

        public CustomDataSourceModelFieldDescriptorBuilderTests()
        {
            descriptor = new ModelFieldDescriptor();
            nullFunc = (o) => null;
            builder = new CustomDataSourceModelFieldDescriptorBuilder<Customer>(descriptor);
        }

        [Fact]
        public void From_should_set_corresponding_property()
        {
            var someString = "someString";
            builder.From(someString);

            descriptor.From.ShouldEqual(someString);
        }

        [Fact]
        public void Parse_function_overload_should_set_corresponding_property()
        {
            builder.Parse(nullFunc);

            descriptor.Parse.TemplateDelegate.ShouldEqual(nullFunc);
        }

        [Fact]
        public void Parse_should_set_corresponding_property()
        {
            var someString = "someString";
            builder.Parse(someString);

            descriptor.Parse.HandlerName.ShouldEqual(someString);
        }
    }
}
