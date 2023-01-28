import { TextData } from "./../dialog.js";
import { BaseComponent } from "./../../component.js";

export class TextSectionInput extends BaseComponent<HTMLElement> implements TextData {
  constructor() {
    super(`
    <div>
      <div class="form_container">
        <label for="title">Title</label>
        <input type="text" id="title">
      </div>
      <div class="form_container">
        <label for="text_body">text content</label>
        <textarea id="text_body" rows="3"></textarea>
      </div>
    </div>
    `);
  }

  get title(): string {
    const titleElement = this.element.querySelector("#title")! as HTMLInputElement;
    return titleElement.value;
  }

  get text(): string {
    const textareaElement = this.element.querySelector("#text_body")! as HTMLTextAreaElement;
    return textareaElement.value;
  }
}
