import Coordinates from '../Coordinates';
import Element from './Element';
import '../../styles/context-menu/__text-element.scss';

class TextElement extends Element {
	constructor(coordsOutput: Coordinates) {
		super(coordsOutput);
		this.element.textContent = 'Я здееесь';
		this.element.className = 'context-menu__text-element'
	}
}

export default TextElement;