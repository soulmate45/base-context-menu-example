import Coordinates from '../Coordinates.ts';
import Element from './Element.ts';
import '../../styles/context-menu/__picture-element.scss';

class PictureElement extends Element {
	constructor(coordsOutput: Coordinates) {
		super(coordsOutput);
		this.element = document.createElement('img');
		(this.element as HTMLImageElement).src = 'https://avatars.mds.yandex.net/get-afishanew/31447/01cb6baba420b2b38bc01d427a65554b/s270x190';
		this.element.className = 'context-menu__picture-element';
	}
}

export default PictureElement;