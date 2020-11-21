import express from 'express';

import Project from '../interface/object/project';
import User from '../interface/object/user';

import ProjectModel from '../model/project.model';

const project_router: express.Router = express.Router();

project_router.get('/create/:name/:description/:responsible_for_the_project_id', async (req: express.Request, res: express.Response) => {
    let name: string = req.params.name;
    let description: string = req.params.description;
    let responsible_for_the_project_id: string = req.params.responsible_for_the_project_id;

    let projectModel: ProjectModel = new ProjectModel();
    let project: Project | null = await projectModel.create(name, description, { _id: responsible_for_the_project_id });

    res.set('Content-Type', 'application/json');
    res.send(project);
    res.end();
});

project_router.get('/get/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let projectModel: ProjectModel = new ProjectModel();
    let project: Project | null = await projectModel.get(id);

    res.set('Content-Type', 'application/json');
    res.send(project);
    res.end();
});

project_router.get('/get_list', async (req: express.Request, res: express.Response) => {
    let projectModel: ProjectModel = new ProjectModel();
    let project_list: Project[] = await projectModel.getList();

    res.set('Content-Type', 'application/json');
    res.send(project_list);
    res.end();
});

project_router.get('/add_user/:id/:user_id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    let user_id: string = req.params.user_id;

    let projectModel: ProjectModel = new ProjectModel();
    let project_update: boolean = await projectModel.addUser(id, { _id: user_id });

    res.set('Content-Type', 'application/json');
    res.send(project_update);
    res.end();
});


project_router.get('/update/:id/:name/:description/:responsible_for_the_project_id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    let name: string = req.params.name;
    let description: string = req.params.description;
    let responsible_for_the_project_id: string = req.params.responsible_for_the_project_id;

    let projectModel: ProjectModel = new ProjectModel();
    let project_update: boolean = await projectModel.update(id, name, description, { _id: responsible_for_the_project_id });

    res.set('Content-Type', 'application/json');
    res.send(project_update);
    res.end();
});

project_router.get('/pop_user/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let projectModel: ProjectModel = new ProjectModel();
    let project_update: boolean = await projectModel.popUser(id);

    res.set('Content-Type', 'application/json');
    res.send(project_update);
    res.end();
});

project_router.get('/delete/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let projectModel: ProjectModel = new ProjectModel();
    let project_delete: boolean = await projectModel.delete(id);

    res.set('Content-Type', 'application/json');
    res.send(project_delete);
    res.end();
});

export default project_router;