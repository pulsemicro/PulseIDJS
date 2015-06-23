module Renderer {
    export class ImageRenderer implements Helpers.IRenderer {
        private confObject: StitchEngine.SEConfigObject;

        constructor(confObject: StitchEngine.SEConfigObject) {
            this.confObject = confObject;
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

            var url = this.createLetteringUrl(options);

            if (imageId) {
                var element = document.getElementById(imageId);
                var src = element.attributes.getNamedItem("src");
                src.value = url;
                //this.GetBase64Image(url, callbackSuccess);
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

        letteringBase64String(options: Options.LetteringOptions, callbackSuccess: (data: string) => void, callbackFail: (errorMessage: string) => void) {
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
                var url = this.createLetteringUrl(options);
                this.GetBase64Image(url, callbackSuccess, callbackFail);
            }
        }

        letteringTextFontColorBase64String(text: string, font: string,colors: string[], callbackSuccess: (data: string)=> void, callbackFail: (errorMessage: string) => void) {
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

            var url = this.createLetteringUrl(options);
            this.GetBase64Image(url, callbackSuccess, callbackFail);
        }

        template(templateFile,imageId, callbackSuccess: (url) => void, personalizations?: Options.Peronalization[]) {
            var url = this.createTemplateUrl(templateFile, personalizations);

            if (imageId) {
                var element = document.getElementById(imageId);
                var src = element.attributes.getNamedItem("src");
                src.value = url;
            }

            if (callbackSuccess)
                callbackSuccess(url);
        }

        templateBase64String(templateFile, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void,
            personalizations?: Options.Peronalization[]) {

            var url = this.createTemplateUrl(templateFile, personalizations);

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
            var url = this.createDesignUrl(fileName, paletteColors, needles, transformationOptions);

            if (imageId) {
                var element = document.getElementById(imageId);
                var src = element.attributes.getNamedItem("src");
                src.value = url;
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

        designBase64String(fileName: string, palette: string[], needles: number[], transformationOptions: Options.TransformationOptions, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
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
                var url = this.createDesignUrl(fileName, palette, needles, transformationOptions);
                this.GetBase64Image(url, callbackSuccess, callbackFail);
            }
        }

        designChangePaletteBase64String(fileName: string, palette: string[], callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
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
                var url = this.createDesignUrl(fileName, palette, null, null);
                this.GetBase64Image(url, callbackSuccess, callbackFail);
            }
        }

        designChangeNeedlesBase64String(fileName: string, needles: number[], callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
            var url = this.createDesignUrl(fileName, null, needles, null);
            this.GetBase64Image(url, callbackSuccess, callbackFail);
        }

        compound(compoundOptions: Options.CompoundOptions, imageId: string, callbackSuccess:(url: string) => void) {
            var url = this.createCompoundUrl(compoundOptions);

            if (imageId) {
                var element = document.getElementById(imageId);
                var src = element.attributes.getNamedItem("src");
                src.value = url;
            }
        }

        compoundBase64String(compoundOptions: Options.CompoundOptions, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
            var url = this.createCompoundUrl(compoundOptions);

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

        private createLetteringUrl(options: Options.LetteringOptions) {
            var text = (options.Text) ? options.Text : "ABC";
            var url = this.confObject.url + "render/Lettering?Text=" + text;

            if (options.Type)
                url += "&Type=" + options.Type;
            if (options.Font)
                url += "&Font=" + options.Font.replace(/\s/g, "%20");
            if (options.Height)
                url += "&height=" + options.Height;
            if (options.WidthCompression)
                url += "&WidthCompression=" + options.WidthCompression;
            if (options.Justification)
                url += "&Justification=" + options.Justification;
            if (options.Envelope)
                url += "&Envelope=" + options.Envelope;
            if (options.Decoration && options.Type.toLowerCase() == "monogram")
                url += "&Decoration=" + options.Decoration;
            if (options.Recipe)
                url += "&Recipe=" + options.Recipe.replace(/\s/g, "%20");
            if (options.Neendle)
                url += "&Needle=" + options.Neendle;
            if (options.MachineFormat)
                url += "&MachineFormat=" + options.MachineFormat.replace(/\s/g, "%20");
            if (options.X1)
                url += "&X1=" + options.X1;
            if (options.X2)
                url += "&X2=" + options.X2;
            if (options.Y1)
                url += "&Y1=" + options.Y1;
            if (options.Y2)
                url += "&Y2=" + options.Y2;
            if (options.TransformationOptions) {
                if (options.TransformationOptions.Angle)
                    url += "&Angle=" + options.TransformationOptions.Angle;
                if (options.TransformationOptions.Scale)
                    url += "&Scale=" + options.TransformationOptions.Scale;
                if (options.TransformationOptions.OffsetX)
                    url += "&OffsetX=" + options.TransformationOptions.OffsetX;
                if (options.TransformationOptions.OffsetY)
                    url += "&OffsetY=" + options.TransformationOptions.OffsetY;
                if (options.TransformationOptions.ResetOrigin)
                    url += "&ResetOrigin=" + options.TransformationOptions.ResetOrigin;
            }
            if (options.Palette) {
                for (var j = 0; j < options.Palette.length; j++) {
                    url += "&palette[" + j + "]=" + options.Palette[j];
                }
            }
            return url;
        }

        private createTemplateUrl(file: string, personalizations: Options.Peronalization[]) {
            var url = this.confObject.url + "render/templates/" + file;
            if (personalizations) {
                if (personalizations.length > 0) {
                    url += "?";
                    var firstPer = true;
                    for (var i = 0; i < personalizations.length; i++) {
                        if (personalizations[i].Name) {
                            if (!firstPer)
                                url += "&"

                            url += "Personalizations[" + i + "].Name=" + personalizations[i].Name.replace(/\s/g, "%20");

                            if (firstPer)
                                firstPer = false;
                        }
                        if (personalizations[i].Design) {
                            if (!firstPer)
                                url += "&"

                            url += "Personalizations[" + i + "].Design=" + personalizations[i].Design.replace(/\s/g, "%20");

                            if (firstPer)
                                firstPer = false;
                        }
                        if (personalizations[i].Text) {
                            if (!firstPer)
                                url += "&"

                            url += "Personalizations[" + i + "].Text=" + personalizations[i].Text.replace(/\s/g, "%20");

                            if (firstPer)
                                firstPer = false;
                        }
                        if (personalizations[i].TextColour) {
                            if (!firstPer)
                                url += "&"

                            url += "Personalizations[" + i + "].TextColour=" + personalizations[i].TextColour.replace(/\s/g, "%20");

                            if (firstPer)
                                firstPer = false;
                        }
                    }
                }
            }
            return url;
        }

        private createDesignUrl(designFile: string, palette: string[], needles: number[], transformationOptions: Options.TransformationOptions) {
            var url = this.confObject.url + "render/Designs/" + designFile + "?";
            var isFirstParameter = true;

            if (palette) {
                for (var i = 0; i < palette.length; i++) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "Palette[" + i + "]=" + palette[i];
                    isFirstParameter = false;
                }
            }

            if (needles) {
                for (var j = 0; j < needles.length; j++) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "Needles[" + j + "]=" + needles[j];
                    isFirstParameter = false;
                }
            }

            if (transformationOptions) {
                if (transformationOptions.Angle) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "angle=" + transformationOptions.Angle;
                    isFirstParameter = false;
                }
                if (transformationOptions.OffsetX) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "OffsetX=" + transformationOptions.OffsetX;
                    isFirstParameter = false;
                }
                if (transformationOptions.OffsetY) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "OffsetY=" + transformationOptions.OffsetY;
                    isFirstParameter = false;
                }
                if (transformationOptions.ResetOrigin) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "ResetOrigin=" + transformationOptions.ResetOrigin;
                    isFirstParameter = false;
                }
                if (transformationOptions.Scale) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "Scale=" + transformationOptions.Scale;
                    isFirstParameter = false;
                }
            }
            return url;
        }

        private createCompoundUrl(compoundOptions: Options.CompoundOptions) {
            var url = this.confObject.url + "render/Compound?";
            var isFirstParameter = true;

            if (compoundOptions) {
                if (compoundOptions.CompoundElements) {
                    var compoundResponse = this.addCompoundOtionsToUrl(compoundOptions.CompoundElements, url, isFirstParameter);
                    url = compoundResponse.url;
                    isFirstParameter = compoundResponse.isFirstParameter;
                }
                if (compoundOptions.Layout) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "layout=" + compoundOptions.Layout;
                    isFirstParameter = false;
                }
                if (compoundOptions.MachineFormat) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "MachineFormat =" + compoundOptions.MachineFormat;
                    isFirstParameter = false;
                }
                if (compoundOptions.Needles) {
                    for (var j = 0; j < compoundOptions.Needles.length; j++) {
                        if (!isFirstParameter)
                            url += "&";

                        url += "needles["+ j + "]=" + compoundOptions.Needles[j];
                        isFirstParameter = false;
                    }
                }
                if (compoundOptions.Palette) {
                    for (var j = 0; j < compoundOptions.Palette.length; j++) {
                        if (!isFirstParameter)
                            url += "&";

                        url += "palette[" + j + "]=" + compoundOptions.Palette[j];
                        isFirstParameter = false;
                    }
                }
                if (compoundOptions.Recipe) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "recipe=" + compoundOptions.Recipe.replace(/\s/g, "%20");
                    isFirstParameter = false;
                }
                if (compoundOptions.StackedAlignment) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "StackedAlignment=" + compoundOptions.StackedAlignment.replace(/\s/g, "%20");
                    isFirstParameter = false;
                }
                if (compoundOptions.StackedSpacing) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "StackedSpacing=" + compoundOptions.StackedSpacing;
                    isFirstParameter = false;
                }
                if (compoundOptions.TransformationOptions) {
                    if (compoundOptions.TransformationOptions.Angle) {
                        if (!isFirstParameter)
                            url += "&";

                        url += "angle=" + compoundOptions.TransformationOptions.Angle;
                        isFirstParameter = false;
                    }
                    if (compoundOptions.TransformationOptions.OffsetX) {
                        if (!isFirstParameter)
                            url += "&";

                        url += "offsetX=" + compoundOptions.TransformationOptions.OffsetX;
                        isFirstParameter = false;
                    }
                    if (compoundOptions.TransformationOptions.OffsetY) {
                        if (!isFirstParameter)
                            url += "&";

                        url += "offsetY=" + compoundOptions.TransformationOptions.OffsetY;
                        isFirstParameter = false;
                    }
                    if (compoundOptions.TransformationOptions.ResetOrigin) {
                        if (!isFirstParameter)
                            url += "&";

                        url += "resetOrigin=" + compoundOptions.TransformationOptions.ResetOrigin;
                        isFirstParameter = false;
                    }
                    if (compoundOptions.TransformationOptions.Scale) {
                        if (!isFirstParameter)
                            url += "&";

                        url += "scale=" + compoundOptions.TransformationOptions.Scale;
                        isFirstParameter = false;
                    }
                }
            }

            return url;
        }

        private addCompoundOtionsToUrl(elements: Options.CompoundElements[], url, isFirstParameter: boolean) {
            for (var i = 0; i < elements.length; i++) {
                var isFirstElementParameter = true;
                if (!isFirstParameter)
                    url += "&";

                if (elements[i].Design) {
                    if (elements[i].Design.File) {
                        if (!isFirstParameter)
                            url += "&";
                        url += "Elements[" + i + "]=Designs/";
                        isFirstParameter = false;
                        var isFirstElementParameter = true;

                        url += elements[i].Design.File + "%3f";

                        if (elements[i].Design.needles) {
                            for (var j = 0; j < elements[i].Design.needles.length; j++) {
                                if (!isFirstElementParameter)
                                    url += "%26";

                                url += "needles[" + j + "]=" + elements[i].Design.needles[j];
                                isFirstElementParameter = false;
                            }
                        }
                        if (elements[i].Design.palette) {
                            for (var k = 0; k < elements[i].Design.palette.length; k++) {
                                if (!isFirstElementParameter)
                                    url += "%26";

                                url += "palette[" + k + "]=" + elements[i].Design.palette[k];
                                isFirstElementParameter = false;
                            }
                        }
                    } 
                }
                if (elements[i].Letteting) {
                    if (!isFirstParameter)
                        url += "&";

                    url += "Elements[" + i + "]=Lettering%3fText=";
                    isFirstParameter = false;

                    url = this.addLetteringToCompoundUrl(elements[i].Letteting, url, isFirstElementParameter);
                }
            }

            return {
                url: url,
                isFirstParameter: isFirstParameter
            };
        }

        private addLetteringToCompoundUrl(options: Options.LetteringOptions, url: string, isFirstElement: boolean) {
            var text = (options.Text) ? options.Text : "ABC";
            url += text;

            if (options.Decoration)
                url += "%26decoration=" + options.Decoration;
            if (options.Envelope)
                url += "%26envelope=" + options.Envelope;
            if (options.Font)
                url += "%26font=" + options.Font;
            if (options.Height)
                url += "%26height=" + options.Height;
            if (options.Justification)
                url += "%26Justification=" + options.Justification;
            if (options.MachineFormat)
                url += "%26MachineFormat=" + options.MachineFormat;
            if (options.Neendle)
                url += "%26needle=" + options.Neendle;
            if (options.Recipe)
                url += "%26Recipe=" + options.Recipe;
            if (options.TransformationOptions) {
                if (options.TransformationOptions.Angle)
                    url += "%26Angle=" + options.TransformationOptions.Angle;
                if (options.TransformationOptions.OffsetX)
                    url += "%26OffsetX=" + options.TransformationOptions.OffsetX;
                if (options.TransformationOptions.OffsetY)
                    url += "%26OffsetY=" + options.TransformationOptions.OffsetY;
                if (options.TransformationOptions.ResetOrigin)
                    url += "%26ResetOrigin=" + options.TransformationOptions.ResetOrigin;
                if (options.TransformationOptions.Scale)
                    url += "%26Scale=" + options.TransformationOptions.Scale;
            }
            if (options.Type)
                url += "%26Type=" + options.Type;
            if (options.WidthCompression)
                url += "%26WidthCompression=" + options.WidthCompression;
            if (options.X1)
                url += "%26X1=" + options.X1;
            if (options.X2)
                url += "%26X2=" + options.X2;
            if (options.Y1)
                url += "%26Y1=" + options.Y1;

            return url;
        }
    }
}