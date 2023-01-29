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
  muteChildren: () => void;
  unmuteChildren: () => void;
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

  muteChildren() {
    this.element.classList.add("mute-children");
  }

  unmuteChildren() {
    this.element.classList.remove("mute-children");
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  private draggedTarget?: SectionContainer;
  private droppedTarget?: SectionContainer;
  private children = new Set<SectionContainer>();
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
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (!this.droppedTarget) {
      return;
    }
    if (this.draggedTarget && this.droppedTarget !== this.draggedTarget) {
      this.draggedTarget.removeFrom(this.element);
      this.droppedTarget.attach(this.draggedTarget, "beforebegin");
    }
  }

  addChild(section: Component) {
    const item = new this.PageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    this.children.add(item);
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    item.setOnDragStateListener((target: SectionContainer, state) => {
      switch (state) {
        case "start":
          this.draggedTarget = item;
          this.muteSectionsChildren();
          break;
        case "end":
          this.draggedTarget = undefined;
          this.unmuteSectionsChildren();
          break;
        case "enter":
          console.log("entered!");
          this.droppedTarget = target;
          break;
        case "leave":
          this.droppedTarget = undefined;
          break;
        default:
          throw new Error(`drag state ${state} is not supported`);
      }
    });
  }
  muteSectionsChildren() {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren();
    });
  }

  unmuteSectionsChildren() {
    this.children.forEach((section: SectionContainer) => {
      section.unmuteChildren();
    });
  }
}
