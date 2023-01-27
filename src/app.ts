import { Component } from './components/component';
import { TodoComponet } from './components/page/item/todo.js';
import { NoteComponet } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { VideoComponent } from './components/page/item/video.js';
import {
  PageComponent,
  Composable,
  PageItemComponent,
} from './components/page/page.js';

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      'Image Title',
      'https://picsum.photos/600/300'
    );
    this.page.addChild(image);

    const video = new VideoComponent(
      'video title',
      'https://www.youtube.com/watch?v=5Le4ykggp0g'
    );
    this.page.addChild(video);

    const note = new NoteComponet('note title', 'note body');
    this.page.addChild(note);

    const todo = new TodoComponet('todo title', 'todo');
    this.page.addChild(todo);
  }
}

new App(document.querySelector('.document')! as HTMLElement);
