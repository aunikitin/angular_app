module.exports = function initRouter(app) {
    return {
        get(addr, handler) {
            app.get.apply(app, [addr, handler]);
        },
        post(addr, handler) {
            app.post.apply(app, [addr, handler]);
        }
    };
}
