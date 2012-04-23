// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Configuration
{
    using System.Configuration;

    /// <summary>
    /// Web asset group configuration element.
    /// </summary>
    public class WebAssetGroupConfigurationElement : ConfigurationElement
    {
        public WebAssetGroupConfigurationElement()
        {
            Enabled = true;
        }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        [ConfigurationProperty("name", IsRequired = true, IsKey = true)]
        public string Name
        {
            get
            {
                return (string)this["name"];
            }

            set
            {
                this["name"] = value;
            }
        }

        /// <summary>
        /// Gets or sets the default path.
        /// </summary>
        /// <value>The default path.</value>
        [ConfigurationProperty("defaultPath")]
        public string DefaultPath
        {
            get
            {
                return (string)this["defaultPath"];
            }

            set
            {
                this["defaultPath"] = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether to use telerik content delivery network.
        /// </summary>
        /// <value>
        /// <c>true</c> if [use telerik content delivery network]; otherwise, <c>false</c>.
        /// </value>
        [ConfigurationProperty("useTelerikContentDeliveryNetwork")]
        public bool? UseTelerikContentDeliveryNetwork
        {
            get
            {
                return (bool?)this["useTelerikContentDeliveryNetwork"];
            }

            set
            {
                this["useTelerikContentDeliveryNetwork"] = value;
            }
        }

        /// <summary>
        /// Gets or sets the content delivery network URL.
        /// </summary>
        /// <value>The content delivery network URL.</value>
        [ConfigurationProperty("contentDeliveryNetworkUrl")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Should accepth url as string.")]
        public string ContentDeliveryNetworkUrl
        {
            get
            {
                return (string)this["contentDeliveryNetworkUrl"];
            }

            set
            {
                this["contentDeliveryNetworkUrl"] = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="WebAssetGroupConfigurationElement"/> is enabled.
        /// </summary>
        /// <value><c>true</c> if enabled; otherwise, <c>false</c>.</value>
        [ConfigurationProperty("enabled")]
        public bool Enabled
        {
            get
            {
                return (bool)this["enabled"];
            }

            set
            {
                this["enabled"] = value;
            }
        }

        /// <summary>
        /// Gets or sets the version.
        /// </summary>
        /// <value>The version.</value>
        [ConfigurationProperty("version")]
        public string Version
        {
            get
            {
                return (string)this["version"];
            }

            set
            {
                this["version"] = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="WebAssetGroupConfigurationElement"/> is compress.
        /// </summary>
        /// <value><c>true</c> if compress; otherwise, <c>false</c>.</value>
        [ConfigurationProperty("compress", DefaultValue = true)]
        public bool Compress
        {
            get
            {
                return (bool)this["compress"];
            }

            set
            {
                this["compress"] = value;
            }
        }

        /// <summary>
        /// Gets or sets the cache duration in days.
        /// </summary>
        /// <value>The cache duration in days.</value>
        [ConfigurationProperty("cacheDurationInDays", DefaultValue = 365f)]
        public float CacheDurationInDays
        {
            get
            {
                return (float)this["cacheDurationInDays"];
            }

            set
            {
                this["cacheDurationInDays"] = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="WebAssetGroupConfigurationElement"/> is combined.
        /// </summary>
        /// <value><c>true</c> if combined; otherwise, <c>false</c>.</value>
        [ConfigurationProperty("combined", DefaultValue = true)]
        public bool Combined
        {
            get
            {
                return (bool)this["combined"];
            }

            set
            {
                this["combined"] = value;
            }
        }

        /// <summary>
        /// Gets the items.
        /// </summary>
        /// <value>The items.</value>
        [ConfigurationProperty("items", IsDefaultCollection = true, IsRequired = true)]
        public WebAssetConfigurationElementCollection Items
        {
            get
            {
                return (WebAssetConfigurationElementCollection)base["items"] ?? new WebAssetConfigurationElementCollection();
            }
        }
    }
}