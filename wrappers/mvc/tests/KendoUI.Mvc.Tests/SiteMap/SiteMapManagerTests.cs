// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using Xunit;

    public class SiteMapManagerTests
    {
        public SiteMapManagerTests()
        {
            SiteMapManager.Clear();
        }

        [Fact]
        public void SiteMaps_should_not_be_null()
        {
            Assert.NotNull(SiteMapManager.SiteMaps);
        }
    }
}