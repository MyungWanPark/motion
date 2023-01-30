import { TextSectionInput } from './components/dialog/input/text-input.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { Component } from './components/component.js';
import { TodoComponet } from './components/page/item/todo.js';
import { NoteComponet } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { VideoComponent } from './components/page/item/video.js';
import { PageComponent, Composable, PageItemComponent } from './components/page/page.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';

type InputComponentConstructor<T extends (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindDialog<MediaSectionInput>(
      '#image_btn',
      MediaSectionInput,
      (inputSection: MediaSectionInput) => new ImageComponent(inputSection.title, inputSection.url)
    );

    this.bindDialog<MediaSectionInput>(
      '#video_btn',
      MediaSectionInput,
      (inputSection: MediaSectionInput) => new VideoComponent(inputSection.title, inputSection.url)
    );

    this.bindDialog<TextSectionInput>(
      '#note_btn',
      TextSectionInput,
      (inputSection: TextSectionInput) => new NoteComponet(inputSection.title, inputSection.text)
    );

    this.bindDialog<TextSectionInput>(
      '#todo_btn',
      TextSectionInput,
      (inputSection: TextSectionInput) => new TodoComponet(inputSection.title, inputSection.text)
    );

    this.page.addChild(new ImageComponent('Image title', 'https://picsum.photos/600/300'));
    this.page.addChild(new VideoComponent('Video title', 'https://www.youtube.com/watch?v=P4EuzQpCDf8'));
    this.page.addChild(new NoteComponet('Note Title', 'This is first note!'));
    this.page.addChild(new TodoComponet('Todo title', 'study'));
    this.page.addChild(new ImageComponent('Image title', 'https://picsum.photos/600/300'));
    this.page.addChild(new VideoComponent('Video title', 'https://www.youtube.com/watch?v=o9ssO1bKn-4'));
    this.page.addChild(new NoteComponet('Note Title', 'This is second note!'));
    this.page.addChild(new TodoComponet('Todo title', 'exercise'));
  }

  private bindDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (inputSection: T) => Component
  ) {
    const btn = document.querySelector(selector)! as HTMLButtonElement;
    btn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const inputSection = new InputComponent();
      dialog.addChild(inputSection);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const inputData = makeSection(inputSection);
        this.page.addChild(inputData);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
