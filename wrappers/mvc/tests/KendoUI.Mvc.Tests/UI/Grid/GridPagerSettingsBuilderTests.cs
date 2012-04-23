namespace Telerik.Web.Mvc.UI.Tests.Grid
{
    using System;
    using Fluent;
    using Mvc.UI;
    using Xunit;

    public class GridPagerSettingsBuilderTests
    {
        private readonly GridPagingSettings pager;
        private readonly GridPagerSettingsBuilder builder;
        
        public GridPagerSettingsBuilderTests()
        {
            pager = new GridPagingSettings(GridTestHelper.CreateGrid<Customer>());
            builder = new GridPagerSettingsBuilder(pager);
        }

        [Fact]
        public void Position_sets_pager_position()
        {
            builder.Position(GridPagerPosition.Top);

            Assert.Equal(GridPagerPosition.Top, pager.Position);
        }

        [Fact]
        public void PageSize_sets_page_size()
        {
            builder.PageSize(1);

            Assert.Equal(1, pager.PageSize);
        }

        [Fact]
        public void PageSize_sets_page_size_and_drop_down_values()
        {
            var sizesInDropDown = new[] {1, 2, 3, 4, 5};

            builder.PageSize(1, sizesInDropDown);

            pager.PageSizesInDropDown.ShouldEqual(sizesInDropDown);
        }

        [Fact]
        public void Total_should_fail_on_negative()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => builder.Total(-1));
        }

        [Fact]
        public void Total_should_accept_zero()
        {
            builder.Total(0);

            Assert.Equal(0, pager.Total);
        }

        [Fact]
        public void PageTo_sets_current_page()
        {
            builder.PageTo(2);
            Assert.Equal(2, pager.CurrentPage);
        }

        [Fact]
        public void PageTo_should_fail_on_negative()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => builder.PageTo(-1));
        }
        
        [Fact]
        public void PageTo_should_fail_on_zero()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => builder.PageTo(0));
        }
    }
}