namespace Kendo.Mvc.Infrastructure
{
    public interface IWebAssetContentFilter
    {
        bool AppliesTo(string contentType);
        string Filter(string basePath, string content);
    }
}