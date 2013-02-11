function AVLTree(compare, n) {
    this.init(compare, n);
}

AVLTree.prototype.init = function(compare, n) {
    this.compare = compare;
    this.left = null;
    this.right = null;
    this.node = n;
    this.depth = 1;
    this.element = n;
};

AVLTree.prototype.balance = function() {
    var ldepth = this.left  == null ? 0 : this.left.depth;
    var rdepth = this.right == null ? 0 : this.right.depth;

    if (ldepth > rdepth + 1) {
        // LR or LL rotation
        var lldepth = this.left.left  == null ? 0 : this.left.left.depth;
        var lrdepth = this.left.right == null ? 0 : this.left.right.depth;

        if (lldepth < lrdepth) {
            // LR rotation consists of a RR rotation of the left child
            this.left.rotateRR();
            // plus a LL rotation of this node, which happens anyway
        }
        this.rotateLL();
    } else if (ldepth + 1 < rdepth) {
        // RR or RL rorarion
        var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
        var rldepth = this.right.left  == null ? 0 : this.right.left.depth;

        if (rldepth > rrdepth) {
            // RR rotation consists of a LL rotation of the right child
            this.right.rotateLL();
            // plus a RR rotation of this node, which happens anyway
        }
        this.rotateRR();
    }
};

AVLTree.prototype.rotateLL = function() {
    // the left side is too long => rotate from the left (_not_ leftwards)
    var nodeBefore = this.node;
    var elementsBefore = this.element;
    var rightBefore = this.right;
    this.node = this.left.node;
    this.element = this.left.element;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.node = nodeBefore;
    this.right.element = elementsBefore;
    this.right.updateInNewLocation();
    this.updateInNewLocation();
};

AVLTree.prototype.rotateRR = function() {
    // the right side is too long => rotate from the right (_not_ rightwards)
    var nodeBefore = this.node;
    var elementsBefore = this.element;
    var leftBefore = this.left;
    this.node = this.right.node;
    this.element = this.right.element;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.node = nodeBefore;
    this.left.element = elementsBefore;
    this.left.updateInNewLocation();
    this.updateInNewLocation();
};

AVLTree.prototype.updateInNewLocation = function() {
    this.getDepthFromChildren();
};

AVLTree.prototype.getDepthFromChildren = function() {
    this.depth = this.node == null ? 0 : 1;
    if (this.left != null) {
        this.depth = this.left.depth + 1;
    }
    if (this.right != null && this.depth <= this.right.depth) {
        this.depth = this.right.depth + 1;
    }
};

AVLTree.prototype.insert = function(n)  {
    var o = this.compare(n, this.node);
    if (o == 0) {
        return false;
    }

    var ret = false;
    if (o == -1) {
        if (this.left == null) {
            this.left = new AVLTree(this.compare, n);
            ret = true;
        } else {
            ret = this.left.insert(n);
            if (ret) {
                this.balance();
            }
        }
    } else if (o == 1) {
        if (this.right == null) {
            this.right = new AVLTree(this.compare, n);
            ret = true;
        } else {
            ret = this.right.insert(n);
            if (ret) {
                this.balance();
            }
        }
    }

    if (ret) {
        this.getDepthFromChildren();
    }
    return ret;
};

AVLTree.prototype.find = function(value) {
    var substr = this.node;
    var value = value;

    if (this.compare(value, substr) < 0) {
      if (this.left != null) {
        return this.left.find(value);
      }
      return;
    }
    if (this.compare(value, substr) > 0) {
      if (this.right != null) {
        return this.right.find(value);
      }
      return;
    }
    return this.element;
}
