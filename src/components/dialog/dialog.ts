import { Composable } from './../page/page.js';
import { BaseComponent, Component } from './../component.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly text: string;
}

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  private closeListener?: OnCloseListener;
  private submitListener?: OnSubmitListener;

  constructor() {
    super(`
    <dialog class="dialog">
      <div class="dialog_container">
        <button class="close">&times;</button>
        <div id="dialog_body"></div>
        <button class="dialog_submit">ADD</button>
      </div>
    </dialog>
    `);
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
      this.closeListener && this.closeListener();
    });

    const submitBtn = this.element.querySelector('.dialog_submit')! as HTMLButtonElement;
    submitBtn.addEventListener('click', () => {
      this.submitListener && this.submitListener();
    });
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: Component): void {
    const dialogBody = this.element.querySelector('#dialog_body')! as HTMLDivElement;
    child.attachTo(dialogBody);
  }
}
