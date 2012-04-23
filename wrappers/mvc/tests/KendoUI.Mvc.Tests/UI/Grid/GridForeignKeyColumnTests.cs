namespace Telerik.Web.Mvc.UI.Tests.Grid
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Html;
    using Xunit;
    using BoundColumnTests = Telerik.Web.Mvc.UI.Tests.Grid.GridBoundColumnTests;

    public class GridForeignKeyColumnTests
    {
        [Fact]
        public void Should_use_foreignKeyDataBuilder()
        {
            var column = new GridForeignKeyColumn<BoundColumnTests.User, bool>(GridTestHelper.CreateGrid<BoundColumnTests.User>(), u => u.Active, new System.Web.Mvc.SelectList(new object[0]));            
            var builder = column.CreateDisplayBuilder(null);
            builder.ShouldBeType<GridForeignKeyDataCellBuilder<BoundColumnTests.User, bool>>();
        }
    }

}