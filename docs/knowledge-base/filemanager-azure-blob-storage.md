---
title: Integrate Azure Blob Storage with FileManager
description: Learn how to configure the Kendo UI FileManager for jQuery to work with Azure Blob Storage in an ASP.NET Core project.
type: how-to
page_title: Use Azure Blob Storage with FileManager - Kendo UI for jQuery FileManager
slug: filemanager-azure-blob-storage
tags: filemanager, azure, blob storage, asp.net core, cloud storage
res_type: kb
components: ["filemanager"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® FileManager for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2025.4.1111</td>
 </tr>
 <tr>
  <td>Framework</td>
  <td>Kendo UI for jQuery</td>
 </tr>
</table>

## Description

How can I configure the Kendo UI for jQuery FileManager to work with Azure Blob Storage in an ASP.NET Core project so users can browse, upload, download, and manage blobs as if they were files on disk?

## Solution

To integrate Azure Blob Storage with the FileManager, you need to create a custom backend service that bridges the FileManager's data operations with Azure Storage SDK. The service wraps Azure Storage SDK types and exposes async operations to keep the FileManager UI responsive while mirroring every change to Azure Blob Storage.

### Prerequisites

1. An [Azure Storage account](https://learn.microsoft.com/azure/storage/common/storage-account-create?tabs=azure-portal) with a blob container
2. The connection string for your Azure Storage account
3. An ASP.NET Core project with Kendo UI for jQuery

### Implementation Overview

The solution involves:

1. **Backend Service**: A `BlobFileManagerService` that implements the FileManager operations (Read, Create, Update, Delete, Upload, Download) using the Azure Storage SDK.
2. **Controller**: An ASP.NET Core controller that exposes endpoints for FileManager operations.
3. **Client Configuration**: Configuring the FileManager widget to communicate with the custom backend.

### Key Components

#### BlobServiceClient Registration

Register the `BlobServiceClient` in your `Program.cs` or `Startup.cs`:

```csharp
builder.Services.AddSingleton(x => 
{
    var connectionString = builder.Configuration.GetConnectionString("AzureStorage");
    return new BlobServiceClient(connectionString);
});
```

#### FileManager Service

The service uses `BlobContainerClient` to perform operations:

- `ReadAsync()` - Lists blobs and containers
- `CreateAsync()` - Creates new containers or uploads blobs
- `UpdateAsync()` - Renames or moves blobs
- `DeleteAsync()` - Removes blobs or containers
- `UploadAsync()` - Handles file uploads
- `DownloadAsync()` - Retrieves blob content

#### Controller Endpoints

Create a controller to handle FileManager requests:

```csharp
[ApiController]
[Route("api/[controller]")]
public class FileManagerController : ControllerBase
{
    private readonly BlobFileManagerService _fileManagerService;

    public FileManagerController(BlobFileManagerService fileManagerService)
    {
        _fileManagerService = fileManagerService;
    }

    [HttpPost("Read")]
    public async Task<IActionResult> Read([FromBody] FileManagerRequest request)
    {
        var result = await _fileManagerService.ReadAsync(request);
        return Ok(result);
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] FileManagerRequest request)
    {
        var result = await _fileManagerService.CreateAsync(request);
        return Ok(result);
    }

    // Additional endpoints for Update, Delete, Upload, Download...
}
```

#### Client-Side Configuration

Configure the FileManager to use the custom backend:

```javascript
$("#filemanager").kendoFileManager({
    dataSource: {
        transport: {
            read: {
                url: "/api/FileManager/Read",
                type: "POST",
                dataType: "json",
                contentType: "application/json"
            },
            create: {
                url: "/api/FileManager/Create",
                type: "POST",
                dataType: "json",
                contentType: "application/json"
            },
            update: {
                url: "/api/FileManager/Update",
                type: "POST",
                dataType: "json",
                contentType: "application/json"
            },
            destroy: {
                url: "/api/FileManager/Delete",
                type: "POST",
                dataType: "json",
                contentType: "application/json"
            }
        },
        schema: {
            model: {
                id: "path",
                fields: {
                    name: { type: "string" },
                    size: { type: "number" },
                    path: { type: "string" },
                    extension: { type: "string" },
                    isDirectory: { type: "boolean" },
                    hasDirectories: { type: "boolean" },
                    created: { type: "date" },
                    modified: { type: "date" }
                }
            }
        }
    },
    uploadUrl: "/api/FileManager/Upload",
    downloadUrl: "/api/FileManager/Download"
});
```

### Configuration

Add your Azure Storage connection string to `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "AzureStorage": "DefaultEndpointsProtocol=https;AccountName=<your-account>;AccountKey=<your-key>;EndpointSuffix=core.windows.net"
  }
}
```

For local development, you can use [Azurite](https://learn.microsoft.com/azure/storage/common/storage-use-azurite) with the development storage connection string:

```json
{
  "ConnectionStrings": {
    "AzureStorage": "UseDevelopmentStorage=true"
  }
}
```

### Complete Implementation

For a complete working implementation of the FileManager with Azure Blob Storage integration, refer to the sample project in the [ui-for-aspnet-core-examples](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/KendoUI.FileManager.BlobStorage) repository.

The sample includes:

- Complete `BlobFileManagerService` implementation with all CRUD operations
- ASP.NET Core controller with all required endpoints
- Client-side FileManager configuration
- Support for nested folders and file operations

### Notes

- The Azure file system provider used in this implementation is based on the [Azure ASP.NET Core File Provider](https://github.com/SyncfusionExamples/azure-aspcore-file-provider) example.
- All operations are performed asynchronously to keep the FileManager UI responsive.
- The service maps Azure Blob Storage concepts (containers and blobs) to the FileManager's file system model (folders and files).
- Ensure your Azure Storage account has the appropriate access permissions configured.

## See Also

* [FileManager Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/filemanager/overview)
* [FileManager Data Binding](https://www.telerik.com/kendo-jquery-ui/documentation/controls/filemanager/binding/overview)
* [JavaScript API Reference of the FileManager](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/filemanager)
* [Azure Blob Storage Documentation](https://learn.microsoft.com/azure/storage/blobs/)
* [Create an Azure Storage Account](https://learn.microsoft.com/azure/storage/common/storage-account-create?tabs=azure-portal)
