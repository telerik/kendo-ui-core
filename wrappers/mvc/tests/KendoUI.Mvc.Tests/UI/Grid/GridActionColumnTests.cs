// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Tests
{
    using Telerik.Web.Mvc.UI.Html;
    using Xunit;

    public class GridActionColumnTests
    {
        private readonly GridActionColumn<Customer> column;
        
        public GridActionColumnTests()
	    {
            column = new GridActionColumn<Customer>(GridTestHelper.CreateGrid<Customer>());
	    }

        [Fact]
        public void Should_create_action_command_builder()
        {
            column.CreateDisplayBuilder(null).ShouldBeType<GridActionCellBuilder>();
        }
    }
}
