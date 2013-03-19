namespace Kendo.Mvc.UI.Tests.Chart
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartAxisSelectionBuilderTests
    {
        private readonly ChartAxisSelectionBuilder builder;
        private readonly ChartAxisSelection selection;

        public ChartAxisSelectionBuilderTests()
        {
            selection = new ChartAxisSelection();
            builder = new ChartAxisSelectionBuilder(selection);
        }

        [Fact]
        public void From_sets_from_date()
        {
            var from = new DateTime(2012, 1, 1);
            builder.From(from);
            selection.From.ShouldEqual(from);
        }

        [Fact]
        public void From_with_date_should_return_builder()
        {
            builder.From(new DateTime(2012, 1, 1)).ShouldBeSameAs(builder);
        }

        [Fact]
        public void From_sets_from_index()
        {
            builder.From(1.0);
            selection.From.ShouldEqual(1.0);
        }

        [Fact]
        public void From_with_index_should_return_builder()
        {
            builder.From(1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void To_sets_to_date()
        {
            var to = new DateTime(2012, 1, 1);
            builder.To(to);
            selection.To.ShouldEqual(to);
        }

        [Fact]
        public void To_with_date_should_return_builder()
        {
            builder.To(new DateTime(2012, 1, 1)).ShouldBeSameAs(builder);
        }

        [Fact]
        public void To_sets_to_index()
        {
            builder.To(1.0);
            selection.To.ShouldEqual(1.0);
        }

        [Fact]
        public void To_with_index_should_return_builder()
        {
            builder.To(1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Mousewheel_builder_should_configure_mousewheel()
        {
            builder.Mousewheel(mw => mw.Reverse());
            selection.Mousewheel.Reverse.ShouldEqual(true);
        }

        [Fact]
        public void Mousewheel_builder_should_return_builder()
        {
            builder.Mousewheel(mw => { }).ShouldBeSameAs(builder);
        }
    }
}