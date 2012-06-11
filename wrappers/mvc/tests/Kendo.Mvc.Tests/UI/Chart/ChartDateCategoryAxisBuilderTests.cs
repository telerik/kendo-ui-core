namespace Kendo.Mvc.UI.Tests.Chart
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartDateCategoryAxisBuilderTests
        : ChartAxisBuilderBaseTests<IChartCategoryAxis, ChartDateCategoryAxisBuilder<SalesData>>
    {
        public ChartDateCategoryAxisBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            axis = new ChartCategoryAxis<SalesData>(chart);
            chart.CategoryAxis = axis;
            chart.Data = SalesDataBuilder.GetCollection();
            builder = new ChartDateCategoryAxisBuilder<SalesData>(chart);
        }

        [Fact]
        public void Categories_should_bind_categories_with_expression()
        {
            builder.Categories(s => s.Date);

            AssertCategories(new DateTime?[] { DateTime.Parse("2010/08/01"), null, DateTime.Parse("2010/09/01") });
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
        public void Categories_should_set_categories_from_date_list()
        {
            var a = DateTime.Parse("2012/05/29");
            var b = DateTime.Parse("2012/05/30");

            builder.Categories(a, b);

            AssertCategories(new DateTime[] { a, b});
        }

        [Fact]
        public void BaseUnit_should_set_base_unit()
        {
            builder.BaseUnit(ChartAxisBaseUnit.Days);
            axis.BaseUnit.ShouldEqual(ChartAxisBaseUnit.Days);
        }

        [Fact]
        public void BaseUnit_should_return_builder()
        {
            builder.BaseUnit(ChartAxisBaseUnit.Days).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Min_should_set_min_date()
        {
            var min = DateTime.Parse("2012/01/01");
            builder.Min(min);
            axis.Min.ShouldEqual(min);
        }

        [Fact]
        public void Min_should_return_builder()
        {
            builder.Min(DateTime.Parse("2012/01/01")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Max_should_set_max_date()
        {
            var max = DateTime.Parse("2012/01/01");
            builder.Max(max);
            axis.Max.ShouldEqual(max);
        }

        [Fact]
        public void Max_should_return_builder()
        {
            builder.Max(DateTime.Parse("2012/01/01")).ShouldBeSameAs(builder);
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