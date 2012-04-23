// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.Resources;
    using Telerik.Web.Mvc.UI;

    /// <summary>
    /// Builder class for fluently configuring the shared group.
    /// </summary>
    public class SharedWebAssetGroupBuilder : IHideObjectMembers
    {
        private readonly string defaultPath;
        private readonly IDictionary<string, WebAssetGroup> assets;

        /// <summary>
        /// Initializes a new instance of the <see cref="SharedWebAssetGroupBuilder"/> class.
        /// </summary>
        /// <param name="defaultPath">The default path.</param>
        /// <param name="assets">The assets.</param>
        public SharedWebAssetGroupBuilder(string defaultPath, IDictionary<string, WebAssetGroup> assets)
        {
            Guard.IsNotVirtualPath(defaultPath, "defaultPath");
            Guard.IsNotNull(assets, "assets");

            this.defaultPath = defaultPath;
            this.assets = assets;
        }

        /// <summary>
        /// Adds the group.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="configureAction">The configure action.</param>
        /// <returns></returns>
        public virtual SharedWebAssetGroupBuilder AddGroup(string name, Action<WebAssetGroupBuilder> configureAction)
        {
            Guard.IsNotNullOrEmpty(name, "name");
            Guard.IsNotNull(configureAction, "configureAction");

            WebAssetGroup group;

            if (assets.TryGetValue(name, out group))
            {
                throw new ArgumentException(TextResource.GroupWithSpecifiedNameAlreadyExistsPleaseSpecifyADifferentName.FormatWith(name));
            }

            group = new WebAssetGroup(name, true) { DefaultPath = defaultPath };
            assets.Add(name, group);

            WebAssetGroupBuilder builder = new WebAssetGroupBuilder(group);
            configureAction(builder);

            return this;
        }

        /// <summary>
        /// Gets the group.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="configureAction">The configure action.</param>
        /// <returns></returns>
        public virtual SharedWebAssetGroupBuilder GetGroup(string name, Action<WebAssetGroupBuilder> configureAction)
        {
            Guard.IsNotNullOrEmpty(name, "name");
            Guard.IsNotNull(configureAction, "configureAction");

            WebAssetGroup group;

            if (!assets.TryGetValue(name, out group))
            {
                throw new ArgumentException(TextResource.GroupWithSpecifiedNameDoesNotExistPleaseMakeSureYouHaveSpecifiedACorrectName.FormatWith(name));
            }

            WebAssetGroupBuilder builder = new WebAssetGroupBuilder(group);

            configureAction(builder);

            return this;
        }
    }
}