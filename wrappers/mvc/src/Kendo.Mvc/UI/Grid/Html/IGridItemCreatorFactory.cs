namespace Kendo.Mvc.UI.Html
{
    public interface IGridItemCreatorFactory
    {
        IGridItemCreator Create(IGridDataKeyStore dataKeyData, IGridItemCreatorData creatorData);
    }
}