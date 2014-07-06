function compareBoundingBox(bbox, values, tolerance) {
    tolerance = tolerance || 0;

    close(bbox.topLeft().x, values[0], tolerance, "topLeft.x");
    close(bbox.topLeft().y, values[1], tolerance, "topLeft.y");
    close(bbox.bottomRight().x, values[2], tolerance, "bottomRight.x");
    close(bbox.bottomRight().y, values[3], tolerance, "bottomRight.y");
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
