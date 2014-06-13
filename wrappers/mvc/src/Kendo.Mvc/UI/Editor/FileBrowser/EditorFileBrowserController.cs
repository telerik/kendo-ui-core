using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    public abstract class EditorFileBrowserController : FileBrowserController
    {
        /// <summary>
        /// Gets the valid file extensions by which served files will be filtered.
        /// </summary>
        public override string Filter
        {
            get
            {
                return EditorFileBrowserSettings.DefaultFileTypes;
            }
        }
    }
}
