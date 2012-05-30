namespace Kendo.Mvc.UI.Html
{
    public class GridItemCreatorFactory : IGridItemCreatorFactory
    {
        public IGridItemCreator Create(IGridDataKeyStore dataKeyData, IGridItemCreatorData creatorData)
        {
            var comparer = new GridDataKeyComparer(dataKeyData.DataKeyGetters, dataKeyData.CurrentDataKeyValues);

            return new GridItemCreator(comparer, creatorData);
        }
    }
}