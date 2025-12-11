---
title: Remote Binding
page_title: Remote Binding
description: "Learn how to implement Remote Binding with Telerik UI FileManager component for {{ site.framework }}."
components: ["filemanager"]
slug: htmlhelpers_filemanager_aspnetcore_remotebinding
position: 2
---

# Remote Binding

The {{ site.product }} FileManager allows you to enable server-side operations. You can achieve this by using a DataSource mediator, which will act as a bridge between the client-side and established server-side remote service operations.

To successfully bind the FileManager to remote data, you must:

* [Create helper methods](#common-helper-methods) that guarantee the correct processing of the data.
* [Configure the `DataSource` option](#crud-operations) and set the endpoints for the `Read`, `Create`, `Update`, and `Destroy` operations.
* [Enable the `Upload` operation](#upload-operations).

To ensure the successful adaptation of the CRUD operations, the `FileManagerEntry` structure must play a key role when formatting the requests. The `FileManagerEntry` is an abstraction that encapsulates all of meta-information a file can have. 

This ensures that the response for each of the CRUD methods are composed as follows:

```JSON
    [
        { "Name":"...",
          "Size": 0,
          "Path":"...",
          "Extension":".txt",
          "IsDirectory" true/false,
          "HasDirectories": true/false,
          "Created":"...",
          "CreatedUtc":"...",
          "Modified":"...",
          "ModifiedUtc":"..."
        }
    ]
```

The FileManager is familiar with the `FileManagerEntry` format and uses it to render the established file hierarchy you want to visualize.

To review the `FileManagerEntry` structure of the folder and files, review the [`Create a FileContentBrowser Helper Class`](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/filemanager/getting-started#3-create-a-filecontentbrowser-helper-class).

## Common Helper Methods
To ensure that the Files are processed correctly not only within the boundaries of the FileManager but also the existing physical file system layer, consider adding the helper methods described below.

The combination of these methods allows you to abstract an additional logical layer for retrieving files and directories by using a [`FileContentBrowser`](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/filemanager/getting-started#3-create-a-filecontentbrowser-helper-class) Helper class.

* `CreateUserFolder()`&mdash;Has the main responsibility for re-creating folders by using the [`System.IO.DirectoryInfo.CreateDirectory()`](https://learn.microsoft.com/en-us/dotnet/api/system.io.directory.createdirectory?view=net-8.0) method.

    ```C#
        private string CreateUserFolder()
        {
            var virtualPath = Path.Combine(contentFolderRoot, "UserFiles", prettyName);

            var path = Server.MapPath(virtualPath);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
                foreach (var sourceFolder in foldersToCopy)
                {
                    CopyFolder(Server.MapPath(sourceFolder), path);
                }
            }
            return virtualPath;
        }

    ```
* `CreateNewFolder()`&mdash; Has the main responsibility of creating a purely new folder by creating a new `FileEntry`.
    ```C#
        protected virtual FileManagerEntry CreateNewFolder(string target, FileManagerEntry entry)
        {
            FileManagerEntry newEntry;
            var path = NormalizePath(target);
            string physicalPath = EnsureUniqueName(path, entry);

            Directory.CreateDirectory(physicalPath);

            newEntry = directoryBrowser.GetDirectory(physicalPath);

            return newEntry;
        }
    ```
* `CopyFolder()`&mdash;Has the main responsibility of copying folders and files onto a given destination by using the [`System.IO.File.Copy()`](https://learn.microsoft.com/en-us/dotnet/api/system.io.file.copy?view=net-8.0) method.
    ```C#
        private void CopyFolder(string source, string destination)
        {
            if (!Directory.Exists(destination))
            {
                Directory.CreateDirectory(destination);
            }

            foreach (var file in Directory.EnumerateFiles(source))
            {
                var dest = Path.Combine(destination, Path.GetFileName(file));
                System.IO.File.Copy(file, dest);
            }

            foreach (var folder in Directory.EnumerateDirectories(source))
            {
                var dest = Path.Combine(destination, Path.GetFileName(folder));
                CopyFolder(folder, dest);
            }
        }
    ```

* `CopyDirectory()`&mdash;Copies an existing directory to a given target destination by using [`DirectoryInfo`](https://learn.microsoft.com/en-us/dotnet/api/system.io.directoryinfo?view=net-8.0) arguments.
    ```C#
        protected virtual void CopyDirectory(DirectoryInfo source, DirectoryInfo target)
        {
            foreach (FileInfo fi in source.GetFiles())
            {
                Console.WriteLine(@"Copying {0}\{1}", target.FullName, fi.Name);
                fi.CopyTo(Path.Combine(target.FullName, fi.Name), true);
            }

            // Copy each subdirectory using recursion.
            foreach (DirectoryInfo diSourceSubDir in source.GetDirectories())
            {
                DirectoryInfo nextTargetSubDir =
                    target.CreateSubdirectory(diSourceSubDir.Name);
                CopyDirectory(diSourceSubDir, nextTargetSubDir);
            }
        }
    ```

* `Authorize()`&mdash;Determines if the content of a given path can be browsed.

    ```C#
        public bool Authorize(string path)
        {
            return CanAccess(path);
        }
    ```
* `CanAccess()`&mdash;Determines if the file path can be accessed.

    ```C#
        public bool CanAccess(string path)
        {
            return path.StartsWith(ToAbsolute(ContentPath), StringComparison.OrdinalIgnoreCase);
        }
    ```
* `ToAbsolute()`&mdash;Converts a virtual path to an application absolute path.

    ```C#
        private string ToAbsolute(string virtualPath)
        {
            return VirtualPathUtility.ToAbsolute(virtualPath);
        }
    ```
* `CombinePaths()`&mdash;Combines a base and relative file paths.

    ```C#
        private string CombinePaths(string basePath, string relativePath)
        {
            return VirtualPathUtility.Combine(VirtualPathUtility.AppendTrailingSlash(basePath), relativePath);
        }
    ```
* `NormalizePath()`&mdash;Uses a combination of the `ToAbsolute` and `CombinePaths` methods.

    ```C#
        public string NormalizePath(string path)
        {
            if (string.IsNullOrEmpty(path))
            {
                return ToAbsolute(ContentPath);
            }

            return CombinePaths(ToAbsolute(ContentPath), path);
        }
    ```
* `VirtualizePath()`&mdash;Transposes an absolute to relative file path.

    ```C#
        protected virtual FileManagerEntry VirtualizePath(FileManagerEntry entry)
        {
            entry.Path = entry.Path.Replace(Path.Combine(this.HostingEnvironment.WebRootPath, ContentPath), "").Replace(@"\", "/").TrimStart('/');
            return entry;
        }
    ```
* `CopyEntry()`&mdash;Copies an existing `FileEntry` to a given target destination.

    ```C#
        protected virtual FileManagerEntry CopyEntry(string target, FileManagerEntry entry)
        {
            var path = NormalizePath(entry.Path);
            var physicalPath = path;
            var physicalTarget = EnsureUniqueName(NormalizePath(target), entry);

            FileManagerEntry newEntry;

            if (entry.IsDirectory)
            {
                CopyDirectory(new DirectoryInfo(physicalPath), Directory.CreateDirectory(physicalTarget));
                newEntry = directoryBrowser.GetDirectory(physicalTarget);
            }
            else
            {
                System.IO.File.Copy(physicalPath, physicalTarget);
                newEntry = directoryBrowser.GetFile(physicalTarget);
            }

            return newEntry;
        }
    ```

* `EnsureUniqueName()`&mdash;Ensures that the file target directory is unique.

    ```C#
        protected virtual string EnsureUniqueName(string target, FileManagerEntry entry)
        {
            var tempName = entry.Name + entry.Extension;
            int sequence = 0;
            var physicalTarget = Path.Combine(NormalizePath(target), tempName);

            if (!Authorize(NormalizePath(physicalTarget)))
            {
                throw new Exception("Forbidden");
            }

            if (entry.IsDirectory)
            {
                while (Directory.Exists(physicalTarget))
                {
                    tempName = entry.Name + String.Format("({0})", ++sequence);
                    physicalTarget = Path.Combine(NormalizePath(target), tempName);
                }
            }
            else
            {
                while (System.IO.File.Exists(physicalTarget))
                {
                    tempName = entry.Name + String.Format("({0})", ++sequence) + entry.Extension;
                    physicalTarget = Path.Combine(NormalizePath(target), tempName);
                }
            }

            return physicalTarget;
        }
    ```

## CRUD Operations

The {{ site.product }} FileManager gives you full control over the state of the files through delegated CRUD operation method.

The following methods must be incorporated in order to achieve this functionality.

* Read

{% if site.core %}
    ```C#
        /// <summary>
        /// Reads all the file entries from a given target path.
        /// </summary>
        /// <param name="target">The target in which file entry resides.</param>
         public virtual JsonResult Read(string target)
        {
            var path = NormalizePath(target);

            if (Authorize(path))
            {
                try
                {
                    var files = directoryBrowser.GetFiles(path, Filter);
                    var directories = directoryBrowser.GetDirectories(path);
                    var result = files.Concat(directories).Select(VirtualizePath);

                    return Json(result.ToArray());
                }
                catch (DirectoryNotFoundException)
                {
                    throw new Exception("File Not Found");
                }
            }

            throw new Exception("Forbidden");
        }

    ```
{% else %}
    ```C#
        /// <summary>
        /// Reads all the file entries from a given target path.
        /// </summary>
        /// <param name="target">The target in which file entry resides.</param>
         public virtual JsonResult Read(string target)
        {
            var path = NormalizePath(target);

            if (Authorize(path))
            {
                try
                {
                    var files = directoryBrowser.GetFiles(path, Filter);
                    var directories = directoryBrowser.GetDirectories(path);
                    var result = files.Concat(directories).Select(VirtualizePath);

                    return Json(result.ToArray(), JsonRequestBehavior.AllowGet);
                }
                catch (DirectoryNotFoundException)
                {
                    throw new Exception("File Not Found");
                }
            }

            throw new Exception("Forbidden");
        }

    ```
{% endif %}
* Create
  ```C#
      /// <summary>
      /// Creates an entry to a given target path.
      /// </summary>
      /// <param name="target">The target in which the file entry should be created.</param>
      /// <param name="entry">The File Entry.</param>
      public virtual ActionResult Create(string target, FileManagerEntry entry)
      {
          FileManagerEntry newEntry;
          if (!Authorize(NormalizePath(target)))
          {
              throw new Exception("Forbidden");
          }
          if (String.IsNullOrEmpty(entry.Path))
          {
              newEntry = CreateNewFolder(target, entry);
          }
          else
          {
              newEntry = CopyEntry(target, entry);
          }
          return Json(VirtualizePath(newEntry));
      }
  ```

* Update
  ```C#
      /// <summary>
      /// Updates an entry with a given entry.
      /// </summary>
      /// <param name="path">The path to the parent folder in which the folder should be created.</param>
      /// <param name="entry">The entry.</param>
      /// <returns>An empty <see cref="ContentResult"/>.</returns>
      /// <exception cref="HttpException">Forbidden</exception>
      public virtual ActionResult Update(string target, FileManagerEntry entry)
      {
          FileManagerEntry newEntry;

          if (!Authorize(NormalizePath(entry.Path)) && !Authorize(NormalizePath(target)))
          {
              throw new Exception("Forbidden");
          }

          newEntry = RenameEntry(entry);

          return Json(VirtualizePath(newEntry));
      }

      /// <summary>
      /// Renames an existing FileEntry.
      /// </summary>
      /// <param name="entry">The FileEntry which should be renamed.</param>
      protected virtual FileManagerEntry RenameEntry(FileManagerEntry entry)
      {
          var path = NormalizePath(entry.Path);
          var physicalPath = path;
          var physicalTarget = EnsureUniqueName(Path.GetDirectoryName(path), entry);
          FileManagerEntry newEntry;

          if (entry.IsDirectory)
          {
              Directory.Move(physicalPath, physicalTarget);
              newEntry = directoryBrowser.GetDirectory(physicalTarget);
          }
          else
          {
              var file = new FileInfo(physicalPath);
              System.IO.File.Move(file.FullName, physicalTarget);
              newEntry = directoryBrowser.GetFile(physicalTarget);
          }

          return newEntry;
      }
  ```

* Delete
    ```C#
        /// <summary>
        /// Deletes an existing FileEntry.
        /// </summary>
        /// <param name="entry">The FileEntry which should be removed.</param>
        public virtual ActionResult Destroy(FileManagerEntry entry)
        {
            var path = NormalizePath(entry.Path);



            if (!string.IsNullOrEmpty(path))
            {
                if (entry.IsDirectory)
                {
                    DeleteDirectory(path);
                }
                else
                {
                    DeleteFile(path);
                }

                return Json(new object[0]);
            }
            throw new Exception("File Not Found");
        }

        /// <summary>
        /// Deletes a file from a physical location.
        /// </summary>
        /// <param name="string">The path in which the file resides.</param>
        protected virtual void DeleteFile(string path)
        {
            if (!Authorize(path))
            {
                throw new Exception("Forbidden");
            }

            var physicalPath = NormalizePath(path);

            if (System.IO.File.Exists(physicalPath))
            {
                System.IO.File.Delete(physicalPath);
            }
        }

        /// <summary>
        /// Deletes a directory from a physical location.
        /// </summary>
        /// <param name="string">The path in which the directory resides.</param>
        protected virtual void DeleteDirectory(string path)
        {
            if (!Authorize(path))
            {
                throw new Exception("Forbidden");
            }

            var physicalPath = NormalizePath(path);

            if (Directory.Exists(physicalPath))
            {
                Directory.Delete(physicalPath, true);
            }
        }
    ```

## Upload Operations

Often, an existing file architecture would inevitably grow in large scales. In the context of the {{ site.product }} FileManager, this can be achieved by enabling the `Upload` operation.

The following examples illustrates how this functionality can be enabled.

```HtmlHelper
    @(Html.Kendo().FileManager().Name("filemanager")
        .DataSource(ds =>
            {
                ds.Read(operation => operation
                .Type(HttpVerbs.Post)
                .Action("Read", "FileManagerData")
            );
            ds.Destroy(operation => operation
                .Type(HttpVerbs.Post)
                .Action("Destroy", "FileManagerData")
            );
            ds.Create(operation => operation
                .Type(HttpVerbs.Post)
                .Action("Create", "FileManagerData")
            );
            ds.Update(operation => operation
                .Type(HttpVerbs.Post)
                .Action("Update", "FileManagerData")
            );
        })
        .UploadUrl("Upload", "FileManagerData")
    )

```

{% if site.core %}
```TagHelper
    <kendo-filemanager name="filemanager" upload-url="@Url.Action("Upload", "FileManagerData")">
    	<filemanager-datasource  >
    	 	<transport>
    	 	 	<read url="@Url.Action("Read", "FileManagerData")" type="POST" />
    	 	 	<update url="@Url.Action("Update", "FileManagerData")" type="POST"/>
    	 	 	<create url="@Url.Action("Create", "FileManagerData")" type="POST" />
    	 	 	<destroy url="@Url.Action("Destroy", "FileManagerData")" type="POST"/>
    	 	</transport>
    	</filemanager-datasource>
    </kendo-filemanager>
```
{% endif %}

```Controller
        /// <summary>
        /// Determines if a file can be uploaded to a given path.
        /// </summary>
        /// <param name="path">The path to which the file should be uploaded.</param>
        /// <param name="file">The file which should be uploaded.</param>
        /// <returns>true if the upload is allowed, otherwise false.</returns>
        public virtual bool AuthorizeUpload(string path, IFormFile file)
        {
            if (!CanAccess(path))
            {
                throw new DirectoryNotFoundException(String.Format("The specified path cannot be found - {0}", path));
            }

            if (!IsValidFile(GetFileName(file)))
            {
                throw new InvalidDataException(String.Format("The type of file is not allowed. Only {0} extensions are allowed.", Filter));
            }

            return true;
        }

        /// <summary>
        /// Uploads a file to a given path.
        /// </summary>
        /// <param name="path">The path to which the file should be uploaded.</param>
        /// <param name="file">The file which should be uploaded.</param>
        /// <returns>A <see cref="JsonResult"/> containing the uploaded file's size and name.</returns>
        /// <exception cref="HttpException">Forbidden</exception>
        [AcceptVerbs("POST")]
        public virtual ActionResult Upload(string path, IFormFile file)
        {
            FileManagerEntry newEntry;
            path = NormalizePath(path);
            var fileName = Path.GetFileName(file.FileName);

            if (AuthorizeUpload(path, file))
            {
                SaveFile(file, path);
                newEntry = directoryBrowser.GetFile(Path.Combine(path, fileName));

                return Json(VirtualizePath(newEntry));
            }

            throw new Exception("Forbidden");
        
        }

        /// <summary>
        /// Saves a file to a given path.
        /// </summary>
        /// <param name="file">The file which should be saved.</param>
        /// <param name="pathToSave">The path to which the file should be saved.</param>
        protected virtual void SaveFile(IFormFile file, string pathToSave)
        {
            try
            {
                var path = Path.Combine(pathToSave, GetFileName(file));
                using (var stream = System.IO.File.Create(path))
                {
                    file.CopyTo(stream);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
```