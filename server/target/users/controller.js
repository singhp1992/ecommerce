"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const jwt_1 = require("../jwt");
let UserController = class UserController {
    async user(id) {
        const user = await entity_1.default.findOne(id);
        return { user };
    }
    async createUser(data) {
        const { password } = data, rest = __rest(data, ["password"]);
        const entity = entity_1.default.create(rest);
        await entity.setPassword(password);
        const user = await entity.save();
        return { user };
    }
    async editUser(id, update) {
        console.log(update);
        const user = await entity_1.default.findOne(id);
        if (!user)
            throw new routing_controllers_1.NotFoundError('User doesn\'t exist');
        const updatedUser = await entity_1.default.merge(user, update).save();
        const jwt = jwt_1.sign({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, permission: user.permission });
        return { user: updatedUser, jwt };
    }
    async deleteUser(id) {
        const user = await entity_1.default.findOne(id);
        if (!user)
            throw new routing_controllers_1.NotFoundError('User doesn\'t exist');
        if (user)
            entity_1.default.remove(user);
        return 'successfully deleted';
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/users/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "user", null);
__decorate([
    routing_controllers_1.Post('/users'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Put('/users/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUser", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Delete('/users/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    routing_controllers_1.JsonController()
], UserController);
exports.default = UserController;
//# sourceMappingURL=controller.js.map