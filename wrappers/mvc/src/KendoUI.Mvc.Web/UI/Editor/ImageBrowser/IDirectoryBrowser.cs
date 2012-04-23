

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web;

    public interface IDirectoryBrowser
    {
        IEnumerable<FileEntry> GetFiles(string path, string filter);

        IEnumerable<DirectoryEntry> GetDirectories(string path);

        HttpServerUtilityBase Server
        {
            get;
            set;
        }
    }
}