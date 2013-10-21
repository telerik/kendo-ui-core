function initSubMatrix(m,i,j){
    var result = [],
        length = m.length,
        row = -1;
        
    for(var k = 0; k < length; k++){
        if(k!= i){ 
            row++;            
            result.push([]);        
            for(var l = 0; l < length; l++){
                if(l != j){                    
                    result[row].push(m[k][l]);
                }
            }
        }
    }
    return result;
}

function getDeterminant(m){
    var length = m.length,
        result = 0;
    if(length == 2){
        return m[0][0]*m[1][1] - m[0][1]*m[1][0];
    }
    else{
        for(var i =0; i< length; i++){
            for(var j = 0; j < length; j++){
                result += Math.pow(-1, i+j) * m[i][j] * 
                    getDeterminant(initSubMatrix(m,i,j));
            }
        }
    }
    return result;
}

function transpondMultiply(m,a){
    var result = [],
        length = m.length;
    for(var i = 0; i< length; i++){
        for(var j = 0; j < length; j++){
            result[j] = result[j] || [];
            result[j][i] = a * m[i][j];
        }
    }
    return result;
}

function getReverseMatrix(m){
    var result = [],
        length = m.length,
        determinant = 0;
    for(var i = 0; i< length; i++){
        result[i] = [];
        for(var j = 0; j < length; j++){
            result[i][j] = Math.pow(-1, i+j) * getDeterminant(initSubMatrix(m,i,j));
        }
    }
    for(i = 0; i< length; i++){
        determinant += m[0][i] * result[0][i];
    }

    result = transpondMultiply(result, 1/determinant);
    return result;
}


var CurveProcessor = function(addPoint, allowedError){
    this.addPoint = addPoint;
    this.allowedError = allowedError;
};

CurveProcessor.prototype = CurveProcessor.fn = { 

    processTest: function(points){                
        var that = this,
            addPoint = that.addPoint,
            length = points.length,
            controlPoins = [],
            dataPoints,
            fn,p1,
            xField, yField,
            extremum,
            previousAxis,
            fnd,
            fE,
            nextControlPoint,
            tangents,
            valueDistance,
            extremumDistance,
            isLinearByField= function(points, field){
                var ascending = points[0][field] < points[1][field],                    
                    length = points.length,
                    i;
                    
                for(i = 1; i < length - 1; i++){
                    if(ascending){
                        if(points[i][field] > points[i+1][field]){
                            return false;
                        }
                    }
                    else if(points[i][field] < points[i+1][field]){
                        return false;
                    }
                }
                return true;
            },
            isAscending = function(cPoints,xField, yField){
                var length = cPoints.length,
                    i;
                    
                for(i = 0; i < length - 1; i++){
                    if(cPoints[i][xField] > cPoints[i+1][xField]){
                        return false;
                    }
                }
                return true;
            },
            isDescending = function(cPoints,xField, yField){
                var length = cPoints.length,
                    i;
                    
                for(i = 0; i < length - 1; i++){
                    if(cPoints[i][xField] < cPoints[i+1][xField]){
                        return false;
                    }
                }
                return true;
            },
            hasExtremumByField = function(points, field){
                return (points[0][field] < points[1][field] && points[2][field] < points[1][field]) || 
                            (points[1][field] < points[0][field] && points[1] < points[2][field]);
            },      
            getTangent = function(points, xField, yField){
                var tangent,
                    x = points[1][xField] - points[0][xField],
                    y = points[1][yField] - points[0][yField];
                if(Math.abs(x/y) <= Math.abs(y/x)){
                   tangent = x/y;
                }
                else{
                   tangent = y/x;
                }
                                           
                return tangent;
            },
            getFirstControlPoint = function(tangent, p0,p3, xField, yField){
                var controlPoint = new Point(),
                    t1 = p0[xField],
                    t2 = p3[xField],
                    t = t2 - t1,
                    weigth = 0.3;
                   
                controlPoint[xField] = t1 + (t || (p3[yField] > p0[yField] ? -1 : 1)) * weigth;
                controlPoint[yField] = p0[yField] + t * weigth * tangent;
                return controlPoint;
            },
            getSecondControlPoint= function(tangent, p0,p3, xField, yField){
                var controlPoint = new Point(),
                    t1 = p0[xField],
                    t2 = p3[xField],
                    t = t2 - t1,
                    weigth = 0.3;
                controlPoint[xField] = t2 - t * weigth;
                controlPoint[yField] = p3[yField] - t * weigth * tangent;
                return controlPoint;
            },
            getSymetricToPoint= function(idx, points, fn, xField, yField){
                var y = points[idx][yField],
                    x1 = ((-fn[1] + Math.sqrt(fn[1]*fn[1] - 4*fn[2] * (fn[0] - points[idx][yField]))) / (2*fn[2])),
                    x2 = (-fn[1] - Math.sqrt(fn[1]*fn[1] - 4*fn[2] * (fn[0] - points[idx][yField]))) / (2*fn[2]),
                    x = x1.toFixed(1) == points[idx][xField].toFixed(1) ? x2 : x1;
                    point = new Point(x, y);
                    
                return point;
            },
            getInitialControlPoint = function(currentPoints, xField, yField){
                var that = this,                    
                    controlPoint,
                    p0 = currentPoints[0],
                    p1 = currentPoints[1],
                    p2 = currentPoints[2];
                if(that.isMonotonic(currentPoints,yField)){
                    var fn = that.getParabolaPointsFunction(currentPoints,xField, yField),
                        fnd = that.getDerivative(fn),
                        extremum = {};
                    extremum[xField] = -fnd[0] / fnd[1];
                    if(isLinearByField([p1, p2,extremum], xField) || isLinearByField([extremum,p0, p1], xField) || 
                        isLinearByField([p1, extremum, p2], xField)){   
                        controlPoint = getFirstControlPoint(that.calculateFunction(fnd, p0[xField]), p0, p1, xField, yField);                                 
                    }
                    else {      
                        controlPoint = getFirstControlPoint(0, p0, p1, xField, yField);
                    }
                }
                else{
                     var tangent = getTangent(currentPoints, xField, yField);                 
                     if(!isLinearByField(currentPoints, xField) && hasExtremumByField(currentPoints, yField)){ 
                        controlPoint = getFirstControlPoint(tangent, p0, p1,yField,xField);
                     }
                     else{
                         controlPoint = getFirstControlPoint(tangent, p0, p1, xField, yField);
                     }
                }
                return controlPoint;
            },
            getMiddleControlPoints = function(currentPoints, xField, yField){
                var that = this,                    
                    controlPoint2,
                    nextControlPoint,
                    p0 = currentPoints[0],
                    p1 = currentPoints[1],
                    p2 = currentPoints[2];                
                if(that.isMonotonic(currentPoints,yField)){
                    fn = that.getParabolaPointsFunction(currentPoints,xField, yField);
                    var fnd = that.getDerivative(fn);                
                    controlPoint2 = getSecondControlPoint(that.calculateFunction(fnd, p1[xField]), p0, p1, xField, yField);
                    extremum = {};
                    extremum[xField] = -fnd[0] / fnd[1];
                    if(isLinearByField([p1, p2,extremum], xField) || isLinearByField([extremum, p0, p1], xField)){   
                        nextControlPoint = getFirstControlPoint(that.calculateFunction(fnd, p1[xField]), p1, p2,xField,yField);                                 
                    }
                    else if(isLinearByField([p1, extremum, p2], xField)){                          
                        nextControlPoint = getSymetricToPoint(2,currentPoints, fn, xField, yField);
                    }
                    else{                                                          
                        controlPoint2 = getSymetricToPoint(0,currentPoints, fn, xField, yField);
                        nextControlPoint = getFirstControlPoint(that.calculateFunction(fnd, p1[xField]), p1,p2,xField,yField);
                    }
                }
                else{           
                     if(isLinearByField(currentPoints, xField)){                                       
                        controlPoint2 = getSecondControlPoint(keepExtremum, p0,p1,xField,yField);
                        nextControlPoint = getFirstControlPoint(keepExtremum, p1, p2,xField,yField);
                     }
                     else{
                        if(hasExtremumByField(currentPoints, yField)){                        
                            controlPoint2 = getSecondControlPoint(keepExtremum, p0, p1,yField,xField);
                            nextControlPoint = getFirstControlPoint(keepExtremum, p1, p2,xField,yField);
                        }
                        else{                        
                            controlPoint2 = getSecondControlPoint(keepExtremum, p0, p1,xField,yField);
                            nextControlPoint = getFirstControlPoint(keepExtremum, p1, p2,yField,xField);
                        }
                     }
                }
                return [controlPoint2, nextControlPoint];
            },
            keepExtremum = -0.1,
            idx = 0,
            currentPoints,
            controlPoints;
            
        if(points.length < 3){
            return points;
        }        
        addPoint(points[0]); 
        currentPoints = points.slice(0,3);
        if(isLinearByField(currentPoints, "x")){
            xField = "x";
            yField = "y";
        }
        else{
            xField = "y";
            yField = "x"; 
        }

        p1 = getInitialControlPoint.call(that, currentPoints, xField, yField);
        addPoint(p1);
        
        for(var idx = 0; idx <= length - 3; idx++) {
            currentPoints = points.slice(idx, idx + 3);
            if(isLinearByField(currentPoints, "x")){
                xField = "x";
                yField = "y";
            }
            else{
                xField = "y";
                yField = "x"; 
            }
            controlPoints = getMiddleControlPoints.call(that, currentPoints, xField, yField);
            addPoint(controlPoints[0]);
            addPoint(currentPoints[1]);    
            addPoint(controlPoints[1]);              
        }
            
      
        addPoint(getSecondControlPoint(0, points[length -2], points[length -1], xField, yField));
        addPoint(points[length -1]);
            
    },
    process: function(points){
        var that = this,
            addPoint = that.addPoint,
            length = points.length,
            controlPoins,
            dataPoints,
            fn,p1,
            xField, yField,
            extremum,
            previousAxis,
            fnd,
            fE,
            previousCoefficients,
            tangents,
            valueDistance,
            extremumDistance;
        
        addPoint(points[0]); 

        for(var idx = 0; idx <= length - 3;idx++){
            dataPoints = points.slice(idx, idx+3);
            if(fn){
                if(tangents){
                    tangents.reverse();
                }
                p1 = that.getControlPoints(fn, xField, yField, dataPoints[0], dataPoints[1], tangents, previousCoefficients)[0];
                tangents = undefined;
            }
            previousCoefficients = undefined;
            if(that.isLinear(dataPoints)){
                xField = "x";
                yField = "y";      
            }
            else{                 
                xField = "y";
                yField = "x";       
            }
           
            if(that.isMonotonic(dataPoints,  yField)){
               fn = that.getParabolaPointsFunction(dataPoints, xField, yField);   
               var der = that.getDerivative(fn),
                   extremum = that.getExtremums(der)[0];
               if((dataPoints[1][xField] < extremum && extremum < dataPoints[2][xField]) ||
                    (dataPoints[1][xField] > extremum && extremum > dataPoints[2][xField])){                   
                    previousCoefficients = [];
                    previousCoefficients[1] = dataPoints[2][yField];
                    previousCoefficients[0] =  ((-fn[1] + Math.sqrt(fn[1]*fn[1] - 4*fn[2] * (fn[0] - dataPoints[2][yField]))) / (2*fn[2])).toFixed(1) == dataPoints[2][xField].toFixed(1) ? 
                        (-fn[1] - Math.sqrt(fn[1]*fn[1] - 4*fn[2] * (fn[0] - dataPoints[2][yField]))) / (2*fn[2]) : 
                        (-fn[1] + Math.sqrt(fn[1]*fn[1] - 4*fn[2] * (fn[0] - dataPoints[2][yField]))) / (2*fn[2]);
                    // previousCoefficients[1] = Math.abs((dataPoints[2][yField] - dataPoints[1][yField]) / (that.calculateFunction(fn, extremum) - dataPoints[1][yField]));
                    // var xk =  (-fn[1] - Math.sqrt(fn[1]*fn[1] - 4*fn[2] * (fn[0] - dataPoints[2][yField]))) / 2*fn[2];
                    // var xa = (-fn[1] + Math.sqrt(fn[1]*fn[1] - 4*fn[2] * (fn[0] - dataPoints[1][yField]))) / 2*fn[2];
                    // previousCoefficients[0] = 1/50;//Math.abs((Math.min(xk,xa) - dataPoints[1][xField]) / (Math.max(xk,xa) - dataPoints[1][xField]));
               }
               tangents = undefined;
            }
            else{
               tangents = that.getTangents(dataPoints, xField, yField);
               if(fn){
                    fn = that.getCubicPointsFunction(dataPoints, xField, yField, 1);                        
               }
               else{                   
                    fn = that.getQuarticPointsFunction(dataPoints, xField, yField);  
               }
            }                
            //idx = that.mergePoints(fn,dataPoints,points, idx,xField,yField);                       
            
            controlPoins = that.getControlPoints(fn, xField, yField, dataPoints[0], dataPoints[1],tangents);
            controlPoins[0] = p1 || controlPoins[0];
            addPoint.apply(null,controlPoins);
            addPoint(dataPoints[1]);
            previousAxis = xField;
        }         
        if(idx <= length){      
            if(tangents){
                tangents.reverse();
                tangents[1] = 0;
            }
          
            if(previousCoefficients){
                controlPoins = that.getControlPoints(fn, xField, yField, points[points.length -2], points[points.length -1], undefined, previousCoefficients);
                controlPoins[1] =  that.getControlPoints(fn, xField, yField, points[points.length -2], points[points.length -1], [0,0])[1];
            }
            else{             
                controlPoins = that.getControlPoints(fn, xField, yField, points[points.length -2], points[points.length -1], tangents);
            }
            addPoint.apply(null,controlPoins);
            addPoint(points[points.length -1]);        
        }
    }, 
    isLinear: function(dataPoints){     
        return  (dataPoints[2].x > dataPoints[1].x && dataPoints[1].x > dataPoints[0].x) ||
                (dataPoints[2].x < dataPoints[1].x && dataPoints[1].x < dataPoints[0].x);
    },
    getTangents: function(dataPoints, xField, yField){
        var that = this,
            tangents = [],
            a = dataPoints[1][xField] - dataPoints[0][xField],
            b = dataPoints[1][yField] - dataPoints[0][yField],
            m1,m2;

        if(Math.abs(a/b) <= Math.abs(b/a)){
           tangents[0] = a/b;
        }
        else{
            tangents[0] = b/a;
        }
 
        tangents[1] = 0;
 
        
        return tangents;
    },
    getLinearTangent: function(points,xField, yField){
        var a = (points[1][yField] - points[0][yField]) / (points[1][xField] - points[0][xField]);
        
        return a;
    },
    isMonotonic: function(dataPoints,yField){
        return (dataPoints[2][yField] > dataPoints[1][yField] && dataPoints[1][yField] > dataPoints[0][yField]) ||
                    (dataPoints[2][yField] < dataPoints[1][yField] && dataPoints[1][yField] < dataPoints[0][yField]);
    },    
    mergePoints: function(fn, dataPoints, points, idx, xField, yField){
        var that = this,
            i = idx + 1,
            allowedError = that.allowedError,
            derivative = that.getDerivative(fn),
            // isMonotonic = that.isMonotonic(dataPoints),
            // isLinear = that.isLinear()
            extremums;
        while(i < points.length && that.inRange(that.calculateFunction(fn,points[i][xField]), points[i][yField], allowedError)){
            dataPoints.splice(1,1);
            extremums = that.getExtremums(derivative);
            dataPoints.push(points[i]);
            i++;
        }     
        
        idx = i;
        if(idx == points.length){
            dataPoints.splice(1,1);
        }
        return idx;
    },
    getExtremums: function(fnD){
        var that = this;
        if(fnD.length == 2){
            return [-fnD[0] / fnD[1]];
        }
        else if(fnD.length == 3){
            var sqrt = Math.sqrt(Math.pow(fnD[1],2) - 4 * fnd[0] * fnD[2]),
                denominator = 2 * fnD[2];
            return [(-fnD[1] - sqrt) / denominator, (-fnD[1] + sqrt) / denominator];
        }
    },
    inRange: function(actual, expected, error){           
        return Math.abs(expected - actual) <= error;
    },
    getControlPoints: function(fn, xField, yField, p0,p3,tangents, previousCoefficients){
        var that = this,
            t1 = p0[xField],
            t2 = p3[xField],
            t = t2 - t1,
            fnd = that.getDerivative(fn),
            x1 = previousCoefficients ? previousCoefficients[0] : (t1 + t/3),
            x2 = t2 - t/3,
            y1 = previousCoefficients ? previousCoefficients[1] : (p0[yField] + (t/3) * (tangents? tangents[0] : that.calculateFunction(fnd, t1))),
            y2 = p3[yField] - (t/3) * (tangents? tangents[1] : that.calculateFunction(fnd, t2));
        
       if(xField == "x"){
           return [new Point(x1,y1), new Point(x2,y2)];  
       }
       else{
           return [new Point(y1,x1), new Point(y2,x2)];  
       }
    },
    getParabolaPointsFunction: function(points, xField, yField){
        var that = this,
            m = getReverseMatrix(that.initMatrix(points,xField)),
            v = [],
            result,
            fn = [];     
        for(var i = 0; i < m.length; i++){
            v.push([points[i][yField]]);            
        }
        result = that.multiplyMatrices(m, v);
        for(i=0;i< m.length;i++){
            fn.push(result[i][0]);           
        }
        return fn;
    },    
    getCubicPointsFunction: function(points, xField, yField, extremumIdx){
        var m = [
            [1, Math.pow(points[0][xField], 1),Math.pow(points[0][xField], 2), Math.pow(points[0][xField], 3)],
            [1, Math.pow(points[1][xField], 1),Math.pow(points[1][xField], 2), Math.pow(points[1][xField], 3)],
            [1, Math.pow(points[2][xField], 1),Math.pow(points[2][xField], 2), Math.pow(points[2][xField], 3)],
            [0, 1, 2 * points[extremumIdx][xField], 3 * Math.pow(points[extremumIdx][xField], 2)]
        ],
        v = [[points[0][yField]], [points[1][yField]], [points[2][yField]], [0]],
        reverse = getReverseMatrix(m),
        result = this.multiplyMatrices(reverse,v),
        fn = [result[0][0],result[1][0],result[2][0],result[3][0]];
        
        return fn;        
    },
    getQuarticPointsFunction: function(points, xField, yField){
       var that = this,
            m = getReverseMatrix(that.initExtremumMatrix(points,xField)),
            v = [],
            result,
            fn = [];     
        for(var i = 0; i < points.length; i++){
            v.push([points[i][yField]]);
        }
        for(;i< m.length; i++){
            v.push([0]);
        }
        result = that.multiplyMatrices(m, v);
        for(i=0;i< m.length;i++){
            fn.push(result[i][0]);
        }
        return fn;
    },
    getPointsFunction: function(points, xField, yField){
        var that = this,
            m = getReverseMatrix(that.initMatrix(points,xField)),
            v = [],
            result,
            fn = [];     
        for(var i = 0; i < m.length; i++){
            v.push([points[i][yField]]);            
        }
        result = that.multiplyMatrices(m, v);
        for(i=0;i< m.length;i++){
            fn.push(result[i][0]);           
        }
        return fn;
    },
    calculateFunction: function(fn,x){
        var result = 0,
            length = fn.length;
        for(var i = 0; i < length;i++){
            result += Math.pow(x,i) * fn[i];
        }
        return result;
    },
    getDerivative: function(fn){
        var result = [],
            length = fn.length;
        for(var i = 1; i < length;i++){
            result[i-1] = fn[i] * i;
        }
        return result;
    },    
    initMatrix: function(points,xField){
        var m = [],
            length = points.length;
         
        for(var i = 0; i < length;i++){
           m[i] = [];           
           for(var j = 0; j < length; j++){
                 m[i][j] = Math.pow(points[i][xField], j); 
           }
        }
        return m;
    },
    initExtremumMatrix: function(points,xField){
        var m = [],
            length = points.length;
         
        for(var i = 0; i < length;i++){
           m[i] = [];           
           for(var j = 0; j < length + 2; j++){
                m[i][j] = Math.pow(points[i][xField], j); 
           }
        }
        for(; i < length + 2; i++){
            m[i] = [0];
            for(j= 1;j < length + 2; j++){
                m[i][j] = j * Math.pow(points[i - 2][xField], j - 1);
            }
        }
        return m;
    },    
    multiplyMatrices: function(a,b){
        var result = [],
            product,
            rows = a.length,
            cols = b[0].length,
            length = b.length;

        for(var row = 0; row < rows; row++){
            result[row] = [];
            for(var col = 0;col <cols; col++){
                product = 0;
                for(var idx = 0; idx < length; idx++){
                    product+= a[row][idx] * b[idx][col];
                }
                result[row][col] = product;
            }
        }
        return result;
    },
    getReverseMatrix: function(m){
        var a00 = m[1][1] * m[2][2] - m[1][2] * m[2][1],
            a01 = -(m[1][0]*m[2][2] - m[1][2]*m[2][0]),
            a02 = m[1][0]*m[2][1] - m[1][1]*m[2][0],
            a10 = -(m[0][1] * m[2][2] - m[0][2] * m[2][1]),
            a11 = m[0][0]*m[2][2] - m[0][2]*m[2][0],
            a12 = -(m[0][0]*m[2][1] - m[0][1]*m[2][0]),
            a20 = m[0][1] * m[1][2] - m[0][2] * m[1][1],
            a21 = -(m[0][0]*m[1][2] - m[0][2]*m[1][0]),
            a22 = m[0][0]*m[1][1] - m[0][1]*m[1][0],
            detA = 1 / (m[0][0] * a00 + m[0][1] * a01 + m[0][2] * a02);
            
        return [
            [ detA * a00, detA * a10, detA * a20],
            [ detA * a01, detA * a11, detA * a21],
            [ detA * a02, detA * a12, detA * a22]
        ];
    }
};

var LeastSquare = {
   process: function(points, addPoint){
        var currentPoints;
        for(var idx = 0; idx <= points.length - 3; idx++){
            currentPoints = points.slice(idx, idx+3);
            var cp = this.getControlPoints(currentPoints);
            addPoint(currentPoints[0]);
            addPoint(cp[0]);
            addPoint(cp[1]);
            addPoint(currentPoints[2]);
        }             

   },
   getControlPoints: function(points, xField, yField){
        var A1 = 0,
            A2 = 0,
            A12 = 0,
            xC1 = 0,
            xC2 = 0,
            yC1 = 0,
            yC2 = 0,
            n = points.length,
            B0,B1,B2,B3,
            xCommon,
            yCommon,
            denom,
            p1,
            p2,
            ti,
            t1i,
            t = function(i){
                return i/n;
            };
        this.n = n;
        for(var i = 1; i < n;i++){
            ti = t(i);
            t1i = 1 - ti;
            B0 = math.pow(t1i, 3);
            B1 = 3*ti*math.pow(t1i,2);
            B2 = 3 * math.pow(ti,2) * t1i;
            B3 = math.pow(ti,3);
            A1 += math.pow(B1,2);
            A2 += math.pow(B2,2);
            A12 += B1*B2;
            xCommon = points[i][xField] - B0 * points[0][xField] - B3 * points[n-1][xField];
            yCommon = points[i][yField] - B0 * points[0][yField] - B3 * points[n-1][yField];
            xC1+= B1 * xCommon;
            xC2+= B2 * xCommon;
            yC1+= B1 * yCommon;
            yC2+= B2 * yCommon;            
        }
        denom = A1*A2-A12*A12;
    
        if(denom === 0){
            p1 = points[0];
            p2 = points[1];
        }
        else{
            p1 =  new Point((A2*xC1 - A12*xC2) / denom, (A2*yC1 - A12*yC2) / denom);
            p2 =  new Point((A1*xC2 - A12*xC1) / denom, (A2*yC2 - A12*yC1) / denom);
        }
        
        if(xField == "y"){
            var tmp = p1.x;
            p1.x = p1.y;
            p1.y = tmp;
            
            var tmp = p2.x;
            p2.x = p2.y;
            p2.y = tmp;
        }
        
        return [p1,p2];
   }
};


