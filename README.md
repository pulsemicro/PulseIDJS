

**StitchportJS**
---

StitchportJS is a javascript library that helps using the StitchPortWebAPI. 

StitchportJS allows rendering:

  - Lettering
  - Designs
  - Compounds
  - Templates

Rendering is separated to cases:

 - StitchportJS can take an image ID as a parameter and fill it with the desired image. It can also get a callback in case that the user wants to manipulate the generated url
 - StitchportJS can return the generated image source in base64 string format

Tech
----
StitchportJS is based on javascript only and no third parties projects or libraries are required


Installation
--


	<script src="StitchportJS.js"></script>


How to use the StitchportJS
--

After including the js file to your project you have to create a new stitch engine configuration object and pass as a parameter the domain of the stitchport web api. For example:

	var configObject = new StitchEngine.SEConfigObject("http://www.stitchportwebapi.com");

Then you have to create a factory object in order to get the image renderer, and pass the configuration object that created in previous step:

	var factory = new StitchEngine.SEFactory(configObject);
	var imageRenderer = factory.getImageRenderer();

After creating the imageRenderer you are ready to use the library for rendering images.

**LETTERING**
----

You can create designs with text. You can get the base64 representation of the image or by giving an id of an Html-DOM Image element the function will set the source property of it to the resulted image. Finally a callback function is provided to  get back the created url. 

To do that, there are the following methods:

 **-letteringTextAndFont(text: string,font:string, imageId: string, callbackSuccess: ()=> void)**
 You can create an image by giving as parameters only the text and the font. See the example bellow.

	imageRenderer.letteringTextAndFont("My text","Block New", "myImageId",  function(url){
		alert(url) // url generated from renderer
	});


**-letteringTextAndFontBase64String(text: string, font: string, callbackSuccess: (data: string)=> void, callbackFail: (errorMessage: string) => void)**
 You can get back the base64 string source by pass as parameters only the text and the font. See the example bellow.

	imageRenderer.letteringTextAndFontBase64String("MyText", "MyFont", function(data){
		 document.getElementById("myImageId").src = "data:image/png;base64," + data;
	}, function( error ) {
		alert( error );
	});

For full control of the lettering rendering process use the following methods

**-lettering(options: Options.LetteringOptions, imageId:string, callbackSuccess: (url:string)=> void)**

To see how to create lettering options please go to "**LETTERING OPTIONS**" section. The imageId is the id of the image html element, and the callback function is the function that returns the generated url. See the example below. 

First create your options object:

		var options = new Options.LetteringOptions();
        options.Text = "pavlos";
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
	});

**-letteringBase64String(options: Options.LetteringOptions, callbackSuccess: (data: string) => void, callbackFail: (errorMessage: string) => void)**
 You can get back the base64 string source of generated image. See the example bellow.

	imageRenderer.letteringBase64String(options, function(data){
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


**-templateBase64String(templateFile, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void, personalizations?: Options.Peronalization[])**

You can get back the base64 image source. Example:

	var personalizations = [];
	
	var newPersonalization = new Options.Peronalization();
	newPersonalization.Name = "ElementName";
	newPersonalization.Text = "New text";
	
	personalizations.push(newPersonalization);

and then create the base64 string

	imageRenderer.templateBase64String("FileName.pxf", function(data){
		 document.getElementById("myImageId").src = "data:image/png;base64," + data;
	}, function(errorMessage){
		alert("An error occured!");
		console.log(errorMessage);
	 }, personalizations);


LETTERING OPTIONS
---

A letteringOptions object can take the following parameters:
*All parameters can be null*

 - **Text**: string (default value is "ABC")
 - **Type**: string (default value is "ltNormal", please refer to stitchport WebAPI documentation to see the valid values)
 - **Font**: string (defaule value is "Block New", to see how to get the list of fonts go to section "**GET FONTS**")
 - **Height**: number (default value is 254)
 - **WidthCompression**: number (default value is 100 for 100%)
 - **Justification**: string (default value is "jtCenter", please refer to stitchport WebAPI documentation to see the valid values)
 - **Envelope**: string (default value is "etRectangle", please refer to stitchport WebAPI documentation to see the valid values)
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
 - TextColour

Example of creating a personalization object:

	var personalizationObject = new Options.Peronalization();
	personalizationObject.Name = "MyName";
	personalizationObject.Design = "Design.pxf";
	personalizationObject.Text = "My text";
	personalizationObject.TextColour = "Red";
