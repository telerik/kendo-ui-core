namespace Kendo.Mvc.Infrastructure
{
    public interface IWebAssetChecker
    {
        bool IsNative(WebAsset asset);
        bool IsAbsolute(WebAsset asset);
    }
}
