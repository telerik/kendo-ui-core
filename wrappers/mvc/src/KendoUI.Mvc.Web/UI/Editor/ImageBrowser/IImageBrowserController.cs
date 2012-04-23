// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Web;
    using System.Web.Mvc;

    public interface IImageBrowserController
    {
        JsonResult Browse(string path);
        ActionResult Thumbnail(string path);
        ActionResult DeleteFile(string path);
        ActionResult DeleteDirectory(string path);
        ActionResult CreateDirectory(string path, string name);
        ActionResult Upload(string path, HttpPostedFileBase file);
    }
}