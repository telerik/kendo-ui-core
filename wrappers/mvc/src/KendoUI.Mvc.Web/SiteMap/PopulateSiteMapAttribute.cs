// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Web.Mvc;

    using Infrastructure;

    /// <summary>
    /// Represents an attribute that is used to populate <see cref="SiteMapBase"/> in view data.
    /// </summary>
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1813:AvoidUnsealedAttributes", Justification = "Sealed in public class is a design smell, we can ignore the little performace benefit of sealed.")]
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
            Guard.IsNotNull(siteMaps, "siteMaps");

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
                Guard.IsNotNullOrEmpty(value, "value");

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
            Guard.IsNotNull(filterContext, "filterContext");

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