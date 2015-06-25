module Renderer {
    export class ImageRenderer implements Helpers.IRenderer {
        private confObject: StitchEngine.SEConfigObject;
        private urlConstructor: Utils.UrlConstructor;

        constructor(confObject: StitchEngine.SEConfigObject, urlConstructor: Utils.UrlConstructor) {
            this.confObject = confObject;
            this.urlConstructor = urlConstructor;
        }

        lettering(options: Options.LetteringOptions, imageId: string, callbackSuccess: (url: string) => void, callbackFail: (errorMessage: string) => void) {
            var invalidColors = false;

            if (options.Palette) {
                for (var i = 0; i < options.Palette.length; i++) {
                    if (!/(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(options.Palette[i])) {
                        invalidColors = true;
                        break;
                    }
                }
            } 

            if (invalidColors && callbackFail)
                callbackFail("Invalid color");

            if (invalidColors)
                options.Palette = null;

            var url = this.urlConstructor.createLetteringUrl(this.confObject.url, options);

            if (imageId) {
                var element = document.getElementById(imageId);
                if (element) {
                    element.setAttribute("src", url);
                }
            }

            if (callbackSuccess)
                callbackSuccess(url);
        }

        letteringTextFontColor(text: string, font: string, colors: string[], imageId: string, callbackSuccess: () => void,
            callbackFail: (errorMessage: string) => void): void {

            var options = new Options.LetteringOptions();
            options.Text = text;
            options.Font = font;
            var invalidColors = false;

            if (colors) {
                for (var i = 0; i < colors.length; i++) {
                    if (!/(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colors[i])) {
                        invalidColors = true;
                        break;
                    }
                }
            }

            if (invalidColors) {
                callbackFail("Invalid color.");
            }


            if (colors && !invalidColors) {
                    options.Neendle = 0;
                    options.Palette = colors;
            }

            this.lettering(options, imageId, callbackSuccess, null);
        }

        letteringBase64(options: Options.LetteringOptions, callbackSuccess: (data: string) => void, callbackFail: (errorMessage: string) => void) {
            var invalidColors = false;

            if (options.Palette) {
                for (var i = 0; i < options.Palette.length; i++) {
                    if (!/(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(options.Palette[i])) {
                        invalidColors = true;
                        break;
                    }
                }
            }

            if (invalidColors && callbackFail)
                callbackFail("Invalid colors");

            if (!invalidColors) {
                var url = this.urlConstructor.createLetteringUrl(this.confObject.url, options);
                this.GetBase64Image(url, callbackSuccess, callbackFail);
            }
        }

        letteringTextFontColorBase64(text: string, font: string,colors: string[], callbackSuccess: (data: string)=> void, callbackFail: (errorMessage: string) => void) {
            var options = new Options.LetteringOptions();
            options.Text = text;
            options.Font = font;
            var invalidColors = false;

            if (colors) {
                for (var i = 0; i < colors.length; i++) {
                    if (!/(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colors[i])) {
                        invalidColors = true;
                        break;
                    }
                }
            }

            if (invalidColors && callbackFail) {
                callbackFail("Invalid color.");
            }


            if (colors && !invalidColors) {
                options.Neendle = 0;
                options.Palette = colors;
            }

            var url = this.urlConstructor.createLetteringUrl(this.confObject.url, options);
            this.GetBase64Image(url, callbackSuccess, callbackFail);
        }

        template(templateFile: string,imageId: string, callbackSuccess: (url) => void, personalizations?: Options.Peronalization[]) {
            var url = this.urlConstructor.createTemplateUrl(this.confObject.url,templateFile, personalizations);

            if (imageId) {
                var element = document.getElementById(imageId);
                if (element) {
                    element.setAttribute("src", url);
                }
            }

            if (callbackSuccess)
                callbackSuccess(url);
        }

        templateBase64(templateFile, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void,
            personalizations?: Options.Peronalization[]) {

            var url = this.urlConstructor.createTemplateUrl(this.confObject.url ,templateFile, personalizations);

            this.GetBase64Image(url, callbackSuccess, callbackFail);
        }

        design(fileName: string, imageId, palette: string[], needles: number[], transformationOptions: Options.TransformationOptions,
            callbackSuccess: (url) => void, callbackFail: (errorMessage: string) => void) {
            var invalidColors = false;

            if (palette) {
                for (var i = 0; i < palette.length; i++) {
                    if (!/(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(palette[i])) {
                        invalidColors = true;
                        break;
                    }
                }
            }

            if (invalidColors && callbackFail)
                callbackFail("Invalid color");

            var paletteColors = (invalidColors) ? null : palette;
            var url = this.urlConstructor.createDesignUrl(this.confObject.url,fileName, paletteColors, needles, transformationOptions);

            if (imageId) {
                var element = document.getElementById(imageId);
                if (element) {
                    element.setAttribute("src", url);
                }
            }

            if (callbackSuccess)
                callbackSuccess(url);
        }

        designChangePalette(fileName: string, imageId: string, palette: string[], callbackSuccess: (url) => void, callbackFail: (errorMessage: string) => void) {
            this.design(fileName, imageId, palette, null, null, callbackSuccess, callbackFail);
        }

        designChangeNeedles(fileName: string, imageId, needles: number[], callbackSuccess: (url) => void, callbackFail: (errorMessage: string) => void) {
            this.design(fileName, imageId, null, needles, null, callbackSuccess, callbackFail);
        }

        designBase64(fileName: string, palette: string[], needles: number[], transformationOptions: Options.TransformationOptions, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
            var invalidColors = false;

            if (palette) {
                for (var i = 0; i < palette.length; i++) {
                    if (!/(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(palette[i])) {
                        invalidColors = true;
                        break;
                    }
                }
            }

            if (invalidColors && callbackFail)
                callbackFail("Invalid color");

            if (!invalidColors) {
                var url = this.urlConstructor.createDesignUrl(this.confObject.url,fileName, palette, needles, transformationOptions);
                this.GetBase64Image(url, callbackSuccess, callbackFail);
            }
        }

        designChangePaletteBase64(fileName: string, palette: string[], callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
            var invalidColors = false;

            if (palette) {
                for (var i = 0; i < palette.length; i++) {
                    if (!/(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(palette[i])) {
                        invalidColors = true;
                        break;
                    }
                }
            }

            if (invalidColors && callbackFail)
                callbackFail("Invalid color");

            if (!invalidColors) {
                var url = this.urlConstructor.createDesignUrl(this.confObject.url,fileName, palette, null, null);
                this.GetBase64Image(url, callbackSuccess, callbackFail);
            }
        }

        designChangeNeedlesBase64(fileName: string, needles: number[], callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
            var url = this.urlConstructor.createDesignUrl(this.confObject.url ,fileName, null, needles, null);
            this.GetBase64Image(url, callbackSuccess, callbackFail);
        }

        compound(compoundOptions: Options.CompoundOptions, imageId: string, callbackSuccess:(url: string) => void) {
            var url = this.urlConstructor.createCompoundUrl(this.confObject.url,compoundOptions);

            if (imageId) {
                var element = document.getElementById(imageId);
                if (element) {
                    element.setAttribute("src", url);
                }
            }
        }

        compoundBase64(compoundOptions: Options.CompoundOptions, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
            var url = this.urlConstructor.createCompoundUrl(this.confObject.url,compoundOptions);

            this.GetBase64Image(url, callbackSuccess, callbackFail);
        }

        private GetBase64Image(url: string, callbackSuccess: (base64string: string) => void, callbackFail: (errorMessage: string)=> void) {
            var img = new Image();
            var dataURL = "";
            img.src = url;
            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                // Copy the image contents to the canvas
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                // Get the data-URL formatted image
                // Firefox supports PNG and JPEG. You could check img.src to
                // guess the original format, but be aware the using "image/jpg"
                // will re-encode the image.
                dataURL = canvas.toDataURL("image/png");
                if (callbackSuccess)
                    callbackSuccess(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));  
            }

            img.onerror = function () {
                if(callbackFail)
                    callbackFail("Image could not be loaded.");
            }
        }
    }
}