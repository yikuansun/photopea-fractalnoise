for (var inputElem of document.querySelectorAll("input, select")) {
    inputElem.addEventListener("input", function(e) {
        var noiseElem = document.querySelector("feTurbulence");
        noiseElem.setAttribute("baseFrequency", `${document.querySelector("#baseFrequency1").value} ${document.querySelector("#baseFrequency2").value}`);
        noiseElem.setAttribute("type", document.querySelector("#noiseType").value);
        noiseElem.setAttribute("numOctaves", document.querySelector("#octaves").value);
        noiseElem.setAttribute("seed", document.querySelector("#seed").value);
        noiseElem.setAttribute("stitchTiles", document.querySelector("#stitchTiles").value);
    });
}

(
    async function() {
        var w = parseFloat((await Photopea.runScript(window.parent, "app.echoToOE(app.activeDocument.width.toString());"))[0]);
        var h = parseFloat((await Photopea.runScript(window.parent, "app.echoToOE(app.activeDocument.height.toString());"))[0]);
        document.querySelector("svg").setAttribute("viewBox", `0 0 ${w} ${h}`);
    }
)();

document.querySelector("button").addEventListener("click", function() {
    async function rasterize(svgElem, quality=1, format="png") {
        var svgData = new XMLSerializer().serializeToString(svgElem);
        var imgElem = document.createElement("img");
        imgElem.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
        const myPromise = new Promise((resolve, reject) => {
            imgElem.onload = function() {
                var svgClientRect = {
                    width: parseFloat(svgElem.getAttribute("viewBox").split(" ")[2]),
                    height: parseFloat(svgElem.getAttribute("viewBox").split(" ")[3])
                };
                var canvas = document.createElement("canvas");
                canvas.width = svgClientRect.width;
                canvas.height = svgClientRect.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(imgElem, 0, 0, svgClientRect.width, svgClientRect.height);
                resolve(canvas.toDataURL("image/" + format, quality));
            }
        });
        return await myPromise;
    }
    rasterize(document.querySelector("svg"), 1, "png").then((x) => {
        Photopea.runScript(window.parent, `app.open("${x}", null, true)`);
    });
});