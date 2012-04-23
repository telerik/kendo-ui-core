// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
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