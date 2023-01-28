import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { Component } from "./components/component.js";
import { TodoComponet } from "./components/page/item/todo.js";
import { NoteComponet } from "./components/page/item/note.js";
import { ImageComponent } from "./components/page/item/image.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent, Composable, PageItemComponent } from "./components/page/page.js";
import { InputDialog } from "./components/dialog/dialog.js";

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const imgBtn = document.querySelector("#image_btn")! as HTMLButtonElement;
    imgBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const mediaSection = new MediaSectionInput();
      dialog.addChild(mediaSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const image = new ImageComponent(mediaSection.title, mediaSection.url);
        this.page.addChild(image);
        dialog.removeFrom(dialogRoot);
      });
    });

    const videoBtn = document.querySelector("#video_btn")! as HTMLButtonElement;
    videoBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const mediaSection = new MediaSectionInput();
      dialog.addChild(mediaSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const image = new VideoComponent(mediaSection.title, mediaSection.url);
        this.page.addChild(image);
        dialog.removeFrom(dialogRoot);
      });
    });

    const noteBtn = document.querySelector("#note_btn")! as HTMLButtonElement;
    noteBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const textSection = new TextSectionInput();
      dialog.addChild(textSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const note = new NoteComponet(textSection.title, textSection.text);
        this.page.addChild(note);
        dialog.removeFrom(dialogRoot);
      });
    });

    const todoBtn = document.querySelector("#todo_btn")! as HTMLButtonElement;
    todoBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const textSection = new TextSectionInput();
      dialog.addChild(textSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const todo = new TodoComponet(textSection.title, textSection.text);
        this.page.addChild(todo);
        dialog.removeFrom(dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
