(function () {
    //
    //create the config object by passing as parameter your domain url
    //
        var configObject = new StitchEngine.SEConfigObject("http://localhost:49776/Api");

    //
    //create the stich engine factory and then the image renderer
    //
        var factory = new StitchEngine.SEFactory(configObject);
        var imageRenderer = factory.getImageRenderer();

    //
    // FULL LETTERING, fill the image element with id "image1"
    //

    //
    //create the options
    //
        var letteringOptions = new Options.LetteringOptions();
        letteringOptions.Text = "Text of first image ";
        letteringOptions.Height = 200;
        letteringOptions.WidthCompression = 100;
        letteringOptions.Justification = "jtCenter";
        letteringOptions.Envelope = "etDoubleConvexBridges";
        letteringOptions.Type = "ltMonogram";
        letteringOptions.Recipe = "T-Shirt";
        letteringOptions.Neendle = 1;
        letteringOptions.MachineFormat = "Melco";
        letteringOptions.Font = "Block New";

    //
    //add transformation options to lettering options
    //
        var transformationOptions = new Options.TransformationOptions();
        transformationOptions.Angle = 30;
        transformationOptions.Scale = 80;
        transformationOptions.OffsetX = 100;
        transformationOptions.OffsetY = 100;

        letteringOptions.TransformationOptions = transformationOptions;
    //
    // render...
    //
        imageRenderer.lettering(letteringOptions, "image1", function (url) {
            document.getElementById("createdUrl").innerHTML = "<u><b>The url of image element with id 'image1' is :</b></u><br />" + url;
        }, function (errorMessage) {
            console.log(errorMessage);
        });

    //
    //use lettering options with text, font and height for image element with id "image2"
    //
        var myColors = ["ff55ff", "000ff0"];

        imageRenderer.letteringTextFontColor("Text of second image", "Monogram 1", myColors, "image2", function (url) {
            console.log(url);
        }, function (errorMessage) {
            alert(errorMessage);
        });
})();