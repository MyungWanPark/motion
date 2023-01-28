import { Component, BaseComponent } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type onCloseListener = () => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener: (listener: onCloseListener) => void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: onCloseListener;
  constructor() {
    super(`
    <li class="page_item">
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
  }
  addChild(child: Component) {
    const container = this.element.querySelector(".page_item_body")! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: onCloseListener) {
    this.closeListener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private PageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new this.PageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
