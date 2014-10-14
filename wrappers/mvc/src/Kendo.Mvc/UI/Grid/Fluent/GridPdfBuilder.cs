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
        /// Specifies the paper size
        /// </summary>
        public GridPdfBuilder PaperSize(string paperSize)
        {
            excel.PaperSize = paperSize;

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
    }
}
