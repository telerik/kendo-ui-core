namespace Kendo.Mvc.UI.Tests.Grid
{
    using System;

    using Xunit;
    
    public class GridPagerTests
    {
		private PageableSettings pager;

        public GridPagerTests()
        {
            pager = new PageableSettings();
        }

        [Fact]
        public void Enabled_is_false_by_default()
        {
            Assert.False(pager.Enabled);
        }
    }
}