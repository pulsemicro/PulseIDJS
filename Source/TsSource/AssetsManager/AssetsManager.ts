module Assets {
    export class AssetsManager implements Helpers.IAssetsManager {
        private configObject: StitchEngine.SEConfigObject;

        constructor(confObject: StitchEngine.SEConfigObject) {
            this.configObject = confObject;
        }

        //Default format=json, type= all, issorted= false
        getFonts(callbackSuccess: (fonts) => void, callbackFail: (errorMessage: string) => void) {
            var options = new Options.getFontOptions();
            var url = this.createGetFontUrl(options);

            this.handleRequest(url, callbackSuccess, callbackFail);
        }

        getFontsToJsonFormat(options: Options.getFontOptions, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
            var url = this.createGetFontUrl(options, "json");

            this.handleRequest(url, callbackSuccess, callbackFail);
        }

        getFontsToXmlFormat(options: Options.getFontOptions, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
            var url = this.createGetFontUrl(options);

            this.handleRequest(url, callbackSuccess, callbackFail);
        }

        getRecipesToXml(callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void, issorted?: boolean) {
            var recipeOptions = new Options.getRecipesOptions();
            if (issorted)
                recipeOptions.IsSorted = issorted;

            var url = this.createGetRecipesUrl(recipeOptions);
            this.handleRequest(url, callbackSuccess, callbackFail);
        }

        getRecipesToJson(callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void, issorted?: boolean) {
            var recipeOptions = new Options.getRecipesOptions();
            recipeOptions.Format = "json";
            if (issorted)
                recipeOptions.IsSorted = issorted;

            var url = this.createGetRecipesUrl(recipeOptions);
            this.handleRequest(url, callbackSuccess, callbackFail);
        }

        private createGetFontUrl(options: Options.getFontOptions, format: string = "xml") {
            var url = this.configObject.url + "List/Fonts?format=" + format;

            if (options.Type)
                url += "&type=" + options.Type;
            if (options.IsSorted)
                url += "&issorted=" + options.IsSorted;

            return url;
        }

        private createGetRecipesUrl(options: Options.getRecipesOptions) {
            var format = (options.Format) ? options.Format : "xml";
            var url = this.configObject.url + "List/Recipes?format=" + format;

            if (options.IsSorted)
                url += "&issorted=" + options.IsSorted;

            return url;
        }

        private handleRequest(url: string, callbackSuccess: (data) => void, callbackFail: (errorMessage: string) => void) {
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
                }
                else if (request.readyState == 4 && request.status == 404) {
                    if (callbackFail)
                        callbackFail("Server not found");
                }
                else if (request.readyState == 4 && request.status == 500) {
                    if (callbackFail)
                        callbackFail("Internal server error");
                }
            }
        }

        private createCORSRequest(method, url) {
            var myXhr;
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {

                // Check if the XMLHttpRequest object has a "withCredentials" property.
                // "withCredentials" only exists on XMLHTTPRequest2 objects.
                myXhr = xhr;
                myXhr.open(method, url, true);

            } else if (typeof XDomainRequest != "undefined") {

                // Otherwise, check if XDomainRequest.
                // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                var xhr2 = new XDomainRequest();
                myXhr = xhr2;
                xhr.open(method, url);

            } else {

                // Otherwise, CORS is not supported by the browser.
                myXhr = null;

            }
            return myXhr;
        }
    }
} 