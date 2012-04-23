// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions
{
    using System;
    using Telerik.Web.Mvc.UI;

    public static class HtmlAttributesContainerExtensions
	{
		public static void AppendCssClass(this IHtmlAttributesContainer container, string @class)
		{
            container.HtmlAttributes.AppendInValue("class", " ", @class);
		}

		public static void PrependCssClass(this IHtmlAttributesContainer container, string @class)
		{
            container.HtmlAttributes.PrependInValue("class", " ", @class);
		}

        public static void ThrowIfClassIsPresent(this IHtmlAttributesContainer container, string @class, string message)
        {
            object value;
            
            if (container.HtmlAttributes.TryGetValue("class", out value))
            {
                if (value != null)
                {
                    var classes = value.ToString().Split(" ".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

                    if (Array.IndexOf(classes, @class) > -1)
                    {
                        throw new NotSupportedException(message.FormatWith(@class));
                    }
                }
            }
        }
	}
}
