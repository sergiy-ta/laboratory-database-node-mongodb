import express from 'express';

import Budget from '../interface/object/budget';

import BudgetModel from '../model/budget.model';

const budget_router: express.Router = express.Router();

budget_router.get('/create/:company_id/:number/:currency', async (req: express.Request, res: express.Response) => {
    let company_id: string = req.params.company_id;
    let number: number = parseFloat(req.params.number);
    let currency: string = req.params.currency;

    let budgetModel: BudgetModel = new BudgetModel();
    let budget: Budget | null = await budgetModel.create({ _id: company_id }, number, { _id: currency });

    res.set('Content-Type', 'application/json');
    res.send(budget);
    res.end();
});

budget_router.get('/get/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let budgetModel: BudgetModel = new BudgetModel();
    let budget: Budget | null = await budgetModel.get(id);

    res.set('Content-Type', 'application/json');
    res.send(budget);
    res.end();
});

budget_router.get('/get_list', async (req: express.Request, res: express.Response) => {
    let budgetModel: BudgetModel = new BudgetModel();
    let budget_list: Budget[] = await budgetModel.getList();

    res.set('Content-Type', 'application/json');
    res.send(budget_list);
    res.end();
});

budget_router.get('/get_list_company/:company_id', async (req: express.Request, res: express.Response) => {
    let company_id: string = req.params.company_id;

    let budgetModel: BudgetModel = new BudgetModel();
    let budget_list: Budget[] = await budgetModel.getListCompany({ _id: company_id });

    res.set('Content-Type', 'application/json');
    res.send(budget_list);
    res.end();
});


budget_router.get('/update/:id/:number/:currency', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    let number: number = parseFloat(req.params.number);
    let currency: string = req.params.currency;

    let budgetModel: BudgetModel = new BudgetModel();
    let budget_update: boolean = await budgetModel.update(id, number, { _id: currency});

    res.set('Content-Type', 'application/json');
    res.send(budget_update);
    res.end();
});

budget_router.get('/delete/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let budgetModel: BudgetModel = new BudgetModel();
    let budget_delete: boolean = await budgetModel.delete(id);

    res.set('Content-Type', 'application/json');
    res.send(budget_delete);
    res.end();
});

export default budget_router;