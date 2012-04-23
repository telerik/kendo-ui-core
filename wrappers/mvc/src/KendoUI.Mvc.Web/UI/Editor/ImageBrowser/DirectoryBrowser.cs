namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web;

    public class DirectoryBrowser : IDirectoryBrowser
    {
        public HttpServerUtilityBase Server
        {
            get;
            set;
        }

        public IEnumerable<DirectoryEntry> GetDirectories(string path)
        {
            var directory = new DirectoryInfo(Server.MapPath(path));

            return directory.GetDirectories().Select(subDirectory => new DirectoryEntry { Name = subDirectory.Name });
        }

        public IEnumerable<FileEntry> GetFiles(string path, string filter)
        {
            var directory = new DirectoryInfo(Server.MapPath(path));

            var extensions = (filter ?? "*").Split(",|;".ToCharArray(), System.StringSplitOptions.RemoveEmptyEntries);

            return extensions.SelectMany(directory.GetFiles)
                .Select(file => new FileEntry
                                    {
                                        Name = file.Name,
                                        Size = file.Length
                                    });
        }
    }
}