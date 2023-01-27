import { Component, BaseComponent } from '../component.js';

const htmlString = `
  <li class="page_item">
    <section class="page_item_body"></section>
    <div class="page_item_btn">
      <button class="close">&times;</button>
    </div>
  </li>
`;

export interface Composable {
  addChild(child: Component): void;
}

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  constructor() {
    super(htmlString);
  }
  addChild(child: Component) {
    const container = this.element.querySelector(
      '.page_item_body'
    )! as HTMLElement;
    child.attachTo(container);
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super('<ul class="page">This is Page Components!</ul>');
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
  }
}
