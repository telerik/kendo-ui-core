namespace Kendo.Mvc.Examples.Models.TreeList
{
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using System;
    using System.Data;
    using System.Collections.Generic;    

    public static class EmployeeDirectoryIEnumerableExtensions
    {        
        public static EmployeeDirectoryModel ToEmployeeDirectoryModel(this EmployeeDirectory employee)
        {
            return new EmployeeDirectoryModel
            {
                EmployeeId = employee.EmployeeID,
                ReportsTo = employee.ReportsTo,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Address = employee.Address,
                City = employee.City,
                Country = employee.Country,
                BirthDate = employee.BirthDate,
                HireDate = employee.HireDate,
                Phone = employee.Phone,
                Position = employee.Position,
                Extension = employee.Extension,
                hasChildren = employee.EmployeeDirectory1.Any()
            };
        }

        public static EmployeeDirectoryModel ToEmployeeDirectoryModel(this EmployeeDirectory employee, DataSourceRequest request)
        {
            var filters = request.Filters;
            if (!filters.Any()) {
                return employee.ToEmployeeDirectoryModel();
            }

            var predicate = ExpressionBuilder.Expression<EmployeeDirectory>(filters, false).Compile();

            return new EmployeeDirectoryModel
            {
                EmployeeId = employee.EmployeeID,
                ReportsTo = employee.ReportsTo,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Address = employee.Address,
                City = employee.City,
                Country = employee.Country,
                BirthDate = employee.BirthDate,
                HireDate = employee.HireDate,
                Phone = employee.Phone,
                Position = employee.Position,
                Extension = employee.Extension,
                hasChildren = employee.EmployeeDirectory1.Any(predicate)
            };
        }
    }

    public class EmployeeDirectoryService
    {
        private SampleEntities db;

        public EmployeeDirectoryService(SampleEntities context)
        {
            db = context;
        }

        public EmployeeDirectoryService()
            : this(new SampleEntities())
        {
        }       

        public virtual IQueryable<EmployeeDirectory> GetAll()
        {
            return db.EmployeeDirectory;
        }

        public virtual void Insert(EmployeeDirectoryModel employee, ModelStateDictionary modelState)
        {
            if (ValidateModel(employee, modelState))
            {
                var entity = employee.ToEntity();

                db.EmployeeDirectory.Add(entity);
                db.SaveChanges();

                employee.EmployeeId = entity.EmployeeID;
            }
        }

        public virtual void Update(EmployeeDirectoryModel employee, ModelStateDictionary modelState)
        {
            if (ValidateModel(employee, modelState))
            {
                var entity = employee.ToEntity();
                db.EmployeeDirectory.Attach(entity);
                db.Entry(entity).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public virtual void Delete(EmployeeDirectoryModel employee, ModelStateDictionary modelState)
        {
            var entity = employee.ToEntity();
            db.EmployeeDirectory.Attach(entity);
            db.EmployeeDirectory.Remove(entity);
            db.SaveChanges();
        }

        private bool ValidateModel(EmployeeDirectoryModel employee, ModelStateDictionary modelState)
        {
            if (employee.HireDate < employee.BirthDate)
            {
                modelState.AddModelError("errors", "Employee cannot be hired before birth.");
                return false;
            }
            
            return true;
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}