/**
 * 圆环
 * @module zrender/graphic/shape/Ring
 */

import Path from '../Path';

export default Path.extend({

    type: 'ring',

    shape: {
        cx: 0,
        cy: 0,
        r: 0,
        r0: 0
    },

    buildPath: function (ctx, shape) {
        const x = shape.cx;
        const y = shape.cy;
        const PI2 = Math.PI * 2;
        ctx.moveTo(x + shape.r, y);
        ctx.arc(x, y, shape.r, 0, PI2, false);
        ctx.moveTo(x + shape.r0, y);
        ctx.arc(x, y, shape.r0, 0, PI2, true);
    }
});