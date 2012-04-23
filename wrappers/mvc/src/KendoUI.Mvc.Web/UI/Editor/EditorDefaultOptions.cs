// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;

    public static class EditorDefaultOptions
    {
        public static readonly IList<DropDownItem> FormatBlock = new List<DropDownItem> {
                new DropDownItem { Text = "Paragraph", Value = "p" },
                new DropDownItem { Text = "Quotation", Value = "blockquote" },
                new DropDownItem { Text = "Heading 1", Value = "h1" },
                new DropDownItem { Text = "Heading 2", Value = "h2" },
                new DropDownItem { Text = "Heading 3", Value = "h3" },
                new DropDownItem { Text = "Heading 4", Value = "h4" },
                new DropDownItem { Text = "Heading 5", Value = "h5" },
                new DropDownItem { Text = "Heading 6", Value = "h6" }
            };

        public static readonly IList<DropDownItem> FontName = new List<DropDownItem> {
                new DropDownItem { Text = "(inherited font)",  Value = "inherit" },
                new DropDownItem { Text = "Arial", Value = "Arial,Helvetica,sans-serif" },
                new DropDownItem { Text = "Courier New", Value = "'Courier New',Courier,monospace" },
                new DropDownItem { Text = "Georgia", Value = "Georgia,serif" },
                new DropDownItem { Text = "Impact", Value = "Impact,Charcoal,sans-serif" },
                new DropDownItem { Text = "Lucida Console", Value = "'Lucida Console',Monaco,monospace" },
                new DropDownItem { Text = "Tahoma", Value = "Tahoma,Geneva,sans-serif" },
                new DropDownItem { Text = "Times New Roman", Value = "'Times New Roman',Times,serif" },
                new DropDownItem { Text = "Trebuchet MS", Value = "'Trebuchet MS',Helvetica,sans-serif" },
                new DropDownItem { Text = "Verdana", Value = "Verdana,Geneva,sans-serif" }
            };

        public static readonly IList<DropDownItem> FontSize = new List<DropDownItem> {
                new DropDownItem { Text = "(inherited size)",  Value = "inherit" },
                new DropDownItem { Text = "1 (8pt)",  Value = "xx-small" },
                new DropDownItem { Text = "2 (10pt)", Value = "x-small" },
                new DropDownItem { Text = "3 (12pt)", Value = "small" },
                new DropDownItem { Text = "4 (14pt)", Value = "medium" },
                new DropDownItem { Text = "5 (18pt)", Value = "large" },
                new DropDownItem { Text = "6 (24pt)", Value = "x-large" },
                new DropDownItem { Text = "7 (36pt)", Value = "xx-large" }
            };

        public static IList<DropDownItem> Get(string identifier)
        {
            switch(identifier) {
                case "fontSize": return FontSize;
                case "fontName": return FontName;
                case "formatBlock": return FormatBlock;
            }

            return new List<DropDownItem>();
        }
    }
}
