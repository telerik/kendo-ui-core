namespace Telerik.Web.Mvc.UI.Tests.Chart
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class ChartCategoryAxisBuilderTests
        : ChartAxisBuilderBaseTests<IChartCategoryAxis, ChartCategoryAxisBuilder<SalesData>>
    {
        public ChartCategoryAxisBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            axis = new ChartCategoryAxis<SalesData>(chart);
            chart.CategoryAxis = axis;
            chart.DataSource = SalesDataBuilder.GetCollection();
            builder = new ChartCategoryAxisBuilder<SalesData>(chart);
        }

        [Fact]
        public void Categories_should_bind_categories_with_expression()
        {
            builder.Categories(s => s.DateString);

            AssertCategories(new string[] { "Aug 2010", string.Empty, "Sept 2010" });
        }

        [Fact]
        public void Categories_should_set_categories_from_IEnumerable()
        {
            var categories = new string[] { "Aug 2010", "Sept 2010" };

            builder.Categories(categories);

            axis.Categories.ShouldBeSameAs(categories);
        }

        [Fact]
        public void Categories_should_set_categories_from_list()
        {
            builder.Categories("Aug 2010", "Sept 2010");

            AssertCategories(new string[] { "Aug 2010", "Sept 2010" });
        }

        private void AssertCategories(IEnumerable<string> categories)
        {
            var expectedCategories = new Queue<string>();
            foreach (var category in categories)
            {
                expectedCategories.Enqueue(category);
            }

            var categoryStrings = builder.Axis.Categories;
            foreach (object category in categoryStrings)
            {
                expectedCategories.Dequeue().ShouldEqual(category.ToString());
            }
        }
    }
}