using System.Collections.Generic;
using System.Web;

namespace Kendo.Mvc.UI
{
    public interface IDirectoryBrowser
    {
        IEnumerable<FileBrowserEntry> GetFiles(string path, string filter);

        IEnumerable<FileBrowserEntry> GetDirectories(string path);

        HttpServerUtilityBase Server
        {
            get;
            set;
        }
    }
}
