namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using System;
    using Xunit;

    public class CustomDataSourceSchemaBuilderBaseTests
    {
        private readonly DataSource dataSource;
        private readonly CustomDataSourceSchemaBuilderBaseDouble builder;
        private readonly Func<object, object> nullFunc;
        private readonly string sampleString;

        public CustomDataSourceSchemaBuilderBaseTests()
        {
            dataSource = new DataSource();
            dataSource.Schema.Data = "";
            dataSource.Schema.Total = "";
            dataSource.Schema.Errors = "";
            nullFunc = (o) => null;
            sampleString = "someType";
            builder = new CustomDataSourceSchemaBuilderBaseDouble(dataSource.Schema);
        }

        [Fact]
        public void Type_sets_corresponding_property()
        {
            builder.Type(sampleString);

            dataSource.Schema.Type.ShouldBeSameAs(sampleString);
        }

        [Fact]
        public void Parse_sets_corresponding_property()
        {
            builder.Parse(nullFunc);

            dataSource.Schema.Parse.TemplateDelegate.ShouldBeSameAs(nullFunc);
        }

        [Fact]
        public void Aggregates_sets_corresponding_property()
        {
            builder.Aggregates(sampleString);

            dataSource.Schema.Aggregates.ShouldBeSameAs(sampleString);
        }

        [Fact]
        public void Aggregates_function_overload_sets_corresponding_property()
        {
            builder.Aggregates(nullFunc);

            dataSource.Schema.FunctionAggregates.TemplateDelegate.ShouldBeSameAs(nullFunc);
        }

        [Fact]
        public void Groups_sets_corresponding_property()
        {
            builder.Groups(sampleString);

            dataSource.Schema.Groups.ShouldBeSameAs(sampleString);
        }

        [Fact]
        public void Groups_function_overload_sets_corresponding_property()
        {
            builder.Groups(nullFunc);

            dataSource.Schema.FunctionGroups.TemplateDelegate.ShouldBeSameAs(nullFunc);
        }

        [Fact]
        public void Data_sets_corresponding_property()
        {
            builder.Data(sampleString);

            dataSource.Schema.Data.ShouldBeSameAs(sampleString);
        }

        [Fact]
        public void Data_function_overload_sets_corresponding_property()
        {
            builder.Data(nullFunc);

            dataSource.Schema.FunctionData.TemplateDelegate.ShouldBeSameAs(nullFunc);
        }

        [Fact]
        public void Total_sets_corresponding_property()
        {
            builder.Total(sampleString);

            dataSource.Schema.Total.ShouldBeSameAs(sampleString);
        }

        [Fact]
        public void Total_function_overload_sets_corresponding_property()
        {
            builder.Total(nullFunc);

            dataSource.Schema.FunctionTotal.TemplateDelegate.ShouldBeSameAs(nullFunc);
        }

        [Fact]
        public void Errors_sets_corresponding_property()
        {
            builder.Errors(sampleString);

            dataSource.Schema.Errors.ShouldBeSameAs(sampleString);
        }

        [Fact]
        public void Errors_function_overload_sets_corresponding_property()
        {
            builder.Errors(nullFunc);

            dataSource.Schema.FunctionErrors.TemplateDelegate.ShouldBeSameAs(nullFunc);
        }
    }
}
