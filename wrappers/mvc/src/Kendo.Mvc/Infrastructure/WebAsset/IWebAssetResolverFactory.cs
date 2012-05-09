namespace Kendo.Mvc.Infrastructure
{
    public interface IWebAssetResolverFactory
    {
        IWebAssetResolver Create(IWebAsset asset);
    }
}
