using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.UI
{
    public class DirectoryBrowser : IDirectoryBrowser
    {
        public IEnumerable<ImageBrowserEntry> GetFiles(string path, string filter)
        {
            var directory = new DirectoryInfo(Server.MapPath(path));

            var extensions = (filter ?? "*").Split(",|;".ToCharArray(), System.StringSplitOptions.RemoveEmptyEntries);

            return extensions.SelectMany(directory.GetFiles)
                .Select(file => new ImageBrowserEntry
                {
                    Name = file.Name,
                    Size = file.Length,
                    EntryType = ImageBrowserEntryType.File
                });
        }

        public IEnumerable<ImageBrowserEntry> GetDirectories(string path)
        {
            var directory = new DirectoryInfo(Server.MapPath(path));

            return directory.GetDirectories()
                .Select(subDirectory => new ImageBrowserEntry { 
                    Name = subDirectory.Name,
                    EntryType = ImageBrowserEntryType.Directory
                });
        }

        public HttpServerUtilityBase Server
        {
            get;
            set;
        }     
    }
}
