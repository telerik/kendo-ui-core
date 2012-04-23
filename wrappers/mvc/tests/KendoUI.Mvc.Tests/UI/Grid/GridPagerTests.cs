namespace Telerik.Web.Mvc.UI.Tests.Grid
{
    using System;

    using Xunit;
    
    public class GridPagerTests
    {
		private GridPagingSettings pager;

        public GridPagerTests()
        {
            pager = new GridPagingSettings(null);
        }

        [Fact]
        public void Position_is_bottom_by_default()
        {
            Assert.Equal(GridPagerPosition.Bottom, pager.Position);
        }

        [Fact]
        public void PageSize_is_ten_by_default()
        {
            Assert.Equal(10, pager.PageSize);
        }

        [Fact]
        public void PageSize_throws_when_not_positive()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => pager.PageSize = 0);
        }

        [Fact]
        public void Enabled_is_false_by_default()
        {
            Assert.False(pager.Enabled);
        }
    }
}