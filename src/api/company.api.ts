import express from 'express';

import Company from '../interface/object/company';

import CompanyModel from '../model/company.model';

const company_router: express.Router = express.Router();

company_router.get('/create/:name', async (req: express.Request, res: express.Response) => {
    let name: string = req.params.name;

    let companyModel: CompanyModel = new CompanyModel();
    let company: Company | null = await companyModel.create(name);

    res.set('Content-Type', 'application/json');
    res.send(company);
    res.end();
});

company_router.get('/get/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let companyModel: CompanyModel = new CompanyModel();
    let company: Company | null = await companyModel.get(id);

    res.set('Content-Type', 'application/json');
    res.send(company);
    res.end();
});

company_router.get('/get_with_budget/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let companyModel: CompanyModel = new CompanyModel();
    let company: Company | null = await companyModel.getWithBudget(id);

    res.set('Content-Type', 'application/json');
    res.send(company);
    res.end();
});

company_router.get('/get_list', async (req: express.Request, res: express.Response) => {
    let companyModel: CompanyModel = new CompanyModel();
    let company_list: Company[] = await companyModel.getList();

    res.set('Content-Type', 'application/json');
    res.send(company_list);
    res.end();
});

company_router.get('/get_list_with_budget', async (req: express.Request, res: express.Response) => {
    let companyModel: CompanyModel = new CompanyModel();
    let company_list: Company[] = await companyModel.getListWithBudget();

    res.set('Content-Type', 'application/json');
    res.send(company_list);
    res.end();
});

company_router.get('/add_project/:id/:project_id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    let project_id: string = req.params.project_id;

    let companyModel: CompanyModel = new CompanyModel();
    let company_update: boolean = await companyModel.addProject(id, { _id: project_id });

    res.set('Content-Type', 'application/json');
    res.send(company_update);
    res.end();
});


company_router.get('/update/:id/:name', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    let name: string = req.params.name;

    let companyModel: CompanyModel = new CompanyModel();
    let company_update: boolean = await companyModel.update(id, name);

    res.set('Content-Type', 'application/json');
    res.send(company_update);
    res.end();
});

company_router.get('/pop_project/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let companyModel: CompanyModel = new CompanyModel();
    let company_update: boolean = await companyModel.popProject(id);

    res.set('Content-Type', 'application/json');
    res.send(company_update);
    res.end();
});

company_router.get('/delete/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let companyModel: CompanyModel = new CompanyModel();
    let company_delete: boolean = await companyModel.delete(id);

    res.set('Content-Type', 'application/json');
    res.send(company_delete);
    res.end();
});

export default company_router;