// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;

    public class BrowseResult
    {
        public IEnumerable<DirectoryEntry> Directories
        {
            get;
            set;
        }

        public IEnumerable<FileEntry> Files
        {
            get;
            set;
        }

        public string Path
        {
            get;
            set;
        }

        public string[] ContentPaths
        {
            get;
            set;
        }
    }
}