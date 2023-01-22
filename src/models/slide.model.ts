export interface UnlocalizedSlide extends Slide {
    defaultConfig: string
}

export interface Slide extends BaseSlide {
    id: number
}

export interface BaseSlide {
    lang: string
    config: string
}