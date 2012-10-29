using System.Collections.Generic;
using System.Web;

namespace Kendo.Mvc.UI
{
    public interface IDirectoryBrowser
    {
        IEnumerable<ImageBrowserEntry> GetFiles(string path, string filter);

        IEnumerable<ImageBrowserEntry> GetDirectories(string path);

        HttpServerUtilityBase Server
        {
            get;
            set;
        }
    }
}
