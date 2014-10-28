namespace Kendo.Mvc.Examples.Models
{
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using System;
    using System.Data;

    public class DiagramShapeService
    {
        private SampleEntities db;

        public DiagramShapeService(SampleEntities context)
        {
            db = context;
        }

        public DiagramShapeService()
            : this(new SampleEntities())
        {
        }

        public virtual IQueryable<OrgChartShape> GetAll()
        {
            return db.OrgChartShapes.ToList().AsQueryable();  
        }

        public virtual void Insert(OrgChartShape shape, ModelStateDictionary modelState)
        {
            db.OrgChartShapes.Add(shape);
            db.SaveChanges();

            shape.Id = shape.Id;
        }

        public virtual void Update(OrgChartShape shape, ModelStateDictionary modelState)
        {
            db.OrgChartShapes.Attach(shape);
            db.Entry(shape).State = EntityState.Modified;
            db.SaveChanges();
        }

        public virtual void Delete(OrgChartShape shape, ModelStateDictionary modelState)
        {
            db.OrgChartShapes.Attach(shape);

            Delete(shape);

            db.OrgChartShapes.Remove(shape);
            db.SaveChanges();
        }

        private void Delete(OrgChartShape shape)
        {
            var result = db.OrgChartShapes.Where(t => t.Id == shape.Id).First();

            db.OrgChartShapes.Remove(result);
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}