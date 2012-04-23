// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;

    public class WebAssetGroup : IWebAsset
    {
        private string defaultPath;
        private string version;
        private float cacheDurationInDays;

        /// <summary>
        /// Initializes a new instance of the <see cref="WebAssetGroup"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="isShared">if set to <c>true</c> [is shared].</param>
        public WebAssetGroup(string name, bool isShared)
        {
            Name = name;
            IsShared = isShared;
            Version = WebAssetDefaultSettings.Version;
            Compress = WebAssetDefaultSettings.Compress;
            CacheDurationInDays = WebAssetDefaultSettings.CacheDurationInDays;
            Combined = WebAssetDefaultSettings.Combined;
            UseTelerikContentDeliveryNetwork = WebAssetDefaultSettings.UseTelerikContentDeliveryNetwork;
            Items = new InternalAssetItemCollection();
            Enabled = true;
        }

        public string ContentType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        public string Name
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is shared.
        /// </summary>
        /// <value><c>true</c> if this instance is shared; otherwise, <c>false</c>.</value>
        public bool IsShared
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the default path.
        /// </summary>
        /// <value>The default path.</value>
        public string DefaultPath
        {
            get
            {
                return defaultPath;
            }

            set
            {
                Guard.IsNotVirtualPath(value, "value");

                defaultPath = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether Telerik content delivery network would be used.
        /// </summary>
        /// <value>
        /// <c>true</c> if [use Telerik content delivery network]; otherwise, <c>false</c>.
        /// </value>
        public bool UseTelerikContentDeliveryNetwork
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the content delivery network URL.
        /// </summary>
        /// <value>The content delivery network URL.</value>
        public string ContentDeliveryNetworkUrl
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="WebAssetGroup"/> is disabled.
        /// </summary>
        /// <value><c>true</c> if disabled; otherwise, <c>false</c>.</value>
        public bool Enabled
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the version.
        /// </summary>
        /// <value>The version.</value>
        public string Version
        {
            get
            {
                return version;
            }

            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                version = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="WebAssetGroup"/> is compress.
        /// </summary>
        /// <value><c>true</c> if compress; otherwise, <c>false</c>.</value>
        public bool Compress
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the cache duration in days.
        /// </summary>
        /// <value>The cache duration in days.</value>
        public float CacheDurationInDays
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
        /// Gets or sets a value indicating whether this <see cref="WebAssetGroup"/> is combined.
        /// </summary>
        /// <value><c>true</c> if combined; otherwise, <c>false</c>.</value>
        public bool Combined
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the items.
        /// </summary>
        /// <value>The items.</value>
        public IList<WebAsset> Items
        {
            get;
            private set;
        }

        private sealed class InternalAssetItemCollection : Collection<WebAsset>
        {
            protected override void InsertItem(int index, WebAsset item)
            {
                Guard.IsNotNull(item, "item");

                if (!AlreadyExists(item))
                {
                    base.InsertItem(index, item);
                }
            }

            protected override void SetItem(int index, WebAsset item)
            {
                if (AlreadyExists(item))
                {
                    throw new ArgumentException(Resources.TextResource.ItemWithSpecifiedSourceAlreadyExists, "item");
                }

                base.SetItem(index, item);
            }

            private bool AlreadyExists(WebAsset item)
            {
                return this.Any(i => i != item && i.Source.IsCaseInsensitiveEqual(item.Source));
            }
        }
    }
}