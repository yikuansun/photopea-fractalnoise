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