module StitchEngine {
    export class SEConfigObject {
        url: string;

        constructor(url: string) {
            if (!(url.substr(url.length - 1) == "/"))
                url += "/";
            url += "1/";
            this.url = url;
        }
    }
} 