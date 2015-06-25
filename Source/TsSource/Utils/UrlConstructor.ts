module Utils {
    export class UrlConstructor implements Helpers.IURL {

         createLetteringUrl(url: string, options: Options.LetteringOptions) {
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
            return url;
         }

        createTemplateUrl(url: string, file: string, personalizations: Options.Peronalization[]) {
            url += "render/templates/" + file;
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

        createDesignUrl(url: string, designFile: string, palette: string[], needles: number[], transformationOptions: Options.TransformationOptions) {
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
        }

        createCompoundUrl(url: string, compoundOptions: Options.CompoundOptions) {
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