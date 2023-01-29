import { Component, BaseComponent } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type onCloseListener = () => void;
type DragState = "start" | "end" | "enter" | "leave";
type onDragStateListener<T extends Component> = (target: T, state: DragState) => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener: (listener: onCloseListener) => void;
  setOnDragStateListener: (listener: onDragStateListener<SectionContainer>) => void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: onCloseListener;
  private dragStateListener?: onDragStateListener<PageItemComponent>;
  constructor() {
    super(`
    <li draggable="true" class="page_item">
      <section class="page_item_body"></section>
      <div class="page_item_btn">
        <button class="close">&times;</button>
      </div>
    </li>
  `);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    this.element.addEventListener("dragstart", (e: DragEvent) => {
      this.onDragStart(e);
    });
    this.element.addEventListener("dragend", (e: DragEvent) => {
      this.onDragEnd(e);
    });
    this.element.addEventListener("dragenter", (e: DragEvent) => {
      this.onDragEnter(e);
    });
    this.element.addEventListener("dragleave", (e: DragEvent) => {
      this.onDragLeave(e);
    });
  }

  onDragStart(_: DragEvent) {
    this.notifyDragStateObserver("start");
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragStateObserver("end");
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragStateObserver("enter");
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragStateObserver("leave");
  }

  addChild(child: Component) {
    const container = this.element.querySelector(".page_item_body")! as HTMLElement;
    child.attachTo(container);
  }

  notifyDragStateObserver(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  setOnCloseListener(listener: onCloseListener) {
    this.closeListener = listener;
  }

  setOnDragStateListener(listener: onDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private PageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
    this.element.addEventListener("dragover", (e: DragEvent) => {
      this.onDragOver(e);
    });
    this.element.addEventListener("drop", (e: DragEvent) => {
      this.onDrop(e);
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log("drag over");
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log("drop");
  }

  addChild(section: Component) {
    const item = new this.PageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
    item.setOnDragStateListener((target: PageItemComponent, state) => {
      console.log(target, state);
    });
  }
}
