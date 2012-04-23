// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
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