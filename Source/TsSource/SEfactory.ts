module StitchEngine {
    export class SEFactory {
        private confObject: StitchEngine.SEConfigObject;
        private assetsManager: Assets.AssetsManager;

        constructor(confObject: StitchEngine.SEConfigObject) {
            this.confObject = confObject;
        }

        getImageRenderer() {
            return new Renderer.ImageRenderer(this.confObject, new Utils.UrlConstructor());
        }

        getAssetsManager() {
            if (!this.assetsManager)
                this.assetsManager = new Assets.AssetsManager(this.confObject);

            return this.assetsManager;
        }

    }
} 