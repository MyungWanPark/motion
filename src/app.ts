import { TodoComponet } from './components/page/item/todo.js';
import { NoteComponet } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { VideoComponent } from './components/page/item/video.js';
import { PageComponent } from './components/page/page.js';

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      'Image Title',
      'https://picsum.photos/600/300'
    );
    image.attachTo(appRoot, 'beforeend');

    const video = new VideoComponent(
      'video title',
      'https://www.youtube.com/watch?v=5Le4ykggp0g'
    );
    video.attachTo(appRoot, 'beforeend');

    const note = new NoteComponet('note title', 'note body');
    note.attachTo(appRoot, 'beforeend');

    const todo = new TodoComponet('todo title', 'todo');
    todo.attachTo(appRoot, 'beforeend');
  }
}

new App(document.querySelector('.document')! as HTMLElement);
