namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartAxisBaseUnitStepsBuilderTests
    {
        private readonly ChartAxisBaseUnitStepsBuilder builder;
        private readonly ChartAxisBaseUnitSteps baseUnitSteps;

        public ChartAxisBaseUnitStepsBuilderTests()
        {
            baseUnitSteps = new ChartAxisBaseUnitSteps();
            builder = new ChartAxisBaseUnitStepsBuilder(baseUnitSteps);
        }

        [Fact]
        public void Minutes_sets_minutes()
        {
            builder.Minutes(1, 2);
            baseUnitSteps.Minutes.Equals(new int[] { 1, 2 });
        }

        [Fact]
        public void Minutes_returns_builder() {
            builder.Minutes(1, 2).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Hours_sets_minutes()
        {
            builder.Hours(1, 2);
            baseUnitSteps.Hours.Equals(new int[] { 1, 2 });
        }

        [Fact]
        public void Hours_returns_builder()
        {
            builder.Hours(1, 2).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Days_sets_minutes()
        {
            builder.Days(1, 2);
            baseUnitSteps.Days.Equals(new int[] { 1, 2 });
        }

        [Fact]
        public void Days_returns_builder()
        {
            builder.Days(1, 2).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Weeks_sets_minutes()
        {
            builder.Weeks(1, 2);
            baseUnitSteps.Weeks.Equals(new int[] { 1, 2 });
        }

        [Fact]
        public void Weeks_returns_builder()
        {
            builder.Weeks(1, 2).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Months_sets_minutes()
        {
            builder.Months(1, 2);
            baseUnitSteps.Months.Equals(new int[] { 1, 2 });
        }

        [Fact]
        public void Months_returns_builder()
        {
            builder.Months(1, 2).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Years_sets_minutes()
        {
            builder.Years(1, 2);
            baseUnitSteps.Years.Equals(new int[] { 1, 2 });
        }

        [Fact]
        public void Years_returns_builder()
        {
            builder.Years(1, 2).ShouldBeSameAs(builder);
        }
    }
}