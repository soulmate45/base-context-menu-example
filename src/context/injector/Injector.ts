import ComponentStorage from '../components/ComponentStorage.ts';
import Coordinates from '../interfaces/Coordinates.ts';
import Factory from './factory/Factory.ts';

class Injector {
	protected readonly componentStorage = new ComponentStorage();
	protected readonly factory = new Factory();
	
	public injectImage = (coords: Coordinates): HTMLElement => {
		const picture = this.factory.imageFactory(coords);
		this.componentStorage.addComponent(picture);
		const image = picture.getComponent();
		this.setPosition(coords, image)
		return image;
	}
	
	public injectText = (coords: Coordinates): HTMLElement  => {
		const textElement = this.factory.textFactory(coords);
		this.componentStorage.addComponent(textElement);
		const text = textElement.getComponent();
		this.setPosition(coords, text)
		return text;
	}
	
	private setPosition = (coords: Coordinates, element: HTMLElement) =>{
		element.style.top = `${coords.y}px`;
		element.style.left =`${coords.x}px`;
	}
}

export default Injector;