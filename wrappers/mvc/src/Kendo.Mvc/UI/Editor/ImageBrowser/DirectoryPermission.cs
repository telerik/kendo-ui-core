namespace Kendo.Mvc.UI
{
    using System;

    public class DirectoryPermission : IDirectoryPermission
    {
        public bool CanAccess(string rootPath, string childPath)
        {
            return childPath.StartsWith(rootPath, StringComparison.OrdinalIgnoreCase);
        }
    }
}