import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { RichTextEditor } from "./RichTextEditor";

export class ProductCommentsControl
  implements ComponentFramework.ReactControl<IInputs, IOutputs> {

  private notifyOutputChanged!: () => void;
  private currentValue = "";
  private isDirty = false;
  private disabled = false;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;
    this.currentValue = context.parameters.commentsHtml.raw ?? "";
    this.disabled = context.mode.isControlDisabled;

    console.log("[Comments PCF init] Initialized");
    console.log("[Comments PCF init] Initial HTML:", this.currentValue);
    console.log("[Comments PCF init] Disabled:", this.disabled);
  }

  public updateView(
    context: ComponentFramework.Context<IInputs>,
  ): React.ReactElement {
    const platformValue = context.parameters.commentsHtml.raw ?? "";

    if (!this.isDirty || platformValue === this.currentValue) {
      this.currentValue = platformValue;
      this.isDirty = false;
    }

    this.disabled = context.mode.isControlDisabled;

    console.log("[Comments PCF updateView] Content received");

    return React.createElement(RichTextEditor, {
      value: this.currentValue,
      disabled: this.disabled,
      onChange: (html: string) => {
        if (this.disabled || html === this.currentValue) {
          return;
        }

        this.currentValue = html;
        this.isDirty = true;

        console.log("[Comments PCF] HTML changed");
        this.notifyOutputChanged();
      },
    });
  }

  public getOutputs(): IOutputs {
    console.log("[Comments PCF getOutputs] Returning HTML");

    return {
      commentsHtml: this.currentValue,
    };
  }

  public destroy(): void {
    console.log("[Comments PCF destroy] Control destroyed");
  }
}
