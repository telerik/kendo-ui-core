// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Infrastructure;

    static class ImageBrowserDependencyBootstrapper
    {
        public static void Setup()
        {
            DI.Current.Register<IDirectoryBrowser>(() => new DirectoryBrowser());
            DI.Current.Register<IDirectoryPermission>(() => new DirectoryPermission());
            DI.Current.Register<IImageResizer>(() => new FitImageResizer());
            DI.Current.Register<IThumbnailCreator, IImageResizer>(resizer => new ThumbnailCreator(resizer));
        }
    }
}
