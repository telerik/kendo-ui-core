

namespace KendoUI.Mvc.UI.Html
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
