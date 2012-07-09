namespace Kendo.Mvc
{
    public static class SiteMapManager
    {
        private static readonly SiteMapDictionary siteMaps = new SiteMapDictionary();

        /// <summary>
        /// Gets the site maps.
        /// </summary>
        /// <value>The site maps.</value>
        public static SiteMapDictionary SiteMaps
        {
            get
            {
                return siteMaps;
            }
        }

        // Required for Unit Test
        internal static void Clear()
        {
            SiteMaps.Clear();
        }
    }
}