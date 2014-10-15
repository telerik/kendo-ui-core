using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// The fluent API for configuring the grid Excel export.
    /// </summary>
    public class GridPdfBuilder
    {
        private readonly GridPdfSettings excel;

        public GridPdfBuilder(GridPdfSettings excel)
        {
            this.excel = excel;
        }

        /// <summary>
        /// Sets the file name of the PDF file.
        /// </summary>
        public GridPdfBuilder FileName(string fileName)
        {
            excel.FileName = fileName;

            return this;
        }

        /// <summary>
        /// Specifies a predefiend paper size e.g. "A3", "A4" or "auto" (default).
        /// </summary>
        public GridPdfBuilder PaperSize(string paperSize)
        {
            excel.PaperSize = paperSize;

            return this;
        }

        /// <summary>
        /// Specifies custom paper size in "pt" units.
        /// </summary>
        public GridPdfBuilder PaperSize(double width, double height)
        {
            excel.PaperSize = new[] { width, height };
            return this;
        }

        /// <summary>
        /// Specifies custom paper size in custom units ("in", "mm", "pt", "cm")
        /// </summary>
        public GridPdfBuilder PaperSize(string width, string height)
        {
            excel.PaperSize = new[] { width, height };
            return this;
        }

        /// <summary>
        /// Set the url of the server side proxy. The proxy is responsible for returning the excel PDF to the end user. Used in browsers that don't support saving files from JavaScript.
        /// </summary>
        /// <param name="url"></param>
        public GridPdfBuilder ProxyUrl(string url)
        {
            excel.ProxyUrl = url;

            return this;
        }

        /// <summary>
        /// Specifies the margins in "pt" units.
        /// </summary>
        public GridPdfBuilder Margin(double top, double right, double bottom, double left)
        {
            excel.Margin = new Dictionary<string, object>
            {
               { "top", top },
               { "right", right },
               { "bottom", bottom },
               { "left", left }
            };

            return this;
        }

        /// <summary>
        /// Specifies the margins in units ("in", "mm", "pt", "cm")
        /// </summary>
        public GridPdfBuilder Margin(string top, string right, string bottom, string left)
        {
            excel.Margin = new Dictionary<string, object>
            {
               { "top", top },
               { "right", right },
               { "bottom", bottom },
               { "left", left }
            };

            return this;
        }

        /// <summary>
        /// Sets the title of the PDF document.
        /// </summary>
        public GridPdfBuilder Title(string title)
        {
            excel.Title = title;

            return this;
        }

        /// <summary>
        /// Sets the author of the PDF document.
        /// </summary>
        public GridPdfBuilder Author(string author)
        {
            excel.Author = author;

            return this;
        }

        /// <summary>
        /// Sets the subject of the PDF document.
        /// </summary>
        public GridPdfBuilder Subject(string subject)
        {
            excel.Subject = subject;

            return this;
        }

        /// <summary>
        /// Sets the keywords of the PDF document.
        /// </summary>
        public GridPdfBuilder Keywords(string keywords)
        {
            excel.Keywords = keywords;

            return this;
        }

        /// <summary>
        /// Sets the creator of the PDF document.
        /// </summary>
        public GridPdfBuilder Creator(string creator)
        {
            excel.Creator = creator;

            return this;
        }

        /// <summary>
        /// Sets the date of the PDF document.
        /// </summary>
        public GridPdfBuilder Date(DateTime date)
        {
            excel.Date = date;

            return this;
        }
    }
}
