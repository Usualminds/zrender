// CompoundPath to improve performance

import Path from './Path';

interface CompoundPathShape {
    paths: Path[]
}

export default class CompoundPath extends Path {

    type = 'compound'

    shape: CompoundPathShape

    private _updatePathDirty() {
        const paths = this.shape.paths;
        let dirtyPath = this.__dirtyPath;
        for (let i = 0; i < paths.length; i++) {
            // Mark as dirty if any subpath is dirty
            dirtyPath = dirtyPath || paths[i].__dirtyPath;
        }
        this.__dirtyPath = dirtyPath;
        this.__dirty = this.__dirty || dirtyPath;
    }

    beforeBrush() {
        this._updatePathDirty();
        const paths = this.shape.paths || [];
        const scale = this.getGlobalScale();
        // Update path scale
        for (let i = 0; i < paths.length; i++) {
            if (!paths[i].path) {
                paths[i].createPathProxy();
            }
            paths[i].path.setScale(scale[0], scale[1], paths[i].segmentIgnoreThreshold);
        }
    }

    buildPath(ctx: CanvasRenderingContext2D, shape: CompoundPathShape) {
        const paths = shape.paths || [];
        for (let i = 0; i < paths.length; i++) {
            paths[i].buildPath(ctx, paths[i].shape, true);
        }
    }

    afterBrush() {
        const paths = this.shape.paths || [];
        for (let i = 0; i < paths.length; i++) {
            paths[i].__dirtyPath = false;
        }
    }

    getBoundingRect() {
        this._updatePathDirty.call(this);
        return Path.prototype.getBoundingRect.call(this);
    }
}