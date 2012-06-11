namespace Kendo.Mvc.UI.Tests.Chart
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartCategoryAxisBuilderTests
        : ChartAxisBuilderBaseTests<IChartCategoryAxis, ChartCategoryAxisBuilder<SalesData>>
    {
        public ChartCategoryAxisBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            axis = new ChartCategoryAxis<SalesData>(chart);
            chart.CategoryAxis = axis;
            chart.Data = SalesDataBuilder.GetCollection();
            builder = new ChartCategoryAxisBuilder<SalesData>(chart);
        }

        [Fact]
        public void Categories_should_bind_categories_with_expression()
        {
            builder.Categories(s => s.DateString);

            AssertCategories(new string[] { "Aug 2010", string.Empty, "Sept 2010" });
        }

        [Fact]
        public void Categories_should_return_builder_with_expression()
        {
            builder.Categories(s => s.DateString).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Categories_set_member_field_with_expression()
        {
            builder.Container.Data = null;
            builder.Categories(s => s.Date);
            builder.Container.Data = SalesDataBuilder.GetCollection();

            axis.Member.ShouldEqual("Date");
        }

        [Fact]
        public void Categories_should_set_categories_from_IEnumerable()
        {
            var categories = new string[] { "Aug 2010", "Sept 2010" };

            builder.Categories(categories);

            axis.Categories.ShouldBeSameAs(categories);
        }

        [Fact]
        public void Categories_should_return_builder_with_IEnumerable()
        {
            var categories = new string[] { "Aug 2010", "Sept 2010" };

            builder.Categories(categories).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Categories_should_set_categories_from_list()
        {
            builder.Categories("Aug 2010", "Sept 2010");

            AssertCategories(new string[] { "Aug 2010", "Sept 2010" });
        }

        [Fact]
        public void Categories_should_return_builder_with_list()
        {
            builder.Categories("Aug 2010", "Sept 2010").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Date_sets_type_to_date()
        {
            builder.Date();
            axis.Type.ShouldEqual(ChartCategoryAxisType.Date);
        }

        private void AssertCategories<T>(IEnumerable<T> categories)
        {
            var expectedCategories = new Queue<T>();
            foreach (var category in categories)
            {
                expectedCategories.Enqueue(category);
            }

            var categoryStrings = builder.Axis.Categories;
            foreach (T category in categoryStrings)
            {
                category.ShouldEqual<T>(expectedCategories.Dequeue());
            }
        }
    }
}