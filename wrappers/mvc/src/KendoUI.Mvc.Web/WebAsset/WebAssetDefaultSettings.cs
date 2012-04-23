// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System.Reflection;
    using Telerik.Web.Mvc.Configuration;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Contains default asset settings.
    /// </summary>
    public static class WebAssetDefaultSettings
    {
        public const string TelerikContentDeliveryNetworkStyleSheetUrl = "http://aspnet-skins.telerikstatic.com";
        public const string TelerikContentDeliveryNetworkSecureStyleSheetUrl = "https://telerik-aspnet-skins.s3.amazonaws.com";
        public const string TelerikContentDeliveryNetworkScriptUrl = "http://aspnet-scripts.telerikstatic.com";
        public const string TelerikContentDeliveryNetworkSecureScriptUrl = "https://telerik-aspnet-scripts.s3.amazonaws.com";
        
        public static string[] DebugJavaScriptExtensions = new[] { ".debug.js", ".js", ".min.js" };
        public static string[] ReleaseJavaScriptExtensions = new[] { ".min.js", ".js", ".debug.js" };
        public static string[] DebugCssExtensions = new[] { ".css", ".min.css" };
        public static string[] ReleaseCssExtensions = new[] { ".min.css", ".css" };

        private static string styleSheetFilesPath = "~/Content";
        private static string scriptFilesPath = "~/Scripts";
        private static string version = new AssemblyName(typeof (WebAssetDefaultSettings).Assembly.FullName).Version.ToString(3);
        private static bool compress = true;
        private static float cacheDurationInDays = 365f;

        private static readonly object useTelerikCdnLock = new object();
        private static bool? useTelerikCdn;

        /// <summary>
        /// Gets or sets the style sheet files path. Path must be a virtual path.
        /// </summary>
        /// <value>The style sheet files path.</value>
        public static string StyleSheetFilesPath
        {
            get
            {
                return styleSheetFilesPath;
            }

            set
            {
                Guard.IsNotVirtualPath(value, "value");

                styleSheetFilesPath = value;
            }
        }

        /// <summary>
        /// Gets or sets the script files path. Path must be a virtual path.
        /// </summary>
        /// <value>The script files path.</value>
        public static string ScriptFilesPath
        {
            get
            {
                return scriptFilesPath;
            }

            set
            {
                Guard.IsNotVirtualPath(value, "value");

                scriptFilesPath = value;
            }
        }

        /// <summary>
        /// Gets or sets the version.
        /// </summary>
        /// <value>The version.</value>
        public static string Version
        {
            get
            {
                return version;
            }

            set
            {
                version = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether assets should be served as compressed.
        /// </summary>
        /// <value><c>true</c> if compress; otherwise, <c>false</c>.</value>
        public static bool Compress
        {
            get
            {
                return compress;
            }
            set
            {
                compress = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether assets shoule be combined.
        /// </summary>
        /// <value><c>true</c> if combined; otherwise, <c>false</c>.</value>
        public static bool Combined
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the cache duration in days.
        /// </summary>
        /// <value>The cache duration in days.</value>
        public static float CacheDurationInDays
        {
            get
            {
                return cacheDurationInDays;
            }

            set
            {
                Guard.IsNotNegative(value, "value");

                cacheDurationInDays = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether [use telerik content delivery network].
        /// </summary>
        /// <value>
        /// <c>true</c> if [use telerik content delivery network]; otherwise, <c>false</c>.
        /// </value>
        public static bool UseTelerikContentDeliveryNetwork
        {
            get
            {
                if (!useTelerikCdn.HasValue)
                {
                    lock (useTelerikCdnLock)
                    {
                        if (!useTelerikCdn.HasValue)
                        {
                            WebAssetConfigurationSection section = null;

                            if (DI.Current != null)
                            {
                                IConfigurationManager configurationManager = DI.Current.Resolve<IConfigurationManager>();

                                if (configurationManager != null)
                                {
                                    section = configurationManager.GetSection<WebAssetConfigurationSection>(WebAssetConfigurationSection.SectionName);
                                }
                            }

                            useTelerikCdn = (section != null) && section.UseTelerikContentDeliveryNetwork;
                        }
                    }
                }

                return useTelerikCdn ?? false;
            }

            set
            {
                useTelerikCdn = value;
            }
        }
    }
}