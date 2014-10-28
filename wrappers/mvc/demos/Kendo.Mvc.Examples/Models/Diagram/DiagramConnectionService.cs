namespace Kendo.Mvc.Examples.Models
{
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using System;
    using System.Data;

    public class DiagramConnectionService
    {
        private SampleEntities db;

        public DiagramConnectionService(SampleEntities context)
        {
            db = context;
        }

        public DiagramConnectionService()
            : this(new SampleEntities())
        {
        }

        public virtual IQueryable<OrgChartConnection> GetAll()
        {
            return db.OrgChartConnections.ToList().AsQueryable();  
        }

        public virtual void Insert(OrgChartConnection connection, ModelStateDictionary modelState)
        {
            db.OrgChartConnections.Add(connection);
            db.SaveChanges();

            connection.Id = connection.Id;
        }

        public virtual void Update(OrgChartConnection connection, ModelStateDictionary modelState)
        {
            db.OrgChartConnections.Attach(connection);
            db.Entry(connection).State = EntityState.Modified;
            db.SaveChanges();
        }

        public virtual void Delete(OrgChartConnection connection, ModelStateDictionary modelState)
        {
            db.OrgChartConnections.Attach(connection);

            Delete(connection);

            db.OrgChartConnections.Remove(connection);
            db.SaveChanges();
        }

        private void Delete(OrgChartConnection connection)
        {
            var result = db.OrgChartShapes.Where(t => t.Id == connection.Id).First();

            db.OrgChartShapes.Remove(result);
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}