// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Configuration;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// 
    /// </summary>
    public static class SharedWebAssets
    {
        private static readonly IDictionary<string, WebAssetGroup> styleSheets = new Dictionary<string, WebAssetGroup>(StringComparer.OrdinalIgnoreCase);
        private static readonly IDictionary<string, WebAssetGroup> scripts = new Dictionary<string, WebAssetGroup>(StringComparer.OrdinalIgnoreCase);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1810:InitializeReferenceTypeStaticFieldsInline", Justification = "Ignore this issue since we want the configured assets available when the class is loaded.")]
        static SharedWebAssets()
        {
            LoadFromConfiguration(DI.Current.Resolve<IConfigurationManager>());
        }

        /// <summary>
        /// Executes the provided delegate that is used to configure stylesheets.
        /// </summary>
        /// <param name="configureAction">The configure action.</param>
        public static void StyleSheets(Action<SharedWebAssetGroupBuilder> configureAction)
        {
            Configure(WebAssetDefaultSettings.StyleSheetFilesPath, styleSheets, configureAction);
        }

        /// <summary>
        /// Executes the provided delegate that is used to configure scripts.
        /// </summary>
        /// <param name="configureAction">The configure action.</param>
        public static void Scripts(Action<SharedWebAssetGroupBuilder> configureAction)
        {
            Configure(WebAssetDefaultSettings.ScriptFilesPath, scripts, configureAction);
        }

        internal static WebAssetGroup FindStyleSheetGroup(string name)
        {
            return FindInternal(styleSheets, name, "text/css");
        }

        internal static WebAssetGroup FindScriptGroup(string name)
        {
            return FindInternal(scripts, name, "text/javascript");
        }

        private static WebAssetGroup FindInternal(IDictionary<string, WebAssetGroup> lookup, string name, string contentType)
        {
            WebAssetGroup group;

            if (lookup.TryGetValue(name, out group))
            {
                group.ContentType = contentType;
            }
            
            return group;
        }

        private static void Configure(string defaultPath, IDictionary<string, WebAssetGroup> target, Action<SharedWebAssetGroupBuilder> configureAction)
        {
            Guard.IsNotNull(configureAction, "configureAction");

            SharedWebAssetGroupBuilder builder = new SharedWebAssetGroupBuilder(defaultPath, target);

            configureAction(builder);
        }

        private static void LoadFromConfiguration(IConfigurationManager configurationManager)
        {
            WebAssetConfigurationSection section = configurationManager.GetSection<WebAssetConfigurationSection>(WebAssetConfigurationSection.SectionName);

            if (section != null)
            {
                LoadGroups(section.StyleSheets, styleSheets, WebAssetDefaultSettings.StyleSheetFilesPath, WebAssetDefaultSettings.Version);
                LoadGroups(section.Scripts, scripts, WebAssetDefaultSettings.ScriptFilesPath, WebAssetDefaultSettings.Version);
            }
        }

        private static void LoadGroups(WebAssetGroupConfigurationElementCollection source, IDictionary<string, WebAssetGroup> destination, string defaultPath, string defaultVersion)
        {
            foreach (WebAssetGroupConfigurationElement configurationGroup in source)
            {
                WebAssetGroup group = new WebAssetGroup(configurationGroup.Name, true)
                                              {
                                                  DefaultPath = !string.IsNullOrEmpty(configurationGroup.DefaultPath) ? configurationGroup.DefaultPath : defaultPath,
                                                  ContentDeliveryNetworkUrl = configurationGroup.ContentDeliveryNetworkUrl,
                                                  Enabled = configurationGroup.Enabled,
                                                  Version = !string.IsNullOrEmpty(configurationGroup.Version) ? configurationGroup.Version : defaultVersion,
                                                  Compress = configurationGroup.Compress,
                                                  CacheDurationInDays = configurationGroup.CacheDurationInDays,

                                                  Combined = configurationGroup.Combined
                                              };

                if (configurationGroup.UseTelerikContentDeliveryNetwork.HasValue)
                {
                    group.UseTelerikContentDeliveryNetwork = configurationGroup.UseTelerikContentDeliveryNetwork.Value;
                }

                foreach (WebAssetConfigurationElement configurationItem in configurationGroup.Items)
                {
                    string itemSource = configurationItem.Source;
                  
                    if (!itemSource.StartsWith("~/", StringComparison.OrdinalIgnoreCase) && !itemSource.Contains("://")) {
                        itemSource = PathHelper.CombinePath(group.DefaultPath, itemSource);
                    }

                    group.Items.Add(new WebAsset(itemSource));
                }

                destination.Add(group.Name, group);
            }
        }
    }
}