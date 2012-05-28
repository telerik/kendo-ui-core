namespace Kendo.Mvc.UI.Tests.Grid
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
        public void Enabled_is_false_by_default()
        {
            Assert.False(pager.Enabled);
        }
    }
}