import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyRepository from '../repositories/SurveyRepository';

class SurveysController{
    async index(request: Request, response: Response){
        const surveyRepository = await getCustomRepository(SurveyRepository);

        const surveys = await surveyRepository.find({select:['title','description']});

        return response.status(201).json(surveys);

    }

    async create (request: Request, response: Response){
        const {title,description} = request.body;

        const surveyRepository = await getCustomRepository(SurveyRepository);

        const survey = surveyRepository.create({title, description});
        
        await surveyRepository.save(survey);

        return response.status(200).json(survey);
        
    }
    
    //async show(request: Request, response: Response){}
}

export default SurveysController;