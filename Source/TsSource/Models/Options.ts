module Options {

    export class LetteringOptions {

        constructor() {
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
        }

        Text: string;
        Type: string;
        Font: string;
        Height: number;
        WidthCompression: number;
        Justification: string;
        Envelope: string;
        Recipe: string;
        X1: number;
        Y1: number;
        X2: number;
        Y2: number;
        Decoration: string;
        Neendle: number;
        Palette: string[]; 
        MachineFormat: string;
        TransformationOptions: TransformationOptions;
    }

    export class TransformationOptions {

        constructor() {
            this.Angle = null;
            this.Scale = null;
            this.OffsetX = null;
            this.OffsetY = null;
            this.ResetOrigin = null;
        }

        Angle: number;
        Scale: number;
        OffsetX: number;
        OffsetY: number;
        ResetOrigin: number;
    }

    export class getFontOptions {
        Type: string;
        IsSorted: boolean;

        constructor() {
            this.IsSorted = null;
            this.Type = null;
        }
    }

    export class getRecipesOptions {
        Format: string;
        IsSorted: boolean;

        constructor() {
            this.Format = null;
            this.IsSorted = null;
        }
    }

    export class Peronalization {
        Name: string;
        Design: string;
        Text: string;
        TextColour: string;

        constructor() {
            this.Design = null;
            this.Name = null;
            this.Text = null;
            this.TextColour = null;
        }
    }

    export class CompoundOptions {
        Recipe: string;
        MachineFormat: string;
        Palette: string[];
        Needles: number[];
        Layout: string;
        StackedSpacing: number;
        StackedAlignment: string;
        TransformationOptions: TransformationOptions;
        CompoundElements: CompoundElements[];

        constructor() {
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
    }

    export class DesignOptions {
        constructor() {
            this.File = null;
            this.palette = null;
            this.needles = null;
        }
        File: string;
        palette: string[];
        needles: number[];
    }

    export class CompoundElements {

        constructor() {
            this.Design = null;
            this.Letteting = null;
        }
        Letteting: LetteringOptions;
        Design: DesignOptions;
    }
} 