import express from 'express';

import Company from '../interface/object/company';

import CompanyModel from '../model/company.model';

const company_router: express.Router = express.Router();

company_router.get('/create/:name', async (req: express.Request, res: express.Response) => {
    let name: string = req.params.name;

    let companyModel: CompanyModel = new CompanyModel();
    let company: Company | null = await companyModel.create(name);

    res.set('Content-Type', 'text/html');
    res.write("<h1>Результат</h1>");
    if (company) {
        res.write(`<p>_id: ${company?._id}</p>`);
        res.write(`<p>first_name: ${company?.name}</p>`);
        res.write(`<p>last_name: ${company?.project_list}</p>`);
        res.write(`<p>date_of_creation: ${company?.date_of_creation}</p>`);
    } else {
        res.write('<p>user is not created!');
    }
    res.end();
});

company_router.get('/get/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let companyModel: CompanyModel = new CompanyModel();
    let company: Company | null = await companyModel.get(id);

    res.set('Content-Type', 'text/html');
    res.write("<h1>Результат</h1>");
    if (company) {
        res.write(`<p>_id: ${company?._id}</p>`);
        res.write(`<p>first_name: ${company?.name}</p>`);
        res.write(`<p>last_name: ${company?.project_list}</p>`);
        res.write(`<p>date_of_creation: ${company?.date_of_creation}</p>`);
    } else {
        res.write('<p>user is not created!');
    }
    res.end();
});

company_router.get('/get_list', async (req: express.Request, res: express.Response) => {
    let companyModel: CompanyModel = new CompanyModel();
    let company_list: Company[] = await companyModel.getList();

    res.set('Content-Type', 'text/html');
    res.write("<h1>Результат</h1>");
    company_list.forEach(company => {
        res.write('<br><br><br>');
        res.write(`<p>_id: ${company?._id}</p>`);
        res.write(`<p>first_name: ${company?.name}</p>`);
        res.write(`<p>last_name: ${company?.project_list}</p>`);
        res.write(`<p>date_of_creation: ${company?.date_of_creation}</p>`);
    });
    res.end();
});

company_router.get('/add_project/:id/:project_id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    let project_id: string = req.params.project_id;

    let companyModel: CompanyModel = new CompanyModel();
    let company_update: boolean = await companyModel.addProject(id, { _id: project_id });

    res.set('Content-Type', 'text/html');
    res.write("<h1>Результат</h1>");
    res.write(`<p>Додав проект: ${company_update}</p>`);
    res.end();
});


company_router.get('/update/:id/:name', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    let name: string = req.params.name;

    let companyModel: CompanyModel = new CompanyModel();
    let company_update: boolean = await companyModel.update(id, name);

    res.set('Content-Type', 'text/html');
    res.write("<h1>Результат</h1>");
    res.write(`<p>Обновив компанію: ${company_update}</p>`);
    res.end();
});

company_router.get('/pop_project/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let companyModel: CompanyModel = new CompanyModel();
    let company_update: boolean = await companyModel.popProject(id);

    res.set('Content-Type', 'text/html');
    res.write("<h1>Результат</h1>");
    res.write(`<p>Забрав номер телефону: ${company_update}</p>`);
    res.end();
});

company_router.get('/delete/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let companyModel: CompanyModel = new CompanyModel();
    let company_update: boolean = await companyModel.delete(id);

    res.set('Content-Type', 'text/html');
    res.write("<h1>Результат</h1>");
    res.write(`<p>Видалити: ${company_update}</p>`);
    res.end();
});

export default company_router;