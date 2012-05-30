namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Infrastructure;
    
    public class GridItemCreator : IGridItemCreator
    {
        private readonly IGridDataKeyComparer comparer;
        private readonly IGridItemCreatorData creatorData;

        public GridItemCreator(IGridDataKeyComparer comparer, IGridItemCreatorData creatorData)
        {
            this.creatorData = creatorData;
            this.comparer = comparer;
        }

        private void AsGroupRow(GridItem item)
        {
            item.Type = GridItemType.GroupRow;
        }

        private void AsEditRow(GridItem item, bool current)
        {
            if (current && creatorData.Mode == GridItemMode.Edit)
            {
                item.Type = GridItemType.EditRow;
            }
        }

        private void AsMaster(GridItem item)
        {
            if (creatorData.HasDetailTemplate)
            {
                item.State |= GridItemStates.Master;
            }
        }
        
        private void AsSelected(GridItem item, bool current)
        {
            if (current && creatorData.Mode == GridItemMode.Select)
            {
                item.State |= GridItemStates.Selected;
            }
        }

        public GridItem CreateItem(object dataItem)
        {
            var item = new GridItem
            {
                DataItem = dataItem,
                State = GridItemStates.Default,
                Type = GridItemType.DataRow
            };

            if (dataItem is IGroup)
            {
                AsGroupRow(item);
            }
            else
            {
                var current = comparer.KeysEqualTo(dataItem);
                
                AsEditRow(item, current);
                
                AsSelected(item, current);

                AsMaster(item);
            }

            return item;
        }
        
        public GridItem CreateInsertItem()
        {
            if (creatorData.Mode == GridItemMode.Insert)
            {
                return new GridItem
                {
                    DataItem = creatorData.CreateNewDataItem(),
                    GroupLevel = creatorData.GroupsCount,
                    Type = GridItemType.InsertRow
                };
            }
            
            return null;
        }

        public GridItem CreateGroupFooterItem(object dataItem)
        {
            if (creatorData.ShowGroupFooter)
            {
                var groupFooter = new GridItem
                {
                    GroupLevel = creatorData.GroupsCount,
                    DataItem = dataItem,
                    Type = GridItemType.GroupFooterRow
                };
                return groupFooter;
            }
            return null;
        }
    }
}
