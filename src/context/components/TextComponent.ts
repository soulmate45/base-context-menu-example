import Coordinates from '../interfaces/Coordinates.ts';
import Component from './Component.ts';
import '../../styles/context-menu/__text-component.scss';

class TextComponent extends Component {
	private readonly COMPONENT_CLASS_NAME = 'context-menu__text-component';
	private readonly COMPONENT_TEXT_CONTENT = 'Я здееесь';
	
	constructor(coordsOutput: Coordinates) {
		super(coordsOutput);
		this.component.textContent = this.COMPONENT_TEXT_CONTENT;
		this.component.className = this.COMPONENT_CLASS_NAME;
	}
}

export default TextComponent;