// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.Extensions
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.UI;
    using KendoUI.Mvc.Infrastructure;

    public static class HtmlTextWriterExtensions
    {
        public static void AddAttributes(this HtmlTextWriter writer, IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(writer, "writer");

            if (attributes.Any())
            {
                foreach (KeyValuePair<string, object> attribute in attributes)
                {
                    writer.AddAttribute(attribute.Key, attribute.Value.ToString(), true);
                }
            }
        }
    }
}