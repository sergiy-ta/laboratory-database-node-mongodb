import express from 'express';

import User from '../interface/object/user';

import UserModel from '../model/user.model';

const user_router: express.Router = express.Router();

user_router.get('/create/:last_name/:first_name/:age/:email', async (req: express.Request, res: express.Response) => {
    let last_name: string = req.params.last_name;
    let first_name: string = req.params.first_name;
    let age: number = +req.params.age;
    let email: string = req.params.email;

    let userModel: UserModel = new UserModel();
    let user: User | null = await userModel.create(last_name, first_name, age, email);

    res.set('Content-Type', 'application/json');
    res.send(user);
    res.end();
});

user_router.get('/get/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let userModel: UserModel = new UserModel();
    let user: User | null = await userModel.get(id);

    res.set('Content-Type', 'application/json');
    res.send(user);
    res.end();
});

user_router.get('/get_list', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let userModel: UserModel = new UserModel();
    let user_list: User[] = await userModel.getList();

    res.set('Content-Type', 'application/json');
    res.send(user_list);
    res.end();
});

user_router.get('/add_phone_number/:id/:phone_number', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    let phone_number: string = req.params.phone_number;

    let userModel: UserModel = new UserModel();
    let user_update: boolean = await userModel.addPhoneNumber(id, phone_number);

    res.set('Content-Type', 'application/json');
    res.send(user_update);
});

user_router.get('/add_address/:id/:city_id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    let city_id: string = req.params.city_id;

    let userModel: UserModel = new UserModel();
    let user_update: boolean = await userModel.addAddress(id, city_id);

    res.set('Content-Type', 'application/json');
    res.send(user_update);
    res.end();
});

user_router.get('/update/:id/:last_name/:first_name/:age/:email', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    let last_name: string = req.params.last_name;
    let first_name: string = req.params.first_name;
    let age: number = +req.params.age;
    let email: string = req.params.email;

    let userModel: UserModel = new UserModel();
    let user_update: boolean = await userModel.update(id, last_name, first_name, age, email);

    res.set('Content-Type', 'application/json');
    res.send(user_update);
    res.end();
});

user_router.get('/pop_phone_number/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let userModel: UserModel = new UserModel();
    let user_update: boolean = await userModel.popPhoneNumber(id);

    res.set('Content-Type', 'application/json');
    res.send(user_update);
    res.end();
});

user_router.get('/pop_address/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let userModel: UserModel = new UserModel();
    let user_update: boolean = await userModel.popAddress(id);

    res.set('Content-Type', 'application/json');
    res.send(user_update);
    res.end();
});

user_router.get('/delete/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let userModel: UserModel = new UserModel();
    let user_delete: boolean = await userModel.delete(id);

    res.set('Content-Type', 'application/json');
    res.send(user_delete);
    res.end();
});

export default user_router;