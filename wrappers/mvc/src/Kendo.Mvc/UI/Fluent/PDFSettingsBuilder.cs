using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// The fluent API for configuring the grid PDF export.
    /// </summary>
    public class PDFSettingsBuilder
    {
        private readonly PDFSettings pdf;

        public PDFSettingsBuilder(PDFSettings pdf)
        {
            this.pdf = pdf;
        }

        /// <summary>
        /// Sets the file name of the PDF file.
        /// </summary>
        public PDFSettingsBuilder FileName(string fileName)
        {
            pdf.FileName = fileName;

            return this;
        }

        /// <summary>
        /// Specifies a predefiend paper size e.g. "A3", "A4" or "auto" (default).
        /// </summary>
        public PDFSettingsBuilder PaperSize(string paperSize)
        {
            pdf.PaperSize = paperSize;

            return this;
        }

        /// <summary>
        /// Specifies custom paper size in "pt" units.
        /// </summary>
        public PDFSettingsBuilder PaperSize(double width, double height)
        {
            pdf.PaperSize = new[] { width, height };
            return this;
        }

        /// <summary>
        /// Specifies custom paper size in custom units ("in", "mm", "pt", "cm")
        /// </summary>
        public PDFSettingsBuilder PaperSize(string width, string height)
        {
            pdf.PaperSize = new[] { width, height };
            return this;
        }

        /// <summary>
        /// Set the url of the server side proxy. The proxy is responsible for returning the PDF to the end user. Used in browsers that don't support saving files from JavaScript.
        /// </summary>
        /// <param name="url"></param>
        public PDFSettingsBuilder ProxyUrl(string url)
        {
            pdf.ProxyUrl = url;

            return this;
        }

        /// <summary>
        /// Specifies the margins in "pt" units.
        /// </summary>
        public PDFSettingsBuilder Margin(double top, double right, double bottom, double left)
        {
            pdf.Margin = new Dictionary<string, object>
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
        public PDFSettingsBuilder Margin(string top, string right, string bottom, string left)
        {
            pdf.Margin = new Dictionary<string, object>
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
        public PDFSettingsBuilder Title(string title)
        {
            pdf.Title = title;

            return this;
        }

        /// <summary>
        /// Sets the author of the PDF document.
        /// </summary>
        public PDFSettingsBuilder Author(string author)
        {
            pdf.Author = author;

            return this;
        }

        /// <summary>
        /// Sets the subject of the PDF document.
        /// </summary>
        public PDFSettingsBuilder Subject(string subject)
        {
            pdf.Subject = subject;

            return this;
        }

        /// <summary>
        /// Sets the keywords of the PDF document.
        /// </summary>
        public PDFSettingsBuilder Keywords(string keywords)
        {
            pdf.Keywords = keywords;

            return this;
        }

        /// <summary>
        /// Sets the creator of the PDF document.
        /// </summary>
        public PDFSettingsBuilder Creator(string creator)
        {
            pdf.Creator = creator;

            return this;
        }

        /// <summary>
        /// Sets the date of the PDF document.
        /// </summary>
        public PDFSettingsBuilder Date(DateTime date)
        {
            pdf.Date = date;

            return this;
        }
    }
}
