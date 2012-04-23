// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System;
    using Moq;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;

    public class GridItemCreatorTests
    {
        class GridItemCreatorData : IGridItemCreatorData
        {
            public GridItemMode Mode
            {
                get;
                set;
            }

            public bool HasDetailView
            {
                get;
                set;
            }

            public Func<object> CreateNewDataItem
            {
                get;
                set;
            }

            public bool ShowGroupFooter
            {
                get; 
                set;
            }

            public int GroupsCount
            {
                get; 
                set;
            }
        }

        private readonly Mock<IGridDataKeyComparer> comparer;
        private readonly GridItemCreator creator;
        private readonly GridItemCreatorData creatorData;

        public GridItemCreatorTests()
        {
            comparer = new Mock<IGridDataKeyComparer>();
            creatorData = new GridItemCreatorData();
            creator = new GridItemCreator(comparer.Object, creatorData);
        }

        [Fact]
        public void Should_create_data_item_by_default()
        {
            var dataItem = "foo";
            var item = creator.CreateItem(dataItem);
            
            item.DataItem.ShouldBeSameAs(dataItem);
            item.Type.ShouldEqual(GridItemType.DataRow);
        }
        
        [Fact]
        public void Should_create_edit_item_if_mode_is_edit_and_datarow_is_current()
        {
            var dataItem = "foo";
            
            comparer.Setup(c => c.KeysEqualTo(dataItem)).Returns(true);
            creatorData.Mode = GridItemMode.Edit;

            var item = creator.CreateItem(dataItem);
            
            item.DataItem.ShouldBeSameAs(dataItem);
            item.Type.ShouldEqual(GridItemType.EditRow);
        }        
        
        [Fact]
        public void Should_create_group_item_if_data_item_is_group()
        {
            var dataItem = new Mock<IGroup>().Object;
            var item = creator.CreateItem(dataItem);
            
            item.DataItem.ShouldBeSameAs(dataItem);
            item.Type.ShouldEqual(GridItemType.GroupRow);
        }

        [Fact]
        public void Should_create_master_row_if_has_details()
        {
            var dataItem = "foo";
            creatorData.HasDetailView = true;

            var item = creator.CreateItem(dataItem);
            
            item.DataItem.ShouldBeSameAs(dataItem);
            item.Type.ShouldEqual(GridItemType.DataRow);
            (item.State & GridItemStates.Master).ShouldEqual(GridItemStates.Master);
        }
        
        [Fact]
        public void Should_create_selected_row_if_current_and_mode_is_selected()
        {
            var dataItem = "foo";
            creatorData.Mode = GridItemMode.Select;
            
            comparer.Setup(c => c.KeysEqualTo(dataItem)).Returns(true);

            var item = creator.CreateItem(dataItem);
            
            item.DataItem.ShouldBeSameAs(dataItem);
            item.Type.ShouldEqual(GridItemType.DataRow);
            (item.State & GridItemStates.Selected).ShouldEqual(GridItemStates.Selected);
        }
    }
}
