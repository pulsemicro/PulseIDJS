

**PulseIDJS**
---

PulseIDJS is a javascript library that helps using the PulseID Toolkit Web API. 

PulseIDJS allows rendering:

  - Lettering
  - Designs
  - Templates



Tech Info
----
PulseIDJS is based on javascript only and no third party libraries are required


Installation
--
Inside the "dist" folder you will find PulseIdjs.min.js file. Please add it to your html page. 

	<script src="PulseIdjs.min.js"></script>


How to use the PulseIDJS
--

After including the js file to your project you have to create a new stitch engine configuration object and pass as a parameter the domain of the PulseID Toolkit Web API. For example:

	var configObject = new StitchEngine.SEConfigObject("http://www.pulseidwebapi.com");

Then create a factory object by passing the configuration object that was created in the previous step. Use this factory class to create an imageRenderer object:

	var factory = new StitchEngine.SEFactory(configObject);
	var imageRenderer = factory.getImageRenderer();

The image-renderer object will help you to render embroidery images...

Please read below the full documentation of the library or visit the examples folder of the repository to see some sample code. 

**LETTERING**
----

You can create designs with text. You can get the base64 representation of the image or by giving an id of an Html-DOM image element the function will set the source property of it to the resulted url. Finally a callback function is provided to  get back the resulted url in case for further manipulation. 

To do that, there are the following methods:

 **-letteringTextFontColor(text: string, font:string, colors:string[], imageId: string, callbackSuccess: ()=> void, callbackFail: (errorMessage: string) => void)**

 You can create an embroidery lettering image by giving as parameters only the text, the font and the colors you want. See the example bellow. Please note that imageId is not required.

	var myColors = ["ff4f88", "000ff0"];

	imageRenderer.letteringTextFontColor("My text","Block New", myColors, "myImageId",  function(url){
		alert(url) // url generated from renderer
	}, function(errorMessage){
		  console.log(errorMessage);
	});


**-letteringTextFontColorBase64(text: string, font: string, colors: string[], callbackSuccess: (data: string)=> void, callbackFail: (errorMessage: string) => void)**

 You can get back the base64 string source by pass as parameters only the text, the font and the colors you want. See the example bellow.

	var myColors = ["ff4f88", "000ff0"];

	imageRenderer.letteringTextFontColorBase64("MyText", "Two Col Athletic", myColors, function(data){
		 document.getElementById("myImageId").src = "data:image/png;base64," + data;
	}, function( error ) {
		 alert( error );
	});

For full control of the lettering rendering process use the following methods

**-lettering(options: Options.LetteringOptions, imageId:string, callbackSuccess: (url:string)=> void, callbackFail: (errorMessage: string) => void)**

To see how to create lettering options please go to "**LETTERING OPTIONS**" section. The imageId is the id of the html image element, and the callback function is the function that returns the generated url. See the example below. 

First create your options object:

		var options = new Options.LetteringOptions();
        options.Text = "A TEXT";
        options.Height = 500;
        options.WidthCompression = 100;
        options.Justification = "jtCenter";
        options.Envelope = "etDoubleConvexBridges";
        options.Type = "ltMonogram";
        options.Recipe = "T-Shirt";
        options.Neendle = 1;
        options.MachineFormat = "Melco";
        options.Font = "Block New";
        
	   var transformationOptions = new Options.TransformationOptions();
	   transformationOptions.Angle = 45;
	   transformationOptions.Scale = 80;
	   transformationOptions.OffsetX = 200;
	   transformationOptions.OffsetY = 200;

	   options.TransformationOptions = transformationOptions;

    
then use your renderer to create the image:

	imageRenderer.lettering(options, "youImageId", function(url){
		alert(url); // url generated from renderer
	}, function(errorMessage){
		 console.log(errorMessage);
	});

**-letteringBase64(options: Options.LetteringOptions, callbackSuccess: (data: string) => void, callbackFail: (errorMessage: string) => void)**
 You can get back the base64 string source of generated image. See the example bellow.

	imageRenderer.letteringBase64(options, function(data){
		document.getElementById("myImageId").src = "data:image/png;base64," + data;
	}, function(error){
		alert(error);
	});


**TEMPLATES**
-----

You can render template files that located in your designs folder.

**-template(templateFile: string,imageId: string, callbackSuccess: (url) => void, personalizations?: Options.Peronalization[])**

*The personalization array is optional.*

*To see how to create a personalization object go to section "**PERSONALIZATION OPTIONS**".*
	
	var personalizations = [];
	
	var newPersonalization = new Options.Peronalization();
	newPersonalization.Name = "ElementName";
	newPersonalization.Text = "New text";
	
	personalizations.push(newPersonalization);
	
and then call the image renderer to create the image:

	imageRenderer.template("fileName", "yourImageId", function(url){
		alert(url);
	}, personalizations );


**-templateBase64(templateFile: string, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void, personalizations?: Options.Peronalization[])**

You can get back the base64 image source. Example:

	var personalizations = [];
	
	var newPersonalization = new Options.Peronalization();
	newPersonalization.Name = "ElementName";
	newPersonalization.Text = "New text";
	
	personalizations.push(newPersonalization);

and then create the base64 string

	imageRenderer.templateBase64("FileName.pxf", function(data){
		 document.getElementById("myImageId").src = "data:image/png;base64," + data;
	}, function(errorMessage){
		alert("An error occured!");
		console.log(errorMessage);
	 }, personalizations);


**DESIGNS**
----

You can render designs located in your designs folder.

**-designChangePalette(fileName: string, imageId: string, palette: string[], callbackSuccess: (url) => void, callbackFail: (errorMessage: string) => void)**

You can change the palette. Example:

	var colors = ["ff4f88", "000ff0"];
	
	imageRenderer.designChangePalette("B2VLB.PXF", "image", colors, function (url) {
            console.log(url);
        }, function(error){
			console.log(error);
	});

**-designChangeNeedles(fileName: string, imageId: string, needles: number[], callbackSuccess: (url) => void, callbackFail: (errorMessage: string) => void)**

You can also change the needles. Example:

	var needles = [0, 2];

    imageRenderer.designChangeNeedles("B2VLB.PXF", "image", needles , function (url) {
         console.log(url);
      }, function(error){
			console.log(error);
	});

**-designChangePaletteBase64(fileName: string, palette: string[], callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void)**

And change palette, working with base64. Example:

	var colors = ["ff4f88", "000ff0"];

        imageRenderer.designChangePaletteBase64("B2VLB.PXF", colors, function (base64) {
            document.getElementById("myImageId").src = "data:image/png;base64," + base64;
        }, function (error) {
            console.log(error);
        });

**-designChangeNeedlesBase64(fileName: string, needles: number[], callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void)**

And change needles, working with base64. Example:

	 var needles = [2, 0];

        imageRenderer.designChangeNeedlesBase64("B2VLB.PXF", needles, function (base64) {
            document.getElementById("myImageId").src = "data:image/png;base64," + base64;
        }, function (error) {
            console.log(error);
        });

For full control of the design rendering process use the following methods

**-design(fileName: string, imageId: string, palette: string[], needles: number[], transformationOptions: Options.TransformationOptions, callbackSuccess: (url) => void, callbackFail: (errorMessage: string) => void)**

In this method, you pass as parameters the file name of the desired design, the id of the HTML-DOM image element you want to change, the palette, the needles, the transformation options (please go to section "**TRANSFORMATION OPTIONS**" to see how to create a transformation options object), and the callback function that returns the generated url. Example:

	var transformationOptions = new Options.TransformationOptions();
        transformationOptions.Angle = 45;
        transformationOptions.Scale = 80;
        
	var palette = ["ffff00"];
	var needles = [1,2];

	imageRenderer.design("B2VLB.PXF", "imageId",palette , needles, transformationOptions, function (url) {
            console.log(url);
        }, function(error){
				console.log(err);
	});


**-designBase64(fileName: string, palette: string[], needles: number[], transformationOptions: Options.TransformationOptions, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void)**

And the same with base64. Example:

	var transformationOptions = new Options.TransformationOptions();

    transformationOptions.Angle = 45;
    transformationOptions.Scale = 80;

	var needles = [0, 3];
	var palette = ["ff0012", "00ff00"];

	imageRenderer.designBase64("B2VLB.PXF", palette, needles, transformationOptions, function (base64) {
            document.getElementById("image").src = "data:image/png;base64," + base64;
        }, function (err) {
            console.log(err);
        });

**GET INFORMATION**
----

You can get information about the available fonts and recipes in json or xml format. To do that, you first have to create an assets manager and then call the proper functions. 

*To create assets manager use the factory you created in previous steps. Example on creating an assets manager:*

	var assetsManager = factory.getAssetsManager();

**GET FONTS**
----

**-getFonts(callbackSuccess: (fonts) => void, callbackFail: (errorMessage: string) => void)**

This method takes only the callback for success and callback for failure, and returns the fonts list in xml format. Example:

	assetsManager.getFonts(function (fonts) {
            console.log(fonts);
        }, function (error) {
            alert(error);
        });

**-getFontsToJsonFormat(options: Options.getFontOptions, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void)**

In this method you have to pass the font options (to see how to create a font options object go to "**FONT OPTIONS**" section), and the two callbacks. The result is in json format. Example:

	var fontOptions = new Options.getFontOptions();
    fontOptions.IsSorted = true;

    assetsManager.getFontsToJsonFormat(fontOptions, function (fontsInJson) {
        console.log(fontsInJson);
    }, function (error) {
        alert(error);
    });

**-getFontsToXmlFormat(options: Options.getFontOptions, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void)**

This method is similar to getFontsToJsonFormat, but the result is in XML format.

**GET RECIPES**
---

**-getRecipesToXml(callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void, issorted?: boolean)**

This method takes as parameters the two callbacks and a boolean indicating if you want the list to be sorted, and returns the recipes list in xml format. Example:

	assetsManager.getRecipesToXml(function (recipesInXML) {
            console.log(recipesInXML);
        }, function (error) {
            alert(error);
        }, true);

**-getRecipesToJson(callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void, issorted?: boolean)**

This method is the same as *getRecipesToXml*, but the result is in JSON format.

	assetsManager.getRecipesToJson(function (recipesInJson) {
            console.log(recipesInJson);
        }, function (error) {
            alert(error);
        }, true);
 

LETTERING OPTIONS
---

A letteringOptions object can take the following parameters:
*All parameters can be null*

 - **Text**: string (default value is "ABC")
 - **Type**: string (default value is "ltNormal", please refer to PulseID Toolkit Web API documentation to see the valid values)
 - **Font**: string (defaule value is "Block New", to see how to get the list of fonts go to section "**GET FONTS**")
 - **Height**: number (default value is 254)
 - **WidthCompression**: number (default value is 100 for 100%)
 - **Justification**: string (default value is "jtCenter", please refer to PulseID Toolkit Web API documentation to see the valid values)
 - **Envelope**: string (default value is "etRectangle", please refer to PulseID Toolkit Web API documentation to see the valid values)
 - **Decoration**: string (Valid only when Type="Monogram")
 - **Needle**: number
 - **Recipe**: string (default is "Normal", to see how to get the list of fonts go to section "**GET RECIPES**")
 - **MachineFormat**: string (default is "Tajima")
 - **X1**: number 
 -  **X2**: number 
 - **Y1**: number 
 - **Y2**: number 
 - **Palette**: string array(Values are RGB sextuplets eg. "ff0000" is red)
 - **TransfomationOptions**: TransformationOptions object (to see how to create a transformation options object go to "**TRANSFORMATION OPTIONS**" section)

Example of creating a LetteringOptions object:

Create a new LetteringOptions object:

	var options = new Options.LetteringOptions();

Create a transformation object if needed : 
	 	
	var transformationOptions = new Options.TransformationOptions();
        transformationOptions.Angle = 45;
        transformationOptions.Scale = 80;

and add it to your options:
	options.TransformationOptions = transformationOptions;

create your rest options:

	options.Text = "My text";
        options.Height = 400;
        options.WidthCompression = 90;
        options.Justification = "jtCenter";
        options.Envelope = "etDoubleConvexBridges";
        options.Type = "ltMonogram";
        options.Recipe = "T-Shirt";
        options.Neendle = 1;
        options.MachineFormat = "Melco";

TRANSFORMATION OPTIONS
---

Transformation options can take the following parameters:

 - **Scale **: number
 - **Angle **: number
 - **OffsetX **: number
 - **OffsetY **: number
 - **ResetOrigin **: boolean

Example of creating a transformation object:

	var transformationOptions = new Options.TransformationOptions();
        transformationOptions.Angle = 45;
        transformationOptions.Scale = 80;
        transformationOptions.OffsetX = 200;
        transformationOptions.OffsetY = 200;
        transformationOptions.ResetOrigin = true;

PERSONALIZATION OPTIONS
---
Personalization options can take the follow parameters:

 - Name: string (element's name)
 - Design: string (design's name)
 - Text: string
 - TextColour: string

Example of creating a personalization object:

	var personalizationObject = new Options.Peronalization();
	personalizationObject.Name = "MyName";
	personalizationObject.Design = "Design.pxf";
	personalizationObject.Text = "My text";
	personalizationObject.TextColour = "Red";


**FONT OPTIONS**

Font options can take the following paraeters:

- **Type:** string (default is "all", please refer to PulseID Toolkit Web API documentation to see the valid values)
- **IsSorted:** boolean (default is false)

Example:

	var fontOptions = new Options.getFontOptions();
        fontOptions.IsSorted = true;
	fontOptions.Type = "ftEmbroidery";
