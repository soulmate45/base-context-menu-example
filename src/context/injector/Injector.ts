import ComponentStorage from '../components/ComponentStorage.ts';
import ICoordinates from '../interfaces/ICoordinates.ts';
import Factory from './factory/Factory.ts';
import ComponentType from '../components/ComponentType.ts';

/** -------------------------------------
 *     Класс, настраивающий компоненты.
 */
class Injector {
	private readonly componentStorage: ComponentStorage;
	private readonly factory = new Factory();
	
	constructor(componentStorage: ComponentStorage) {
		this.componentStorage = componentStorage;
	};
	
	/** ----------------------------------------------------------------------------------------------------------------
	 *     Метод, создающий компонент Picture в @class Factory, проводит его настройку и добавляет в componentStorage.
	 *     @param coords - координаты мыши.
	 *     @returns HTMLElement созданного компонента.
	 */
	public injectImage = (coords: ICoordinates): HTMLElement => {
		const picture = this.factory.getComponent(ComponentType.PICTURE_COMPONENT);
		this.componentStorage.addComponent(picture);
		const image = picture.getComponent();
		picture.setPosition(coords);
		return image;
	};
	
	/** -------------------------------------------------------------------------------------------------------------
	 *     Метод, создающий компонент Text в @class Factory, проводит его настройку и добавляет в componentStorage.
	 *     @param coords - координаты мыши.
	 *     @returns HTMLElement созданного компонента.
	 */
	public injectText = (coords: ICoordinates): HTMLElement => {
		const textComponent = this.factory.getComponent(ComponentType.TEXT_COMPONENT);
		this.componentStorage.addComponent(textComponent);
		const text = textComponent.getComponent();
		textComponent.setPosition(coords);
		return text;
	};
	
}

export default Injector;