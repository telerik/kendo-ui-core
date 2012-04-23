// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    public interface IVirtualPathProvider
    {
        bool DirectoryExists(string virtualPath);

        bool FileExists(string virtualPath);

        string GetDirectory(string virtualPath);

        string GetFile(string virtualPath);

        string GetExtension(string virtualPath);

        string CombinePaths(string basePath, string relativePath);

        string ReadAllText(string virtualPath);

        string ToAbsolute(string virtualPath);

        string AppendTrailingSlash(string virtualPath);
    }
}
