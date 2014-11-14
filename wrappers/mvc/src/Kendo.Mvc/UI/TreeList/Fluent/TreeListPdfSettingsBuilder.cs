namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListPdfSettings settings.
    /// </summary>
    public class TreeListPdfSettingsBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListPdfSettings container;

        public TreeListPdfSettingsBuilder(TreeListPdfSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The author of the PDF document.
        /// </summary>
        /// <param name="value">The value that configures the author.</param>
        public TreeListPdfSettingsBuilder<T> Author(string value)
        {
            container.Author = value;

            return this;
        }
        
        /// <summary>
        /// The creator of the PDF document.
        /// </summary>
        /// <param name="value">The value that configures the creator.</param>
        public TreeListPdfSettingsBuilder<T> Creator(string value)
        {
            container.Creator = value;

            return this;
        }
        
        /// <summary>
        /// The date when the PDF document is created. Defaults to new Date().
        /// </summary>
        /// <param name="value">The value that configures the date.</param>
        public TreeListPdfSettingsBuilder<T> Date(DateTime value)
        {
            container.Date = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the file name of the exported PDF file.
        /// </summary>
        /// <param name="value">The value that configures the filename.</param>
        public TreeListPdfSettingsBuilder<T> FileName(string value)
        {
            container.FileName = value;

            return this;
        }
        
        /// <summary>
        /// If set to true, the content will be forwarded to proxyURL even if the browser supports saving files locally.
        /// </summary>
        /// <param name="value">The value that configures the forceproxy.</param>
        public TreeListPdfSettingsBuilder<T> ForceProxy(bool value)
        {
            container.ForceProxy = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the keywords of the exported PDF file.
        /// </summary>
        /// <param name="value">The value that configures the keywords.</param>
        public TreeListPdfSettingsBuilder<T> Keywords(string value)
        {
            container.Keywords = value;

            return this;
        }
        
        /// <summary>
        /// Set to true to reverse the paper dimensions if needed such that width is the larger edge.
        /// </summary>
        /// <param name="value">The value that configures the landscape.</param>
        public TreeListPdfSettingsBuilder<T> Landscape(bool value)
        {
            container.Landscape = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the margins of the page (numbers or strings with units). Supported
		/// units are "mm", "cm", "in" and "pt" (default).
        /// </summary>
        /// <param name="configurator">The action that configures the margin.</param>
        public TreeListPdfSettingsBuilder<T> Margin(Action<TreeListPdfMarginSettingsBuilder<T>> configurator)
        {
            configurator(new TreeListPdfMarginSettingsBuilder<T>(container.Margin));
            return this;
        }
        
        /// <summary>
        /// Specifies the paper size of the PDF document.
		/// The default "auto" means paper size is determined by content.Supported values:
        /// </summary>
        /// <param name="value">The value that configures the papersize.</param>
        public TreeListPdfSettingsBuilder<T> PaperSize(string value)
        {
            container.PaperSize = value;

            return this;
        }
        
        /// <summary>
        /// The URL of the server side proxy which will stream the file to the end user.A proxy will be used when the browser isn't capable of saving files locally.
		/// Such browsers are IE version 9 and lower and Safari.The developer is responsible for implementing the server-side proxy.The proxy will receive a POST request with the following parameters in the request body:The proxy should return the decoded file with set "Content-Disposition" header.
        /// </summary>
        /// <param name="value">The value that configures the proxyurl.</param>
        public TreeListPdfSettingsBuilder<T> ProxyURL(string value)
        {
            container.ProxyURL = value;

            return this;
        }
        
        /// <summary>
        /// Sets the subject of the PDF file.
        /// </summary>
        /// <param name="value">The value that configures the subject.</param>
        public TreeListPdfSettingsBuilder<T> Subject(string value)
        {
            container.Subject = value;

            return this;
        }
        
        /// <summary>
        /// Sets the title of the PDF file.
        /// </summary>
        /// <param name="value">The value that configures the title.</param>
        public TreeListPdfSettingsBuilder<T> Title(string value)
        {
            container.Title = value;

            return this;
        }
        
        //<< Fields
    }
}

