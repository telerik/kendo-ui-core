namespace Kendo.Mvc.Infrastructure
{
    public interface IVirtualPathProvider
    {
        bool DirectoryExists(string virtualPath);

        bool FileExists(string virtualPath);

        string GetDirectory(string virtualPath);

        string GetFile(string virtualPath);

        string GetExtension(string virtualPath);

        string CombinePaths(string basePath, string relativePath);

        string ReadAllText(string virtualPath);

        string ToAbsolute(string virtualPath);

        string AppendTrailingSlash(string virtualPath);
    }
}
