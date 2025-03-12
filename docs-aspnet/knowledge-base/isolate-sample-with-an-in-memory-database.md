---
title: Isolate Sample with an InMemory Database Provider
description: Learn how to create a {{ site.framework }} sample application with an InMemory Database Provider .
type: how-to
page_title: Isolate Sample with an InMemory Database Provider
slug: isolate-sample-with-an-in-memory-database
tags: aspnet, core, dotnet-core, sample, project, repl, memory, database, in, entity, framework
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® UI for {{ site.framework }}</td>
 </tr>
</table>

## Description

Providing a runnable {{ site.framework }} application plays a crucial role during support communication. However, more often than not, isolating a sample by stripping out the database layer inevitably opposes difficulties depending on the application's proportions

## Solution

A potential way to isolate a runnable sample while preserving the database layer is to use a [`InMemoryDatabase Provider`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.inmemorydbcontextoptionsextensions.useinmemorydatabase?view=efcore-9.0).

Using this tool, you can configure the application by following the next steps:

1. Install the [`Microsoft.EntityFrameworkCore.InMemory`](https://www.nuget.org/packages/microsoft.entityframeworkcore.inmemory) package.

2. Create a new `InMemoryDatabase` context class.

  ```C#
    public class InMemoryDbContext: DbContext
    {
        public InMemoryDbContext(DbContextOptions<InMemoryDbContext> options)
           : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder); 
        }

        public DbSet<EmployeeViewModel> Employees { get; set; }
    }
  ```
3. Within the [minimal hosting model](https://learn.microsoft.com/en-us/aspnet/core/migration/50-to-60?view=aspnetcore-9.0&tabs=visual-studio#new-hosting-model) of the application, register the `InMemoryDatabase` context by explicitly using the `UseInMemoryDatabase()` extension method.

  ```C#
    builder.Services.AddDbContext<InMemoryDbContext>(options =>
        options.UseInMemoryDatabase("TelerikCoreDb")
    );
  ```
4. (Optional) Create a seeder, so that you can mock data onto the `InMemoryDatabase` context.

  ```C#
    public class DataSeeder
    {
        public static void SeedData(InMemoryDbContext dbContext)
        {
            if (dbContext.Employees.Any())
            {
                return;
            }

            var employees = new List<EmployeeViewModel>
            {
                ...
            };

            dbContext.Employees.AddRange(employees);
            dbContext.SaveChanges();
        }
    }
  ```
5. Seed the data within the minimal hosting model.

   ```C#
        using (var serviceScope = app.Services.CreateScope())
        {
            var inMemoryContext = serviceScope.ServiceProvider.GetRequiredService<InMemoryDbContext>(); // Gather a reference of the InMemoryDbContext.
            DataSeeder.SeedData(inMemoryContext); // Call the previously created DataSeeder.
        }
   ```
6. Inject the newly created `InMemoryDatabase` context within the desired controller.

   ```C#
        public class RemoteBindingController : Controller
        {
                private readonly InMemoryDbContext _dbContext;

                public RemoteBindingController(InMemoryDbContext dbContext)
                {
                    _dbContext = dbContext;
                }

                public IActionResult GetEmployees()
                {
                    var employees = _dbContext.Employees.ToList();
                    return Json(employees);
                }
        }
   ```

To see a fully runnable sample, refer to the following [GitHub Example](https://github.com/telerik/ui-for-aspnet-core-examples/pull/86/files#diff-2235bf32d1683d5cecc8c65ebf57ccbdf3200bd8f3501781e6e54e9fd9805d95).

## See Also

* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)