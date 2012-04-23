// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Xunit;

    public class GridLinkButtonTests
    {
        private readonly GridLinkButtonBuilder button;

        public GridLinkButtonTests()
        {
            button = new GridLinkButtonBuilder
            {
                Url = (o) => null
            };
        }
        
        [Fact]
        public void Should_return_a_tag()
        {
            var result = button.Create(null);

            result.TagName.ShouldEqual("a");
        }

        [Fact]
        public void Should_set_href()
        {
            button.Url = (dataItem) =>
            {
                return dataItem.ToString();
            };
            
            var result = button.Create("foo");

            result.Attribute("href").ShouldEqual("foo");
        }
    }
}