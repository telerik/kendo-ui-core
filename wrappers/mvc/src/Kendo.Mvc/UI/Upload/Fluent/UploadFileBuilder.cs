namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    /// <summary>
    /// A builder class for <see cref"UploadFile"/>
    /// </summary>
    public class UploadFileBuilder : IHideObjectMembers
    {
        private readonly UploadFile file;

        public UploadFileBuilder(UploadFile uploadFile)
        {
            file = uploadFile;
        }

        /// <summary>
        /// Specifies the name of the file
        /// </summary>
        /// <param name="name">The file name</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Upload()
        ///     .Name(&quot;files&quot;)
        ///     .Files(files =&gt; files.Add().Name(&quot;file.txt&quot;).Size(500).Extension(&quot;.txt&quot;))
        ///     .Async(a =&gt; a
        ///         .Save(&quot;Save&quot;, &quot;Compose&quot;)
        ///         .Remove(&quot;Remove&quot;, &quot;Compose&quot;)
        ///         .AutoUpload(true)
        ///     )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadFileBuilder Name(string name) 
        {
            file.Name = name;

            return this;
        }

        /// <summary>
        /// Specifies the size of the file in bytes
        /// </summary>
        /// <param name="size">The file size</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Upload()
        ///     .Name(&quot;files&quot;)
        ///     .Files(files =&gt; files.Add().Name(&quot;file.txt&quot;).Size(500).Extension(&quot;.txt&quot;))
        ///     .Async(a =&gt; a
        ///         .Save(&quot;Save&quot;, &quot;Compose&quot;)
        ///         .Remove(&quot;Remove&quot;, &quot;Compose&quot;)
        ///         .AutoUpload(true)
        ///     )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadFileBuilder Size(long size)
        {
            file.Size = size;

            return this;
        }

        /// <summary>
        /// Specifies the extension of the file
        /// </summary>
        /// <param name="extension">The file extension</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Upload()
        ///     .Name(&quot;files&quot;)
        ///     .Files(files =&gt; files.Add().Name(&quot;file.txt&quot;).Size(500).Extension(&quot;.txt&quot;))
        ///     .Async(a =&gt; a
        ///         .Save(&quot;Save&quot;, &quot;Compose&quot;)
        ///         .Remove(&quot;Remove&quot;, &quot;Compose&quot;)
        ///         .AutoUpload(true)
        ///     )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadFileBuilder Extension(string extension)
        {
            file.Extension = extension;

            return this;
        }
    }
}
