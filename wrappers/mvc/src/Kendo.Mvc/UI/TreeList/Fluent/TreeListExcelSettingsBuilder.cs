namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListExcelSettings settings.
    /// </summary>
    public class TreeListExcelSettingsBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListExcelSettings container;

        public TreeListExcelSettingsBuilder(TreeListExcelSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the file name of the exported Excel file.
        /// </summary>
        /// <param name="value">The value that configures the filename.</param>
        public TreeListExcelSettingsBuilder<T> FileName(string value)
        {
            container.FileName = value;

            return this;
        }
        
        /// <summary>
        /// Enables or disables column filtering in the Excel file. Not to be mistaken with the treelist filtering feature.
        /// </summary>
        /// <param name="value">The value that configures the filterable.</param>
        public TreeListExcelSettingsBuilder<T> Filterable(bool value)
        {
            container.Filterable = value;

            return this;
        }
        
        /// <summary>
        /// If set to true, the content will be forwarded to proxyURL even if the browser supports saving files locally.
        /// </summary>
        /// <param name="value">The value that configures the forceproxy.</param>
        public TreeListExcelSettingsBuilder<T> ForceProxy(bool value)
        {
            container.ForceProxy = value;

            return this;
        }
        
        /// <summary>
        /// The URL of the server side proxy which will stream the file to the end user.A proxy will be used when the browser isn't capable of saving files locally.
		/// Such browsers are IE version 9 and lower and Safari.The developer is responsible for implementing the server-side proxy.The proxy will receive a POST request with the following parameters in the request body:The proxy should return the decoded file with set "Content-Disposition" header.
        /// </summary>
        /// <param name="value">The value that configures the proxyurl.</param>
        public TreeListExcelSettingsBuilder<T> ProxyURL(string value)
        {
            container.ProxyURL = value;

            return this;
        }
        
        //<< Fields
    }
}

