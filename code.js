var canv = document.querySelector("#outCan");

function renderNew() {
    var ctx = canv.getContext("2d");
    ctx.restore();
    ctx.save();
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.restore();
    ctx.save();
    ctx.filter = "url(#noise)";
    ctx.fillRect(0, 0, canv.width, canv.height);
}
window.addEventListener("load", renderNew);

for (var inputElem of document.querySelectorAll("input, select")) {
    inputElem.addEventListener("input", function(e) {
        var noiseElem = document.querySelector("feTurbulence");
        noiseElem.setAttribute("baseFrequency", `${document.querySelector("#baseFrequency1").value} ${document.querySelector("#baseFrequency2").value}`);
        noiseElem.setAttribute("type", document.querySelector("#noiseType").value);
        noiseElem.setAttribute("numOctaves", document.querySelector("#octaves").value);
        noiseElem.setAttribute("seed", document.querySelector("#seed").value);
        noiseElem.setAttribute("stitchTiles", document.querySelector("#stitchTiles").value);
        
        renderNew();
    });
}

var checkDimensions = (
    async function() {
        var w = parseFloat((await Photopea.runScript(window.parent, "app.echoToOE(app.activeDocument.width.toString());"))[0]);
        var h = parseFloat((await Photopea.runScript(window.parent, "app.echoToOE(app.activeDocument.height.toString());"))[0]);
        document.querySelector("svg").setAttribute("viewBox", `0 0 ${w} ${h}`);
        canv.width = w; canv.height = h;
        if (isNaN(w) || isNaN(h)) setTimeout(checkDimensions, 100);
    }
);
checkDimensions();

document.querySelector("button").addEventListener("click", function() {
    Photopea.runScript(window.parent, `app.open("${canv.toDataURL()}", null, true)`);
});