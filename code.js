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