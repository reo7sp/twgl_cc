var twgl_cc = {
    /**
     * Creates a ProgramInfo from 2 source paths.
     * See http://twgljs.org/docs/module-twgl.html#.createProgramInfo.
     * @param {String} vertexShaderPath
     * @param {String} fragmentShaderPath
     * @param {Object} options
     * @returns {Object} Dictionary which has {twgl.ProgramInfo} under 'twgl' key, {cc.GLProgram} under 'cc' and {WebGLProgram} under 'webgl'
     */
    createProgramInfo: function (vertexShaderPath, fragmentShaderPath, options) {
        options || (options = {});
        var shader = new cc.GLProgram(vertexShaderPath, fragmentShaderPath);
        if (options.attribs) {
            for (var attributeName in options.attribs) {
                var index = options.attribs[attributeName];
                shader.addAttribute(attributeName, index)
            }
        }
        shader.link();
        shader.updateUniforms();
        shader.setUniformsForBuiltins();
        if (options.attribPrefix !== false) {
            twgl.setDefaults({attribPrefix: options.attribPrefix ? options.attribPrefix : 'a_'});
        }
        var programInfo = twgl.createProgramInfoFromProgram(this.gl, shader.getProgram());
        return {
            twgl: programInfo,
            cc: shader,
            webgl: shader.getProgram()
        };
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
