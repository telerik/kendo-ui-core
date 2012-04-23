// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System;

    using Extensions;
    
    public abstract class ViewComponentLocalization
    {
        private readonly string resourceLocation;
        private readonly string resourceName;
        private readonly CultureInfo culture;
        
        private readonly ILocalizationService localizationService;

        protected ViewComponentLocalization(ILocalizationService localizationService, string resourceLocation, string resourceName, CultureInfo culture)
        {
            this.localizationService = localizationService;
            this.resourceLocation = string.IsNullOrEmpty(resourceLocation) ? "~/App_GlobalResources" : resourceLocation;
            this.resourceName = resourceName;
            this.culture = culture ?? CultureInfo.CurrentUICulture;
        }

        protected virtual string GetValue(string key)
        {
            try
            {
                return localizationService.One(key);
            }
            catch (KeyNotFoundException)
            {
                throw new ArgumentException(Resources.TextResource.LocalizationKeyNotFound.FormatWith(key));
            }
        }

        public IDictionary<string, string> ToJson()
        {
            return localizationService.All().ToDictionary(k => k.Key[0].ToString(CultureInfo.CurrentCulture).ToLowerInvariant() + k.Key.Substring(1), k => k.Value);
        }

        public bool IsDefault
        {
            get
            {
                return localizationService.IsDefault;
            }
        }
    }
}