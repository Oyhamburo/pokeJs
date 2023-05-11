import { UsuariosModel } from "../user.model.js"

class DaoMongoDb {

    ID_FIELD = "_id";
    USERNAME_FIELD = 'username';

    constructor() {
    }

    async createUser(object) {
        try {
            return await UsuariosModel.create(object);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async loginUser(object) {
        try {
            const user = await UsuariosModel.findOne({
                [this.USERNAME_FIELD]: object.username
            });

            if (!user) {
                console.info(`User '${object.username}' does not exist`)
                return null;
            }

            let compare = await user.comparePassword(object.password);

            if(compare){
                return user
            }else{
                return false
            }

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getIdByUser(username) {
        try {
            const user = await UsuariosModel.findOne({
                [this.USERNAME_FIELD]: username
            })
            return  user._id

        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export { DaoMongoDb as UserDaoMongoDB }