/* 
<iframe width="770" height="433" src="https://www.youtube.com/embed/5Le4ykggp0g" title="소타고 노는 26살 시골부부🔥ㅣ이동수단ㅣ썰매의모든것ㅣ육아브이로그ㅣ시골라이프ㅣ4살아기ㅣ힐링브이로그ㅣ일상ㅣ먹방ㅣ행복ㅣ시골의이동수단" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
*/

const htmlString =
  //
  `
  <section class="video">
    <div class="video_container">
      <iframe class="video_iframe"></iframe>
      <h3 class="video_title"></h3>
    </div>
  </section>
`;
import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(htmlString);

    const iframeElement = this.element.querySelector(
      '.video_iframe'
    )! as HTMLIFrameElement;

    iframeElement.src = this.convertToEmbeddedURL(url);

    const titleElement = this.element.querySelector(
      '.video_title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  private convertToEmbeddedURL(url: string): string {
    const baseURL = 'https://www.youtube.com/embed/';
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;

    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;

    if (videoId) {
      return `${baseURL}${videoId}`;
    }
    return url;
  }
}
// input 1.https://www.youtube.com/watch?v=5Le4ykggp0g
// input 2.https://youtu.be/5Le4ykggp0g

// output https://www.youtube.com/embed/5Le4ykggp0g

// ^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))
