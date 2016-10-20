var twgl_cc = {
    /**
     * Creates a ProgramInfo from 2 source paths.
     * See http://twgljs.org/docs/module-twgl.html#.createProgramInfo.
     * @param {String} vertexShaderPath
     * @param {String} fragmentShaderPath
     * @param {Object} opts
     * @returns {twgl.ProgramInfo} The created ProgramInfo or null if it failed to link or compile
     */
    createProgramInfo: function (vertexShaderPath, fragmentShaderPath, opts) {
        opts || (opts = {});
        var shader = new cc.GLProgram(vertexShaderPath, fragmentShaderPath);
        shader.link();
        shader.updateUniforms();
        shader.setUniformsForBuiltins();
        if (opts.attribPrefix !== false) {
            twgl.setDefaults({attribPrefix: opts.attribPrefix ? opts.attribPrefix : 'a_'});
        }
        return twgl.createProgramInfoFromProgram(this.gl, shader.getProgram());
    },

    /**
     * Creates a cocos2d Texture2D from path.
     * @param {String} path
     * @returns {cc.Texture2D}
     */
    createTextureInfo: function (path) {
        return cc.textureCache.addImage(path);
    },

    /**
     * Binds texture.
     * @param {cc.Texture2D} textureInfo
     */
    bindTexture: function (textureInfo) {
        return cc.glBindTexture2D(textureInfo);
    }
};

Object.defineProperty(twgl_cc, 'gl', {
    get: function () {
        return cc._renderContext;
    }
});

module.exports = twgl_cc;
