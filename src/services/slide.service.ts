const merge = require('deepmerge');
import { Slide, UnlocalizedSlide } from '../models/slide.model'
import { SlideRepository } from '../repositories/slide.repository';

export class SlideService {
    static findByQuizUuid(quizUuid: string, lang: string) {
        return new Promise(function(resolve, reject) {
            SlideRepository.findByQuizUuid(quizUuid, lang)
                .then(function(unlocalizedSlides: UnlocalizedSlide[]) {  
                    var slides: Slide[] = [];
                    unlocalizedSlides.forEach((s: UnlocalizedSlide) => {
                        const jsonConfig = s.config 
                            ? merge(s.defaultConfig, s.config) 
                            : s.defaultConfig;
                        const slide: Slide = {
                            "id": s.id,
                            "type": s.type,
                            "lang": s.lang,
                            "config": jsonConfig,
                        }
                        slides.push(slide);
                    });      
                    resolve(slides)
                }).catch(function(err: Error) {
                    reject(err)
                });
        })
    }
}