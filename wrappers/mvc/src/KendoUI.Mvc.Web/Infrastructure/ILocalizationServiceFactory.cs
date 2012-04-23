// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

using System.Globalization;

namespace Telerik.Web.Mvc.Infrastructure
{
    public interface ILocalizationServiceFactory
    {
        ILocalizationService Create(string resourceName, CultureInfo culture);
    }
}
