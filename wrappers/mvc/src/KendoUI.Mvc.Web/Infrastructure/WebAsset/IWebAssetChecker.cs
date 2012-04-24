namespace KendoUI.Mvc.Infrastructure
{
    public interface IWebAssetChecker
    {
        bool IsNative(WebAsset asset);
        bool IsAbsolute(WebAsset asset);
    }
}
