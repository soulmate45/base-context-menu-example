import ComponentStorage from '../components/ComponentStorage.ts';
import Coordinates from '../interfaces/Coordinates.ts';
import Factory from './factory/Factory.ts';

class Injector {
	private readonly componentStorage: ComponentStorage;
	protected readonly factory = new Factory();
	
	constructor(componentStorage: ComponentStorage) {
		this.componentStorage = componentStorage;
	}
	
	public injectImage = (coords: Coordinates): HTMLElement => {
		const picture = this.factory.imageFactory(coords);
		this.componentStorage.addComponent(picture);
		const image = picture.getComponent();
		picture.setPosition(coords, image)
		return image;
	}
	
	public injectText = (coords: Coordinates): HTMLElement  => {
		const textComponent = this.factory.textFactory(coords);
		this.componentStorage.addComponent(textComponent);
		const text = textComponent.getComponent();
		textComponent.setPosition(coords, text)
		return text;
	}
	
}

export default Injector;