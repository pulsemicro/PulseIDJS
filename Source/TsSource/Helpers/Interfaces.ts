module Helpers {
    export interface IRenderer {
        lettering: (options: Options.LetteringOptions, imageId: string, callback, callbackFail: (errorMessage: string) => void) => void;
        letteringTextFontColor: (text: string, font: string, colors: string[], imageId: string, callbackSuccess: () => void, callbackFail: (errorMessage: string) => void) => void;
        letteringBase64: (options: Options.LetteringOptions, callbackSuccess: (base64string: string) => void, callbackFail: (errorMessage: string) => void) => void;
        letteringTextFontColorBase64: (text: string, font: string,colors: string[], callbackSuccess: (base64string: string) => void, callbackFail: (errorMessage: string) => void) => void;
        template: (templateFile, imageId, callbackSuccess, personalizations?: Options.Peronalization[]) => void;
        templateBase64: (templateFile, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void, personalizations?: Options.Peronalization[]) => void;
        design: (fileName: string, imageId, palette: string[], needles: number[], transformationOptions: Options.TransformationOptions, callbackSuccess: (url) => void, callbackFail: (errorMessage: string) => void) => void;
        designChangePalette: (fileName: string, imageId, palette: string[], callbackSuccess: (url) => void, callbackFail: (errorMessage: string) => void) => void;
        designChangeNeedles: (fileName: string, imageId, needles: number[], callbackSuccess: (url) => void, callbackFail: (errorMessage: string) => void) => void;
        designBase64: (fileName: string, palette: string[], needles: number[], transformationOptions: Options.TransformationOptions, callbackSuccess: (url) => void, callbackFail: (errorMessage: string) => void) => void;
    }

    export interface IAssetsManager {
        getFonts: (callbackSuccess: (fonts) => void, callbackFail: (errorMessage: string) => void) => void;
        getFontsToJsonFormat: (fontOptions: Options.getFontOptions, callbackSuccess, callbackFail) => void;
        getFontsToXmlFormat: (options: Options.getFontOptions, callbackSuccess: (fonts) => void, callbackFail: (errorMessage: string) => void) => void;
        getRecipesToJson: (callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void, issorted?: boolean) => void;
    }

    export interface IURL {
        createLetteringUrl: (url: string, options: Options.LetteringOptions) => string;
        createTemplateUrl: (url: string, file: string, personalizations: Options.Peronalization[]) => string;
        createDesignUrl: (url: string, designFile: string, palette: string[], needles: number[], transformationOptions: Options.TransformationOptions) => string;
        createCompoundUrl: (url: string,compoundOptions: Options.CompoundOptions) => string;
    }
}