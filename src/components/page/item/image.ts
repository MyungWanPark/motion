export class ImageComponent {
  private element: HTMLElement;
  constructor(title: string, url: string) {
    const template = document.createElement('template');
    template.innerHTML =
      //
      `<section class="image"> 
        <div class="image_holder">
          <img class="image_thumbnail" />
          <p class="image_title"></p>
        </div>
      </section>`;
    this.element = template.content.firstElementChild! as HTMLElement;

    const imageElement = this.element.querySelector(
      '.image_thumbnail'
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      '.image_title'
    )! as HTMLParagraphElement;
    titleElement.textContent = title;
  }

  attachTo(parent: HTMLElement, position: InsertPosition) {
    parent.insertAdjacentElement(position, this.element);
  }
}
