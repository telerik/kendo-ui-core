using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.UI
{
    public class DirectoryBrowser : IDirectoryBrowser
    {
        public IEnumerable<FileBrowserEntry> GetFiles(string path, string filter)
        {
            var directory = new DirectoryInfo(Server.MapPath(path));

            var extensions = (filter ?? "*").Split(",|;".ToCharArray(), System.StringSplitOptions.RemoveEmptyEntries);

            return extensions.SelectMany(directory.GetFiles)
                .Select(file => new FileBrowserEntry
                {
                    Name = file.Name,
                    Size = file.Length,
                    EntryType = FileBrowserEntryType.File
                });
        }

        public IEnumerable<FileBrowserEntry> GetDirectories(string path)
        {
            var directory = new DirectoryInfo(Server.MapPath(path));

            return directory.GetDirectories()
                .Select(subDirectory => new FileBrowserEntry { 
                    Name = subDirectory.Name,
                    EntryType = FileBrowserEntryType.Directory
                });
        }

        public HttpServerUtilityBase Server
        {
            get;
            set;
        }     
    }
}
