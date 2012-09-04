namespace Kendo.Mvc.UI
{
    public interface IDirectoryPermission
    {
        bool CanAccess(string rootPath, string childPath);
    }
}
