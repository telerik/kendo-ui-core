namespace Kendo.Mvc
{
    using System;
    using System.Web.Mvc;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class PopulateSiteMapAttribute : FilterAttribute, IResultFilter
    {
        private static string defaultViewDataKey = "siteMap";

        /// <summary>
        /// Initializes a new instance of the <see cref="PopulateSiteMapAttribute"/> class.
        /// </summary>
        /// <param name="siteMaps">The site maps.</param>
        public PopulateSiteMapAttribute(SiteMapDictionary siteMaps)
        {

            SiteMaps = siteMaps;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="PopulateSiteMapAttribute"/> class.
        /// </summary>
        public PopulateSiteMapAttribute() : this(SiteMapManager.SiteMaps)
        {
        }

        /// <summary>
        /// Gets or sets the default view data key.
        /// </summary>
        /// <value>The default view data key.</value>
        public static string DefaultViewDataKey
        {
            get
            {
                return defaultViewDataKey;
            }

            set
            {

                defaultViewDataKey = value;
            }
        }

        /// <summary>
        /// Gets or sets the name of the site map.
        /// </summary>
        /// <value>The name of the site map.</value>
        public string SiteMapName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the view data key.
        /// </summary>
        /// <value>The view data key.</value>
        public string ViewDataKey
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the site maps.
        /// </summary>
        /// <value>The site maps.</value>
        public SiteMapDictionary SiteMaps
        {
            get;
            private set;
        }

        /// <summary>
        /// Called before an action result executes.
        /// </summary>
        /// <param name="filterContext">The filter context.</param>
        public virtual void OnResultExecuting(ResultExecutingContext filterContext)
        {

            SiteMapBase siteMap = string.IsNullOrEmpty(SiteMapName) ? SiteMaps.DefaultSiteMap : SiteMaps[SiteMapName];
            string viewDataKey = ViewDataKey ?? DefaultViewDataKey;

            filterContext.Controller.ViewData[viewDataKey] = siteMap;
        }

        /// <summary>
        /// Called after an action result executes.
        /// </summary>
        /// <param name="filterContext">The filter context.</param>
        public void OnResultExecuted(ResultExecutedContext filterContext)
        {
            // Do nothing, just sleep.
        }
    }
}