namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    public interface IGauge
    {
        /// <summary>
        /// The component UrlGenerator
        /// </summary>
        IUrlGenerator UrlGenerator
        {
            get;
        }

        /// <summary>
        /// The component view context
        /// </summary>
        ViewContext ViewContext
        {
            get;
        }
    }
}