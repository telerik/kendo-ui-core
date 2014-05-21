function compareBoundingBox(bbox, values, tolerance) {
    tolerance = tolerance || 0;

    close(bbox.p0.x, values[0], tolerance, "p0.x");
    close(bbox.p0.y, values[1], tolerance, "p0.y");
    close(bbox.p1.x, values[2], tolerance, "p1.x");
    close(bbox.p1.y, values[3], tolerance, "p1.y");
}

function compareMatrices(m1, m2, tolerance) {
    tolerance = tolerance || 0;
    close(m1.a, m2.a, tolerance, "a");
    close(m1.b, m2.b, tolerance, "b");
    close(m1.c, m2.c, tolerance, "c");
    close(m1.d, m2.d, tolerance, "d");
    close(m1.e, m2.e, tolerance, "e");
    close(m1.f, m2.f, tolerance, "f");
}
