import Coordinates from '../interfaces/Coordinates.ts';
import Component from './Component.ts';
import Images from '../Images.ts';
import '../../styles/context-menu/__picture-component.scss';
import HTMLGenerator from '../HTMLGenerator.ts';

class PictureComponent extends Component {
	private readonly COMPONENT_CLASS_NAME = 'context-menu__picture-component';
	
	constructor(coordsOutput: Coordinates) {
		super(coordsOutput);
		this.component = HTMLGenerator.getImage();
		(this.component as HTMLImageElement).src = Images.KIPELOV;
		this.component.className = this.COMPONENT_CLASS_NAME;
	}
}

export default PictureComponent;