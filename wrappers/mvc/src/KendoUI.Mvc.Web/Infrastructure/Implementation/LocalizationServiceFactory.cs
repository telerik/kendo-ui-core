// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Globalization;
    
    internal class LocalizationServiceFactory : ILocalizationServiceFactory
    {
        public ILocalizationService Create(string resourceName, CultureInfo culture)
        {
            return new LocalizationService(resourceName, culture);
        }
    }
}
