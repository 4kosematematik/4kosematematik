var GGBApplet = function () {
    var g = {
        inject: function (e, t) {
            var n = document.getElementById(e);
            if (n) {
                var i = new DeployGGB(n, t);
                i.inject();
            }
        }
    };
    return g;
}();