
class HTMLGenerator {
	private static readonly  COMPONENT_IMG_TEXT = 'img';
	private static readonly COMPONENT_DIV_TEXT = 'div';
	
	public static getImage = (): HTMLImageElement => {
	 return document.createElement(this.COMPONENT_IMG_TEXT);
	}
	
	public static getDiv = (): HTMLElement => {
		return document.createElement(this.COMPONENT_DIV_TEXT);
	}
}

export default HTMLGenerator;