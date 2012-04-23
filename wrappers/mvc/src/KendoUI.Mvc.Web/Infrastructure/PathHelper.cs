// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System;

    internal static class PathHelper
    {
        public static string CombinePath(string directory, string fileName)
        {
            const string Slash = "/";

            string path = (directory.EndsWith(Slash, StringComparison.Ordinal) ? directory : directory + Slash) +
                          (fileName.StartsWith(Slash, StringComparison.Ordinal) ? fileName.Substring(1) : fileName);

            return path;
        }
    }
}