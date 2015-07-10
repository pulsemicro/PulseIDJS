var Assets;
(function (Assets) {
    var AssetsManager = (function () {
        function AssetsManager(confObject) {
            this.configObject = confObject;
        }
        AssetsManager.prototype.getFonts = function (callbackSuccess, callbackFail) {
            var options = new Options.getFontOptions();
            var url = this.createGetFontUrl(options);

            this.handleRequest(url, callbackSuccess, callbackFail);
        };

        AssetsManager.prototype.getFontsToJsonFormat = function (options, callbackSuccess, callbackFail) {
            var url = this.createGetFontUrl(options, "json");

            this.handleRequest(url, callbackSuccess, callbackFail);
        };

        AssetsManager.prototype.getFontsToXmlFormat = function (options, callbackSuccess, callbackFail) {
            var url = this.createGetFontUrl(options);

            this.handleRequest(url, callbackSuccess, callbackFail);
        };

        AssetsManager.prototype.getRecipesToXml = function (callbackSuccess, callbackFail, issorted) {
            var recipeOptions = new Options.getRecipesOptions();
            if (issorted)
                recipeOptions.IsSorted = issorted;

            var url = this.createGetRecipesUrl(recipeOptions);
            this.handleRequest(url, callbackSuccess, callbackFail);
        };

        AssetsManager.prototype.getRecipesToJson = function (callbackSuccess, callbackFail, issorted) {
            var recipeOptions = new Options.getRecipesOptions();
            recipeOptions.Format = "json";
            if (issorted)
                recipeOptions.IsSorted = issorted;

            var url = this.createGetRecipesUrl(recipeOptions);
            this.handleRequest(url, callbackSuccess, callbackFail);
        };

        AssetsManager.prototype.createGetFontUrl = function (options, format) {
            if (typeof format === "undefined") { format = "xml"; }
            var url = this.configObject.url + "List/Fonts?format=" + format;

            if (options.Type)
                url += "&type=" + options.Type;
            if (options.IsSorted)
                url += "&issorted=" + options.IsSorted;

            return url;
        };

        AssetsManager.prototype.createGetRecipesUrl = function (options) {
            var format = (options.Format) ? options.Format : "xml";
            var url = this.configObject.url + "List/Recipes?format=" + format;

            if (options.IsSorted)
                url += "&issorted=" + options.IsSorted;

            return url;
        };

        AssetsManager.prototype.handleRequest = function (url, callbackSuccess, callbackFail) {
            var request = this.createCORSRequest("GET", url);
            if (!request)
                callbackFail("Your browser deos not support ajax calls");
            else
                request.send();

            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var resp = request.response;

                    if (callbackSuccess)
                        callbackSuccess(resp);
                } else if (request.readyState == 4 && request.status == 404) {
                    if (callbackFail)
                        callbackFail("Server not found");
                } else if (request.readyState == 4 && request.status == 500) {
                    if (callbackFail)
                        callbackFail("Internal server error");
                }
            };
        };

        AssetsManager.prototype.createCORSRequest = function (method, url) {
            var myXhr;
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                myXhr = xhr;
                myXhr.open(method, url, true);
            } else if (typeof XDomainRequest != "undefined") {
                var xhr2 = new XDomainRequest();
                myXhr = xhr2;
                xhr.open(method, url);
            } else {
                myXhr = null;
            }
            return myXhr;
        };
        return AssetsManager;
    })();
    Assets.AssetsManager = AssetsManager;
})(Assets || (Assets = {}));
var Options;
(function (Options) {
    var RenderingOptions = (function () {
        function RenderingOptions() {
            this.Format = null;
            this.Background = null;
            this.ImageHeight = null;
            this.ImageWidth = null;
            this.DPI = null;
            this.IsSquare = null;
            this.Padding = null;
        }
        return RenderingOptions;
    })();
    Options.RenderingOptions = RenderingOptions;

    var LetteringOptions = (function () {
        function LetteringOptions() {
            this.Text = null;
            this.Type = null;
            this.Font = null;
            this.Height = null;
            this.WidthCompression = null;
            this.Justification = null;
            this.Envelope = null;
            this.Recipe = null;
            this.X1 = null;
            this.X2 = null;
            this.Y1 = null;
            this.Y2 = null;
            this.Decoration = null;
            this.Neendle = null;
            this.MachineFormat = null;
            this.TransformationOptions = null;
            this.Palette = null;
            this.RenderingOptions = null;
        }
        return LetteringOptions;
    })();
    Options.LetteringOptions = LetteringOptions;

    var TransformationOptions = (function () {
        function TransformationOptions() {
            this.Angle = null;
            this.Scale = null;
            this.OffsetX = null;
            this.OffsetY = null;
            this.ResetOrigin = null;
        }
        return TransformationOptions;
    })();
    Options.TransformationOptions = TransformationOptions;

    var getFontOptions = (function () {
        function getFontOptions() {
            this.IsSorted = null;
            this.Type = null;
        }
        return getFontOptions;
    })();
    Options.getFontOptions = getFontOptions;

    var getRecipesOptions = (function () {
        function getRecipesOptions() {
            this.Format = null;
            this.IsSorted = null;
        }
        return getRecipesOptions;
    })();
    Options.getRecipesOptions = getRecipesOptions;

    var Peronalization = (function () {
        function Peronalization() {
            this.Design = null;
            this.Name = null;
            this.Text = null;
            this.TextColour = null;
        }
        return Peronalization;
    })();
    Options.Peronalization = Peronalization;

    var CompoundOptions = (function () {
        function CompoundOptions() {
            this.Layout = null;
            this.MachineFormat = null;
            this.Needles = null;
            this.Palette = null;
            this.Recipe = null;
            this.StackedAlignment = null;
            this.StackedSpacing = null;
            this.TransformationOptions = null;
            this.CompoundElements = null;
        }
        return CompoundOptions;
    })();
    Options.CompoundOptions = CompoundOptions;

    var DesignOptions = (function () {
        function DesignOptions() {
            this.File = null;
            this.palette = null;
            this.needles = null;
        }
        return DesignOptions;
    })();
    Options.DesignOptions = DesignOptions;

    var CompoundElements = (function () {
        function CompoundElements() {
            this.Design = null;
            this.Letteting = null;
        }
        return CompoundElements;
    })();
    Options.CompoundElements = CompoundElements;
})(Options || (Options = {}));
var Renderer;
(function (Renderer) {
    var ImageRenderer = (function () {
        function ImageRenderer(confObject, urlConstructor) {
            this.confObject = confObject;
            this.urlConstructor = urlConstructor;
        }
        ImageRenderer.prototype.lettering = function (options, imageId, callbackSuccess, callbackFail) {
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
        };

        ImageRenderer.prototype.letteringTextFontColor = function (text, font, colors, imageId, callbackSuccess, callbackFail) {
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
        };

        ImageRenderer.prototype.letteringBase64 = function (options, callbackSuccess, callbackFail) {
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
        };

        ImageRenderer.prototype.letteringTextFontColorBase64 = function (text, font, colors, callbackSuccess, callbackFail) {
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
        };

        ImageRenderer.prototype.template = function (templateFile, imageId, callbackSuccess, personalizations) {
            var url = this.urlConstructor.createTemplateUrl(this.confObject.url, templateFile, personalizations);

            if (imageId) {
                var element = document.getElementById(imageId);
                if (element) {
                    element.setAttribute("src", url);
                }
            }

            if (callbackSuccess)
                callbackSuccess(url);
        };

        ImageRenderer.prototype.templateBase64 = function (templateFile, callbackSuccess, callbackFail, personalizations) {
            var url = this.urlConstructor.createTemplateUrl(this.confObject.url, templateFile, personalizations);

            this.GetBase64Image(url, callbackSuccess, callbackFail);
        };

        ImageRenderer.prototype.design = function (fileName, imageId, palette, needles, transformationOptions, callbackSuccess, callbackFail) {
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
            var url = this.urlConstructor.createDesignUrl(this.confObject.url, fileName, paletteColors, needles, transformationOptions);

            if (imageId) {
                var element = document.getElementById(imageId);
                if (element) {
                    element.setAttribute("src", url);
                }
            }

            if (callbackSuccess)
                callbackSuccess(url);
        };

        ImageRenderer.prototype.designChangePalette = function (fileName, imageId, palette, callbackSuccess, callbackFail) {
            this.design(fileName, imageId, palette, null, null, callbackSuccess, callbackFail);
        };

        ImageRenderer.prototype.designChangeNeedles = function (fileName, imageId, needles, callbackSuccess, callbackFail) {
            this.design(fileName, imageId, null, needles, null, callbackSuccess, callbackFail);
        };

        ImageRenderer.prototype.designBase64 = function (fileName, palette, needles, transformationOptions, callbackSuccess, callbackFail) {
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
                var url = this.urlConstructor.createDesignUrl(this.confObject.url, fileName, palette, needles, transformationOptions);
                this.GetBase64Image(url, callbackSuccess, callbackFail);
            }
        };

        ImageRenderer.prototype.designChangePaletteBase64 = function (fileName, palette, callbackSuccess, callbackFail) {
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
                var url = this.urlConstructor.createDesignUrl(this.confObject.url, fileName, palette, null, null);
                this.GetBase64Image(url, callbackSuccess, callbackFail);
            }
        };

        ImageRenderer.prototype.designChangeNeedlesBase64 = function (fileName, needles, callbackSuccess, callbackFail) {
            var url = this.urlConstructor.createDesignUrl(this.confObject.url, fileName, null, needles, null);
            this.GetBase64Image(url, callbackSuccess, callbackFail);
        };

        ImageRenderer.prototype.compound = function (compoundOptions, imageId, callbackSuccess) {
            var url = this.urlConstructor.createCompoundUrl(this.confObject.url, compoundOptions);

            if (imageId) {
                var element = document.getElementById(imageId);
                if (element) {
                    element.setAttribute("src", url);
                }
            }
        };

        ImageRenderer.prototype.compoundBase64 = function (compoundOptions, callbackSuccess, callbackFail) {
            var url = this.urlConstructor.createCompoundUrl(this.confObject.url, compoundOptions);

            this.GetBase64Image(url, callbackSuccess, callbackFail);
        };

        ImageRenderer.prototype.GetBase64Image = function (url, callbackSuccess, callbackFail) {
            var img = new Image();
            var dataURL = "";
            img.src = url;
            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                dataURL = canvas.toDataURL("image/png");
                if (callbackSuccess)
                    callbackSuccess(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
            };

            img.onerror = function () {
                if (callbackFail)
                    callbackFail("Image could not be loaded.");
            };
        };
        return ImageRenderer;
    })();
    Renderer.ImageRenderer = ImageRenderer;
})(Renderer || (Renderer = {}));
var StitchEngine;
(function (StitchEngine) {
    var SEConfigObject = (function () {
        function SEConfigObject(url) {
            if (!(url.substr(url.length - 1) == "/"))
                url += "/";
            url += "1/";
            this.url = url;
        }
        return SEConfigObject;
    })();
    StitchEngine.SEConfigObject = SEConfigObject;
})(StitchEngine || (StitchEngine = {}));
var StitchEngine;
(function (StitchEngine) {
    var SEFactory = (function () {
        function SEFactory(confObject) {
            this.confObject = confObject;
        }
        SEFactory.prototype.getImageRenderer = function () {
            return new Renderer.ImageRenderer(this.confObject, new Utils.UrlConstructor());
        };

        SEFactory.prototype.getAssetsManager = function () {
            if (!this.assetsManager)
                this.assetsManager = new Assets.AssetsManager(this.confObject);

            return this.assetsManager;
        };
        return SEFactory;
    })();
    StitchEngine.SEFactory = SEFactory;
})(StitchEngine || (StitchEngine = {}));
var Utils;
(function (Utils) {
    var UrlConstructor = (function () {
        function UrlConstructor() {
        }
        UrlConstructor.prototype.createLetteringUrl = function (url, options) {
            var text = (options.Text) ? options.Text : "ABC";
            url += "render/Lettering?Text=" + text;

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
            if (options.RenderingOptions) {
                if (options.RenderingOptions.Background)
                    url += "&background=" + options.RenderingOptions.Background;

                if (options.RenderingOptions.DPI)
                    url += "&dpi=" + options.RenderingOptions.DPI;

                if (options.RenderingOptions.Format)
                    url += "&Format=" + options.RenderingOptions.Format;

                if (options.RenderingOptions.ImageHeight)
                    url += "&ImageHeight=" + options.RenderingOptions.ImageHeight;

                if (options.RenderingOptions.ImageWidth)
                    url += "&ImageWidth=" + options.RenderingOptions.ImageWidth;

                if (options.RenderingOptions.IsSquare)
                    url += "&IsSquare=" + options.RenderingOptions.IsSquare;

                if (options.RenderingOptions.Padding)
                    url += "&Padding=" + options.RenderingOptions.Padding;
            }
            return url;
        };

        UrlConstructor.prototype.createTemplateUrl = function (url, file, personalizations) {
            url += "render/templates/" + file;
            if (personalizations) {
                if (personalizations.length > 0) {
                    url += "?";
                    var firstPer = true;
                    for (var i = 0; i < personalizations.length; i++) {
                        if (personalizations[i].Name) {
                            if (!firstPer)
                                url += "&";

                            url += "Personalizations[" + i + "].Name=" + personalizations[i].Name.replace(/\s/g, "%20");

                            if (firstPer)
                                firstPer = false;
                        }
                        if (personalizations[i].Design) {
                            if (!firstPer)
                                url += "&";

                            url += "Personalizations[" + i + "].Design=" + personalizations[i].Design.replace(/\s/g, "%20");

                            if (firstPer)
                                firstPer = false;
                        }
                        if (personalizations[i].Text) {
                            if (!firstPer)
                                url += "&";

                            url += "Personalizations[" + i + "].Text=" + personalizations[i].Text.replace(/\s/g, "%20");

                            if (firstPer)
                                firstPer = false;
                        }
                        if (personalizations[i].TextColour) {
                            if (!firstPer)
                                url += "&";

                            url += "Personalizations[" + i + "].TextColour=" + personalizations[i].TextColour.replace(/\s/g, "%20");

                            if (firstPer)
                                firstPer = false;
                        }
                    }
                }
            }
            return url;
        };

        UrlConstructor.prototype.createDesignUrl = function (url, designFile, palette, needles, transformationOptions) {
            url += "render/Designs/" + designFile + "?";
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
        };

        UrlConstructor.prototype.createCompoundUrl = function (url, compoundOptions) {
            url += "render/Compound?";
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

                        url += "needles[" + j + "]=" + compoundOptions.Needles[j];
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
        };

        UrlConstructor.prototype.addCompoundOtionsToUrl = function (elements, url, isFirstParameter) {
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
        };

        UrlConstructor.prototype.addLetteringToCompoundUrl = function (options, url, isFirstElement) {
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
            if (options.Palette)
                url += "%26palette=" + options.Palette;
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
        };
        return UrlConstructor;
    })();
    Utils.UrlConstructor = UrlConstructor;
})(Utils || (Utils = {}));
